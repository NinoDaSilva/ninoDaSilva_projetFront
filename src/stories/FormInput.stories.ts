import type { Meta, StoryObj } from '@storybook/vue3';

import FormInput from '@/components/FormInput.vue';

const meta: Meta<typeof FormInput> = {
    component: FormInput,
    argTypes: {
        disabled: {
          control: { type: 'boolean'}
        },
        label: {
          control: { type: 'text'}
        },
        name: {
          control: { type: 'text'}
        },
        placeholder: {
          control: { type: 'text'}
        },
        type: {
          control: { type: 'select' },
          option: ['text', 'password', 'email', 'number', 'tel', 'url'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof FormInput>;

export const Primary: Story = {
  render: (args) => ({
    components: { FormInput },
    setup() {
      return { args };
    },
    template: '<FormInput v-bind="args" />',
  }),
  args: {
    label: 'Label',
    name: '',
    placeholder: 'Placeholder',
    type: 'text'
  },
};