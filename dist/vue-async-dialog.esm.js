import Vue from 'vue';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
var modalCount = 0;
var bodyPaddingRight = '';
var bodyOverflow = '';
var script = {
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
      "default": 'async-dialog'
    }
  },
  data: function data() {
    return {
      mousedownSelf: false,
      closed: false
    };
  },
  beforeDestroy: function beforeDestroy() {
    if (!this.closed) {
      this.unlockScroll();
    }
  },
  methods: {
    handleMousedown: function handleMousedown(evt) {
      this.mousedownSelf = evt.target === evt.currentTarget;
    },
    handleMouseup: function handleMouseup() {
      if (this.mousedownSelf) {
        if (this.onOutsideClick) this.onOutsideClick(this.close);else this.close();
      }
    },
    close: function close() {
      this.$emit('update:open', false);
    },
    lockScroll: function lockScroll() {
      if (!modalCount) {
        var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        bodyOverflow = document.body.style.overflow;
        bodyPaddingRight = document.body.style.paddingRight;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = scrollbarWidth + "px";
        this.$emit('scroll-lock', scrollbarWidth);
      }

      modalCount++;
    },
    unlockScroll: function unlockScroll() {
      modalCount--;

      if (!modalCount) {
        document.body.style.overflow = bodyOverflow;
        document.body.style.paddingRight = bodyPaddingRight;
        this.$emit('scroll-unlock');
      }
    },
    beforeEnter: function beforeEnter() {
      this.closed = false;
      this.lockScroll();
    },
    afterEnter: function afterEnter() {
      this.$emit('opened');
    },
    afterLeave: function afterLeave() {
      this.closed = true;
      this.unlockScroll();
      this.$emit('closed');
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  const options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  let hook;

  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      const originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      const existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

const isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

function createInjector(context) {
  return (id, style) => addStyle(id, style);
}

let HEAD;
const styles = {};

function addStyle(id, css) {
  const group = isOldIE ? css.media || 'default' : id;
  const style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    let code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      const index = style.ids.size - 1;
      const textNode = document.createTextNode(code);
      const nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": _vm.transitionName,
      "appear": ""
    },
    on: {
      "before-enter": _vm.beforeEnter,
      "after-enter": _vm.afterEnter,
      "after-leave": _vm.afterLeave
    }
  }, [_vm.open ? _c('div', _vm._g({
    staticClass: "async-dialog",
    on: {
      "mousedown": _vm.handleMousedown,
      "mouseup": function mouseup($event) {
        if ($event.target !== $event.currentTarget) {
          return null;
        }

        return _vm.handleMouseup($event);
      }
    }
  }, _vm.$listeners), [_vm._t("default")], 2) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-38796d3e_0", {
    source: ".async-dialog[data-v-38796d3e]{position:fixed;top:0;right:0;bottom:0;left:0;z-index:9999;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;background:rgba(0,0,0,.7)}.async-dialog-enter[data-v-38796d3e],.async-dialog-leave-to[data-v-38796d3e]{opacity:0}.async-dialog-enter[data-v-38796d3e] >*,.async-dialog-leave-to[data-v-38796d3e] >*{-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}.async-dialog-enter-active[data-v-38796d3e],.async-dialog-enter-active[data-v-38796d3e] >*,.async-dialog-leave-active[data-v-38796d3e],.async-dialog-leave-active[data-v-38796d3e] >*{-webkit-transition:.3s;transition:.3s}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-38796d3e";
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  name: 'AsyncDialogPanel'
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', _vm._g({
    staticClass: "async-dialog-panel"
  }, _vm.$listeners), [_c('header', {
    staticClass: "panel-header"
  }, [_c('div', {
    staticClass: "slot-title"
  }, [_vm._t("title")], 2), _vm._v(" "), _c('div', {
    staticClass: "btn-close",
    on: {
      "click": function click($event) {
        return _vm.$emit('close');
      }
    }
  }, [_c('svg', {
    staticClass: "icon-close",
    attrs: {
      "viewBox": "0 0 1024 1024",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M571.662 512.016L1011.648 72.03c16.48-16.48 16.48-43.167 0-59.646-16.48-16.48-43.166-16.48-59.646 0L512.016 452.37 72.03 12.384c-16.48-16.48-43.167-16.48-59.646 0-16.48 16.48-16.48 43.166 0 59.646L452.37 512.016 12.384 952.002c-16.48 16.48-16.48 43.167 0 59.646 8.223 8.224 19.039 12.352 29.823 12.352 10.783 0 21.599-4.128 29.823-12.352l439.986-439.986 439.986 439.986c8.256 8.224 19.04 12.352 29.823 12.352s21.6-4.128 29.823-12.352c16.48-16.48 16.48-43.166 0-59.646L571.662 512.016z"
    }
  })])])]), _vm._v(" "), _vm._t("default")], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-38f82322_0", {
    source: ".async-dialog-panel[data-v-38f82322]{padding:30px;min-width:300px;background:#fff;box-shadow:0 5px 10px rgba(0,0,0,.2)}.panel-header[data-v-38f82322]{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;margin-bottom:30px;padding-bottom:20px;border-bottom:1px solid #e6e6e6}.slot-title[data-v-38f82322]{-webkit-box-flex:1;flex-grow:1;font-size:20px;font-weight:700;word-break:break-word}.btn-close[data-v-38f82322]{position:relative;flex-shrink:0;margin-left:30px;cursor:pointer;line-height:0}.btn-close[data-v-38f82322]::before{content:\"\";position:absolute;top:-5px;right:-5px;bottom:-5px;left:-5px}.btn-close:hover .icon-close[data-v-38f82322]{fill:#222}.icon-close[data-v-38f82322]{width:15px;height:15px;fill:#999;-webkit-transition:.2s;transition:.2s}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-38f82322";
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var openDialog = (function (Dialog, dataObject) {
  if (dataObject === void 0) {
    dataObject = {};
  }

  return new Promise(function (resolve, reject) {
    return new Vue({
      name: 'AsyncDialogRoot',
      created: function created() {
        this.$mount();
        document.body.appendChild(this.$el);
      },
      destroyed: function destroyed() {
        document.body.removeChild(this.$el);
      },
      methods: {
        onResolve: function onResolve(payload) {
          resolve(payload);
          this.$destroy();
        },
        onReject: function onReject(payload) {
          reject(payload);
          this.$destroy();
        }
      },
      render: function render(h) {
        return h('div', {
          "class": 'async-dialog-root'
        }, [h(Dialog, _extends({}, dataObject, {
          on: _extends({}, dataObject.on, {
            resolve: this.onResolve,
            reject: this.onReject
          })
        }))]);
      }
    });
  });
});

export default __vue_component__;
export { __vue_component__ as AsyncDialog, __vue_component__$1 as AsyncDialogPanel, openDialog };
