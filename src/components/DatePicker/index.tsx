import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

import { checkDate, getDate, months, parseDate } from './utils';

import './DatePicker.scss';
import ChevronRight from './assets/ChevronRight';
import ArrowDropDown from './assets/ArrowDropDown';
import ChevronLeft from './assets/ChevronLeft';
import Days from './components/Days';

export type DatePickerProps = {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  onChange?: (e: string) => void;
  value?: string;
  color?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ className, style, onChange, value, color = '#e74c3c' }) => {
  const datePickerRef = useRef<HTMLDivElement>(null);

  const [datePickerValue, setDatePickerValue] = useState<string>(() => {
    if (value && checkDate(value)) {
      return value
    }
    return ''
  });
  const [isOpen, setIsOpen] = useState(false);

  const [day, setDay] = useState<number>(() => {
    if (value && checkDate(value)) {
      return parseDate(value).day
    }
    return getDate().day
  });

  const [month, setMonth] = useState<number>(() => {
    if (value && checkDate(value)) {
      return parseDate(value).month
    }
    return getDate().month
  });

  const [year, setYear] = useState<number>(() => {
    if (value && checkDate(value)) {
      return parseDate(value).year
    }
    return getDate().year
  });

  useEffect(() => {
    const date = `${year}-${month}-${day}`;
    setDatePickerValue(date)

    if (onChange) {
      onChange(date)
    }
  }, [day, month, year])

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
            <span>{months[month - 1]} {year}</span>
            <button className="picker--dropdown" >
              <ArrowDropDown />
            </button>
          </div>
          <div className="picker--month" >
            <button onClick={() => {
              setMonth((old) => old - 1)
            }} >
              <ChevronLeft />
            </button>
            <button onClick={() => {
              setMonth((old) => old + 1)
            }} >
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
          <Days month={month - 1} year={year} />
        </div>
      </div>}
    </span>
  )
}