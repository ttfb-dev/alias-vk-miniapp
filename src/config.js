import { queryStringParse } from '@/helpers';

const hashParams = queryStringParse(window.location.hash);
const searchParams = queryStringParse(window.location.search);

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const roomId = parseInt(hashParams.roomId, 10);
const userId = searchParams.vk_user_id || (isDev && process.env.REACT_APP_VK_USER_ID) || '0';
const token = window.location.search.substring(1) ?? '';

export const creds = { userId, token };
export const env = { isDev, isProd };
export const misc = { roomId };
