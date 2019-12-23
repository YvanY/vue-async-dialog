<template>
  <div class="async-dialog-panel" v-on="$listeners">
    <header class="panel-header">
      <div class="slot-title">
        <slot name="title" />
      </div>

      <div class="btn-close" @click="$emit('close')">
        <svg class="icon-close" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M571.662 512.016L1011.648 72.03c16.48-16.48 16.48-43.167 0-59.646-16.48-16.48-43.166-16.48-59.646 0L512.016 452.37 72.03 12.384c-16.48-16.48-43.167-16.48-59.646 0-16.48 16.48-16.48 43.166 0 59.646L452.37 512.016 12.384 952.002c-16.48 16.48-16.48 43.167 0 59.646 8.223 8.224 19.039 12.352 29.823 12.352 10.783 0 21.599-4.128 29.823-12.352l439.986-439.986 439.986 439.986c8.256 8.224 19.04 12.352 29.823 12.352s21.6-4.128 29.823-12.352c16.48-16.48 16.48-43.166 0-59.646L571.662 512.016z"/>
        </svg>
      </div>
    </header>

    <slot />
  </div>
</template>

<script>
export default {
  name: 'AsyncDialogPanel'
}
</script>

<style scoped>
.async-dialog-panel {
  padding: 30px;
  min-width: 300px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
}

.panel-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6e6;
}

.slot-title {
  flex-grow: 1;
  font-size: 20px;
  font-weight: bold;
  word-break: break-word;
}

.btn-close {
  position: relative;
  flex-shrink: 0;
  margin-left: 30px;
  cursor: pointer;
  line-height: 0;
}

.btn-close::before {
  content: "";
  position: absolute;
  top: -5px;
  right: -5px;
  bottom: -5px;
  left: -5px;
}

.btn-close:hover .icon-close {
  fill: #222;
}

.icon-close {
  width: 15px;
  height: 15px;
  fill: #999;
  transition: .2s;
}
</style>
