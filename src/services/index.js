import vkapi from '../api';

class App {
  init = () => {
    vkapi.init();
  };

  getUsers = async (userIds) => {
    const { access_token } = await vkapi.getAuthToken({ app_id: 7856384, scope: 'friends' });

    const users = await vkapi.callAPIMethod({
      method: 'users.get',
      params: { user_ids: userIds.join(','), fields: 'photo_50', v: '5.131', access_token },
    });

    return users;
  };

  getFriendsIn = async () => {
    const { access_token } = await vkapi.getAuthToken({ app_id: 7856384, scope: 'friends' });

    const friendIdsIn = await vkapi.callAPIMethod({
      method: 'friends.getAppUsers',
      params: { v: '5.131', access_token },
    });
    const friendsIn = await this.getUsers(friendIdsIn);

    return friendsIn;
  };
}

export default new App();
