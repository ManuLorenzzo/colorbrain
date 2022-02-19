import React, { useState, useEffect } from 'react'
import './Header.css'
import HelpIcon from '../../Svg/HelpIcon.svg'
import Modal from '../Modal/Modal'
import Tutorial from '../Tutorial/Tutorial'
import Logo from '../../Svg/logo.svg'
import ReactGA from 'react-ga'

export default function Header() {
  const [infoOpen, setInfoOpen] = useState(false)

  useEffect(() => {
    ReactGA.initialize('UA-221029271-1')
  }, [])

  return (
    <>
      <header>
        <div className="header__logo">
          <img src={Logo} alt="" />
          <div>ColorBrain</div>
        </div>
        <div className="header__info" onClick={() => setInfoOpen(!infoOpen)}>
          <img src={HelpIcon} alt="info" />
        </div>
      </header>
      <Modal
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        hasCloseButton={false}
        title="¿Cómo jugar?"
        content={<Tutorial />}
      />
    </>
  )
}
