import React from 'react';

import ArrowDropDown from '../../assets/ArrowDropDown';
import ChevronLeft from '../../assets/ChevronLeft';
import ChevronRight from '../../assets/ChevronRight';

import { months } from '../../utils';

import classes from './Header.module.scss';
import { IconBtn } from './IconBtn';

type HeaderProps = {
  month: number;
  year: number;
  isDropdownOpen: boolean;
  onClickDropDown: () => void;
  onClickLeft: () => void;
  onClickRight: () => void;
}

export const Header: React.FC<HeaderProps> = ({ month, year, isDropdownOpen, onClickDropDown, onClickLeft, onClickRight }) => {
  return (
    <div className={classes.header} >
      <div>
        <span>{months[month]} {year}</span>
        <IconBtn className={classes.dropdown} onClick={onClickDropDown} >
          <ArrowDropDown />
        </IconBtn>
      </div>
      {!isDropdownOpen && <div className={classes.month} >
        <IconBtn onClick={onClickLeft} >
          <ChevronLeft />
        </IconBtn>
        <IconBtn className={classes.last} onClick={onClickRight} >
          <ChevronRight />
        </IconBtn>
      </div>}
    </div>
  )
}