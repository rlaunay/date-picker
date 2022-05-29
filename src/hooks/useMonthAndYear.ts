import { useState } from "react"

/**
 * State to manage the year and the month 
 * @param {number} initialMonth 
 * @param {number} initialYear 
 * @returns 
 */
export const useMonthAndYear = (initialMonth: number, initialYear: number) => {
  const [{ month, year }, setDate] = useState({ month: initialMonth, year: initialYear});

  const addMonth = () => {
    setDate((prevDate) => {  
      const curMonth = prevDate.month + 1;

      if (curMonth > 11) {
        return {
          month: 0,
          year: prevDate.year + 1
        }
      }

      return {
        month: curMonth,
        year: prevDate.year
      }
    })
  }

  const removeMonth = () => {
    setDate((prevDate) => {  
      const curMonth = prevDate.month - 1;

      if (curMonth < 0) {
        return {
          month: 11,
          year: prevDate.year - 1
        }
      }

      return {
        month: curMonth,
        year: prevDate.year
      }
    })
  }

  const setYear = (newYear: number) => setDate(prevDate => ({ ...prevDate, year: newYear }))

  return { month, year, setYear, addMonth, removeMonth }
}