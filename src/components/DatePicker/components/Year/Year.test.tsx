import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import { Years } from '.';

describe('Input', () => {
  
  test("Check year render", async () => {
    const date = new Date('4/4/2022');
    render(<Years date={date} yearsRange={[2000, 2010]} yearChange={() => console.log('test')} />)
    expect(screen.getByText(2001)).toBeInTheDocument()
  })
})