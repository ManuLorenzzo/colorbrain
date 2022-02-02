import React, { useEffect, useState } from 'react'
import './Result.css'

export default function Result({ solution, values, isSubmitted }) {
  const [state, setState] = useState(['match', 'match', 'included'])

  useEffect(() => {
    if (isSubmitted && values.length === solution.length) {
      let aux = []
      values.forEach((value, i) => {
        if (solution[i] === value) return aux.push('match')
        if (solution.includes(value)) return aux.push('included')
        return
      })
      aux.sort((a, b) => {
        if (a === 'match' && b !== 'match') return 1
        if (b === 'match' && a !== 'match') return -1
        return 0
      })
    }
  }, [])

  console.log({ state })

  return (
    <div className="result">
      {state &&
        state.length > 0 &&
        state.map(elem => (
          <div className="result__elem">
            <div className="result__border"></div>
            {elem === 'match' && <div className="result__fill"></div>}
          </div>
        ))}
    </div>
  )
}
