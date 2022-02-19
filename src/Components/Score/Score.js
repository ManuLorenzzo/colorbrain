import React from 'react'
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
export default function Score({ state, test }) {
  const [clipboardState, copyToClipboard] = useCopyToClipboard()
  const dispatch = useDispatch()
  const remainingTests = state?.tests?.filter(test => !test.passed)?.length
  let today = moment().format('DD-MM-YYYY')
  const url = 'https://www.google.es'

  const finishedTest = Boolean(test.passed || !test.attempts)

  const getTestCopy = () => {
    try {
      let copy = `ColorBrain - ${today} - Test #${state.selectedTest + 1} ${
        test.passed ? 'resuelto' : 'fallado'
      } - ${test.initialAttempts - test.attempts}/${test.initialAttempts}\n`
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

  const getFullCopy = () => {
    try {
      let copy = `ColorBrain - ${today}\n\n`
      state.tests.forEach(test => {
        copy += `Test #${test.id + 1} ${test.passed ? 'resuelto' : 'fallado'} - ${
          test.initialAttempts - test.attempts
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
      })
      return copy
    } catch (err) {
      console.error(err)
    }
  }

  if (state && test && finishedTest) {
    const copy = (all = true) => {
      const copy = all ? getFullCopy() : getTestCopy()
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
