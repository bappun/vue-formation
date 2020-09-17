<template>
    <icon :class="value ? 'text-success' : 'text-danger'"><component :is="icons[value | 0]"></component></icon>
</template>

<script>
import CheckIcon from '@static/icons/check.svg'
import TimesIcon from '@static/icons/times.svg'
import Icon from './Icon.vue'

export default {
  name: 'Boolean',
  components: { Icon },
  props: {
    value: Boolean,
    icons: {
      type: Array,
      default: () => [CheckIcon, TimesIcon]
    }
  }
}
</script>
