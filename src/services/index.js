import vkapi from '@/api';

class AppService {
  constructor() {
    this.friendsAccessDeniedKey = 'isFriendsAccessDenied';
    this.isOnboardingFinishedKey = 'isOnboardingFinished';
  }

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
    const { [this.friendsAccessDeniedKey]: isFriendsAccessDenied } = await vkapi.storageGet([
      this.friendsAccessDeniedKey,
    ]);

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
      await vkapi.storageSet(this.friendsAccessDeniedKey, 'true');
    }
  };

  isOnboardingFinished = async () => {
    const { [this.isOnboardingFinishedKey]: isOnboardingFinished } = await vkapi.storageGet([
      this.isOnboardingFinishedKey,
    ]);

    return isOnboardingFinished === 'true';
  };
}

export default new AppService();
