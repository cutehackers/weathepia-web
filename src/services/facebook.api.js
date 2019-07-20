import loader from 'load-script';
import config from '../config';

let initialized = false
let queue = [];

export function facebook(callback) {
  if (initialized) {
    callback(window.FB)
    return;
  }

  queue.push(callback);
  if (!window.fbAsyncInit) {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: config.facebookAppId,
        autoLogAppEvents: true,
        status: true,
        xfbml: false,
        version: 'v3.3'
      });
      initialized = true;
      queue.forEach(cb => cb(window.FB));
      queue = null;
    };
    const script =
      window.localStorage.getItem('fb:debug') === 'true'
        ? 'xfbml.customerchat/debug.js'
        : 'xfbml.customerchat.js';
    loader(`https://connect.facebook.net/en_US/sdk/${script}`, {
      async: true
    });
  }
}
