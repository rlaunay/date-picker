import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

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

})