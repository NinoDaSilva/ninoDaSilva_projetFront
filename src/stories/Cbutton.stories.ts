import type { Meta, StoryObj } from '@storybook/vue3';

import Button from '@/components/Cbutton.vue';

const meta: Meta<typeof Button> = {
    component: Button,
    argTypes: {
        variant: {
            control: { type: 'select'},
            options: ['primary', 'outline'],
        },
        disabled: {
          control: { type: 'boolean'}
        }
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args" />',
  }),
  args: {
    label: 'Button',
    variant: 'primary',
  },
};

export const Outline: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args" />',
  }),
  args: {
    label: 'Button',
    variant: 'outline',
  },
};

export const DisabledPrimary: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args" />',
  }),
  args: {
    label: 'Button',
    variant: 'primary',
    disabled: true,
  },
};

export const DisabledOutline: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args" />',
  }),
  args: {
    label: 'Button',
    variant: 'outline',
    disabled: true,
  },
};