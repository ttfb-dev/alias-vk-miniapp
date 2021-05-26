import vkapi from '../api';

const app = {
  init: () => {
    vkapi.init();
  },

  getFriends: async () => {
    const { access_token } = await vkapi.getAuthToken({ app_id: 7856384, scope: 'friends' });
    const friendAppUsers = await vkapi.callAPIMethod({
      method: 'friends.getAppUsers',
      params: { v: '5.131', access_token },
    });
    const friends = await vkapi.callAPIMethod({
      method: 'users.get',
      params: { user_ids: friendAppUsers.join(','), fields: 'photo_50', v: '5.131', access_token },
    });

    return friends;
  },

  getUsers: async (userIds) => {
    const { access_token } = await vkapi.getAuthToken({ app_id: 7856384, scope: 'friends' });
    const users = await vkapi.callAPIMethod({
      method: 'users.get',
      params: { user_ids: userIds.join(','), fields: 'photo_50', v: '5.131', access_token },
    });

    return users;
  },
};

export { app };
