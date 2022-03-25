import React from 'react';
import { range } from '../utils'

type YearsProps = {
  date: Date;
  yearsRange: [number, number];
  yearChange: (newYear: number) => void;
}

const Years: React.FC<YearsProps> = ({ date, yearsRange, yearChange }) => {
  
  const generate = () => {
    const years = [];
    for (const n of range(yearsRange[0], yearsRange[1])) {
      const isActive = n === date.getFullYear();
      years.push(
        <div>
          <button className={isActive ? 'active' : ''} onClick={() => yearChange(n)} >{n}</button>
        </div>
      );
    }

    return years;
  }
      
  return (
    <React.Fragment>
      {generate()}
    </React.Fragment>
  )
}

export default Years