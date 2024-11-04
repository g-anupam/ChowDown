import React from 'react';
import './Select.css';

const Select = ({ value, onChange, options, placeholder, className = '' }) => {
  return (
    <div className={`select-wrapper ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
