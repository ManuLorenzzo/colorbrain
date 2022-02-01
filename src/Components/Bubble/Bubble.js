import React from 'react'

import './Bubble.css'

export default function Bubble({ color, onClick }) {
  return <div className="bubble" style={{ background: color }} onClick={onClick}></div>
}
