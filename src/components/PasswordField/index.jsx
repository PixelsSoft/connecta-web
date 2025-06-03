// components/PasswordField.jsx
import React, { useId, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordField = ({ label, value, onChange, name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='inputGroup passwordField'>
      <label className='form-label' htmlFor={id}>
        {label}
      </label>
      <div className='input-group'>
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder || 'Password'}
          className='form-control'
          id={id}
        />
        <button
          type='button'
          onClick={togglePasswordVisibility}
          className='btn'
          id='button-addon2'
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
