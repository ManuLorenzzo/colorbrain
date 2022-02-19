import React from 'react'
import './Attempts.css'

export default function Attempts({ test, selectedTest }) {
  if (test && !test.passed & (test.attempts > 0)) {
    return (
      <div className={test.attempts > 2 ? 'attempts' : 'attempts attempts--warn'}>
        {test.attempts > 1 ? (
          <div>
            Quedan <span>{test.attempts}</span> intentos
          </div>
        ) : (
          <div>
            Queda <span>{test.attempts}</span> intento
          </div>
        )}
        {selectedTest && <div>Test #{selectedTest}</div>}
      </div>
    )
  } else if (test && !test?.passed && test?.attempts === 0) {
    return <div className="attempts">🙄 Vaya, has fallado el test</div>
  } else return <></>
}
