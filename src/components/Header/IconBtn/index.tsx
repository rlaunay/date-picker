import React from 'react';

import classes from './IconBtn.module.scss';

type IconBtnProps = {
  onClick: () => void;
  className?: string;
}

/**
 * A button component that recieved an icon on children
 * @param {IconBtnProps} props 
 * @returns 
 */
export const IconBtn: React.FC<IconBtnProps> = ({ children, onClick, className = '' }) => {
  return <button className={`${classes.icobtn} ${className}`} onClick={onClick} type="button" >
    {children}
  </button>
}