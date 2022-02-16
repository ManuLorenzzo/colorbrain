import React from 'react'
import { useSelector } from 'react-redux'
import Result from '../Result/Result'
import Sequence from '../Sequence/Sequence'

export default function InputRow({ state, test }) {
  console.log('inputRow ->', state, test)
  return (
    <>
      <div className="row input-row">
        <Sequence
          values={state?.inputValues}
          editable={true}
          selectedBubble={state?.selectedBubble}
        />
        <Result solution={test?.solution} values={state?.values} show={false} />
      </div>
    </>
  )
}
