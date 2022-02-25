export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'Jun',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function parseDate(str: string) {
  const splitted = str.split('-');
  return {
    year: +splitted[0],
    month: +splitted[1],
    day: +splitted[2]
  }
}

export function getDate() {
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  }
}

export function checkDate(str: string) {
  return /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(str)
}