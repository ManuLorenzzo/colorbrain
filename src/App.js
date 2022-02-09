import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import generateStore from './Redux/store'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'
import Attempts from './Components/Attempts/Attempts'
import Header from './Components/Header/Header'
import History from './Components/History/History'
import Keyboard from './Components/Keyboard/Keyboard'
import Result from './Components/Result/Result'
import Sequence from './Components/Sequence/Sequence'
import InputRow from './Components/InputRow/InputRow'
import Display from './Components/Display/Display'
import testsConfig from './Config/tests.json'
import FillRedux from './Components/FillRedux'
import { useSelector } from 'react-redux'

function App() {
  const bubblesLength = 4
  const initialValues = [...Array(bubblesLength).fill(null)]
  const [values, setValues] = useState(initialValues)
  const [history, setHistory] = useState([])
  const [selectedBubble, setSelectedBubble] = useState(0)
  const [finished, setFinished] = useState(false)
  const [passed, setPassed] = useState(false)
  const [solution, setSolution] = useState(null)
  const [attempts, setAttempts] = useState(8)

  const store = generateStore()
  const config = testsConfig?.find(elem => elem.id === store?.state?.testSelected || elem.id === 0)
  const changeValue = (i, newValue) => {
    console.log('Cambio valor de burbuja', i, ' ', newValue)
    try {
      if (i >= values.length)
        throw new Error('El nuevo valor tiene un índice mayor que la longitud del array')

      const aux = JSON.parse(JSON.stringify(values))
      aux[i] = newValue
      setValues(aux)
      if (!aux.some(elem => elem == null) && selectedBubble === i) {
        setSelectedBubble(null)
      }

      return aux
    } catch (err) {
      console.error(err)
    }
  }

  const focusBubble = i => {
    console.log('Entro focus burbuja ', i)
    try {
      if (i >= bubblesLength)
        throw new Error('La burbuja seleccionada tiene un índice mayor que la longitud del array')
      setSelectedBubble(i)
    } catch (err) {
      console.error(err)
    }
  }

  const setColor = id => {
    if (selectedBubble != null) {
      const lastValues = changeValue(selectedBubble, id)
      let auxArray = []
      let con = selectedBubble + 1
      while (auxArray.length < bubblesLength) {
        if (con < bubblesLength) auxArray.push({ value: lastValues[con], index: con })
        else {
          con = 0
          auxArray.push({ value: lastValues[con], index: con })
        }
        con++
      }
      const nextBubbleIndex = auxArray.find((elem, i) => !elem.value)?.index
      console.log('Hago focus a burbuja', nextBubbleIndex)
      nextBubbleIndex > -1 && focusBubble(nextBubbleIndex)
    }
  }
  console.log('INTENTOS -->', attempts)

  const handleSubmit = () => {
    if (values.length === bubblesLength && finished) {
      setHistory(prevState => [...prevState, values])
      if (JSON.stringify(values) === JSON.stringify(solution)) {
        alert('Has pasado el test')
        setPassed(true)
      } else {
        if (attempts > 0) setAttempts(attempts - 1)
        else alert('No te quedan intentos :(')
      }
      const lastTest = document.querySelectorAll('.row')
      console.log({ lastTest })
      setValues(initialValues)
      setSelectedBubble(0)
    }
  }

  useEffect(() => {
    setFinished(Boolean(!values.some(elem => elem == null) && selectedBubble == null))
  }, [values, selectedBubble])

  useEffect(() => {
    if (!solution) {
      setSolution(initialValues.map(el => Math.ceil(Math.random() * bubblesLength)))
    }
  }, [solution, initialValues])

  console.log('Solution -->', solution)
  console.log('Values -->', values)
  console.log('SelectedBubble ->', selectedBubble)
  // INICIALIZA AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])
  return (
    <Provider store={store}>
      <FillRedux />
      <div className="app">
        <Header />
        <Display config={config} />
        <section className="display">
          <Attempts attempts={attempts} passed={passed} />
          <History history={history} solution={solution} />
          {!passed && attempts > 0 && (
            <InputRow
              values={values}
              focusBubble={focusBubble}
              selectedBubble={selectedBubble}
              solution={solution}
            />
          )}
        </section>
        <Keyboard
          bubblesLength={bubblesLength}
          setColor={setColor}
          finished={finished}
          handleSubmit={handleSubmit}
        />
        {!passed && attempts === 0 && (
          <button onClick={() => window.location.reload()}>Reintentar</button>
        )}
      </div>
    </Provider>
  )
}

export default App
