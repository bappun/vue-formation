import Vue from 'vue'
import router from './router'

// eslint-disable-next-line no-new
export default new Vue({
  data: {
    isAuthenticated: false
  },
  methods: {
    toggleIsAuthenticated () {
      setTimeout(() => {
        this.isAuthenticated = !this.isAuthenticated
        if (!this.isAuthenticated) router.push('/')
      }, 1000)
    }
  }
})
