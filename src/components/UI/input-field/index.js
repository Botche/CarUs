import React from 'react';

import styles from './index.module.scss';

function Input ({label, id, value, onChange, styleClass, type}) {

  return (
    <div className={styleClass}>
      <label className={styles['form__label']} htmlFor={id}>
        <span className={styles['form__span']}>{label}:</span>
        <input className={styles['form__input']} type={type || 'text'} id={id} value={value} onChange={onChange} />
      </label>
    </div>
  );

};

export default Input;