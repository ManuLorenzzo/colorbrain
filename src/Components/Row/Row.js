import React from 'react'
import Result from '../Result/Result'
import Sequence from '../Sequence/Sequence'

export default function Row({ values, solution }) {
  console.log(values, 'EN ROWWW')
  return (
    <div className="row">
      <Sequence values={values} editable={false} />
      <Result solution={solution} values={values} isSubmitted={true} />
    </div>
  )
}
