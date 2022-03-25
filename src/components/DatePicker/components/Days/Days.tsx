import React from 'react'
import { getDays } from '../../utils';
import { Button } from '../Button';

import classes from './Days.module.scss';

type DaysProps = {
  month: number;
  year: number;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'F']

export const Days: React.FC<DaysProps> = ({ month, year, date, setDate }) => {
  const days = getDays(month, year);

  const changeDateHandler = (day: number) => {
    setDate(new Date(year, month, day))
  }

  return (
    <div className={classes.days} >
      {DAYS.map((D) => <div className={`${classes.cell} ${classes.head}`} >{D}</div>)}

      {days.map(day => {
        if (day) {
          const isActive = day === date.getDate() && month === date.getMonth() && year === date.getFullYear()
          
          return <div className={classes.cell} >
            <Button className={classes.day} isActive={isActive} onClick={() => changeDateHandler(day)} >
              {day}
            </Button>
          </div>
        }

        return <div></div>
      })}
    </div>
  )
}