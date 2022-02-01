import React from 'react'
import colors from '../../Config/colors.json'
import Bubble from '../Bubble/Bubble'
import './Keyboard.css'

export default function Keyboard({ bubblesLength, setColor }) {
  bubblesLength ||= 0
  return (
    <div className="keyboard">
      {bubblesLength &&
        colors &&
        colors.length &&
        [...Array(bubblesLength)].map((el, i) => {
          return <Bubble color={colors[i]?.hex} onClick={() => setColor(colors[i].id)} />
        })}
    </div>
  )
}
