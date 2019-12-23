# vue-async-dialog

## [DEMO](https://yvany.github.io/vue-async-dialog/)

## 快速上手

### install
```sh
yarn add vue-async-dialog
```

### use in template

```vue
<template>
  <async-dialog :open.sync="open">
    <div class="panel">
      <!-- content -->
    </div>
  </async-dialog>
</template>

<script>
import { AsyncDialog } from 'vue-async-dialog'

export default {
  components: { AsyncDialog },
  data() {
    return {
      open: true
    }
  }
}
</script>
```

### use in js


组件内部关闭模态框时，需要调用`this.$emit(action, payload)`

`action`和`payload`分别对应`openDialog`返回的`promise`的`[[PromiseStatus]]`和`[[PromiseValue]]` 

```vue
<!-- FooDialog.vue-->
<template>
  <async-dialog :open.sync="open" @closed="afterClose">
    <async-dialog-panel @close="open = false">
      <template #title>
        <div>return a promise!</div>
      </template>
    
      <input type="text" v-model="payload" placeholder="promise value" />
      <button @click="onResolveClick">resolve</button>
      <button @click="onRejectClick">reject</button>
    </async-dialog-panel>
  </async-dialog>
</template>

<script>
import { AsyncDialog, AsyncDialogPanel } from 'vue-async-dialog'

export default {
  components: { AsyncDialog, AsyncDialogPanel },
  data() {
    return {
      open: true,
      action: 'resolve',
      payload: ''
    }
  },
  methods: {
    afterClose() {
      this.$emit(this.action, this.payload)
    },
    onResolveClick() {
      this.action = 'resolve'
      this.open = false
    },
    onRejectClick() {
      this.action = 'resolve'
      this.open = false
    }
  }
}
</script>
```

```js
// bar.js
import FooDialog from './FooDialog.vue'
import { openDialog } from 'vue-async-dialog'

(async () => {
  try {
    const payload = await openDialog(FooDialog, {
      props: {
        // here pass props to FooDialog
      }
    })
    
    // handle payload
  } catch (err) {
    // handle err
  }
})()
```
