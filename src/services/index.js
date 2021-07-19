import { isNumeric } from '@vkontakte/vkjs';

import { capitalize } from '@/lib';
import vkapi from '@/shared/api';
import { misc } from '@/shared/config';

class App {
  #tokens = new Map();

  #getToken = async (scope) => {
    if (this.#tokens.has(scope)) {
      return this.#tokens.get(scope);
    } else {
      return await this.getAuthToken(scope);
    }
  };

  #setToken = (scope, token) => {
    this.#tokens.set(scope, token);
  };

  init = async () => {
    await vkapi.initApp();
  };

  getAuthToken = async (appScope) => {
    let denied = (scope) => {
      let capitalizeScope = capitalize(scope, 'en');

      window.localStorage.setItem(`is${capitalizeScope}AccessDenied`, true);
    };

    try {
      let { accessToken, scope: userScope } = await vkapi.getAuthToken(misc.appId, appScope);

      this.#setToken(userScope, accessToken);

      if (userScope === '') {
        let deniedScope = appScope.split(',');

        deniedScope.forEach((scope) => denied(scope));
      } else if (appScope !== userScope) {
        appScope = appScope.split(',');
        userScope = userScope.split(',');
        let deniedScope = appScope.filter((scope) => !userScope.includes(scope));

        deniedScope.forEach((scope) => denied(scope));
      }

      return accessToken;
    } catch ({ error_data }) {
      const { error_code, error_reason } = error_data;

      if (error_code === 4 && error_reason === 'User denied') {
        denied(appScope);
      }
    }
  };

  getFriendProfiles = async () => {
    const isFriendsAccessDenied = window.localStorage.getItem('isFriendsAccessDenied');
    if (isFriendsAccessDenied) {
      return [];
    }

    const scope = 'friends';
    const accessToken = await this.#getToken(scope);

    const friendIds = await vkapi.callAPIMethod('friends.getAppUsers', {
      v: '5.131',
      access_token: accessToken,
    });
    const friendProfiles = await vkapi.callAPIMethod('users.get', {
      user_ids: friendIds.join(','),
      fields: 'photo_50',
      v: '5.131',
      access_token: accessToken,
    });

    return friendProfiles;
  };

  setOnboardingFinished = () => {
    window.localStorage.setItem('isOnboardingFinished', true);
  };

  isOnboardingFinished = () => {
    const isOnboardingFinished = window.localStorage.getItem('isOnboardingFinished');

    return isOnboardingFinished === 'true';
  };

  getTooltipIndex = (key) => {
    const index = localStorage.getItem(key);

    return isNumeric(index) ? parseInt(index, 10) : 1;
  };

  setTooltipIndex = (key, index) => {
    window.localStorage.setItem(key, index);
  };
}

export default new App();
