<template>
  <div id="app">
    <button @click="openPromiseDialog">open dialog</button>
  </div>
</template>

<script>
import { openDialog } from '../src'
import PromiseDialog from './PromiseDialog'

export default {
  name: 'App',

  data() {
    return {
      openTemplateDialog: false
    }
  },

  methods: {
    async openPromiseDialog() {
      try {
        const payload = await openDialog(PromiseDialog, {
          props: {
            title: 'return a promise!'
          }
        })

        alert(`promise resolved, value: ${payload}`)
      } catch (err) {
        alert(`promise rejected, value: ${err.message}`)
      }
    }
  }
}
</script>
