import React, { useState } from 'react'
import './Header.css'
import Logo from '../../logo.png'
import HelpIcon from '../../Svg/HelpIcon.svg'
import Modal from '../Modal/Modal'

export default function Header() {
  const [infoOpen, setInfoOpen] = useState(false)
  return (
    <>
      <header>
        <div className="header__logo">
          <img src={Logo} alt="ColorBrain" />
        </div>
        <div className="header__info" onClick={() => setInfoOpen(!infoOpen)}>
          <img src={HelpIcon} alt="info" />
        </div>
      </header>
      <Modal open={infoOpen} onClose={() => setInfoOpen(false)} title="Info" />
    </>
  )
}
