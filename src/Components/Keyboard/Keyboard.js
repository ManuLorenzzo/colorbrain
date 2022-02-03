import React from 'react'
import colors from '../../Config/colors.json'
import Bubble from '../Bubble/Bubble'
import './Keyboard.css'

export default function Keyboard({ bubblesLength, setColor, finished, handleSubmit }) {
  bubblesLength ||= 0
  return (
    <div className="keyboard" onClick={finished ? handleSubmit : () => {}}>
      {bubblesLength &&
        colors &&
        !finished &&
        colors
          .filter(elem => elem.active)
          .map((elem, i) => {
            return <Bubble color={elem.hex} onClick={() => setColor(elem.id)} />
          })}
      {finished && <div className="keyboard__submit">✔</div>}
    </div>
  )
}
