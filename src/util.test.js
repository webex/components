import {deepMerge, isValidUrl} from './util';

describe('isValidUrl', () => {
  describe('AC-1: host allow-list hardening', () => {
    test('accepts remote https host', () => {
      expect(isValidUrl('https://example.com/x', ['https:'])).toBe(true);
    });

    test('rejects loopback host 127.0.0.1', () => {
      expect(isValidUrl('http://127.0.0.1/x', ['http:', 'https:'])).toBe(false);
    });

    test('rejects loopback host localhost', () => {
      expect(isValidUrl('http://localhost/x', ['http:', 'https:'])).toBe(false);
    });

    test('rejects link-local host 169.254.169.254', () => {
      expect(isValidUrl('http://169.254.169.254/latest/meta-data', ['http:', 'https:'])).toBe(false);
    });

    test('rejects private class-A host 10.x', () => {
      expect(isValidUrl('http://10.0.0.1/path', ['http:', 'https:'])).toBe(false);
    });

    test('rejects private class-B host 172.16-31.x', () => {
      expect(isValidUrl('http://172.16.0.1/path', ['http:', 'https:'])).toBe(false);
    });

    test('rejects private class-C host 192.168.x', () => {
      expect(isValidUrl('https://192.168.1.1/path', ['http:', 'https:'])).toBe(false);
    });

    test('rejects IPv6 loopback [::1]', () => {
      expect(isValidUrl('http://[::1]/path', ['http:', 'https:'])).toBe(false);
    });

    test('preserves data: icon allow-list', () => {
      expect(isValidUrl('data:image/png;base64,AAA', ['http:', 'https:', 'data:'])).toBe(true);
    });

    test('rejects protocol not in allow-list', () => {
      // eslint-disable-next-line no-script-url
      expect(isValidUrl('javascript:alert(1)', ['http:', 'https:'])).toBe(false);
    });

    test('rejects invalid URL', () => {
      expect(isValidUrl('not-a-url', ['http:', 'https:'])).toBe(false);
    });
  });
});

describe('deepMerge', () => {
  describe('AC-6: prototype pollution guard', () => {
    beforeEach(() => {
      delete Object.prototype.polluted;
    });

    afterEach(() => {
      delete Object.prototype.polluted;
    });

    test('prototype pollution payload is neutralized', () => {
      const malicious = JSON.parse('{"__proto__":{"polluted":true}}');

      deepMerge({}, malicious);
      expect({}.polluted).toBeUndefined();
      expect(Object.prototype.polluted).toBeUndefined();
    });

    test('constructor key is skipped', () => {
      const target = {};

      deepMerge(target, JSON.parse('{"constructor":{"polluted":true}}'));
      expect(Object.prototype.polluted).toBeUndefined();
    });

    test('prototype key is skipped', () => {
      const target = {};

      deepMerge(target, {prototype: {polluted: true}});
      expect(Object.prototype.polluted).toBeUndefined();
    });

    test('normal nested merge preserved', () => {
      const dest = {a: {b: 1}};

      deepMerge(dest, {a: {c: 2}});
      expect(dest.a).toEqual({b: 1, c: 2});
    });

    test('top-level value assignment works', () => {
      const dest = {x: 1};

      deepMerge(dest, {y: 2});
      expect(dest).toEqual({x: 1, y: 2});
    });
  });
});
