const hashParams = new URLSearchParams(window.location.hash.substring(1));
const searchParams = new URLSearchParams(window.location.search);

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const appId = parseInt(searchParams.get('vk_app_id'), 10) || 7856384;
const communityId = 204880239;
const roomId = hashParams.get('roomId') || null;
const tokenSettings = searchParams.get('vk_access_token_settings');

const userId = searchParams.get('vk_user_id') || (isDev && process.env.REACT_APP_VK_USER_ID) || '0';
const token = window.location.search.substring(1) || '';
const devUserIds = [267599954, 103484559];
const isDevUser = devUserIds.includes(parseInt(userId));

export const creds = { userId, token };
export const env = { isDev, isProd, isDevUser };
export const misc = { appId, communityId, roomId, tokenSettings };
