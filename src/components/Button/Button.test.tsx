import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import { Button } from '.';

describe('Button', () => {
  
  test("Check button render", async () => {
    const test = 'TEST'
    render(<Button isActive={false} >{test}</Button>)
    expect(screen.getByText(test)).toBeInTheDocument()
  })

  test("Check button on click", async () => {
    const onClick = jest.fn();
    render(<Button isActive={false} onClick={onClick} >test</Button>)
    fireEvent.click(screen.getByText('test'))
    expect(onClick).toHaveBeenCalled()
  })

})