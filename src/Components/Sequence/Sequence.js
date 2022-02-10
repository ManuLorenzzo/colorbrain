import React from 'react'
import Bubble from '../Bubble/Bubble'
import colors from '../../Config/colors.json'
import './Sequence.css'
import { useDispatch } from 'react-redux'
import { setReduxInputValues, setReduxSelectedBubble } from '../../Redux/Ducks/stateDuck'

export default function Sequence({ values, editable = true, selectedBubble }) {
  const dispatch = useDispatch()

  const focusBubble = i => {
    dispatch(setReduxSelectedBubble(i))
    let valuesCopy = JSON.parse(JSON.stringify(values))
    valuesCopy[i] = null
    dispatch(setReduxInputValues(valuesCopy))
  }

  return (
    <div className="sequence">
      {colors &&
        colors.length &&
        values &&
        values.length &&
        values.map((value, i) => {
          console.log('entro ', value, i)
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
