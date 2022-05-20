import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import { Input } from '.';

describe('Input', () => {
  
  test("Check input render", async () => {
    const value = 'TEST';
    render(<Input onFocus={() => console.log('oui')} isOpen={false} value={value} />)
    expect(screen.getByDisplayValue(value)).toBeInTheDocument()
  })

  test("Check input onFocus", async () => {
    const onFocus = jest.fn();
    render(<Input onFocus={onFocus} isOpen={false} value="test" />)
    fireEvent.focus(screen.getByDisplayValue('test'));
    expect(onFocus).toHaveBeenCalled();
  })

})