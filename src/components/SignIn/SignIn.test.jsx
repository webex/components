import fs from 'fs';
import path from 'path';
import React from 'react';
import {create, act} from 'react-test-renderer';
import {AdapterContext} from '../hooks/contexts';
import SignIn from './SignIn';

const mockMetricsAdapter = {
  submitMetrics: jest.fn(),
};

const defaultProps = {
  authUrl: 'https://auth.example.com/oauth',
  clientID: 'test-client-id',
  redirectUri: 'https://app.example.com/callback',
  authType: 'Custom',
  scope: 'spark:all',
  signInResponse: jest.fn(),
  getAccessToken: jest.fn(),
  tokenStoragePolicy: {},
};

function renderSignIn(props = {}) {
  const mergedProps = {...defaultProps, ...props};
  let renderer;

  act(() => {
    renderer = create(
      <AdapterContext.Provider value={{metricsAdapter: mockMetricsAdapter}}>
        <SignIn {...mergedProps} />
      </AdapterContext.Provider>,
    );
  });

  return renderer;
}

function clickSignInButton(renderer) {
  const button = renderer.root.findByType('button');

  act(() => {
    button.props.onClick();
  });
}

describe('SignIn', () => {
  let openSpy;
  let fakeWindow;

  beforeEach(() => {
    jest.useFakeTimers();

    fakeWindow = {closed: false};
    openSpy = jest.spyOn(window, 'open').mockReturnValue(fakeWindow);

    window.crypto = {
      getRandomValues: (arr) => {
        for (let i = 0; i < arr.length; i += 1) {
          // eslint-disable-next-line no-param-reassign
          arr[i] = i + 1;
        }

        return arr;
      },
    };

    sessionStorage.clear();
    localStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
    openSpy.mockRestore();
  });

  describe('AC-3: CSRF state generation (>=16 bytes, hex-serialized, stored)', () => {
    test('state has >=16 bytes serialized as hex', () => {
      const renderer = renderSignIn();

      clickSignInButton(renderer);

      expect(openSpy).toHaveBeenCalled();
      const calledUrl = openSpy.mock.calls[0][0];
      const url = new URL(calledUrl);
      const stateParam = url.searchParams.get('state');

      expect(stateParam).toBeTruthy();
      // must not be comma-joined array like old Uint8Array coercion
      expect(stateParam).not.toMatch(/,/);
      // hex chars only
      expect(stateParam).toMatch(/^[0-9a-f]+$/i);
      // at least 32 hex chars = 16 bytes
      expect(stateParam.length).toBeGreaterThanOrEqual(32);
    });

    test('state param is generated fresh from crypto.getRandomValues, not a fixed/reused value', () => {
      let callCount = 0;
      const randomValuesSpy = jest.spyOn(window.crypto, 'getRandomValues').mockImplementation((arr) => {
        callCount += 1;
        for (let i = 0; i < arr.length; i += 1) {
          // eslint-disable-next-line no-param-reassign
          arr[i] = callCount * 10 + i;
        }

        return arr;
      });

      const rendererA = renderSignIn();

      clickSignInButton(rendererA);
      const stateA = new URL(openSpy.mock.calls[0][0]).searchParams.get('state');

      const rendererB = renderSignIn();

      clickSignInButton(rendererB);
      const stateB = new URL(openSpy.mock.calls[1][0]).searchParams.get('state');

      // each click must draw its own bytes from crypto.getRandomValues — a cached
      // or hardcoded state would call it fewer times and/or produce identical values
      expect(randomValuesSpy).toHaveBeenCalledTimes(2);
      expect(stateA).not.toBe(stateB);

      randomValuesSpy.mockRestore();
    });

    test('uses caller-supplied state prop when provided', () => {
      const renderer = renderSignIn({state: 'caller-provided-state'});

      clickSignInButton(renderer);

      const calledUrl = openSpy.mock.calls[0][0];
      const url = new URL(calledUrl);

      expect(url.searchParams.get('state')).toBe('caller-provided-state');
    });

    test('does not keep an unused write-only csrfStateRef', () => {
      const source = fs.readFileSync(path.join(__dirname, 'SignIn.jsx'), 'utf8');

      expect(source).not.toMatch(/csrfStateRef/);
    });
  });

  describe('AC-4: cookie includes SameSite=Strict', () => {
    test('cookie includes secure and SameSite=Strict', async () => {
      const accessToken = 'test-access-token-abc123';
      const getAccessToken = jest.fn().mockResolvedValue(accessToken);
      const cookieAssignments = [];
      const origDescriptor = Object.getOwnPropertyDescriptor(document, 'cookie');

      Object.defineProperty(document, 'cookie', {
        set(val) {
          cookieAssignments.push(val);
        },
        get() {
          return origDescriptor ? origDescriptor.get.call(this) : '';
        },
        configurable: true,
      });

      const renderer = renderSignIn({
        getAccessToken,
        tokenStoragePolicy: {place: 'cookie', name: 'test_cookie', ttl: 3600},
      });

      clickSignInButton(renderer);

      fakeWindow.closed = true;
      act(() => {
        jest.advanceTimersByTime(600);
      });

      await act(async () => {
        await Promise.resolve();
      });

      if (origDescriptor) {
        Object.defineProperty(document, 'cookie', origDescriptor);
      }

      const cookieStr = cookieAssignments.find((c) => c.includes('test_cookie'));

      expect(cookieStr).toBeTruthy();
      expect(cookieStr).toMatch(/secure/i);
      expect(cookieStr).toMatch(/SameSite=Strict/i);
    });
  });

  describe('AC-5: session/local token respects ttl', () => {
    test('session storage stores token with expiry envelope (not raw string)', async () => {
      const accessToken = 'session-token-xyz';
      const getAccessToken = jest.fn().mockResolvedValue(accessToken);
      const renderer = renderSignIn({
        getAccessToken,
        tokenStoragePolicy: {place: 'session', name: 'sess_token', ttl: 1800},
      });

      clickSignInButton(renderer);

      fakeWindow.closed = true;
      act(() => {
        jest.advanceTimersByTime(600);
      });

      await act(async () => {
        await Promise.resolve();
      });

      const stored = sessionStorage.getItem('sess_token');

      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored);

      expect(parsed.token).toBe(accessToken);
      expect(typeof parsed.expiry).toBe('number');
      // expiry should be in the future (Date.now() is mocked by MockDate to Aug 1 2020)
      expect(parsed.expiry).toBeGreaterThan(Date.now());
    });

    test('local storage stores token with expiry envelope (not raw string)', async () => {
      const accessToken = 'local-token-xyz';
      const getAccessToken = jest.fn().mockResolvedValue(accessToken);
      const renderer = renderSignIn({
        getAccessToken,
        tokenStoragePolicy: {place: 'local', name: 'local_token', ttl: 86400},
      });

      clickSignInButton(renderer);

      fakeWindow.closed = true;
      act(() => {
        jest.advanceTimersByTime(600);
      });

      await act(async () => {
        await Promise.resolve();
      });

      const stored = localStorage.getItem('local_token');

      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored);

      expect(parsed.token).toBe(accessToken);
      expect(typeof parsed.expiry).toBe('number');
      expect(parsed.expiry).toBeGreaterThan(Date.now());
    });
  });
});
