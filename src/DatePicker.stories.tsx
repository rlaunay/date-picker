import type {Meta} from '@storybook/react'
import { useEffect, useRef } from 'react';
import {DatePicker, DatePickerProps} from '.'

const meta: Meta = {
  title: 'Date Picker',
  component: DatePicker,
}

export default meta;

const Template = (args: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    console.log('DATE PICKER', inputRef)
  }, [inputRef.current])

  return <div style={{ height: 300, width: 200 }} >
    <DatePicker {...args} onChange={() => console.log('oui')} ref={inputRef} />
  </div>
}

export const Default = Template.bind({})