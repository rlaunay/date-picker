import React, { useEffect, useState } from 'react'
import { getDays } from '../../utils';
import { Button } from '../Button';

import classes from './Days.module.scss';

type DaysProps = {
  month: number;
  year: number;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

/**
 * The days components renders a list of days of the given month and years, day can be click for change the selected day
 * @param {DaysProps} props
 * @returns 
 */
export const Days: React.FC<DaysProps> = ({ month, year, date, setDate }) => {
  const days = getDays(month, year);

  const changeDateHandler = (day: number) => {
    setDate(new Date(year, month, day))
  }

  return (
    <div className={classes.days} >
      {DAYS.map((D, index) => <div className={`${classes.cell} ${classes.head}`} key={`${D}-${index}`} >{D}</div>)}

      {days.map((day, index) => {
        if (day) {
          const isActive = day === date.getDate() && month === date.getMonth() && year === date.getFullYear()
          
          return <div className={classes.cell} key={`${day}-${index}`} >
            <Button className={classes.day} isActive={isActive} onClick={() => changeDateHandler(day)} >
              {day}
            </Button>
          </div>
        }

        return <div key={`${day}-${index}`} ></div>
      })}
    </div>
  )
}