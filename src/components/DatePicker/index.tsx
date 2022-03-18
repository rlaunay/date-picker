import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

import { checkDate, months, formatDate } from './utils';

import './DatePicker.scss';
import ChevronRight from './assets/ChevronRight';
import ArrowDropDown from './assets/ArrowDropDown';
import ChevronLeft from './assets/ChevronLeft';
import Days from './components/Days';
import { useMonthAndYear } from './hooks/useMonthAndYear';

export type DatePickerProps = {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  onChange?: (e: string) => void;
  value?: string;
  color?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ className, style, onChange, value, color = '#e74c3c' }) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState(() => {
    if (value && checkDate(value)) {
      return new Date(value)
    }
    return new Date()
  });

  const datePickerValue = formatDate(date)

  const [isOpen, setIsOpen] = useState(false);

  const { year, month, addMonth, removeMonth } = useMonthAndYear(date.getMonth(), date.getFullYear());

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
            <button className="picker--dropdown" >
              <ArrowDropDown />
            </button>
          </div>
          <div className="picker--month" >
            <button onClick={removeMonth} >
              <ChevronLeft />
            </button>
            <button onClick={addMonth} >
              <ChevronRight />
            </button>
          </div>
        </div>
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
      </div>}
    </span>
  )
}