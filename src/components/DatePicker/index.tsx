import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

import { checkDate, getDate, months, parseDate } from './utils';

import './DatePicker.scss';

type DatePickerProps = {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  onChange?: (e: string) => void;
  value?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ className, style, onChange, value }) => {
  const datePickerRef = useRef(null);

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
    console.log('ici')
    const date = `${year}-${month}-${day}`;
    setDatePickerValue(date)

    if (onChange) {
      onChange(date)
    }
  }, [day, month, year])

  useClickOutside(datePickerRef, () => {
    setIsOpen(false)
  })
  
  return (
    <span className="date-picker" ref={datePickerRef} >
      <input
        type="text" 
        style={style} 
        className={className}
        onFocus={() => setIsOpen(true)} 
        value={datePickerValue} 
      />
      {isOpen && <div className="picker" >
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
            <tr>
              <td>30</td>
              <td>31</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
            </tr>
            <tr>
              <td>13</td>
              <td>14</td>
              <td>15</td>
              <td>16</td>
              <td>17</td>
              <td>18</td>
              <td>19</td>
            </tr>
            <tr>
              <td>20</td>
              <td>21</td>
              <td>22</td>
              <td>23</td>
              <td>24</td>
              <td>25</td>
              <td>26</td>
            </tr>
            <tr>
              <td>27</td>
              <td>28</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
            </tr>
          </tbody>
        </table>
      </div>}
    </span>
  )
}