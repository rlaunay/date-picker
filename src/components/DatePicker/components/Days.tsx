import React from 'react'
import { useGetDays } from '../hooks/useGetDays';

type DaysProps = {
  month: number;
  year: number;
}

const Days: React.FC<DaysProps> = ({ month, year }) => {
  const days = useGetDays(month, year);

  return (
    <>
      {days.map(day => {
        if (day) {
          return <div>
            <button>
              {day.getDate()}
            </button>
          </div>
        }

        return <div></div>
      })}
    </>
  )
}

export default Days;