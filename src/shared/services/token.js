import vkapi from '@/shared/api';
import { misc } from '@/shared/config';
import { capitalize } from '@/shared/lib';

export const tokenService = () => {
  const tokens = new Map();

  const setToken = (scope, token) => {
    tokens.set(scope, token);
  };

  const setDeniedScope = (scope) => {
    const capitalizeScope = capitalize(scope, 'en');

    window.localStorage.setItem(`is${capitalizeScope}AccessDenied`, true);
  };

  return {
    getAuthToken: async (appScope) => {
      try {
        let { accessToken, scope: userScope } = await vkapi.getAuthToken(misc.appId, appScope);

        setToken(userScope, accessToken);

        if (userScope === '') {
          const deniedScope = appScope.split(',');

          deniedScope.forEach((scope) => setDeniedScope(scope));
        } else if (appScope !== userScope) {
          appScope = appScope.split(',');
          userScope = userScope.split(',');
          const deniedScope = appScope.filter((scope) => !userScope.includes(scope));

          deniedScope.forEach((scope) => setDeniedScope(scope));
        }

        return accessToken;
      } catch ({ error_data }) {
        const { error_code, error_reason } = error_data;

        if (error_code === 4 && error_reason === 'User denied') {
          setDeniedScope(appScope);
        }
      }
    },
  };
};
