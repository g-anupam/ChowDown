import React from 'react';
import './Input.css';

const Input = ({value, onChange, placeholder, type='text', className = ''}) => {
  return (
    <input 
      type = {type}
      value = {value}
      onChange = {onChange}
      placeholder = {placeholder}
      className = {`input ${className}`}
    />
  );
};

export default Input;
