import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button} from '../generic';
import Spinner from '../generic/Spinner/Spinner';

/**
 * Performs OAuth 2.0 Authorization
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.authUrl  Authorization url
 * @param {string} props.clientID  Client ID of the app
 * @param {string} props.redirectUri  Redirect Url registered to capture the code
 * @param {string} props.scope  Scope required for the app
 * @param {Function} props.signInResponse  Function called on successfull sign in
 * @param {Function} props.getAccessToken  Function called to fetch access token from backend server
 * @param {object} props.tokenStoragePolicy  Store token in cookie, local or session storage
 * @param {string} props.authType  Authorization server type
 * @returns {object} JSX of the component
 */
export default function SignIn({
  authUrl,
  clientID,
  redirectUri,
  authType,
  scope,
  signInResponse,
  getAccessToken,
  tokenStoragePolicy,
}) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const openAuthUrl = () => {
    const arr = new Uint8Array(4);
    const state = window.crypto.getRandomValues(arr);
    const fullAuthUrl = `${authUrl}?client_id=${clientID}&response_type=code&redirect_uri=${encodeURI(redirectUri)}${scope !== '' ? `&scope=${encodeURI(scope)}` : ''}&state=${state}`;

    const newWindow = window.open(fullAuthUrl, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=700');

    setIsAuthenticating(true);

    if (authType === 'Custom') {
      const timer = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(timer);
          getAccessToken().then((accessToken) => {
            if (accessToken) {
              if (Object.keys(tokenStoragePolicy).length !== 0) {
                const {name, place, ttl} = tokenStoragePolicy;

                switch (place) {
                  case 'cookie': {
                    const expiry = new Date();

                    expiry.setSeconds(ttl);
                    document.cookie = `${name}=${accessToken}; secure; expires=${expiry.toUTCString()}`;
                    break;
                  }
                  case 'session':
                    sessionStorage.setItem(name, accessToken);
                    break;
                  case 'local':
                    localStorage.setItem(name, accessToken);
                    break;
                  default:
                    break;
                }
              }
            }
            signInResponse(clientID, accessToken || Error('No access token was returned'));
          })
            .catch((err) => {
              signInResponse(clientID, Error('Failed to fetch access token: ', err));
            });
          setIsAuthenticating(false);
        }
      }, 500);
    }
  };

  return (
    <div className="sign-in-wrapper">
      {isAuthenticating ? <Spinner /> : (
        <Button
          type="join"
          size={40}
          onClick={openAuthUrl}
        >
          Sign In
        </Button>
      )}
    </div>
  );
}

SignIn.propTypes = {
  authUrl: PropTypes.string.isRequired,
  clientID: PropTypes.string.isRequired,
  redirectUri: PropTypes.string.isRequired,
  authType: PropTypes.string.isRequired,
  scope: PropTypes.string,
  signInResponse: PropTypes.func,
  getAccessToken: PropTypes.func,
  tokenStoragePolicy: PropTypes.shape(
    {place: PropTypes.string, name: PropTypes.string, ttl: PropTypes.number},
  ),
};

SignIn.defaultProps = {
  scope: '',
  signInResponse: () => {},
  getAccessToken: () => {},
  tokenStoragePolicy: {},
};
