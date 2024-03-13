import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/store.js'
import { SnackbarProvider } from './components/util/SnackBarContext.jsx'
import GlobalSnackBar from './components/util/GlobalSnackBar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SnackbarProvider>
    <Provider store={store}>
      <App />   
      <GlobalSnackBar />
    </Provider>
  </SnackbarProvider>
)
