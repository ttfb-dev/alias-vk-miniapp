import React, { StrictMode } from 'react';
import { render } from 'react-dom';

import App from '@/app';

const appRoot = document.getElementById('root');

render(<StrictMode>{App}</StrictMode>, appRoot);
