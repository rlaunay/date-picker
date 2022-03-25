import React, { useEffect, useRef, useState } from 'react';

import { checkDate, formatDate } from './utils';

import { useClickOutside } from '../../hooks/useClickOutside';
import { useMonthAndYear } from './hooks/useMonthAndYear';

import { Days } from './components/Days/Days';
import { Years } from './components/Year';
import { Input } from './components/Input';
import { Header } from './components/Header';

import classes from './DatePicker.module.scss';

export type DatePickerProps = {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  onChange?: (e: string) => void;
  value?: string;
  color?: string;
  years?: [number, number]
}

export const DatePicker: React.FC<DatePickerProps> = ({ className, style, onChange, value, color, years = [1950, 2030] }) => {
  const [date, setDate] = useState(() => {
    if (value && checkDate(value)) {
      return new Date(value)
    }
    return new Date()
  });
  
  const datePickerValue = formatDate(date)
  
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isYearPickerOpen, setYearPickerOpen] = useState(false);

  const { year, month, addMonth, removeMonth, setYear } = useMonthAndYear(date.getMonth(), date.getFullYear());

  const changeYearHandler = (n: number) => {
    setYear(n);
    setDate((oldDate) => new Date(oldDate.setFullYear(n)))
  }

  useEffect(() => {
    if (onChange) {
      onChange(datePickerValue)
    }
  }, [date])

  useClickOutside(datePickerRef, () => {
    setIsOpen(false)
  })

  useEffect(() => {
    if (!datePickerRef.current || !color) return;

    datePickerRef.current.style.setProperty('--primary-color', color)
  }, [color])
  
  return (
    <span className={classes.datePicker} ref={datePickerRef} >
      <Input
        style={style} 
        className={className}
        onFocus={() => setIsOpen(true)} 
        value={datePickerValue}
        isOpen={isOpen}
      />
      {isOpen && <div className={classes.picker} >
        <Header
          month={month}
          year={year}
          isDropdownOpen={isYearPickerOpen}
          onClickDropDown={() => setYearPickerOpen((old) => !old)}
          onClickLeft={removeMonth}
          onClickRight={addMonth}
        />
        {isYearPickerOpen ? (
          <Years date={date} yearsRange={years} yearChange={changeYearHandler} />
        ) : (
          <Days month={month} year={year} date={date} setDate={setDate} />
        )}
      </div>}
    </span>
  )
}