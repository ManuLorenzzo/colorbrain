import React, { useState } from 'react'
import './App.css'
import Keyboard from './Components/Keyboard/Keyboard'
import Sequence from './Components/Sequence/Sequence'

function App() {
  const bubblesLength = 4
  const [values, setValues] = useState([...Array(bubblesLength).fill(null)])
  const [selectedBubble, setSelectedBubble] = useState(0)

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
      //changeValue(i, null)
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

  console.log(values)
  return (
    <div className="colorset">
      <Sequence values={values} focusBubble={focusBubble} selectedBubble={selectedBubble} />
      <Keyboard bubblesLength={bubblesLength} setColor={setColor} />
    </div>
  )
}

export default App
