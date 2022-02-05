import React from 'react'
import Result from '../Result/Result'
import Sequence from '../Sequence/Sequence'

export default function InputRow({ values, solution, focusBubble, selectedBubble }) {
  return (
    <>
      <div className="row input-row">
        <Sequence
          values={values}
          editable={true}
          focusBubble={focusBubble}
          selectedBubble={selectedBubble}
        />
        <Result solution={solution} values={values} show={false} />
      </div>
    </>
  )
}
