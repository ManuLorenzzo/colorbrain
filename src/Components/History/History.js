import React from 'react'
import Row from '../Row/Row'
import Sequence from '../Sequence/Sequence'
import './History.css'

export default function History({ test }) {
  if (test?.history && test?.history?.length > 0) {
    return (
      <div className="history">
        {test.history.map((elem, i) => (
          <div key={i}>
            <div className="history__counter">{i + 1}</div>
            <Row values={elem.values} solution={test?.solution} colorsLength={test?.colors} />
          </div>
        ))}
        {!test.passed && !test.attempts && (
          <div className="history__solution">
            <div className="history__label">SOLUCIÓN</div>
            <Sequence values={test.solution} />
          </div>
        )}
      </div>
    )
  } else return <></>
}
