import React from 'react';
import './Button.css';

const Button = ({children, variant='primary', type = 'button',onClick, disabled, className = ''}) => {
  return (
    <button
      type = {type}
      onClick = {onClick}
      disabled = {disabled}
      className = {`button ${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
