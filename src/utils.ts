export const capitalize = ([ first, ...rest ]: string, locale = navigator.language) => {
  return first.toLocaleUpperCase(locale) + rest.join('')
}

export function formatDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export function checkDate(str: string) {
  return /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(str)
}

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