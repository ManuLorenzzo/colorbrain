import React from 'react'
import Row from '../Row/Row'
import './History.css'

export default function History({ test }) {
  if (test?.history && test?.history?.length > 0) {
    return (
      <div className="history">
        {test.history.map((elem, i) => (
          <div>
            <div className="history__counter">{i + 1}</div>
            <Row values={elem.values} solution={test?.solution} colorsLength={test?.colors} />
          </div>
        ))}
      </div>
    )
  } else return <></>
}
