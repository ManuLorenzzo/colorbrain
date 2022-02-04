import React from 'react'
import './Attempts.css'

export default function Attempts({ attempts, passed }) {
  return (
    <>
      {!passed && attempts > 0 && (
        <div className={attempts > 2 ? 'attempts' : 'attempts attempts--warn'}>
          {attempts > 1 ? (
            <div>
              Quedan <span>{attempts}</span> intentos
            </div>
          ) : (
            <div>
              Queda <span>{attempts}</span> intento
            </div>
          )}
        </div>
      )}
      {!passed && attempts === 0 && <div className="attempts">🙄 Vaya, has fallado el test</div>}
    </>
  )
}
