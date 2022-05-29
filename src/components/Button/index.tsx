import React from 'react';

import classes from './Button.module.scss';

type ButtonProps = {
  className?: string;
  onClick?: () => void;
  isActive: boolean;
}


/**
 * Button component with datepicker style and active classe on the active props
 * @param {ButtonProps} props
 * @returns 
 */
export const Button: React.FC<ButtonProps> = ({ className = '', isActive, onClick, children }) => {
  return (
    <button className={`${classes.button} ${isActive ? classes.active : ''} ${className}`} onClick={onClick} type="button" >{children}</button>
  )
}