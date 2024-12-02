// import type { Meta, StoryObj } from '@storybook-vue/nuxt'

// import AuthForm from '@/components/AuthForm.vue'

// const meta: Meta<typeof AuthForm> = {
//   component: AuthForm,
//   argTypes: {
//     isSignUp: {
//       control: { type: 'boolean'},
//       description: 'SignUp or SignIn modes',
//       defaultValue: false,
//     },
//   },
// }

// export default meta
// type Story = StoryObj<typeof AuthForm>

// export const Default: Story = {
//   render: (args) => ({
//     components: { AuthForm },
//     setup() {
//       return { args }
//     },
//     template: '<AuthForm v-bind="args" />',
//   }),
//   args: {
//     isSignUp: false,
//   }
// }

// export const SignUp: Story = {
//     render: (args) => ({
//       components: { AuthForm },
//       setup() {
//         return { args }
//       },
//       template: '<AuthForm v-bind="args" />',
//     }),
//     args: {
//       isSignUp: true,
//     }
//   }
