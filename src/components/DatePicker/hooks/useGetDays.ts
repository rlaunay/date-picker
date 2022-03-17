export const useGetDays = (month: number, year: number) => {
  const date = new Date(year, month, 1);
  const days = []

  let day = 0;
  while (date.getDay() > day) {
    days.push(null);
    day++;
  }
  
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  while (days.length < 42) {
    days.push(null);
  }

  return days
}