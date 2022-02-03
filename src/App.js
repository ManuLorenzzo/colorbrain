import React, { useState, useEffect } from 'react'
import './App.css'
import History from './Components/History/History'
import Keyboard from './Components/Keyboard/Keyboard'
import Result from './Components/Result/Result'
import Sequence from './Components/Sequence/Sequence'

function App() {
  const bubblesLength = 4
  const initialValues = [...Array(bubblesLength).fill(null)]
  const [values, setValues] = useState(initialValues)
  const [history, setHistory] = useState([])
  const [selectedBubble, setSelectedBubble] = useState(0)
  const [finished, setFinished] = useState(false)
  const [passed, setPassed] = useState(false)
  const [solution, setSolution] = useState(null)
  const [attemps, setAttemps] = useState(6)

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
      nextBubbleIndex && focusBubble(nextBubbleIndex)
    }
  }
  console.log('INTENTOS -->', attemps)

  const handleSubmit = () => {
    if (values.length === bubblesLength && finished) {
      setHistory(prevState => [...prevState, values])
      if (JSON.stringify(values) === JSON.stringify(solution)) {
        alert('Has pasado el test')
        setPassed(true)
      } else {
        if (attemps > 0) setAttemps(attemps - 1)
        else alert('No te quedan intentos :(')
      }
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
  console.log('SOLUTION --> ', solution)

  console.log(values)
  return (
    <div className="colorset">
      <History history={history} solution={solution} />
      {!passed && attemps > 0 && (
        <div className="row">
          <Sequence values={values} focusBubble={focusBubble} selectedBubble={selectedBubble} />
          <Result values={values} solution={solution} show={false} />
        </div>
      )}
      <Keyboard
        bubblesLength={bubblesLength}
        setColor={setColor}
        finished={finished}
        handleSubmit={handleSubmit}
      />
      {!passed && attemps === 0 && (
        <button onClick={() => window.location.reload()}>Reintentar</button>
      )}
    </div>
  )
}

export default App
