import vkapi from '../api';

import { store } from '../store';

class App {
  init = () => {
    vkapi.init();
  };

  getUserProfiles = async (ids) => {
    const { access_token } = await vkapi.getAuthToken({ app_id: 7856384, scope: 'friends' });

    const userProfiles = await vkapi.callAPIMethod({
      method: 'users.get',
      params: { user_ids: ids.join(','), fields: 'photo_50', v: '5.131', access_token },
    });

    return userProfiles;
  };

  getFriendProfiles = async () => {
    const { access_token } = await vkapi.getAuthToken({ app_id: 7856384, scope: 'friends' });

    const friendIds = await vkapi.callAPIMethod({
      method: 'friends.getAppUsers',
      params: { v: '5.131', access_token },
    });
    const friendProfiles = await this.getUserProfiles(friendIds);

    store.dispatch.sync({ type: 'log/send', level: 'debug', data: { friendIds, friendProfiles } });

    return friendProfiles;
  };
}

export default new App();
