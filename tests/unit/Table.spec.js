import { shallowMount } from '@vue/test-utils'
import Table from '@frontend/components/Table.vue'
import Action from '@frontend/components/Action'
import Badge from '@frontend/components/Badge'
import SyncIcon from '@static/icons/sync.svg'
import SyncCheckIcon from '@static/icons/sync_check.svg'
import members from '@fixtures/members.json'

const config = [
  {
    text: 'Last name',
    name: 'last_name',
    isSortable: true
  },
  {
    text: 'First name',
    name: 'first_name',
    isSortable: true
  },
  {
    text: 'Email',
    name: 'email',
    isSortable: true
  },
  {
    text: 'Language',
    name: 'language',
    isSortable: true,
    extraClasses: ['text-uppercase'],
    component: Badge
  },
  {
    text: 'State',
    name: 'state_label',
    isSortable: true,
    component: Badge
  },
  {
    text: 'Qualtrics',
    name: 'qualtrics',
    isSortable: true,
    component: Boolean,
    props: {
      icons: [SyncIcon, SyncCheckIcon]
    }
  },
  {
    text: 'Edit',
    name: 'edit',
    component: Action,
    props: {
      action: 'edit'
    }
  }
]

describe('Table.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Table, {
      propsData: { values: members, config }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('header click', () => {
    const wrapper = shallowMount(Table, {
      propsData: { values: members, config }
    })
    const el = wrapper.find('th:first-child')
    el.trigger('click')
    expect(el.html()).toContain('active rotate-2')
  })
})
