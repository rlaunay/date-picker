import React, { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';

import classes from './Input.module.scss';

type InputProps = {
  id?: string;
  name?: string;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  value?: string;
  onFocus: () => void;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  isOpen: boolean;
}

/**
 * Input component of the Datepicker that diplay the selected date
 */
const Input = forwardRef<HTMLInputElement, InputProps>(({ id, name, style, className = '', value, onFocus, isOpen, onBlur }, ref) => {
  return (
    <input
      id={id}
      name={name}
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