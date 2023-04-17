import React, { useState } from "react";
import Modal from "./Modal";
import ContentSample from "./ContentSample";

function ModalPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  

  
  return (
    <div className="modal-component">
      <button className="modal-page-button" onClick={() => setModalIsOpen(true)}>Show Modal</button>

      <Modal isOpen={modalIsOpen}>
        <ContentSample handleClose={()=> setModalIsOpen(false)}/>
      </Modal>

    </div>
  );
}

export default ModalPage