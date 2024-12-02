import type { Meta, StoryObj } from '@storybook/vue3'

import MyCheckbox from '@/components/MyCheckbox.vue'

const meta: Meta<typeof MyCheckbox> = {
  component: MyCheckbox,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    checked: {
        control: { type: 'boolean' },
      },
    name: {
      control: { type: 'text' },
    },
  },
}

export default meta
type Story = StoryObj<typeof MyCheckbox>

export const Default: Story = {
  render: (args) => ({
    components: { MyCheckbox },
    setup() {
      return { args }
    },
    template: '<MyCheckbox v-bind="args" />',
  }),
  args: {
    name: 'MyCheckbox',
    disabled: false,
    checked: false,
  },
}

export const DefaultChecked: Story = {
    render: (args) => ({
      components: { MyCheckbox },
      setup() {
        return { args }
      },
      template: '<MyCheckbox v-bind="args" />',
    }),
    args: {
      name: 'MyCheckbox',
      disabled: false,
      checked: true,
    },
  }

  export const Disabled: Story = {
    render: (args) => ({
      components: { MyCheckbox },
      setup() {
        return { args }
      },
      template: '<MyCheckbox v-bind="args" />',
    }),
    args: {
      name: 'MyCheckbox',
      disabled: true,
      checked: false,
    },
  }

  export const DisabledChecked: Story = {
    render: (args) => ({
      components: { MyCheckbox },
      setup() {
        return { args }
      },
      template: '<MyCheckbox v-bind="args" />',
    }),
    args: {
      name: 'MyCheckbox',
      disabled: true,
      checked: true,
    },
  }
