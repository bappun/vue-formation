<template>
    <div id="app" class="mb-3" v-if="!hasError">
        <Table :values="invites" :config="config" :isLoading="isLoading"></Table>
        <hr>
        <transition appear>
        <Table v-if="children.length" :values="children" :config="config" :isLoading="false"></Table>
        </transition>
    </div>
    <div v-else class="alert alert-danger">Error</div>
</template>

<script>
import Table from '@frontend/components/Table.vue'
import eventBus from '@frontend/eventBus'
import distributions from '@fixtures/distributions.json'

export default {
  name: 'TableViewDistributions',
  props: { context: Object, config: Array },
  components: { Table },
  data () {
    return {
      hasError: false,
      invites: [],
      followUps: [],
      isLoading: false,
      children: [],
      parentId: Number
    }
  },
  created () {
    this.handleEvents()
  },
  mounted () {
    this.fetchDistributions()
  },
  methods: {
    handleEvents () {
      eventBus.$on('clickedToggle', (id) => {
        const filterById = (id === this.parentId) ? null : id
        this.children = this.followUps.filter(child => child.parent_id === filterById)
        this.parentId = filterById
      })
    },
    fetchDistributions () {
      this.fetchData()
        .then((data) => {
          this.invites = data['invites']
          this.followUps = data['follow_ups']
        })
        .catch(() => { this.hasError = true })
        .finally(() => { this.isLoading = false })
    },
    fetchData () {
      return new Promise(resolve => {
        // Mimic API delay
        setTimeout(() => resolve(distributions), 500)
      })
    }
  }
}
</script>
