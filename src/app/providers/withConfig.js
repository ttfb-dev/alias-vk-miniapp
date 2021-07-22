import { ConfigProvider } from '@vkontakte/vkui';

export const withConfig = (component) => <ConfigProvider>{component}</ConfigProvider>;
