import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

import { checkDate, months, formatDate } from './utils';

import './DatePicker.scss';
import ChevronRight from './assets/ChevronRight';
import ArrowDropDown from './assets/ArrowDropDown';
import ChevronLeft from './assets/ChevronLeft';
import Days from './components/Days';
import { useMonthAndYear } from './hooks/useMonthAndYear';
import Years from './components/Year';

export type DatePickerProps = {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  onChange?: (e: string) => void;
  value?: string;
  color?: string;
  years?: [number, number]
}

export const DatePicker: React.FC<DatePickerProps> = ({ className, style, onChange, value, color = '#e74c3c', years = [1950, 2030] }) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  
  const [date, setDate] = useState(() => {
    if (value && checkDate(value)) {
      return new Date(value)
    }
    return new Date()
  });

  const datePickerValue = formatDate(date)

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
    <span className="date-picker" ref={datePickerRef} >
      <input
        type="text"
        style={style} 
        className={`input-picker${isOpen ? ' active' : ''} ${className}`}
        onFocus={() => setIsOpen(true)} 
        value={datePickerValue} 
      />
      {isOpen && <div className="picker" >
        <div className="picker--head" >
          <div>
            <span>{months[month]} {year}</span>
            <button className="picker--dropdown" onClick={() => setYearPickerOpen((old) => !old)} >
              <ArrowDropDown />
            </button>
          </div>
          {!isYearPickerOpen && <div className="picker--month" >
            <button className="icon-btn" onClick={removeMonth} >
              <ChevronLeft />
            </button>
            <button className="icon-btn" onClick={addMonth} >
              <ChevronRight />
            </button>
          </div>}
        </div>
        {isYearPickerOpen ? (
          <div className="picker--year" >
            <Years date={date} yearsRange={years} yearChange={changeYearHandler} />
          </div>
        ) : (
          <div className="picker--grid" >
            <div className="table-head" >S</div>
            <div className="table-head" >M</div>
            <div className="table-head" >T</div>
            <div className="table-head" >W</div>
            <div className="table-head" >T</div>
            <div className="table-head" >F</div>
            <div className="table-head" >S</div>
            <Days month={month} year={year} date={date} setDate={setDate} />
          </div>
        )}
      </div>}
    </span>
  )
}