import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import { Days } from '.';

describe('Input', () => {
  
  test("Check days render", async () => {
    const date = new Date('4/4/2022');
    render(<Days date={date} month={5} year={2022} setDate={() => console.log('test')} />)
    expect(screen.getByText('W')).toBeInTheDocument()
  })


  test("Check days setDate callback", async () => {
    const date = new Date('4/4/2022');
    const setDate = jest.fn();
    render(<Days date={date} month={5} year={2022} setDate={setDate} />)

    fireEvent.click(screen.getByText('15'));

    expect(setDate).toHaveBeenCalled();
  })

  test("Check days button render", async () => {
    const date = new Date('4/4/2022');
    const setDate = jest.fn();
    render(<Days date={date} month={5} year={2022} setDate={setDate} />)
    
    const allDays = screen.getAllByText(/^\d+$/)
    expect(allDays.length).toBe(30);
  })

})