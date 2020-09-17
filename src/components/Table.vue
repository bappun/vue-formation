<template>
    <Loader v-if="isLoading"/>
    <div v-else-if="sortedValues">
        <div v-if="sortedValues.length <= 0" class="alert alert-info">No data found</div>
        <div v-else class="table-responsive bg-white">
            <table class="table table-bordered table-hover">
                <thead class="thead-light">
                <tr>
                    <th
                        :tabindex="entry.isSortable ? 0 : undefined"
                        :key="entry.name" v-for="entry in config"
                        @keyup.space="sortBy(entry)"
                        @click="sortBy(entry)"
                        :class="{'cursor-pointer' : entry.isSortable}">
                            <span>{{ entry.text }}</span>
                            <icon
                                v-if="entry.isSortable"
                                :class="{'active': entry.name === sortKey, 'rotate-2': sortOrders[entry.name] > 0}">
                                  <ArrowIcon/>
                            </icon>
                    </th>
                </tr>
                </thead>
                <transition-group tag="tbody">
                    <tr :key="row.id || rIndex" v-for="(row, rIndex) in sortedValues">
                        <td :key="col.name || cIndex" v-for="(col, cIndex) in config" :class="col.extraClasses">
                            <component v-if="col.component" :is="col.component" v-bind="{ value: row[col.name], ...col.props }"/>
                            <template v-else>{{ row[col.name] }}</template>
                        </td>
                    </tr>
                </transition-group>
            </table>
        </div>
    </div>
</template>

<script>
import Loader from '@frontend/components/Loader.vue'

const Icon = () => import('@frontend/components/Icon.vue')
const ArrowIcon = () => import('@static/icons/arrow-up.svg')

export default {
  name: 'Table',
  components: { Loader, Icon, ArrowIcon },
  props: {
    values: Array,
    config: Array,
    isLoading: Boolean
  },
  data () {
    const sortOrders = {}
    this.config.forEach((entry) => {
      if (entry.isSortable) sortOrders[entry.name] = -1
    })

    return {
      sortKey: '',
      sortOrders
    }
  },
  computed: {
    sortedValues () {
      const { sortKey, sortOrders } = this
      let { values } = this
      const order = sortOrders[sortKey] || 1
      if (sortKey) {
        values = values.slice().sort((a, b) => {
          a = a[sortKey] // eslint-disable-line no-param-reassign
          b = b[sortKey] // eslint-disable-line no-param-reassign
          return (a === b ? 0 : a > b ? 1 : -1) * order // eslint-disable-line no-nested-ternary
        })
      }
      return values
    }
  },
  methods: {
    sortBy (entry) {
      if (entry.isSortable) {
        const key = entry.name
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      }
    }
  }
}
</script>
