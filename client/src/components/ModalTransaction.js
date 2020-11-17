import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
export default function ModalTransaction({ onSave, onClose, selectedTrx }) {
  const [radioValue, setRadioValue] = useState(selectedTrx.type);
  let disabled = '';
  if (typeof selectedTrx !== 'string') {
    disabled = 'disabled';
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target.value.form;
    const updatedTrx = {
      description: form[2].value,
      value: parseInt(form[4].value),
      category: form[3].value,
      year: parseInt(form[5].value.slice(0, 4)),
      month: parseInt(form[5].value.slice(5, 7)),
      day: parseInt(form[5].value.slice(8, 10)),
      yearMonth: form[5].value.slice(0, 7),
      yearMonthDay: form[5].value,
      type: radioValue,
    };
    onSave(selectedTrx._id, updatedTrx);
  };

  const handleModalClose = () => {
    onClose(null);
  };
  return (
    <div>
      <Modal isOpen={true} style={{ overlay: { maxWidth: '600px' } }}>
        <div className='row'>
          <span className='col s8 left-align'>Edição do Lançamento</span>
          <span className='col s4 right-align'>
            <button
              className='waves-effect waves-lights btn red dark-4'
              onClick={handleModalClose}
            >
              X
            </button>
          </span>
        </div>
        <div className='card-panel'>
          <form onSubmit={handleFormSubmit}>
            <div className='row'>
              <div className='input-field col s6'>
                <input
                  id='expense'
                  type='radio'
                  value='expense'
                  disabled={disabled}
                  checked={radioValue === '-'}
                  onChange={() => setRadioValue('-')}
                />
                <span onClick={() => setRadioValue('-')}>Despensa</span>
              </div>
              <div className='input-field col s6'>
                <input
                  id='income'
                  type='radio'
                  value='income'
                  disabled={disabled}
                  checked={radioValue === '+'}
                  onChange={() => setRadioValue('+')}
                />
                <span onClick={() => setRadioValue('+')}>Receita</span>
              </div>
            </div>
            <br />
            <div className='input-field'>
              <input
                id='description'
                type='text'
                className='validate'
                defaultValue={selectedTrx.description}
              />
              <label className='active' htmlFor='description'>
                Descrição
              </label>
            </div>
            <div className='input-field'>
              <input
                id='category'
                type='text'
                className='validate'
                defaultValue={selectedTrx.category}
              />
              <label className='active' htmlFor='category'>
                Categoria
              </label>
            </div>
            <div className='row'>
              <div className='col s6'>
                <label className='active' htmlFor='value'>
                  Valor
                </label>
                <input
                  id='value'
                  type='text'
                  className='validate'
                  defaultValue={selectedTrx.value}
                />
              </div>
              <div className='col s6 right-align'>
                <br />
                <input
                  type='date'
                  id='date'
                  defaultValue={selectedTrx.yearMonthDay}
                />
              </div>
            </div>
            <button className='waves-effect waves-lights btn'>Salvar</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
