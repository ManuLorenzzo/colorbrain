import React from 'react'

import './Bubble.css'

export default function Bubble({ color, onClick }) {
  return <button className="bubble" style={{ background: color }} onClick={onClick}></button>
}
