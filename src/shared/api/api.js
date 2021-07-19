import { VKBridgeProvider } from './provider';

export class VKMiniAppAPI extends VKBridgeProvider {
  initApp = async () => {
    await this.bridge.send('VKWebAppInit');
  };

  onUpdateConfig = (callback) => this.subscribe('VKWebAppUpdateConfig', callback);

  onViewHide = (callback) => this.subscribe('VKWebAppViewHide', callback);

  onViewRestore = (callback) => this.subscribe('VKWebAppViewRestore', callback);

  onLocationChanged = (callback) => this.subscribe('VKWebAppLocationChanged', callback);

  onAccelerometerChanged = (callback) =>
    this.subscribe(
      'VKWebAppAccelerometerChanged',
      callback,
      () => this.bridge.send('VKWebAppAccelerometerStart'),
      () => this.bridge.send('VKWebAppAccelerometerStop'),
    );

  onGyroscopeChanged = (callback) =>
    this.subscribe(
      'VKWebAppGyroscopeChanged',
      callback,
      () => this.bridge.send('VKWebAppGyroscopeStart'),
      () => this.bridge.send('VKWebAppGyroscopeStop'),
    );

  onDeviceMotionChanged = (callback) =>
    this.subscribe(
      'VKWebAppDeviceMotionChanged',
      callback,
      () => this.bridge.send('VKWebAppDeviceMotionStart'),
      () => this.bridge.send('VKWebAppDeviceMotionStop'),
    );

  callAPIMethod = async (method, params) => {
    const { response } = await this.bridge.send('VKWebAppCallAPIMethod', {
      method,
      params,
    });

    return response;
  };

  openApp = async (appId, location) => {
    await this.bridge.send('VKWebAppOpenApp', {
      app_id: appId,
      location,
    });
  };

  closeApp = async (status, payload) => {
    await this.bridge.send('VKWebAppClose', { status, payload });
  };

  getAuthToken = async (appId, scope) => {
    const strScope = Array.isArray(scope) ? scope.join(',') : scope;

    const data = await this.bridge.send('VKWebAppGetAuthToken', {
      app_id: appId,
      scope: strScope !== null ? strScope : '',
    });

    return {
      accessToken: data.access_token,
      scope: data.scope,
    };
  };

  getGeodata = async () => {
    const { available, lat, long } = await this.bridge.send('VKWebAppGetGeodata');

    return {
      isAvailable: !!available,
      lat: parseFloat(lat),
      long: parseFloat(long),
    };
  };

  getUserInfo = async () => {
    return await this.bridge.send('VKWebAppGetUserInfo');
  };

  openCodeReader = async () => {
    return await this.bridge.send('VKWebAppOpenCodeReader');
  };

  openContacts = async () => {
    const { phone, first_name, last_name } = await this.bridge.send('VKWebAppOpenContacts');

    return {
      phone,
      firstName: first_name,
      lastName: last_name,
    };
  };

  share = (link) => {
    this.bridge.send('VKWebAppShare', { link });
  };

  addAppToFavorites = async () => {
    await this.bridge.send('VKWebAppAddToFavorites');
  };

  allowNotifications = async () => {
    await this.bridge.send('VKWebAppAllowNotifications');
  };

  denyNotifications = async () => {
    await this.bridge.send('VKWebAppDenyNotifications');
  };

  joinCommunity = async (communityId) => {
    await this.bridge.send('VKWebAppJoinGroup', { group_id: communityId });
  };

  resizeWindow = async (width, height) => {
    return this.bridge.send('VKWebAppResizeWindow', { width, height });
  };

  scrollTo = async (top, speed = 0) => {
    return this.bridge.send('VKWebAppScroll', { top, speed });
  };

  setLocation = async (location) => {
    await this.bridge.send('VKWebAppSetLocation', { location });
  };

  setViewSettings = async (statusBarStyle, actionBarColor, navigationBarColor) => {
    await this.bridge.send('VKWebAppSetViewSettings', {
      status_bar_style: statusBarStyle,
      action_bar_color: actionBarColor,
      navigation_bar_color: navigationBarColor,
    });
  };

  enableSwipeBack = async () => {
    await this.bridge.send('VKWebAppEnableSwipeBack');
  };

  disableSwipeBack = async () => {
    await this.bridge.send('VKWebAppDisableSwipeBack');
  };

  storageGet = async (keys) => {
    const data = await this.bridge.send('VKWebAppStorageGet', { keys });

    return data?.keys.length > 0 ? data.keys.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}) : {};
  };

  storageSet = async (key, value) => {
    await this.bridge.send('VKWebAppStorageSet', { key, value });
  };

  tapticImpactOccurred = async (power = 'medium') => {
    await this.bridge.send('VKWebAppTapticImpactOccurred', { style: power });
  };

  tapticNotificationOccurred = async (type) => {
    await this.bridge.send('VKWebAppTapticNotificationOccurred', { type });
  };

  tapticSelectionChanged = async () => {
    await this.bridge.send('VKWebAppTapticSelectionChanged');
  };
}
