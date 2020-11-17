import React from 'react';
import monthYearList from '../helpers/monthYear';

export default function Selector(props) {
  const options = monthYearList;

  const handleChange = (event) => {
    event.persist();
    props.onChange(event.target.value);
  };

  return (
    <div className='row'>
      <div className='col s5'></div>
      <div className='input-field col s5 m3 l2'>
        <select
          className='browser-default center-align'
          value={props.currentMonthYear}
          onChange={handleChange}
        >
          {options.map(({ value, label }, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className='col s5'></div>
    </div>
  );
}
