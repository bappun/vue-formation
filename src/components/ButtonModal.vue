<template>
    <div class="d-inline-block mr-2 mb-2">
        <button class="btn btn-light btn-sm" @click="showModal"><slot/></button>
        <Modal ref="modal" :id="id" :title="title" :body="body"/>
    </div>
</template>

<script>
import Modal from './Modal.vue'

export default {
  name: 'ButtonModal',
  components: { Modal },
  props: { id: String, title: String, body: String },
  methods: {
    showModal () {
      this.$refs.modal.show()
    }
  }
}
</script>
