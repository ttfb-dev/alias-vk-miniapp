import { isNumeric } from '@vkontakte/vkjs';

import vkapi from '@/api';

class AppService {
  initApp = () => {
    vkapi.initApp();
  };

  getUserProfiles = async (ids) => {
    const { accessToken } = await vkapi.getAuthToken(7856384, '');

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

    try {
      const { accessToken } = await vkapi.getAuthToken(7856384, 'friends');

      const friendIds = await vkapi.callAPIMethod('friends.getAppUsers', {
        v: '5.131',
        access_token: accessToken,
      });
      const friendProfiles = await this.getUserProfiles(friendIds);

      return friendProfiles;
    } catch (e) {
      await vkapi.storageSet('isFriendsAccessDenied', 'true');
    }
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
