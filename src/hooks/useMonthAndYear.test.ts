import { renderHook, act } from '@testing-library/react-hooks';

import { useMonthAndYear } from './useMonthAndYear'

describe('useMonthAndYear hook', () => {
  
  test("Check hook initial render", () => {
    const {result} = renderHook(() => useMonthAndYear(4, 2022));
    const { month, year } = result.current;

    expect(month).toBe(4);
    expect(year).toBe(2022);
  })

  test("Check hook year change", () => {
    const {result} = renderHook(() => useMonthAndYear(4, 2022));

    expect(result.current.month).toBe(4);
    expect(result.current.year).toBe(2022);

    act(() => result.current.setYear(2010));

    expect(result.current.month).toBe(4);
    expect(result.current.year).toBe(2010);
  })

  test("Check hook add month change", () => {
    const {result} = renderHook(() => useMonthAndYear(4, 2022));

    expect(result.current.month).toBe(4);
    expect(result.current.year).toBe(2022);

    act(() => result.current.addMonth());

    expect(result.current.month).toBe(5);
    expect(result.current.year).toBe(2022);

    for (let index = 0; index < 7; index++) {
      act(() => result.current.addMonth());
    }

    expect(result.current.month).toBe(0);
    expect(result.current.year).toBe(2023);

  })

  test("Check hook remove month change", () => {
    const {result} = renderHook(() => useMonthAndYear(4, 2022));

    expect(result.current.month).toBe(4);
    expect(result.current.year).toBe(2022);

    act(() => result.current.removeMonth());

    expect(result.current.month).toBe(3);
    expect(result.current.year).toBe(2022);

    for (let index = 0; index < 4; index++) {
      act(() => result.current.removeMonth());
    }

    expect(result.current.month).toBe(11);
    expect(result.current.year).toBe(2021);
  })

})