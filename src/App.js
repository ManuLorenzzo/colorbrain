import React from 'react'
import { Provider } from 'react-redux'
import generateStore from './Redux/store'
import './App.css'
import EasyToastContainer from './Components/EasyToast/EasyToastContainer'
import Header from './Components/Header/Header'
import Keyboard from './Components/Keyboard/Keyboard'
import Display from './Components/Display/Display'
import FillRedux from './Components/FillRedux'

function App() {
  const store = generateStore()

  return (
    <Provider store={store}>
      <EasyToastContainer />

      <FillRedux />
      <div className="app">
        <div className="app-content">
          <Header />
          <Display />
          <Keyboard />
        </div>
      </div>
    </Provider>
  )
}

export default App
