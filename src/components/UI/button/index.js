import React from 'react';

function Button ({text, styleClass, onClick, type}) {
    return (
        <button type={type || 'submit'} className={styleClass} onClick={onClick}>
            {text}
        </button>
    );

};

export default Button;