import React, { useState, useEffect } from 'react';
import { balanceColor } from '../helpers/balanceColor';
import { formatNumber } from '../helpers/formatNumber';
import TrxService from '../services/TrxService';
import ModalTransaction from './ModalTransaction';
import Transaction from './Transaction';

export default function Transactions({ currentMonthYear }) {
  const [trx, setTrx] = useState([]);
  const [trxTotal, setTrxTotal] = useState('');
  const [totalIncome, setTotalIncome] = useState('');
  const [totalExpenses, setTotalExpenses] = useState('');
  const [balance, setBalance] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrx, setSelectedTrx] = useState('');

  useEffect(() => {
    fetchTrx();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonthYear]);

  const fetchTrx = () => {
    TrxService.getTrxByMonthYear(currentMonthYear)
      .then(({ data }) => {
        const income = data.reduce((acc, curr) => {
          if (curr.type === '+') {
            acc = acc + curr.value;
          }
          return acc;
        }, 0);
        const expenses = data.reduce((acc, curr) => {
          if (curr.type === '-') {
            acc = acc + curr.value;
          }
          return acc;
        }, 0);

        const balance = income - expenses;

        setTrx(data);
        setTrxTotal(data.length);
        setTotalIncome(income);
        setTotalExpenses(expenses);
        setBalance(balance);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;

    TrxService.getTrxByMonthYear(currentMonthYear).then(({ data }) => {
      const filteredTrx = data.filter((trx) => {
        if (trx.description.toLowerCase().includes(value)) {
          return trx;
        }
        return null;
      });

      const income = filteredTrx.reduce((acc, curr) => {
        if (curr.type === '+') {
          acc = acc + curr.value;
        }
        return acc;
      }, 0);
      const expenses = filteredTrx.reduce((acc, curr) => {
        if (curr.type === '-') {
          acc = acc + curr.value;
        }
        return acc;
      }, 0);

      const balance = income - expenses;

      setTrx(filteredTrx);
      setTrxTotal(filteredTrx.length);
      setTotalIncome(income);
      setTotalExpenses(expenses);
      setBalance(balance);
    });
  };

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleEditTrx = (id) => {
    TrxService.get(id).then((response) => {
      setSelectedTrx(response.data[0]);
      setIsModalOpen(true);
    });
  };

  const handleDeleteTrx = (id) => {
    TrxService.remove(id).then((response) => {
      console.log(response.data);
      fetchTrx();
    });
  };

  const handleSave = (id, formData) => {
    if (typeof id !== 'undefined') {
      TrxService.update(id, formData).then((response) => {
        console.log(response.data);
        setIsModalOpen(false);
        fetchTrx();
      });
    } else {
      TrxService.create(formData).then((response) => {
        console.log(response.data);
        setIsModalOpen(false);
        fetchTrx();
      });
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedTrx('');
  };

  return (
    <div>
      <div className='row card-panel'>
        <div className='col s3'>
          <span>Lançamentos: {trxTotal}</span>
        </div>
        <div className='col s3'>
          <span>
            Receitas:{' '}
            <span className='green-text'>R$ {formatNumber(totalIncome)}</span>
          </span>
        </div>
        <div className='col s3'>
          <span>
            Despensas:{' '}
            <span className='red-text'>R$ {formatNumber(totalExpenses)}</span>
          </span>
        </div>
        <div className='col s3'>
          <span>
            Saldo:{' '}
            <span className={balanceColor(balance)}>
              R$ {formatNumber(balance)}
            </span>
          </span>
        </div>
      </div>
      <br />
      <div className='row'>
        <div className='col s4'>
          {!isModalOpen && (
            <button
              className='waves-effect waves-light btn'
              onClick={handleCreateClick}
            >
              + NOVO LANÇAMENTO
            </button>
          )}
        </div>
        <div className='col s8'>
          <input
            type='text'
            placeholder='Filtro'
            id='filter'
            onChange={handleFilterChange}
            autoFocus
          ></input>
        </div>
      </div>
      <div>
        <ul>
          {trx.map((transaction, index) => {
            return (
              <li key={index}>
                <Transaction
                  trx={transaction}
                  index={index}
                  onHandleDelete={handleDeleteTrx}
                  onHandleEdit={handleEditTrx}
                />
              </li>
            );
          })}
        </ul>
      </div>
      {isModalOpen && (
        <ModalTransaction
          onSave={handleSave}
          onClose={handleClose}
          selectedTrx={selectedTrx}
        />
      )}
    </div>
  );
}
