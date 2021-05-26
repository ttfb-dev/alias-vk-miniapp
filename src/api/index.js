import bridge from '@vkontakte/vk-bridge';

class API {
  constructor() {
    this.bridge = bridge;
  }

  init = () => {
    this.bridge.send('VKWebAppInit');
  };

  getAuthToken = async ({ app_id, scope }) => {
    scope = Array.isArray(scope) ? scope.join(',') : scope;

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

  openCodeReader = async () => {
    const { code_data } = await this.bridge.send('VKWebAppOpenCodeReader');

    return code_data;
  };
}

export default new API();
