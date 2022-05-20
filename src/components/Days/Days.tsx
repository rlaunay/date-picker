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

const VISIBLE = 1; // L'élément est visible
const HIDDEN = 2; // L'élément est masqué
const ENTERING = 3; // L'élément est animé en entrée
const LEAVING = 4; // L'élément est animé en sortie

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export const Days: React.FC<DaysProps> = ({ month, year, date, setDate }) => {
  // const [days, setDays] = useState<(number | null)[]>(getDays(month, year));
  const days = getDays(month, year);

  const changeDateHandler = (day: number) => {
    setDate(new Date(year, month, day))
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('oui')
  //     setDays(getDays(month, year))
  //   }, 250)
  // }, [month]);

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