/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import MyButton from '@frontend/components/MyButton.vue'
import TableView from '@frontend/views/TableView'

storiesOf('Button', module)
  .add('with text', () => ({
    components: { MyButton },
    template: '<my-button @click="action">Hello Button</my-button>',
    methods: { action: action('clicked') }
  }))
  .add('with JSX', () => ({
    components: { MyButton },
    render () {
      return <my-button onClick={this.action}>With JSX</my-button>
    },
    methods: { action: linkTo('Button', 'with some emoji') }
  }))
  .add('with some emoji', () => ({
    components: { MyButton },
    template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
    methods: { action: action('clicked') }
  }))

// const config = [
//   {
//     text: 'Last name',
//     name: 'last_name',
//     isSortable: true
//   },
//   {
//     text: 'First name',
//     name: 'first_name',
//     isSortable: true
//   },
//   {
//     text: 'Email',
//     name: 'email',
//     isSortable: true
//   },
//   {
//     text: 'Language',
//     name: 'language',
//     isSortable: true,
//     extraClasses: ['text-uppercase'],
//     component: Badge
//   },
//   {
//     text: 'State',
//     name: 'state_label',
//     isSortable: true,
//     component: Badge
//   },
//   {
//     text: 'Qualtrics',
//     name: 'qualtrics',
//     isSortable: true,
//     component: Boolean,
//     props: {
//       icons: [SyncIcon, SyncCheckIcon]
//     }
//   },
//   {
//     text: 'Edit',
//     name: 'edit',
//     component: Action,
//     props: {
//       action: 'edit'
//     }
//   }
// ]

storiesOf('Table', module)
  .add('default', () => ({
    components: { TableView },
    template: '<TableView></TableView>'
    // render () {
    //   return <TableView config={config} />
    // }
  }))
