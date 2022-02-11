import React, { useEffect } from 'react'
import { useCopyToClipboard } from 'react-use'
import './Score.css'
import easyToast from '../EasyToast/easyToast'

export default function Score({ state, test }) {
  const [clipboardState, copyToClipboard] = useCopyToClipboard()

  useEffect(() => {
    if (clipboardState.value && !clipboardState.error) {
      easyToast('success', 'Copiado a portapapeles')
    } else if (clipboardState.error) {
      easyToast('error', 'Ha ocurrido un error copiando el resultado')
    }
  }, [clipboardState])

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
      console.log(copyToClipboard(copy))
    }

    return (
      <div className="score__passed">
        <span>
          ¡Genial! Has resuelto el test #{state.selectedTest + 1} en {test.history.length}{' '}
          {test.history.length > 1 ? 'intentos' : 'intento'}
        </span>
        <div className="score__copy" onClick={generateCopy}>
          COPIAR RESULTADOS
        </div>
      </div>
    )
  } else return <></>
}
