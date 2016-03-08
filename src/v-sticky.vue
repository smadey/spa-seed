<template>
  <div class="v-sticky">
    <div class="v-sticky-inner" v-el:inner>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import {_, $} from 'ylib'

  export default {
    props: {
      top: {
        type: Number,
        default: 0
      }
    },
    ready () {
      let $window = $(window)

      let $el = $(this.$el)
      let $inner = $(this.$els.inner)

      let scrollFn = _.throttle(() => {
        $el.height($inner.height())

        if ($el.offset().top - $window.scrollTop() > this.top) {
          this.setUnfixed()
        } else {
          this.setFixed()
        }
      }, 1000 / 60)

      $window.on('scroll', scrollFn)
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
      }
    }
  }
</script>

<style lang="sass">
  @import './sass-mixins/_mixin.scss';

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
