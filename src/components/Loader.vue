<template>
    <div v-if="isLoading" class="text-center">
        <div class="spinner-border text-primary"><span class="sr-only">Loading...</span></div>
    </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    isLoading: {
      type: Boolean,
      default: true
    }
  }
}
</script>
