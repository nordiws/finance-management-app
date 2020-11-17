import React from 'react';
import css from './transactions.module.css';

export default function Transaction(props) {
  const { trx, index } = props;
  let cardColor = '';
  if (trx.type === '+') {
    cardColor = 'row teal accent-1 z-depth-4';
  } else {
    cardColor = 'row red lighten-3 z-depth-4';
  }

  const handleEdit = () => {
    props.onHandleEdit(trx._id);
  };

  const handleDelete = () => {
    props.onHandleDelete(trx._id);
  };

  return (
    <div className={cardColor}>
      <div className='col s1'>
        <span>
          <p className={css.index}>{index + 1}</p>
        </span>
      </div>
      <div className='col s11'>
        <div className='row '>
          <div className='col s5 left-align '>
            <p className={(css.labels, css.strong)}>{trx.category}</p>
            <p className={css.labels}>{trx.description}</p>
          </div>
          <div className='col s5'>
            <span className='right-align'>
              <br />
              <p className={css.value}>R$ {trx.value}</p>
            </span>
          </div>
          <div className='cl s2'>
            <br />
            <span className={css.Menu__MenuTrigger}>
              <i className='small material-icons' onClick={handleEdit}>
                create
              </i>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <i className='small material-icons' onClick={handleDelete}>
                delete_forever
              </i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
