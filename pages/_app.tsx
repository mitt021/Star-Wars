import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import store, { persister } from 'redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ToastContainer
          position="top-right"
          closeOnClick
          className="toaster-container"
          hideProgressBar={true}
          newestOnTop={false}
        />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
