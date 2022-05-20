import type {Meta} from '@storybook/react'
import {DatePicker, DatePickerProps} from '.'

const meta: Meta = {
  title: 'Date Picker',
  component: DatePicker,
}

export default meta;

const Template = (args: DatePickerProps) => {
  return <div style={{ height: 300, width: 200 }} >
    <DatePicker {...args} />
  </div>
}

export const Default = Template.bind({})