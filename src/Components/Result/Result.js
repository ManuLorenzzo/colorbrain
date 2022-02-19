import React, { useEffect, useState } from 'react'
import './Result.css'
import SadIcon from '../../Svg/SadIcon.svg'
import { motion } from 'framer-motion'
import getResult from '../../MyMethods/getResult'

export default function Result({ solution, values, colorsLength, show = true }) {
  const [state, setState] = useState([])
  let gridTemplateColumns = ''

  Array(Math.ceil(values?.length / 2) || 2)
    .fill(null)
    .forEach(el => (gridTemplateColumns += '1fr '))

  useEffect(() => {
    if (values && values.length && solution && solution.length && colorsLength) {
      setState(getResult({ values, solution, colorsLength }))
    }
  }, [values, solution, colorsLength])

  return (
    <div className="result" style={{ gridTemplateColumns }}>
      {show &&
        state &&
        state.length > 0 &&
        state.map((elem, i) => (
          <div className="result__elem">
            <motion.div
              key={i}
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
