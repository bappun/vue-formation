<template>
    <div :class="isLoading ? 'd-none' : null">
        <div ref="formTemplate" class="d-none" v-html="template"></div>
        <div class="d-md-flex">
            <select :id="id" ref="unselectedOptions" :class="classes" multiple>
                <option
                    v-for="option in unselectedOptions"
                    :key="option.value"
                    :value="option.value"
                    v-text="option.text"
                    @dblclick="toggleOption(option)"></option>
            </select>
            <div class="d-flex flex-md-column justify-content-center align-items-center my-3 my-md-0 mx-md-3">
                <button @click="toggleOptions('unselectedOptions')" type="button" class="btn btn-primary rotate-1 rotate-md-0">➜</button>
                <button @click="toggleOptions('selectedOptions')" type="button" class="btn btn-primary ml-3 ml-md-0 mt-md-3 rotate-3 rotate-md-2">➜</button>
            </div>
            <select ref="selectedOptions" :required="required" :class="classes" multiple>
                <option
                    v-for="option in selectedOptions"
                    :key="option.value"
                    :value="option.value"
                    v-text="option.text"
                    @dblclick="toggleOption(option)"></option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SelectColumn',
  props: { context: Object, template: String },
  data () {
    this.isLoading = true

    const selectEl = new DOMParser().parseFromString(this.template, 'text/html').getElementsByTagName('select')[0]

    this.options = []
    Array.from(selectEl.children).forEach((el) => {
      this.options.push({
        value: el.value,
        text: el.innerHTML,
        selected: el.selected
      })
    })

    this.select = {
      id: selectEl.id,
      name: selectEl.name,
      classes: selectEl.className,
      required: selectEl.required
    }

    return { ...this.select, options: this.options, isLoading: this.isLoading }
  },
  created () {
    window.addEventListener('load', () => {
      const feedback = document.querySelector(`*[data-for="${this.select.id}"`)
      if (feedback) {
        feedback.classList.add('d-block')
        this.$refs.formTemplate.parentNode.appendChild(feedback)
      }
      // The browser keeps the state of the original input and apply it on page previous.
      // We have to sync the state of the input and the component.
      this.sync()
      this.isLoading = false
    })
  },
  mounted () {
    this.$refs.formTemplate.querySelector('select').required = false
  },
  computed: {
    selectedOptions () {
      return this.options.filter(option => option.selected)
    },
    unselectedOptions () {
      return this.options.filter(option => !option.selected)
    }
  },
  methods: {
    sync () {
      const { selectedOptions } = this.$refs.formTemplate.querySelector('select')
      Array.from(selectedOptions).forEach((selectedEl) => {
        const el = this.options.find(o => selectedEl.value === o.value)
        if (el) el.selected = selectedEl.selected
      })
    },
    toggleOption (option) {
      const el = this.options.find(o => option.value === o.value)
      if (el) {
        el.selected = !el.selected
        // Updates the hidden select option.
        this.$refs.formTemplate.querySelector(`option[value="${el.value}"]`).selected = el.selected
        // Removes required when at least 1 item is selected so
        // the browser doesn't validate the field before the event form.onsubmit.
        this.$refs.selectedOptions.required = this.selectedOptions.length < 1
      }
    },
    toggleOptions (ref) {
      Array.from(this.$refs[ref].options).filter(option => option.selected).forEach((option) => {
        this.toggleOption(option)
      })
    }
  }
}
</script>
