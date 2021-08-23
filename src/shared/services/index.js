import { isNumeric } from '@vkontakte/vkjs';

import vkapi from '@/shared/api';
import { misc } from '@/shared/config';
import { capitalize } from '@/shared/lib';

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
    let denied = async (scope) => {
      let capitalizeScope = capitalize(scope, 'en');

      await vkapi.storageSet(`is${capitalizeScope}AccessDenied`, true);
    };

    try {
      let { accessToken, scope: userScope } = await vkapi.getAuthToken(misc.appId, appScope);

      this.#setToken(userScope, accessToken);

      if (userScope === '') {
        let deniedScope = appScope.split(',');

        await deniedScope.forEach(async (scope) => await denied(scope));
      } else if (appScope !== userScope) {
        appScope = appScope.split(',');
        userScope = userScope.split(',');
        let deniedScope = appScope.filter((scope) => !userScope.includes(scope));

        await deniedScope.forEach(async (scope) => await denied(scope));
      }

      return accessToken;
    } catch ({ error_data }) {
      const { error_code, error_reason } = error_data;

      if (error_code === 4 && error_reason === 'User denied') {
        await denied(appScope);
      }
    }
  };

  getFriendProfiles = async () => {
    const isFriendsAccessDenied = await vkapi.storageGet('isFriendsAccessDenied');
    if (isFriendsAccessDenied === 'true') {
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

  setOnboardingFinished = async () => {
    await vkapi.storageSet('isOnboardingFinished', true);
  };

  isOnboardingFinished = async () => {
    const isOnboardingFinished = await vkapi.storageGet('isOnboardingFinished');

    return isOnboardingFinished === 'true';
  };

  getTooltipIndex = async (key) => {
    const index = await vkapi.storageGet(key);

    return isNumeric(index) ? parseInt(index, 10) : 1;
  };

  setTooltipIndex = async (key, index) => {
    await vkapi.storageSet(key, index);
  };

  cleanStorage = async () => {
    const keys = ['isOnboardingFinished', 'isFriendsAccessDenied', 'roomTooltipIndex', 'homeTooltipIndex'];

    await keys.forEach(async (key) => {
      await vkapi.storageSet(key, null);
    });
  };

  registerRestoreCallback = async () => {
    await vkapi.onViewRestore(() => {
      // eslint-disable-next-line no-console
      console.log('roomId', misc.roomId);
    });
  };
}

export default new App();
