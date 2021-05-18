import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'
import bridge from '@vkontakte/vk-bridge'

import { App } from './App'
import { reportWebVitals } from './reportWebVitals'

import '@vkontakte/vkui/dist/vkui.css'

// Init VK Mini App
bridge.send('VKWebAppInit')

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development') {
  import('./eruda').then(({ default: eruda }) => {})
}

if (process.env.NODE_ENV === 'production') {
  reportWebVitals()
}
