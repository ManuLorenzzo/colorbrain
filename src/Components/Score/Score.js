import React from 'react'
import './Score.css'

export default function Score({ state, test }) {
  if (state && test && test.passed) {
    const generateCopy = () => {
      let copy = ''
      test.history.forEach(elem => {
        const results = Object.values(elem.result)
        results.forEach(res => {
          if (res === 1) return (copy += '⚪ ')
          if (res === 2) return (copy += '⚫ ')
        })
      })
      console.log(copy)
    }
    return (
      <div className="score__passed">
        <span>
          ¡Genial! Has resuelto el test #{state.selectedTest} en {test.history.length}{' '}
          {test.history.length > 1 ? 'intentos' : 'intento'}
        </span>
        <button className="score__copy" onClick={generateCopy}>
          COPIAR RESULTADOS
        </button>
      </div>
    )
  } else return <></>
}
