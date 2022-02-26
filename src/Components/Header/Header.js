import React, { useState } from 'react'
import './Header.css'
import HelpIcon from '../../Svg/HelpIcon.svg'
import StatisticsIcon from '../../Svg/StatisticsIcon.svg'
import Modal from '../Modal/Modal'
import Tutorial from '../Tutorial/Tutorial'
import Logo from '../../Svg/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setReduxShowStatistics } from '../../Redux/Ducks/stateDuck'
import Statistics from '../Statistics/Statistics'

export default function Header() {
  const [infoOpen, setInfoOpen] = useState(false)
  const redux = useSelector(store => store)
  const state = redux?.state
  const dispatch = useDispatch()

  return (
    <>
      <header>
        <div className="header__logo">
          <img src={Logo} alt="" />
          <div>ColorBrain</div>
        </div>
        <div className="header__icons">
          <div>
            <img
              src={StatisticsIcon}
              alt="Estadísticas"
              onClick={() => dispatch(setReduxShowStatistics(true))}
            />
          </div>
          <div onClick={() => setInfoOpen(!infoOpen)}>
            <img src={HelpIcon} alt="info" />
          </div>
        </div>
      </header>
      <Modal
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        hasCloseButton={false}
        title="¿Cómo jugar?"
        content={<Tutorial />}
      />
      <Modal
        open={state?.showStatistics}
        onClose={() => dispatch(setReduxShowStatistics(false))}
        hasCloseButton={false}
        title="Estadísticas"
        content={<Statistics data={redux?.statistics} />}
      />
    </>
  )
}
