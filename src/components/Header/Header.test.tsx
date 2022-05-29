import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import { Header } from '.';

describe('Input', () => {
  
  test("Check input render", async () => {
    render(<Header 
      month={4} 
      year={2022} 
      isDropdownOpen={false} 
      onClickDropDown={() => console.log('test')} 
      onClickLeft={() => console.log('test')}
      onClickRight={() => console.log('test')}
      lang="en"
    />)
    expect(screen.getByText("May 2022")).toBeInTheDocument()
  })

  test("Check input language", async () => {
    render(<Header 
      month={4} 
      year={2022} 
      isDropdownOpen={false} 
      onClickDropDown={() => console.log('test')} 
      onClickLeft={() => console.log('test')}
      onClickRight={() => console.log('test')}
      lang="fr"
    />)
    expect(screen.getByText("Mai 2022")).toBeInTheDocument()
  })

  test("Check input language", async () => {
    const onClick = jest.fn();
    render(<Header 
      month={4} 
      year={2022} 
      isDropdownOpen={false} 
      onClickDropDown={onClick} 
      onClickLeft={onClick}
      onClickRight={onClick}
      lang="fr"
    />)

    const allButton = screen.getAllByRole('button');

    allButton.forEach(btn => {
      fireEvent.click(btn);
    })

    expect(onClick).toHaveBeenCalledTimes(3)
  })

})