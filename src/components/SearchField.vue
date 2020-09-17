<template>
    <div class="form-group">
        <input
            class="form-control"
            type="text"
            placeholder="Search"
            :value="value"
            @input="$emit('input', $event.target.value)">
    </div>
</template>

<script>
export default {
  name: 'SearchField',
  props: { value: String }
}
</script>
