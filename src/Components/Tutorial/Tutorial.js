import React from 'react'
import Result from '../Result/Result'
import Sequence from '../Sequence/Sequence'
import './Tutorial.css'
import SadIcon from '../../Svg/SadIcon.svg'

export default function Tutorial() {
  const solution = [2, 1, 2, 4]
  const tries = [
    [3, 1, 2, 3],
    [4, 1, 2, 2],
    [3, 3, 3, 3],
  ]

  const Try = ({ label, value }) => (
    <div>
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
        <b>Adivina la secuencia correcta de colores con tres niveles de dificultad</b>
        <b>En la misma secuencia pueden repetirse los colores</b>
        <div className="tutorial__response-container">
          POSIBLES RESPUESTAS
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
          <div className="tutorial__label">SOLUCIÓN</div>
          <Sequence values={solution} />
        </div>
        <Try label="INTENTO 1" value={tries[0]} />
        <Try label="INTENTO 2" value={tries[1]} />
        <Try label="INTENTO 3" value={tries[2]} />
      </div>
    </section>
  )
}
