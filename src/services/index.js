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
    const storageKey = 'isFriendsGetAppUsersDenied';
    const isFriendsGetAppUsersDenied = await vkapi.storageGet([storageKey])[storageKey];
    if (isFriendsGetAppUsersDenied === 'true') {
      throw new Error('Already denied');
    }

    const { accessToken } = await vkapi.getAuthToken(7856384, 'friends');

    const friendIds = await vkapi.callAPIMethod('friends.getAppUsers', {
      v: '5.131',
      access_token: accessToken,
    });
    const friendProfiles = await this.getUserProfiles(friendIds);

    return friendProfiles;
  };

  onGetFriendProfilesError = async () => {
    const storageKey = 'isFriendsGetAppUsersDenied';
    const isFriendsGetAppUsersDenied = await vkapi.storageGet([storageKey])[storageKey];
    if (isFriendsGetAppUsersDenied) {
      return;
    }
    await await vkapi.storageSet(storageKey, String(true));
  };

  setRoute = async (route) => {
    const location = `location=${JSON.stringify(route)}`;

    await vkapi.setLocation(location);
  };
}

export default new AppService();
