import React, { FocusEventHandler, forwardRef, useEffect, useRef, useState } from 'react';

import { checkDate, formatDate } from './utils';

import { useClickOutside } from './hooks/useClickOutside';
import { useMonthAndYear } from './hooks/useMonthAndYear';

import { Days } from './components/Days/Days';
import { Years } from './components/Year';
import { Input } from './components/Input';
import { Header } from './components/Header';

import classes from './DatePicker.module.scss';
import { Switch } from './components/Animation/Switch';

export type DatePickerProps = {
  id?: string;
  name?: string;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  onChange?: (e: string) => void;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  value?: string;
  color?: string;
  bgColor?: string;
  years?: [number, number];
  lang?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(({ className, style, onChange, onBlur, value, color, bgColor, years = [1950, 2030], lang = navigator.language }, ref) => {
  const [date, setDate] = useState(() => {
    if (value) {
      return new Date(value)
    }
    return new Date()
  });
  
  const datePickerValue = new Intl.DateTimeFormat('en-US', { calendar: 'iso8601' }).format(date)
  
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
    if (datePickerRef.current && color) {
      datePickerRef.current.style.setProperty('--primary-color', color)
    };

    if (datePickerRef.current && bgColor) {
      datePickerRef.current.style.setProperty('--bg-color', bgColor)
    };
  }, [color, bgColor])
  
  return (
    <span className={classes.datePicker} ref={datePickerRef} >
      <Input
        style={style} 
        className={className}
        onFocus={() => setIsOpen(true)} 
        value={datePickerValue}
        isOpen={isOpen}
        onBlur={onBlur}
        ref={ref}
      />
      {isOpen && <div className={classes.picker} >
        <Header
          lang={lang}
          month={month}
          year={year}
          isDropdownOpen={isYearPickerOpen}
          onClickDropDown={() => {
            setYearPickerOpen((old) => !old)
          }}
          onClickLeft={removeMonth}
          onClickRight={addMonth}
        />
        <Switch
          isOpen={isYearPickerOpen}
          firstElemet={<Days month={month} year={year} date={date} setDate={setDate} />}
          secondElement={<Years date={date} yearsRange={years} yearChange={changeYearHandler} />}
        />
      </div>}
    </span>
  )
})