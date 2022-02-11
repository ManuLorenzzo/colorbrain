import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import generateStore from './Redux/store'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'
import EasyToastContainer from './Components/EasyToast/EasyToastContainer'
import Header from './Components/Header/Header'
import Keyboard from './Components/Keyboard/Keyboard'
import Display from './Components/Display/Display'
import FillRedux from './Components/FillRedux'

function App() {
  const store = generateStore()
  // INICIALIZA AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])
  return (
    <Provider store={store}>
      <EasyToastContainer />

      <FillRedux />
      <div className="app">
        <Header />
        <Display />
        <Keyboard />
      </div>
    </Provider>
  )
}

export default App
