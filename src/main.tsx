import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
// import './index.css'
import { Provider } from 'react-redux'
import store from './app/store.ts'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='react-vite-site/'>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
