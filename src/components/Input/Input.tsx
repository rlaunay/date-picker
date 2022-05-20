import React, { FocusEventHandler, forwardRef } from 'react';

import classes from './Input.module.scss';

type InputProps = {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  value?: string;
  onFocus: () => void;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  isOpen: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ style, className = '', value, onFocus, isOpen, onBlur }, ref) => {
  return (
    <input
      type="text"
      style={style} 
      className={`${classes.input} ${isOpen ? classes.active : ''} ${className}`}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      ref={ref}
      readOnly
    />
  )
})

Input.displayName = 'Input'

export { Input };