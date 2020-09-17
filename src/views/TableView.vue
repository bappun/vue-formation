<template>
    <div id="app" class="mb-3">
        <h1 v-if="$route">{{ $route.params.text }}</h1>
        <h1 >{{ store.isAuthenticated }}</h1>
        <button @click="store.toggleIsAuthenticated()">Toggle</button>
        <filtered-values :values="values" v-slot="slotProps">
            <Table :values="slotProps.filteredValues" :config="config" :isLoading="isLoading"/>
        </filtered-values>
    </div>
</template>

<script>
import Table from '@frontend/components/Table.vue'
import FilteredValues from '@frontend/components/FilteredValues.vue'
import members from '@fixtures/members.json'
import '@static/style.css'
import Action from '@frontend/components/Action'
import Badge from '@frontend/components/Badge'
import SyncIcon from '@static/icons/sync.svg'
import SyncCheckIcon from '@static/icons/sync_check.svg'
import store from '../mystore'

export default {
  name: 'TableView',
  props: { context: Object },
  components: { FilteredValues, Table },

  data () {
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

    return {
      values: null,
      isLoading: true,
      config,
      store
    }
  },

  mounted () {
    this.fetchData().then(data => {
      this.values = data
    }).finally(() => {
      this.isLoading = false
    })
  },

  methods: {
    fetchData () {
      return new Promise(resolve => {
        // Mimic API delay
        setTimeout(() => resolve(members), 500)
      })
    }
  }
}
</script>
