import React from 'react';
import './Modal.css';

function Modal(props) {
  const closeButtonVisible = props.showCloseButton !== undefined ? props.showCloseButton : true; // establece el valor por defecto como true si no se proporciona la prop showCloseButton

  if (!props.isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{props.title}</h2>
          {closeButtonVisible && ( // utiliza la prop showCloseButton para determinar si se muestra el botón de cierre
            <button className="close-button" onClick={props.onClose}>
           x
            </button>
          )}
        </div>
        <div className="modal-content">{props.children}</div>
      </div>
    </div>
  );
}

export default Modal;
