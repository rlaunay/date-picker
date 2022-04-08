import React from 'react';

import classes from './Input.module.scss';

type InputProps = {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  value?: string;
  onFocus: () => void;
  isOpen: boolean;
}

export const Input: React.FC<InputProps> = ({ style, className = '', value, onFocus, isOpen }) => {
  return (
    <input
      type="text"
      style={style} 
      className={`${classes.input} ${isOpen ? classes.active : ''} ${className}`}
      onFocus={onFocus} 
      value={value} 
      readOnly
    />
  )
}