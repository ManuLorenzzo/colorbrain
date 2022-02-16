import React, { useEffect } from 'react'
import { useCopyToClipboard } from 'react-use'
import './Score.css'
import easyToast from '../EasyToast/easyToast'

export default function Score({ state, test }) {
  const [clipboardState, copyToClipboard] = useCopyToClipboard()

  if (state && test && test.passed) {
    const generateCopy = () => {
      let copy = `ColorBrain - Test #${state.selectedTest + 1} - ${
        test.initialAttempts - test.attempts
      }/${test.initialAttempts}\nTest ${test.passed ? 'superado' : 'fallado'}\n`
      test.history.forEach(elem => {
        console.log({ elem })
        if (elem.result) {
          Object.values(elem.result).forEach(el => {
            if (el.result === 1) return (copy += '◉ ')
            if (el.result === 2) return (copy += '○ ')
          })
        } else copy += '✗'
        copy += '\n'
      })
      copyToClipboard(copy)

      if (clipboardState.value && !clipboardState.error) {
        if (navigator.share) {
          navigator
            .share({
              title: 'hola',
              text: 'adios',
              url: 'www.google.es',
            })
            .then(() => console.log('Successful share'))
            .catch(error => console.log('Error sharing', error))
        }
        easyToast('success', 'Copiado a portapapeles')
      } else if (clipboardState.error) {
        easyToast('error', 'Ha ocurrido un error copiando el resultado')
      }
    }

    return (
      <div className="score__passed">
        <span>
          ¡Genial! Has resuelto el test <b>#{state.selectedTest + 1}</b> en{' '}
          <b>{test.history.length}</b> {test.history.length > 1 ? 'intentos' : 'intento'}
        </span>
        <span>Aún te quedan dos tests más. Arrastra a la izquierda</span>
        <div className="score__btns">
          <div className="btn" onClick={generateCopy}>
            COPIAR RESULTADOS
          </div>
          <div className="btn">SIGUIENTE TEST</div>
        </div>
      </div>
    )
  } else return <></>
}
