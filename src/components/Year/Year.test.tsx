import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import { Years } from '.';

describe('Input', () => {
  
  test("Check year render", async () => {
    const date = new Date('4/4/2022');
    render(<Years date={date} yearsRange={[2000, 2010]} yearChange={() => console.log('test')} />)
    expect(screen.getByText(2001)).toBeInTheDocument()
  })

  test("Check year range", async () => {
    const date = new Date('4/4/2022');
    render(<Years date={date} yearsRange={[2000, 2010]} yearChange={() => console.log('test')} />)
    const allYear = screen.getAllByText(/^\d+$/)
    expect(allYear.length).toBe(10)
  })

  test("Check year change", async () => {
    const date = new Date('4/4/2022');
    const yearChange = jest.fn();
    render(<Years date={date} yearsRange={[2000, 2010]} yearChange={yearChange} />);
    fireEvent.click(screen.getByText(2005));
    expect(yearChange).toHaveBeenCalled();
  })
})