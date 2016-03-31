<template>
  <div class="v-sticky">
    <div class="v-sticky-inner" v-el:inner>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import {_, $} from 'ylib'
  import {domEventDestroyers} from './vue-mixins/index'

  export default {
    mixins: [domEventDestroyers],
    props: {
      top: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        stoped: false
      }
    },
    ready () {
      let scrollFn = _.throttle(this.onScroll, 1000 / 60)

      $(window).on('scroll', scrollFn)

      this.addDomEventDestroyer('windowScroll', () => {
        $(window).off('scroll', scrollFn)
      })
    },
    events: {
      'sticky.stop' () {
        this.stop()
      },
      'sticky.resume' () {
        this.resume()
      }
    },
    methods: {
      setUnfixed () {
        let $inner = $(this.$els.inner)

        if ($inner.css('position') !== 'static') {
          $inner.css({position: '', top: '', width: ''})
          this.$dispatch('unfixed')
        }
      },

      setFixed () {
        let $inner = $(this.$els.inner)

        if ($inner.css('top') !== (this.top + 'px')) {
          $inner.css({position: 'fixed', top: this.top, width: $inner.width()})
          this.$dispatch('fixed')
        }
      },

      stop () {
        this.stoped = true
      },

      resume () {
        this.stoped = false
      },

      onScroll () {
        if (this.stoped) {
          return
        }

        let $window = $(window)

        let $el = $(this.$el)
        let $inner = $(this.$els.inner)

        $el.height($inner.height())

        if ($el.offset().top - $window.scrollTop() > this.top) {
          this.setUnfixed()
        } else {
          this.setFixed()
        }
      }
    }
  }
</script>

<style lang="sass">
  .v-sticky {
    &-inner {
      z-index: 1;

      &:before,
      &:after {
        content: '';
        display: table;
      }

      &:after {
        clear: both;
      }
    }
  }
</style>
