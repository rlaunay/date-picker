import React, { useEffect, useRef, useState } from 'react';

import { checkDate, formatDate } from './utils';

import { useClickOutside } from '../../hooks/useClickOutside';
import { useMonthAndYear } from './hooks/useMonthAndYear';

import { Days } from './components/Days/Days';
import { Years } from './components/Year';
import { Input } from './components/Input';
import { Header } from './components/Header';

import classes from './DatePicker.module.scss';
import { FadeDrop } from './components/Animation/FadeDrop/FadeDrop';
import { FadeUp } from './components/Animation/FadeUp';

export type DatePickerProps = {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  onChange?: (e: string) => void;
  value?: string;
  color?: string;
  years?: [number, number];
  lang?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ className, style, onChange, value, color, years = [1950, 2030], lang = navigator.language }) => {
  const [date, setDate] = useState(() => {
    if (value && checkDate(value)) {
      return new Date(value)
    }
    return new Date()
  });
  
  const datePickerValue = new Intl.DateTimeFormat('en-US', { calendar: 'iso8601' }).format(date)
  
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [isYearPickerOpen, setYearPickerOpen] = useState(false);
  const [isDayOpen, setDayOpen] = useState(true);

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

  useEffect(() => {
    if (dropdown) {
      setDayOpen(!dropdown)
      const timer = setTimeout(() => {
        setYearPickerOpen(dropdown);
      }, 250)

      return () => {
        clearTimeout(timer)
      }
    } else {
      setYearPickerOpen(dropdown);
      const timer = setTimeout(() => {
        setDayOpen(!dropdown)
      }, 250)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [dropdown])
  
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
          lang={lang}
          month={month}
          year={year}
          isDropdownOpen={isYearPickerOpen}
          onClickDropDown={() => {
            setDropdown((old) => !old)
          }}
          onClickLeft={removeMonth}
          onClickRight={addMonth}
        />
        <FadeDrop visible={isYearPickerOpen} >
          <Years date={date} yearsRange={years} yearChange={changeYearHandler} />
        </FadeDrop>
        <FadeUp visible={isDayOpen} >
          <Days month={month} year={year} date={date} setDate={setDate} />
        </FadeUp>
      </div>}
    </span>
  )
}