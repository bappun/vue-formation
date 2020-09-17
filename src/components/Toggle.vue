<template>
    <div @click="clickedToggle" v-if="has_children">
        <ArrowRight v-if="!toggled"/>
        <ArrowRight2 v-else/>
    </div>
</template>

<script>
import eventBus from '../eventBus'
import ArrowRight from '@static/icons/arrow-right.svg'
import ArrowRight2 from '@static/icons/arrow-right2.svg'

export default {
  name: 'Toggle',
  components: { ArrowRight, ArrowRight2 },
  props: ['id', 'has_children'],
  created () {
    eventBus.$on('clickedToggle', (id) => {
      this.toggled = !this.toggled && this.id === id
    })
  },
  data () {
    return {
      toggled: false
    }
  },
  methods: {
    clickedToggle () {
      eventBus.$emit('clickedToggle', this.id)
    }
  }
}
</script>

<style scoped>

</style>
