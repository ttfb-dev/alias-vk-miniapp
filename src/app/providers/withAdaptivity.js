import { AdaptivityProvider } from '@vkontakte/vkui';

export const withAdaptivity = (component) => <AdaptivityProvider>{component}</AdaptivityProvider>;
