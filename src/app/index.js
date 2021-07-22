import { toast, ToastContainer } from 'react-toastify';

import { PagesContainer } from '@/pages';

import './init';

import { withProviders } from './providers';

import 'react-toastify/dist/ReactToastify.min.css';
import '@vkontakte/vkui/dist/vkui.css';
import './index.css';

const App = () => (
  <>
    <PagesContainer />
    <ToastContainer
      position={toast.POSITION.TOP_CENTER}
      draggablePercent={50}
      draggableDirection='y'
      limit={3}
      hideProgressBar={true}
      newestOnTop={true}
      closeButton={false}
    />
  </>
);

export default withProviders(App);
