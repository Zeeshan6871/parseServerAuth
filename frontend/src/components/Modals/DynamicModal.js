import React from 'react';

const DynamicModal = ({ 
  showModal, 
  onClose, 
  onSave, 
  modalTitle = 'Modal Title', 
  children, 
  footerContent 
}) => {
 
  return (
    <div 
      className={`modal fade ${showModal ? 'show' : ''}`} 
      style={{ display: showModal ? 'block' : 'none' }}
      aria-labelledby="exampleModalLabel" 
      aria-hidden={!showModal}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{modalTitle}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={onSave}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicModal;
