import Vue from 'vue'

export default (Dialog, dataObject = {}) => {
  return new Promise((resolve, reject) => new Vue({
    name: 'AsyncDialogRoot',

    created() {
      this.$mount()
      document.body.appendChild(this.$el)
    },

    destroyed() {
      document.body.removeChild(this.$el)
    },

    methods: {
      onResolve(payload) {
        resolve(payload)
        this.$destroy()
      },

      onReject(payload) {
        reject(payload)
        this.$destroy()
      }
    },

    render(h) {
      return h('div', { class: 'async-dialog-root' }, [
        h(Dialog, {
          ...dataObject,
          on: {
            ...dataObject.on,
            resolve: this.onResolve,
            reject: this.onReject
          }
        })
      ])
    }
  }))
}
