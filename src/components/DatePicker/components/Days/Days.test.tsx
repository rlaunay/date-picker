import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import { Days } from '.';

describe('Input', () => {
  
  test("Check days render", async () => {
    const date = new Date('4/4/2022');
    render(<Days date={date} month={5} year={2022} setDate={() => console.log('test')} />)
    expect(screen.getByText('W')).toBeInTheDocument()
  })

})