import React from 'react';

import classes from './IconBtn.module.scss';

type IconBtnProps = {
  onClick: () => void;
  className?: string;
}

export const IconBtn: React.FC<IconBtnProps> = ({ children, onClick, className = '' }) => {
  return <button className={`${classes.icobtn} ${className}`} onClick={onClick} >
    {children}
  </button>
}