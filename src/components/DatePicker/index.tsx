import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

import classes from './DatePicker.module.scss';
import { checkDate, getDate, months, parseDate } from './utils';

type DatePickerProps = {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  onChange?: (e: string) => void;
  value?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ className, style, onChange, value }) => {
  const pickerRef = useRef(null);

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

  useClickOutside(pickerRef, () => {
    setIsOpen(false)
  })
  
  return (
    <span className={classes.container} >
      <input
        type="text" 
        style={style} 
        className={className}
        onFocus={() => setIsOpen(true)} 
        value={value} 
      />
      {isOpen && <div className={classes.picker} ref={pickerRef} >
        <div>
          {months[month - 1]} {year}
        </div>
        <table>
          <thead>
            <tr>
              <th>S</th>
              <th>M</th>
              <th>T</th>
              <th>W</th>
              <th>T</th>
              <th>F</th>
              <th>S</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>}
    </span>
  )
}