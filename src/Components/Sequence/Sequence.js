import React, { useState } from 'react'
import Bubble from '../Bubble/Bubble'
import colors from '../../Config/colors.json'
import './Sequence.css'

export default function Sequence({ values, editable = true, focusBubble, selectedBubble }) {
  console.log(selectedBubble)
  return (
    <div className="sequence">
      {colors &&
        colors.length &&
        values &&
        values.length &&
        values.map((value, i) => {
          const getHex = () => colors.find(elem => elem.id === value)?.hex || null
          return (
            <Bubble
              color={selectedBubble === i && editable ? '#fff' : getHex()}
              onClick={() => editable && focusBubble(i)}
            />
          )
        })}
    </div>
  )
}