import { RouterContext } from '@happysanta/router';

import { router } from '../router';

export const withRouter = (component) => <RouterContext.Provider value={router}>{component}</RouterContext.Provider>;
