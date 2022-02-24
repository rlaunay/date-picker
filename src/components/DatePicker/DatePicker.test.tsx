import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react'

import { DatePicker } from '.'

describe('Running test', () => {
  
  test("Check date picker render", () => {
    render(<DatePicker />)
    expect(screen.getByText('oui')).toBeDefined()
  })

})