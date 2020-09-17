<script>
export default {
  name: 'Icon',
  props: { tag: String },
  render (createElement) {
    return createElement(
      this.tag || 'span',
      { class: 'icon' },
      this.$slots.default
    )
  }
}
</script>
