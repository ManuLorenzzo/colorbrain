import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../Config/colors.json'
import changeValue from '../../MyMethods/changeValue'
import getResult from '../../MyMethods/getResult'
import {
  setReduxInputValues,
  setReduxSelectedBubble,
  setReduxShowStatistics,
  setReduxTests,
} from '../../Redux/Ducks/stateDuck'
import { addReduxStatistics } from '../../Redux/Ducks/statisticsDuck'
import Bubble from '../Bubble/Bubble'
import './Keyboard.css'
import ReactGA from 'react-ga'
import moment from 'moment'

export default function Keyboard() {
  const redux = useSelector(store => store)
  const state = redux?.state
  const cookies = redux?.cookies?.data
  const dispatch = useDispatch()
  const myTest = state?.tests[state.selectedTest]
  const selectedBubble = state?.selectedBubble
  const hasLost = !myTest?.attempts && !myTest?.passed

  const vibrate = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(10)
      setTimeout(() => {
        window.navigator.vibrate(0)
      }, 10)
    }
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
        let con = selectedBubble + 1
        while (auxArray.length < myTest.inputs) {
          if (con < myTest.inputs) auxArray.push({ value: values[con], index: con })
          else {
            con = 0
            auxArray.push({ value: values[con], index: con })
          }
          con++
        }
        const nextBubbleIndex = auxArray.find((elem, i) => !elem.value)?.index
        nextBubbleIndex > -1 && focusBubble(nextBubbleIndex)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const pushStatistics = tests => {
    dispatch(
      addReduxStatistics({
        date: moment().format('YYYY-MM-DD'),
        tests,
      })
    )
  }

  const handleSubmit = () => {
    vibrate()
    if (finished && myTest.attempts) {
      const result = getResult({
        values: state.inputValues,
        solution: myTest.solution,
        colorsLength: myTest.colors,
      })
      let testsCopy = JSON.parse(JSON.stringify(state.tests))
      const passed = Boolean(JSON.stringify(state.inputValues) === JSON.stringify(myTest.solution))

      testsCopy[state.selectedTest] = {
        ...myTest,
        history: [...myTest.history, { values: state.inputValues, result }],
        attempts: myTest.attempts - 1,
        passed,
      }

      if (
        (!passed && myTest.attempts - 1 < 1) ||
        (passed && state?.tests?.filter(test => !test.passed)?.length === 1)
      ) {
        pushStatistics(testsCopy)
        if (cookies?.analytics) {
          ReactGA.event({
            category: `Test`,
            action: `Test ${myTest.id + 1}` + passed ? 'superado' : 'fallado',
            value: passed ? myTest.attempts - 1 : myTest.initialAttempts,
            nonInteraction: true,
          })
        }

        setTimeout(() => {
          dispatch(setReduxShowStatistics(true))
        }, 2000)
      }

      dispatch(setReduxTests(testsCopy))
      dispatch(setReduxInputValues(Array(state?.inputValues?.length || 4).fill(null)))
      dispatch(setReduxSelectedBubble(0))
    }
  }
  if (!hasLost && !myTest?.passed) {
    return (
      <div className="keyboard" onClick={finished ? handleSubmit : () => {}}>
        <div className="keyboard__bubbles">
          {myTest &&
            colors &&
            colors.length &&
            !finished &&
            !hasLost &&
            [...new Array(myTest.colors)].map((elem, i) => {
              return (
                <Bubble
                  key={i}
                  color={colors[i].hex}
                  onClick={() => {
                    vibrate()
                    setColor(colors[i].id)
                  }}
                />
              )
            })}
        </div>
        {!hasLost && finished && <button className="keyboard__submit">✔</button>}
      </div>
    )
  } else return <></>
}
