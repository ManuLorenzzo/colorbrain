import React from 'react'
import { Provider } from 'react-redux'
import generateStore from './Redux/store'
import './App.css'
import EasyToastContainer from './Components/EasyToast/EasyToastContainer'
import Header from './Components/Header/Header'
import Keyboard from './Components/Keyboard/Keyboard'
import Display from './Components/Display/Display'
import FillRedux from './Components/FillRedux'
import AdSense from 'react-adsense'

function App() {
  const store = generateStore()
  // INICIALIZA AOS
  return (
    <Provider store={store}>
      <EasyToastContainer />

      <FillRedux />
      <div className="app">
        <Header />
        <Display />
        <Keyboard />

        <AdSense.Google
          client="ca-pub-4668268094080615"
          slot="7806394673"
          style={{ display: 'block' }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        />
      </div>
    </Provider>
  )
}

export default App
