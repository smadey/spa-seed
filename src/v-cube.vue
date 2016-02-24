<template>
  <div class="v-cube" v-bind:class="{ready: ready, rotating: animation == 'rotating', 'rotating-reverse': animation == 'rotating-reverse'}" v-bind:style="cubeStyle">
    <div class="face bottom"></div>
    <div class="face left" v-bind:style="leftStyle"></div>
    <div class="face back" v-bind:style="backStyle"></div>

    <div class="v-cube-inner">
      <div class="face right" v-bind:style="rightStyle"></div>
      <div class="face front" v-bind:style="frontStyle"></div>
    </div>

    <div class="face top" v-bind:style="topStyle"></div>

    <div class="floor" v-if="floor"></div>
  </div>
</template>

<script>
  export default {
    props: {
      size: {
        type: Number
      },
      length: {
        type: Number
      },
      width: {
        type: Number
      },
      height: {
        type: Number
      },
      initialized: {
        type: Boolean,
        default: false
      },
      animation: {
        type: String
      },
      floor: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        ready: false
      }
    },
    computed: {
      cubeStyle () {
        return {
          'width': this.length + 'px',
          'height': this.width + 'px'
        }
      },

      leftStyle () {
        if (this.ready) {
          return {
            width: this.height + 'px'
          }
        }
      },

      backStyle () {
        if (this.ready) {
          return {
            height: this.height + 'px'
          }
        }
      },

      rightStyle () {
        if (this.ready) {
          return {
            width: this.height + 'px'
          }
        }
      },

      frontStyle () {
        if (this.ready) {
          return {
            height: this.height + 'px'
          }
        }
      },

      topStyle () {
        if (this.ready) {
          return {
            'transform': 'translateZ(' + this.height + 'px)'
          }
        }
      }
    },
    ready () {
      if (this.size) {
        this.length = this.width = this.height = this.size
      }

      if (!this.length) {
        this.length = this.$el.clientWidth
      }

      if (!this.width) {
        this.width = this.$el.clientHeight
      }

      if (!this.height) {
        this.height = Math.min(this.width, this.length)
      }

      if (this.initialized) {
        this.ready = true
      } else {
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(() => this.ready = true)
        } else {
          setTimeout(() => this.ready = true, 0)
        }
      }
    }
  }
</script>

<style lang="sass">
  @import './sass-mixins/_mixin.scss';

  @include keyframe(cube-rotate) {
    0% {
      @include transform(rotateX(54.5deg) rotateZ(45deg));
    }
    20%, 100% {
      @include transform(rotateX(54.5deg) rotateZ(225deg));
    }
  }

  @include keyframe(cube-rotate-reverse) {
    0% {
      @include transform(rotateX(54.5deg) rotateZ(225deg));
    }
    20%, 100% {
      @include transform(rotateX(54.5deg) rotateZ(45deg));
    }
  }

  .v-cube {
    height: 100%;
    position: relative;
    @include transform(rotateX(54.5deg) rotateZ(45deg));
    @include transform-style(preserve-3d);
    width: 100%;

    &.rotating {
      @include animation(cube-rotate 5s ease-in-out infinite 3s);
    }

    &.rotating-reverse {
      @include animation(cube-rotate-reverse 5s ease-in-out infinite 3s);
    }

    &-inner {
      height: 100%;
      position: absolute;
      @include transform(rotateZ(-180deg));
      @include transform-style(preserve-3d);
      width: 100%;
    }

    .face {
      display: block;
      height: 100%;
      position: absolute;
      @include transition(1s ease-in-out);
      width: 100%;

      &:after {
        @include backface-visibility(hidden);
        background-color: rgba(0, 0, 0, .2);
        border: 1px solid rgba(0, 0, 0, .2);
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        width: 100%;
      }

      &:not(.bottom) {
        background: radial-gradient(transparent 30%, rgba(0, 0, 0, .1) 100%);
      }
    }

    .floor {
      background-color: rgba(0, 0, 0, .5);
      height: 100%;
      position: absolute;
      @include filter(blur(50px));
      @include translateZ(-50px);
      width: 100%;
    }

    .front {
      @include transform-origin-top(0%);
    }

    .right {
      @include transform-origin-left(0%);
      @include transition-delay(.3s);
    }

    .back {
      @include transform-origin-top(0%);
      @include transition-delay(.6s);
    }

    .left {
      @include transform-origin-left(0%);
      @include transition-delay(.9s);
    }

    .top {
      @include transition-delay(1.2s);
    }

    &.ready {
      .front {
        @include rotateX(90deg);
      }

      .right {
        @include rotateY(-90deg);
      }

      .back {
        @include rotateX(90deg);
      }

      .left {
        @include rotateY(-90deg);
      }
    }
  }

</style>
