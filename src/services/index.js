import vkapi from '../api';

class App {
  constructor() {
    this.access_token = null;
  }

  init = () => {
    vkapi.init();
    vkapi.getAuthToken({ app_id: 7856384, scope: 'friends' }).then(({ access_token }) => {
      this.access_token = access_token;
    });
  };

  getUsers = async (userIds) => {
    const users = await vkapi.callAPIMethod({
      method: 'users.get',
      params: { user_ids: userIds.join(','), fields: 'photo_50', v: '5.131', access_token: this.access_token },
    });

    return users;
  };

  getFriends = async () => {
    const friendAppUsers = await vkapi.callAPIMethod({
      method: 'friends.getAppUsers',
      params: { v: '5.131', access_token: this.access_token },
    });
    const friends = await this.getUsers(friendAppUsers);

    return friends;
  };
}

export default new App();
