import React, { useEffect, useState } from 'react'
import './Result.css'

export default function Result({ solution, values, show = true }) {
  const [state, setState] = useState([])

  useEffect(() => {
    if (values.length === solution?.length) {
      let alerts = solution.map((el, index) => {
        const found = solution.filter(elem => elem === index + 1)
        return {
          id: index + 1,
          counter: found.length,
        }
      })
      console.log({ alerts })
      let aux = []
      values.forEach((value, i) => {
        console.log('ENTRO AL COLOR', value)
        const alertIndex = alerts.findIndex(elem => elem.id === value)
        if (alertIndex !== -1 && alerts[alertIndex].counter > 0) {
          console.log('Quedan ', alerts[alertIndex].counter, 'intentos para ', value)
          alerts[alertIndex].counter = alerts[alertIndex].counter - 1
          if (solution[i] === value) {
            console.log('EL COLOR ', value, 'HA HECHO MATCH EN LA SECUENCIA EN LA POSICIÓN', i)
            return aux.push(1)
          }
          if (solution.includes(value)) {
            console.log('EL COLOR ', value, 'ESTÁ INCLUÍDO EN LA SECUENCIA EN LA POSICIÓN', i)

            return aux.push(2)
          }
        }
        console.log('NO QUEDAN INTENTOS PARA EL COLOR', value)
        return
      })
      aux.sort()
      setState(aux)
    }
  }, [values, solution])

  return (
    <div className="result">
      {show &&
        state &&
        state.length > 0 &&
        state.map(elem => (
          <div className="result__elem">
            <div className="result__border"></div>
            {elem === 1 && <div className="result__fill"></div>}
          </div>
        ))}
      {!show && <span>✘</span>}
    </div>
  )
}
