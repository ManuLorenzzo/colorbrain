import React, { useEffect, useState } from 'react'
import './Result.css'
import SadIcon from '../../Svg/SadIcon.svg'
import { motion } from 'framer-motion'

export default function Result({ solution, values, show = true }) {
  const [state, setState] = useState([])

  const addMatchToStatus = (status, id, alerts) => {
    console.log('ENTRO EN addMatch. id -> ', id, ' alerts -> ', alerts, ' status -> ', status)
    try {
      if (alerts > 0) {
        status.push({
          id,
          result: 1,
        })
      } else {
        const index = status.findIndex(elem => elem.id === id && elem.result === 2)
        if (index !== -1) {
          status[index].result = 0
        }
        status.push({
          id,
          result: 1,
        })
      }
      console.log({ status }, 'Retorno status en addMatch')
      return status
    } catch (err) {
      console.error(err)
    }
  }

  const addIncludedToStatus = (status, id, alerts) => {
    console.log('ENTRO EN included. id -> ', id, ' alerts -> ', alerts, ' status -> ', status)
    try {
      if (alerts > 0) {
        status.push({
          id,
          result: 2,
        })
      }
      console.log({ status }, 'Retorno status en addMatch')
      return status
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (values.length === solution?.length) {
      let alerts = solution.map((el, index) => {
        const found = solution.filter(elem => elem === index + 1)
        return {
          id: index + 1,
          counter: found.length,
        }
      })
      let status = []
      values.forEach((value, i) => {
        const alertIndex = alerts.findIndex(elem => elem.id === value)
        if (alertIndex !== -1) {
          if (solution[i] === value) {
            console.log('EL COLOR ', value, 'HA HECHO MATCH EN LA SECUENCIA EN LA POSICIÓN', i)
            status = addMatchToStatus(status, value, alerts[alertIndex].counter)
            console.log('STATUS: ', status)
            alerts[alertIndex].counter = alerts[alertIndex].counter - 1
            return
          }
          if (solution.includes(value)) {
            console.log('EL COLOR ', value, 'ESTÁ INCLUÍDO EN LA SECUENCIA')
            status = addIncludedToStatus(status, value, alerts[alertIndex].counter)
            console.log('STATUS: ', status)
            alerts[alertIndex].counter = alerts[alertIndex].counter - 1
            return
          }
        }
        return
      })
      status = status.filter(elem => elem.result)
      status.sort((a, b) => a.result - b.result)
      setState(status.length ? status : null)
    }
  }, [values, solution])
  console.log({ state })

  return (
    <div className="result">
      {show &&
        state &&
        state.length > 0 &&
        state.map(elem => (
          <div className="result__elem">
            <motion.div
              className="result__border"
              animate={{
                scale: [1, 1.3, 1.3, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ['20%', '20%', '50%', '50%'],
              }}
            ></motion.div>
            {elem.result === 1 && <div className="result__fill"></div>}
          </div>
        ))}
      {show && !state && (
        <motion.div
          className="result__elem"
          animate={{
            scale: [1, 1.5, 1.5, 1, 1],
            rotate: [0, 360, 0],
            borderRadius: ['20%', '20%', '50%', '50%'],
          }}
        >
          <img src={SadIcon} alt="info" />
        </motion.div>
      )}
      {!show && <span>✘</span>}
    </div>
  )
}
