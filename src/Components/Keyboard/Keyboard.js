import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../Config/colors.json'
import changeValue from '../../MyMethods/changeValue'
import getResult from '../../MyMethods/getResult'
import {
  setReduxInputValues,
  setReduxSelectedBubble,
  setReduxTests,
} from '../../Redux/Ducks/stateDuck'
import Bubble from '../Bubble/Bubble'
import './Keyboard.css'
import { useVibrate } from 'react-use'

export default function Keyboard() {
  const state = useSelector(store => store.state)
  const dispatch = useDispatch()
  const myTest = state?.tests[state.selectedTest]
  const selectedBubble = state?.selectedBubble

  const [vibrating, setVibrating] = useState(false)
  useVibrate(vibrating, [10], false)

  const vibrate = () => {
    setVibrating(true)
    setTimeout(() => {
      setVibrating(false)
    }, 100)
  }

  const finished = Boolean(!state?.inputValues.some(elem => elem == null) && selectedBubble == null)

  const focusBubble = i => dispatch(setReduxSelectedBubble(i))

  const setColor = id => {
    try {
      if (selectedBubble != null) {
        const values = changeValue({
          i: selectedBubble,
          newValue: id,
          values: state.inputValues,
          selectedBubble,
          setSelectedBubble: focusBubble,
        })
        if (!values) throw new Error('No values in setColor function')
        dispatch(setReduxInputValues(values))
        let auxArray = []
        let con = +1
        while (auxArray.length < myTest.inputs) {
          if (con < myTest.inputs) auxArray.push({ value: values[con], index: con })
          else {
            con = 0
            auxArray.push({ value: values[con], index: con })
          }
          con++
        }
        const nextBubbleIndex = auxArray.find((elem, i) => !elem.value)?.index
        console.log('Hago focus a burbuja', nextBubbleIndex)
        nextBubbleIndex > -1 && focusBubble(nextBubbleIndex)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = () => {
    vibrate()
    if (finished && myTest.attempts) {
      console.log('ete sech', state.inputValues, myTest.solution)
      const result = getResult({
        values: state.inputValues,
        solution: myTest.solution,
        colorsLength: myTest.colors,
      })
      console.log({ result })
      let testsCopy = JSON.parse(JSON.stringify(state.tests))

      testsCopy[state.selectedTest] = {
        ...myTest,
        history: [...myTest.history, { values: state.inputValues, result }],
        attempts: myTest.attempts - 1,
        passed: Boolean(JSON.stringify(state.inputValues) === JSON.stringify(myTest.solution)),
      }

      dispatch(setReduxTests(testsCopy))
      dispatch(setReduxInputValues(Array(state?.inputValues?.length || 4).fill(null)))
      dispatch(setReduxSelectedBubble(0))
    }
  }
  return (
    <div className="keyboard" onClick={finished ? handleSubmit : () => {}}>
      <div className="keyboard__bubbles">
        {myTest &&
          colors &&
          colors.length &&
          !finished &&
          [...new Array(myTest.colors)].map((elem, i) => {
            return (
              <Bubble
                key={i}
                color={colors[i].hex}
                onClick={() => {
                  setColor(colors[i].id)
                  vibrate()
                }}
              />
            )
          })}
      </div>
      {finished && <div className="keyboard__submit">✔</div>}
    </div>
  )
}
