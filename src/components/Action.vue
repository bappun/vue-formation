<template>
    <icon tag="a" :href="value" v-if="action === 'edit'" class="text-info icon-md"><PenIcon/></icon>
</template>

<script>
import PenIcon from '@static/icons/pen.svg'
import Icon from './Icon.vue'

export default {
  name: 'Action',
  components: { Icon, PenIcon },
  props: {
    action: String,
    value: String
  }
}
</script>
