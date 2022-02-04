import React from 'react'
import './Header.css'
import Logo from '../../logo.png'
import HelpIcon from '../../Svg/HelpIcon.svg'

export default function Header() {
  return (
    <header>
      <div className="header__logo">
        <img src={Logo} alt="ColorBrain" />
      </div>
      <div className="header__info">
        <img src={HelpIcon} alt="info" />
      </div>
    </header>
  )
}
