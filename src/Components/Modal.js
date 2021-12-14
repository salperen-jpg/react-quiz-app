import React from 'react';
import { useGlobalContext } from '../context';
import './Modal.css';
import './Loading.css';

const Modal = () => {
  const { isModalOpen, closeModal, correct, questions } = useGlobalContext();
  return (
    <div className={`${isModalOpen ? 'modal isOpen' : 'modal'} `}>
      <div className='modal-content'>
        <h2>Congrats !</h2>
        <p>
          You answered {((correct / questions.length) * 100).toFixed(0)} of
          questions correctly
        </p>
        <button onClick={closeModal} className='close-btn'>
          Play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
