import vkapi from '@/api';
import { logger } from '@/helpers';

class AppService {
  constructor() {
    this.friendsAccessDeniedKey = 'isFriendsAccessDenied';
  }

  initApp = () => {
    vkapi.initApp();
  };

  getUserProfiles = async (ids) => {
    const { accessToken } = await vkapi.getAuthToken(7856384, 'friends');

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

    await logger.debug('getFriendProfiles', { isFriendsAccessDenied });

    if (isFriendsAccessDenied === 'true') {
      await logger.debug('getFriendProfiles already denied', { isFriendsAccessDenied });
      throw new Error('Already denied');
    }
    await logger.debug('getFriendProfiles allowed to ask', { isFriendsAccessDenied });

    const { accessToken } = await vkapi.getAuthToken(7856384, 'friends');

    const friendIds = await vkapi.callAPIMethod('friends.getAppUsers', {
      v: '5.131',
      access_token: accessToken,
    });
    const friendProfiles = await this.getUserProfiles(friendIds);

    return friendProfiles;
  };

  onGetFriendProfilesError = async () => {
    const { [this.friendsAccessDeniedKey]: isFriendsAccessDenied } = await vkapi.storageGet([
      this.friendsAccessDeniedKey,
    ]);
    await logger.debug('onGetFriendProfilesError', { isFriendsAccessDenied });

    if (isFriendsAccessDenied !== 'true') {
      await logger.debug('onGetFriendProfilesError already denied', { isFriendsAccessDenied });
      return;
    }
    await logger.debug('onGetFriendProfilesError set to denied', { isFriendsAccessDenied });

    await vkapi.storageSet(this.friendsGetStorageKey, String(true));
  };
}

export default new AppService();
