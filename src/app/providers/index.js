import { compose } from 'redux';

import { withAdaptivity } from './withAdaptivity';
import { withClient } from './withClient';
import { withConfig } from './withConfig';
import { withRouter } from './withRouter';
import { withStore } from './withStore';

export const withProviders = compose(withRouter, withConfig, withAdaptivity, withClient, withStore);
