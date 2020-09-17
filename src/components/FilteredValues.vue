<template>
    <Loader v-if="isLoading"/>
    <div v-else>
        <SearchField v-model="search"/>
        <slot :filteredValues="filteredValues" :isLoading="isLoading"/>
    </div>
</template>

<script>
import SearchField from './SearchField.vue'
import Loader from './Loader.vue'

export default {
  name: 'FilteredValues',
  components: { SearchField, Loader },
  props: { values: Array, isLoading: Boolean },
  data () {
    return { search: '' }
  },
  computed: {
    filteredValues () {
      const { values } = this
      const filterKey = this.search.toLowerCase()
      if (filterKey) {
        return values.filter((row) => {
          const keys = Object.keys(row)
          return keys.some(key => String(row[key]).toLowerCase().indexOf(filterKey) > -1)
        })
      }
      return values
    }
  }
}
</script>
