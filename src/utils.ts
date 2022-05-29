
/**
 * Capitalize the first letter of given word
 * @param {string} word 
 * @param {string} locale 
 * @returns {string}
 */
export const capitalize = ([ first, ...rest ]: string, locale = navigator.language) => {
  return first.toLocaleUpperCase(locale) + rest.join('')
}

/**
 * Return an array with a length of 42 with null or a number who represent a days in a week (0 to 6)
 * @param {number} month 
 * @param {number} year 
 * @returns {(number | null)[]}
 */
export const getDays = (month: number, year: number) => {
  const date = new Date(year, month, 1);
  const days = []

  let day = 0;
  while (date.getDay() > day) {
    days.push(null);
    day++;
  }
  
  while (date.getMonth() === month) {
    days.push(date.getDate());
    date.setDate(date.getDate() + 1);
  }

  while (days.length < 42) {
    days.push(null);
  }

  return days
}

/**
 * Return a iterable object that start / end and increment in depend of the given parameter
 * @param {number} start 
 * @param {number} end 
 * @param {number | undefined} step 
 * @returns 
 */
export function range(start: number, end: number, step = 1) {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (start < end) {
        start = start+step;
        return {
          value: start,
          done: false
        }
      }
      return { done: true, value: end }
    }
  }
}