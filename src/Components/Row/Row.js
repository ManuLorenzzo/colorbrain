import React from 'react'
import Result from '../Result/Result'
import Sequence from '../Sequence/Sequence'
import './Row.css'
import { motion } from 'framer-motion'

export default function Row({ values, solution }) {
  console.log(values, 'EN ROWWW')
  return (
    <motion.div className="row" animate={{ scale: 0.8 }}>
      <Sequence values={values} editable={false} />
      <Result solution={solution} values={values} isSubmitted={true} />
    </motion.div>
  )
}
