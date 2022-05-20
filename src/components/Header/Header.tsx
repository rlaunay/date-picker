import React from 'react';

import ArrowDropDown from '../../assets/ArrowDropDown';
import ChevronLeft from '../../assets/ChevronLeft';
import ChevronRight from '../../assets/ChevronRight';

import { capitalize } from '../../utils';

import classes from './Header.module.scss';
import { IconBtn } from './IconBtn';

type HeaderProps = {
  month: number;
  year: number;
  isDropdownOpen: boolean;
  onClickDropDown: () => void;
  onClickLeft: () => void;
  onClickRight: () => void;
  lang: string;
}

export const Header: React.FC<HeaderProps> = ({ month, year, isDropdownOpen, onClickDropDown, onClickLeft, onClickRight, lang }) => {
  const date = new Date(year, month);
  return (
    <div className={classes.header} >
      <div>
        <span>{capitalize(date.toLocaleString(lang, { month: 'long' }))} {year}</span>
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