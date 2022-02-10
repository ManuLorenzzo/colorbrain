import React from 'react'
import { useSelector } from 'react-redux'
import Attempts from '../Attempts/Attempts'
import History from '../History/History'
import InputRow from '../InputRow/InputRow'
import Score from '../Score/Score'

export default function Display() {
  const state = useSelector(store => store.state)
  const test = state?.tests[state.selectedTest]

  return (
    <section className="display">
      <Attempts test={test} selectedTest={state?.selectedTest + 1} />
      <History test={test} />
      {!test?.passed && test?.attempts > 0 && <InputRow state={state} test={test} />}
      <Score state={state} test={test} />
    </section>
  )
}
