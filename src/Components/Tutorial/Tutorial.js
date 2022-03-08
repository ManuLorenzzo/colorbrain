import React from 'react'
import Result from '../Result/Result'
import Sequence from '../Sequence/Sequence'
import './Tutorial.css'
import SadIcon from '../../Svg/SadIcon.svg'
import { useDispatch } from 'react-redux'
import { setReduxShowCookiesModal, setReduxShowPolicyModal } from '../../Redux/Ducks/cookiesDuck'

export default function Tutorial() {
  const dispatch = useDispatch()
  const solution = [2, 1, 2, 4]
  const tries = [
    [3, 1, 2, 3],
    [4, 1, 2, 2],
    [3, 3, 3, 3],
  ]

  const Try = ({ label, value }) => (
    <div className="tutorial__row">
      <div className="tutorial__label">{label}</div>
      <div className="row">
        <Sequence values={value} />
        <Result solution={solution} values={value} isSubmitted={true} colorsLength={4} />
      </div>
    </div>
  )

  return (
    <section className="tutorial">
      <div className="tutorial__description">
        <span>Adivina la secuencia correcta de colores con tres niveles de dificultad diarios</span>
        <ul>
          <li>
            <b>En la misma secuencia pueden repetirse los colores.</b>
          </li>
          <li>
            <b>Si fallas, tendrás que esperar a las 00:00 para tener un nuevo ColorBrain.</b>
          </li>
          <li>
            <b>Todo el mundo tiene las mismas soluciones. ¡Compártelo con tus amigos!</b>
          </li>
          <h4>¡AVISO! El orden de las respuestas no se corresponde con el orden de las burbujas</h4>
        </ul>
        <div className="tutorial__response-container">
          <h3>POSIBLES RESPUESTAS</h3>
          <div className="tutorial__response">
            <div className="result__elem">
              <div className="result__border"></div>
              <div className="result__fill"></div>
            </div>
            cuando el color esté en la secuencia y en el lugar correcto.
          </div>
          <div className="tutorial__response">
            <div className="result__elem">
              <div className="result__border"></div>
            </div>
            cuando el color esté en la secuencia pero no en su lugar.
          </div>
          <div className="tutorial__response">
            <div className="result__elem">
              <img src={SadIcon} alt="info" />
            </div>
            cuando ningún color esté en la secuencia.
          </div>
        </div>
      </div>
      <div className="tutorial__example">
        <h3>EJEMPLO</h3>
        <div className="tutorial__solution">
          <Try label="SOLUCIÓN" value={solution} />
        </div>
        <Try label="INTENTO 1" value={tries[0]} />
        <Try label="INTENTO 2" value={tries[1]} />
        <Try label="INTENTO 3" value={tries[2]} />
      </div>
      <div className="tutorial__cookies">
        <div onClick={() => dispatch(setReduxShowPolicyModal(true))}>Ver política de cookies</div>
        <div onClick={() => dispatch(setReduxShowCookiesModal(true))}>
          Modificar tratamiento de cookies
        </div>
      </div>
    </section>
  )
}
