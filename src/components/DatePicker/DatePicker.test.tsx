import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react'

import { DatePicker } from '.'

describe('Date Picker input', () => {
  
  test("Check date picker input render", () => {
    render(<DatePicker />)
    const now = new Intl.DateTimeFormat('en-US', { calendar: 'iso8601' }).format(new Date())
    expect(screen.getByDisplayValue(now)).toBeInTheDocument()
  })

  test("Check date picker input with gived value", () => {
    const date = '10/6/1930'
    render(<DatePicker value={date} />)
    expect(screen.getByDisplayValue(date)).toBeInTheDocument()
  })

  test("Check date picker input focus for open picker", async () => {
    const rendered = render(<DatePicker />)
    fireEvent.focus(await rendered.findByDisplayValue('4/1/2022'))
    expect(await rendered.findByText('S')).toBeInTheDocument()
  })

})