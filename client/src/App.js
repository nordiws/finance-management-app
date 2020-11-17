import React, { useState } from 'react';
import Selector from './components/Selector';
import Transactions from './components/Transactions';

export default function App() {
  const [currentMonthYear, setCurrentMonthYear] = useState('2020-11');

  const handleCurrentMthYrChange = (newValue) => {
    setCurrentMonthYear(newValue);
  };

  return (
    <div className='container center'>
      <h4>Desafio Final do Bootcamp Full Stack</h4>
      <h5>Controle Financeiro Pessoal</h5>
      <Selector
        currentMonthYear={currentMonthYear}
        onChange={handleCurrentMthYrChange}
      />
      <Transactions currentMonthYear={currentMonthYear} />
    </div>
  );
}
