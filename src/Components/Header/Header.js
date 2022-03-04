import React, { useState, useEffect } from 'react'
import './Header.css'
import HelpIcon from '../../Svg/HelpIcon.svg'
import StatisticsIcon from '../../Svg/StatisticsIcon.svg'
import Modal from '../Modal/Modal'
import Tutorial from '../Tutorial/Tutorial'
import Logo from '../../Svg/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setReduxShowStatistics } from '../../Redux/Ducks/stateDuck'
import Statistics from '../Statistics/Statistics'
import moment from 'moment'
import easyToast from '../EasyToast/easyToast'
import CookiesPolicy from '../CookiesPolicy/CookiesPolicy'
import PolicyModal from '../PolicyModal/PolicyModal'
import { setReduxShowCookiesModal, setReduxShowPolicyModal } from '../../Redux/Ducks/cookiesDuck'
import ReactGA from 'react-ga'

export default function Header() {
  const [infoOpen, setInfoOpen] = useState(false)
  const redux = useSelector(store => store)
  const state = redux?.state
  const dispatch = useDispatch()

  if (redux?.cookies?.data?.analytics) {
    ReactGA.initialize('UA-221029271-1')
  }

  useEffect(() => {
    if (redux?.cookies?.data?.analytics) {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
  })

  useEffect(() => {
    try {
      const warn = minutes =>
        easyToast(
          'warning',
          `${
            minutes > 1 ? 'Quedan' : 'Queda'
          } menos de ${minutes} min antes de que acabe el ColorBrain de hoy. ¡Date prisa!`
        )
      const endOfDay = moment()
        .add(1, 'days')
        .set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .valueOf()
      const diff = moment.duration(moment(endOfDay).diff(moment()))
      const seconds = diff._data.hours * 60 * 60 + diff._data.minutes * 60 + diff._data.seconds

      setTimeout(() => {
        if (seconds < 600 && seconds > 480) warn(10)
        else if (seconds < 300 && seconds > 180) warn(5)
        else if (seconds < 200 && seconds > 100) warn(3)
        else if (seconds < 120 && seconds > 0) warn(1)
      }, 1000)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    const data = window.localStorage.getItem('data')
    const statistics = window.localStorage.getItem('statistics')
    if (!data && !statistics) setInfoOpen(true)
  }, [])

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
        content={<Statistics data={redux?.statistics} state={state} />}
      />
      <Modal
        open={redux?.cookies?.showModal}
        onClose={() => dispatch(setReduxShowCookiesModal(false))}
        content={<PolicyModal />}
        buttons={false}
        closeOnOverlay={false}
      />
      <Modal
        open={redux?.cookies?.showPolicyModal}
        onClose={() => dispatch(setReduxShowPolicyModal(false))}
        content={<CookiesPolicy />}
        hasCloseButton={false}
      />
    </>
  )
}
