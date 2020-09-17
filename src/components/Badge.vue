<template>
    <span class="badge badge-pill" :class="cssClass" v-text="text"></span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    value: [String, Array]
  },
  data () {
    const [text, cssClass] = Array.isArray(this.value) ? this.value : [this.value, 'badge-secondary']
    return { text, cssClass }
  }
}
</script>
