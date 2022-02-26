import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import generateStore from './Redux/store'
import './App.css'
import EasyToastContainer from './Components/EasyToast/EasyToastContainer'
import Header from './Components/Header/Header'
import Keyboard from './Components/Keyboard/Keyboard'
import Display from './Components/Display/Display'
import FillRedux from './Components/FillRedux'
import ReactGA from 'react-ga'

function App() {
  const store = generateStore()

  ReactGA.initialize('UA-221029271-1')

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
    ReactGA.event({
      category: 'Test',
      action: `Testing`,
      nonInteraction: true,
    })
  })

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
