import React from 'react'
import Row from '../Row/Row'
import './History.css'

export default function History({ history, solution }) {
  return (
    history &&
    history.length > 0 && (
      <div className="history">
        {history.map(elem => (
          <Row values={elem} solution={solution} />
        ))}
      </div>
    )
  )
}
