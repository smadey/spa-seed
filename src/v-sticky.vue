<template>
  <div class="v-sticky" v-bind:style="stickyStyle">
    <slot></slot>
  </div>
</template>

<script>
  import {_, $} from 'ylib'

  export default {
    props: {
      top: {
        type: Number
      }
    },
    data () {
      return {
        height: ''
      }
    },
    computed: {
      stickyStyle () {
        return {
          height: `${this.height}px`
        }
      }
    },
    ready () {
      let el = this.$el
      let scrollFn = _.throttle(function () {
        console.log($(this).scrollTop())
      }, 100)

      this.height = $(el).height()

      $(window).on('scroll', scrollFn)
    }
  }
</script>

<style lang="sass">
  @import './sass-mixins/_mixin.scss';

  .v-sticky {
    &:before,
    &:after {
      content: '';
      display: table;
    }

    &:after {
      clear: both;
    }
  }

</style>
