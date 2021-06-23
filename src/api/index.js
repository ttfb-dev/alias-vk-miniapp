import bridge from '@vkontakte/vk-bridge';

class API {
  constructor() {
    this.bridge = bridge;
  }

  init = () => {
    this.bridge.send('VKWebAppInit');
  };

  getAuthToken = async ({ app_id, scope }) => {
    const data = await this.bridge.send('VKWebAppGetAuthToken', { app_id, scope });

    return { access_token: data.access_token, scope: data.scope.split(',') };
  };

  callAPIMethod = async ({ method, params }) => {
    const { response } = await this.bridge.send('VKWebAppCallAPIMethod', {
      method,
      params,
    });

    return response;
  };

  share = ({ link }) => {
    this.bridge.send('VKWebAppShare', { link });
  };

  copyText = async ({ text }) => {
    const done = await this.bridge.send('VKWebAppCopyText', { text });

    return done;
  };

  openCodeReader = async () => {
    return await this.bridge.send('VKWebAppOpenCodeReader');
  };
}

export default new API();
