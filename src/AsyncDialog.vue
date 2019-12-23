<template>
  <transition
    :name="transitionName"
    appear
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div v-if="open" class="async-dialog" @mousedown="handleMousedown" @mouseup.self="handleMouseup" v-on="$listeners">
      <slot />
    </div>
  </transition>
</template>

<script>
let modalCount = 0
let bodyPaddingRight = ''
let bodyOverflow = ''

export default {
  name: 'AsyncDialog',

  model: {
    prop: 'open',
    event: 'update:open'
  },

  props: {
    onOutsideClick: Function,
    open: Boolean,
    transitionName: {
      type: String,
      default: 'async-dialog'
    }
  },

  data() {
    return {
      mousedownSelf: false,
      closed: false
    }
  },

  beforeDestroy() {
    if (!this.closed) {
      this.unlockScroll()
    }
  },

  methods: {
    handleMousedown(evt) {
      this.mousedownSelf = evt.target === evt.currentTarget
    },

    handleMouseup() {
      if (this.mousedownSelf) {
        if (this.onOutsideClick) this.onOutsideClick(this.close)
        else this.close()
      }
    },

    close() {
      this.$emit('update:open', false)
    },

    lockScroll() {
      if (!modalCount) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

        bodyOverflow = document.body.style.overflow
        bodyPaddingRight = document.body.style.paddingRight

        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scrollbarWidth}px`

        this.$emit('scroll-lock', scrollbarWidth)
      }

      modalCount++
    },

    unlockScroll() {
      modalCount--

      if (!modalCount) {
        document.body.style.overflow = bodyOverflow
        document.body.style.paddingRight = bodyPaddingRight

        this.$emit('scroll-unlock')
      }
    },

    beforeEnter() {
      this.closed = false
      this.lockScroll()
    },

    afterEnter() {
      this.$emit('opened')
    },

    afterLeave() {
      this.closed = true
      this.unlockScroll()
      this.$emit('closed')
    }
  }
}
</script>

<style scoped>
.async-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .7);
}

.async-dialog-enter, .async-dialog-leave-to {
  opacity: 0;
}

.async-dialog-enter /deep/ > *, .async-dialog-leave-to /deep/ > * {
  transform: translate3d(0, -20px, 0);
}

.async-dialog-enter-active,
.async-dialog-enter-active /deep/ > *,
.async-dialog-leave-active,
.async-dialog-leave-active /deep/ > * {
  transition: .3s;
}
</style>
