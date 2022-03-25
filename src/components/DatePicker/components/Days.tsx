import React from 'react'
import { getDays } from '../utils';

type DaysProps = {
  month: number;
  year: number;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

const Days: React.FC<DaysProps> = ({ month, year, date, setDate }) => {
  const days = getDays(month, year);

  const changeDateHandler = (day: number) => {
    setDate(new Date(year, month, day))
  }

  return (
    <>
      {days.map(day => {
        if (day) {
          const isActive = day === date.getDate() && month === date.getMonth() && year === date.getFullYear()
          return <div>
            <button className={isActive ? 'active' : ''} onClick={() => changeDateHandler(day)} >
              {day}
            </button>
          </div>
        }

        return <div></div>
      })}
    </>
  )
}

export default React.memo(Days);