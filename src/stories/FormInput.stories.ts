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