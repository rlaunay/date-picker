import React from 'react';

import classes from './Button.module.scss';

type ButtonProps = {
  className?: string;
  onClick?: () => void;
  isActive: boolean;
}

export const Button: React.FC<ButtonProps> = ({ className = '', isActive, onClick, children }) => {
  return (
    <button className={`${classes.button} ${isActive ? classes.active : ''} ${className}`} onClick={onClick} >{children}</button>
  )
}