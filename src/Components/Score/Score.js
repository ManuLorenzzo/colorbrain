import React, { useState } from 'react'
import { useCopyToClipboard } from 'react-use'
import './Score.css'
import easyToast from '../EasyToast/easyToast'
import { useDispatch } from 'react-redux'
import { setReduxScrollTo } from '../../Redux/Ducks/stateDuck'
import moment from 'moment'
import {
  WhatsappShareButton,
  TelegramShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  PinterestShareButton,
} from 'react-share'
import {
  FacebookIcon,
  FacebookMessengerIcon,
  PinterestIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share'
import Switch from 'react-switch'
import secondsToString from '../../MyMethods/secondsToString'
import getGameEndTime from '../../MyMethods/getGameEndTime'

export default function Score({ state, test }) {
  const [clipboardState, copyToClipboard] = useCopyToClipboard()
  const dispatch = useDispatch()
  const [shareTimes, setShareTimes] = useState(
    window.localStorage.getItem('shareTimes') === 'true' ? true : false
  )
  const remainingTests = state?.tests?.filter(test => !test.passed)?.length
  let today = moment().format('DD-MM-YYYY')
  const url = 'colorbraingame.com'

  const switchProps = {
    onColor: '#444857',
    width: 40,
    height: 20,
  }

  const finishedTest = Boolean(test.passed || !test.attempts)

  const getGameTime = () => {
    try {
      const seconds = getGameEndTime(state.tests, true)
      if (!seconds) return null
      return secondsToString(moment.duration(seconds * 1000))
    } catch (err) {
      console.err(err)
      return null
    }
  }

  const getTestTime = test => {
    try {
      if (test.startTime && test.endTime) {
        const diff = moment(test.endTime).diff(test.startTime, 'seconds')
        return secondsToString(moment.duration(diff * 1000))
      }
      return null
    } catch (err) {
      return ''
    }
  }

  const getTestCopy = (showUrl = false) => {
    try {
      let time = null
      if (shareTimes) {
        time = getTestTime(test)
      }
      let copy = `${showUrl ? url + '\n' : ''}ColorBrain - ${today} - Test #${
        state.selectedTest + 1
      } ${test.passed ? 'resuelto' : 'fallado'} ${time ? '- ' + time : ''}- ${
        !test.attempts && !test.passed ? 'X' : test.initialAttempts - test.attempts
      }/${test.initialAttempts}\n`
      test.history.forEach(elem => {
        if (elem.result) {
          Object.values(elem.result).forEach(el => {
            if (el.result === 1) return (copy += '⚫ ')
            if (el.result === 2) return (copy += '⚪ ')
          })
        } else copy += '❌'
        copy += '\n'
      })
      return copy
    } catch (err) {
      console.error(err)
      return ''
    }
  }

  const getFullCopy = (showUrl = false) => {
    try {
      let gameTime = null
      if (shareTimes) {
        gameTime = getGameTime()
      }
      let copy = `${showUrl ? url + '\n' : ''}ColorBrain - ${today} ${
        gameTime ? '- ' + gameTime : ''
      }\n\n`
      state.tests.forEach(test => {
        let testTime = null
        if (shareTimes) {
          testTime = getTestTime(test)
        }
        copy += `Test #${test.id + 1} ${test.passed ? 'resuelto' : 'fallado'} ${
          testTime ? '- ' + testTime : ''
        }- ${!test.attempts && !test.passed ? 'X' : test.initialAttempts - test.attempts}/${
          test.initialAttempts
        }\n`
        test.history.forEach(elem => {
          if (elem.result) {
            Object.values(elem.result).forEach(el => {
              if (el.result === 1) return (copy += '⚫ ')
              if (el.result === 2) return (copy += '⚪ ')
            })
          } else copy += '❌'
          copy += '\n'
        })
      })
      return copy
    } catch (err) {
      console.error(err)
    }
  }

  if (state && test && finishedTest) {
    const copy = (all = true) => {
      const copy = all ? getFullCopy(true) : getTestCopy(true)
      if (copy) {
        copyToClipboard(copy)
        easyToast('success', 'Copiado a portapapeles')
      } else {
        easyToast('error', 'Ha ocurrido un error copiando el resultado')
      }
    }

    return (
      <div className="score">
        <div className="score__container">
          <div className="score__left">
            <div>#{state.selectedTest + 1}</div>
            <div>{test?.passed ? 'RESUELTO' : 'FALLADO'}</div>
          </div>
          <div className="score__right">
            {test?.passed && (
              <span>
                ¡Genial! Has resuelto el test <b>#{state.selectedTest + 1}</b> en{' '}
                <b>{test.history.length}</b> {test.history.length > 1 ? 'intentos' : 'intento'}
              </span>
            )}
            {(!remainingTests || !test.passed) && (
              <span className="score__slide">Desliza para ver los otros tests</span>
            )}
            <div className="score__btns">
              <div className="btn" onClick={() => copy(false)}>
                COPIAR TEST
              </div>
              {(!remainingTests || !test.passed) && (
                <div className="btn" onClick={() => copy()}>
                  COPIAR RESULTADOS
                </div>
              )}
              {test.passed &&
                state?.tests[state.tests?.length - 1]?.id !== test.id &&
                remainingTests > 0 && (
                  <div className="btn" onClick={() => dispatch(setReduxScrollTo(test.id + 1))}>
                    SIGUIENTE TEST
                  </div>
                )}
              <div className="score__switch-time">
                <Switch
                  {...switchProps}
                  checked={shareTimes}
                  onChange={() => {
                    window.localStorage.setItem('shareTimes', !shareTimes)
                    setShareTimes(!shareTimes)
                  }}
                />
                Compartir tiempos
              </div>
            </div>
          </div>
        </div>
        {(!remainingTests || !test.passed) && (
          <div className="score__share">
            <WhatsappShareButton url={url} title={getFullCopy()}>
              <WhatsappIcon round={true} />
            </WhatsappShareButton>
            <TelegramShareButton url={url} title={getFullCopy()}>
              <TelegramIcon round={true} size={25} />
            </TelegramShareButton>
            <TwitterShareButton url={url} title={getFullCopy()}>
              <TwitterIcon round={true} size={25} />
            </TwitterShareButton>
            <FacebookMessengerShareButton url={url} title={getFullCopy()}>
              <FacebookMessengerIcon round={true} size={25} />
            </FacebookMessengerShareButton>
            <FacebookShareButton url={url} title={getFullCopy()}>
              <FacebookIcon round={true} size={25} />
            </FacebookShareButton>
            <PinterestShareButton url={url} title={getFullCopy()}>
              <PinterestIcon round={true} size={25} />
            </PinterestShareButton>
          </div>
        )}
      </div>
    )
  } else return <></>
}
