import React, { useEffect, useState } from 'react'
import './Result.css'
import SadIcon from '../../Svg/SadIcon.svg'
import { motion } from 'framer-motion'
import getResult from '../../MyMethods/getResult'

export default function Result({ solution, values, show = true }) {
  const [state, setState] = useState([])

  useEffect(() => {
    if (values && values.length && solution && solution.length) {
      setState(getResult({ values, solution }))
    }
  }, [values, solution])

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
