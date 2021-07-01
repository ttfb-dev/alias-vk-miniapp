import { isNumeric } from '@vkontakte/vkjs';

import vkapi from '@/api';
import { capitalize } from '@/helpers';

import { misc } from '../config';

class AppService {
  #tokens = new Map();

  #getToken = (scope) => {
    return this.#tokens.get(scope);
  };

  #setToken = (scope, token) => {
    this.#tokens.set(scope, token);
  };

  initApp = async () => {
    await vkapi.initApp();
  };

  getAuthToken = async (scope) => {
    try {
      const { accessToken } = await vkapi.getAuthToken(misc.appId, scope);

      this.#setToken(scope, accessToken);

      return accessToken;
    } catch ({ error_data }) {
      const { error_code, error_reason } = error_data;

      if (error_code === 4 && error_reason === 'User denied') {
        const capScope = capitalize(scope, 'en');

        await vkapi.storageSet(`is${capScope}AccessDenied`, 'true');
      }
    }
  };

  getUserProfiles = async (ids) => {
    const scope = '';
    let accessToken;
    if (!this.#tokens.has(scope)) {
      accessToken = await this.getAuthToken(scope);
    } else {
      accessToken = this.#getToken(scope);
    }

    const userProfiles = await vkapi.callAPIMethod('users.get', {
      user_ids: ids.join(','),
      fields: 'photo_50',
      v: '5.131',
      access_token: accessToken,
    });

    return userProfiles;
  };

  getFriendProfiles = async () => {
    const { isFriendsAccessDenied } = await vkapi.storageGet(['isFriendsAccessDenied']);
    if (isFriendsAccessDenied === 'true') {
      return [];
    }

    const scope = 'friends';
    let accessToken;
    if (!this.#tokens.has(scope)) {
      accessToken = await this.getAuthToken(scope);
    } else {
      accessToken = this.#getToken(scope);
    }

    const friendIds = await vkapi.callAPIMethod('friends.getAppUsers', {
      v: '5.131',
      access_token: accessToken,
    });
    const friendProfiles = await this.getUserProfiles(friendIds);

    return friendProfiles;
  };

  setOnboardingFinished = () => {
    vkapi.storageSet('isOnboardingFinished', 'true');
  };

  isOnboardingFinished = async () => {
    const { isOnboardingFinished } = await vkapi.storageGet(['isOnboardingFinished']);

    return isOnboardingFinished === 'true';
  };

  getTooltipIndex = async (key) => {
    const { [key]: index } = await vkapi.storageGet([key]);

    return isNumeric(index) ? parseInt(index, 10) : 1;
  };

  setTooltipIndex = (key, index) => {
    vkapi.storageSet(key, String(index));
  };
}

export default new AppService();
