import React, { useEffect } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

// MY IMPORTS
import './Modal.css'

export default function Modal({
  className,
  open,
  onClose,
  closeOnOverlay = true,
  hasCloseButton = true,
  hasAcceptButton = true,
  closeAfterAccept = true,
  title,
  message,
  message2,
  alertMessage,
  content,
  onAccept = false,
  onCloseButton,
  buttons = true,
}) {
  /*
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => (document.body.style.overflow = 'unset')
    }
  }, [open])
  */
  return (
    <Popup
      open={open}
      className={`${className ? className : ''}`}
      closeOnDocumentClick={closeOnOverlay}
      onClose={() => onClose()}
      lockScroll
      nested
      closeOnEscape={false}
    >
      <div className="modal">
        {(title || message || alertMessage) && (
          <div className="modal-header">
            {title && <h2>{title}</h2>}
            {message && <h3>{message}</h3>}
            {message2 && <h3>{message2}</h3>}
            {alertMessage && <h4>{alertMessage}</h4>}
          </div>
        )}
        {content && <div className="modal-content">{content}</div>}
      </div>
      {buttons && (
        <div className="modal__btn-container">
          {hasCloseButton && (
            <button className="modal__btn modal__btn--close" onClick={onCloseButton || onClose}>
              ✖
            </button>
          )}
          {hasAcceptButton && (
            <button
              onClick={() => {
                onAccept && onAccept()
                closeAfterAccept && onClose()
              }}
              className="modal__btn"
            >
              ✔
            </button>
          )}
        </div>
      )}
    </Popup>
  )
}
