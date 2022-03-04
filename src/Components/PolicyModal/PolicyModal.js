import React, { useState } from 'react'
import Switch from 'react-switch'
import './PolicyModal.css'
import { useDispatch } from 'react-redux'
import {
  setReduxCookieData,
  setReduxShowCookiesModal,
  setReduxShowPolicyModal,
} from '../../Redux/Ducks/cookiesDuck'

const initialValues = { essentials: true, analytics: true }

const switchProps = {
  onColor: '#444857',
}

export default function PolicyModal() {
  const [showConfig, setShowConfig] = useState(false)
  const [values, setValues] = useState(initialValues)
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(setReduxCookieData(values))
    dispatch(setReduxShowCookiesModal(false))
  }
  return (
    <section className="policy-modal">
      <h2>Esta página web usa cookies</h2>
      <p>
        Al aceptar, instalaremos cookies en tu dispositivo para mejorar el servicio de esta página
        web. Puedes modificar aquí tu configuración y escoger el tipo de autorización que das.
      </p>
      <div
        onClick={() => dispatch(setReduxShowPolicyModal(true))}
        className="policy-modal__show-modal"
      >
        Ver política de cookies
      </div>

      {showConfig && (
        <div className="policy-modal__config">
          <h3>Cookies requeridas</h3>
          <div className="policy-modal__config-elem">
            <div>
              <p>
                Algunas cookies son necesarias para el uso de la web. Puedes restringirlas o
                bloquearlas de forma general configurando tu navegador, pero algunas áreas del sitio
                no funcionarán. No almacenan ninguna información de identificación personal
              </p>
            </div>
            <Switch
              {...switchProps}
              checked={values?.essentials}
              disabled={true}
              onChange={() => setValues({ ...values, essentials: !values?.essentials })}
            />
          </div>
          <h3>Cookies para estadísticas</h3>
          <div className="policy-modal__config-elem">
            <div>
              <p>
                Nos permiten entender cómo estás navegando por la página web y nos ayudarán a
                mejorar tu experiencia al visitarla.
              </p>
            </div>
            <Switch
              {...switchProps}
              checked={values?.analytics}
              onChange={() => setValues({ ...values, analytics: !values?.analytics })}
            />
          </div>
        </div>
      )}
      <div className="modal__btn-container" onClick={() => setShowConfig(!showConfig)}>
        {!showConfig && <div className="modal__btn">Configurar</div>}
        <div className="modal__btn" onClick={handleSubmit}>
          {showConfig ? 'Aceptar selección' : 'Aceptar todas'}
        </div>
      </div>
    </section>
  )
}
