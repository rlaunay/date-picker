import React from 'react';
import { range } from '../../utils'
import { Button } from '../Button';

import classes from './Years.module.scss';

type YearsProps = {
  date: Date;
  yearsRange: [number, number];
  yearChange: (newYear: number) => void;
}

export const Years: React.FC<YearsProps> = ({ date, yearsRange, yearChange }) => {
  
  const generate = () => {
    const years = [];
    for (const n of range(yearsRange[0], yearsRange[1])) {
      const isActive = n === date.getFullYear();

      years.push(
        <div className={classes.cell} >
          <Button className={classes.year} isActive={isActive} onClick={() => yearChange(n)} >{n}</Button>
        </div>
      );
    }

    return years;
  }
      
  return (
    <div className={classes.years} >
      {generate()}
    </div>
  )
}