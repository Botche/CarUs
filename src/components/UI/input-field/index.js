import React from 'react';

import styles from './index.module.scss';

function Input (props) {

  return (
    <div className={props.styleClass}>
      <label className={styles['form__label']} htmlFor={props.id}>
        <span className={styles['form__span']}>{props.label}:</span>
        <input className={styles['form__input']} type={props.type || 'text'} id={props.id} value={props.value} onChange={props.onChangeHandler} />
      </label>
    </div>
  );

};

export default Input;