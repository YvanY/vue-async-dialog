<template>
  <async-dialog :open.sync="open" @closed="afterClosed">
    <async-dialog-panel @close="open = false">
      <template #title>
        <div>{{ title }}</div>
      </template>

      <input type="text" v-model="payload" placeholder="value">
      <button @click="resolveTrue">resolve</button>
      <button @click="rejectError">reject</button>
    </async-dialog-panel>
  </async-dialog>
</template>

<script>
import { AsyncDialog, AsyncDialogPanel } from '../src'

export default {
  name: 'PromiseDialog',

  components: { AsyncDialog, AsyncDialogPanel },

  props: ['title'],

  data() {
    return {
      open: true,
      action: 'resolve',
      payload: ''
    }
  },

  methods: {
    resolveTrue() {
      this.payload = true
      this.open = false
    },

    rejectError() {
      this.action = 'reject'
      this.payload = new Error(this.payload)
      this.open = false
    },

    afterClosed() {
      this.$emit(this.action, this.payload)
    }
  }
}
</script>
