<template>
  <div class="v-cube" v-bind:class="cubeClass" v-bind:style="cubeStyle">
    <div class="v-cube-inner" v-bind:style="innerStyle">
      <div class="face bottom"></div>
      <div class="face left" v-bind:style="lrStyle"></div>
      <div class="face back" v-bind:style="bfStyle"></div>

      <div class="floor" v-if="floor"></div>
    </div>

    <div class="v-cube-inner" v-bind:style="innerStyle">
      <div class="v-cube-inner">
        <div class="face right" v-bind:style="lrStyle"></div>
        <div class="face front" v-bind:style="bfStyle"></div>
        <div class="face top" v-bind:style="topStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { _ } from 'ylib';

  export default {
    props: {
      size: {
        type: Number,
      },
      length: {
        type: Number,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      initialized: {
        type: Boolean,
        default: false,
      },
      animation: {
        type: String,
      },
      floor: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        ready: false,
      };
    },

    computed: {
      cubeClass() {
        return {
          ready: this.ready,
          rotating: this.animation === 'rotating',
          'rotating-reverse': this.animation === 'rotating-reverse',
        };
      },

      cubeStyle() {
        return {
          height: `${this.width}px`,
          width: `${this.length}px`,
        };
      },

      innerStyle() {
        return {
          transform: `translateZ(-${this.height / 2}px)`,
        };
      },

      lrStyle() {
        if (!this.ready) {
          return null;
        }

        return {
          width: `${this.height}px`,
        };
      },

      bfStyle() {
        if (!this.ready) {
          return null;
        }

        return {
          height: `${this.height}px`,
        };
      },

      topStyle() {
        if (!this.ready) {
          return null;
        }

        return {
          transform: `translateZ(${this.height}px)`,
        };
      },
    },

    ready() {
      if (this.size) {
        this.length = this.width = this.height = this.size;
      }

      if (!this.length) {
        this.length = this.$el.clientWidth;
      }

      if (!this.width) {
        this.width = this.$el.clientHeight;
      }

      if (!this.height) {
        this.height = Math.min(this.width, this.length);
      }

      if (this.initialized) {
        this.ready = true;
      } else {
        _.asap(() => (this.ready = true));
      }
    },

  };
</script>

<style lang="sass">
  .v-cube {
    height: 100%;
    margin: auto;
    position: relative;
    transform: rotateX(54.5deg) rotateZ(45deg);
    transform-style: preserve-3d;
    width: 100%;

    &.rotating {
      animation: v-cube-rotate 5s ease-in-out infinite 3s;
    }

    &.rotating-reverse {
      animation: v-cube-rotate-reverse 5s ease-in-out infinite 3s;
    }

    &-inner {
      height: 100%;
      position: absolute;
      transform-style: preserve-3d;
      width: 100%;

      & > & {
        transform: rotateZ(-180deg);
      }
    }

    .face {
      // backface-visibility: hidden;
      background: radial-gradient(transparent 30%, rgba(0, 0, 0, .05) 100%);
      display: block;
      height: 100%;
      position: absolute;
      transition: 1s ease-in-out;
      width: 100%;

      &:after {
        background-color: rgba(0, 0, 0, .05);
        border: 1px solid rgba(0, 0, 0, .05);
        content: '';
        display: block;
        left: -50%;
        height: 200%;
        position: absolute;
        transform: scale(.5);
        top: -50%;
        width: 200%;
      }
    }

    .back, .front {
      transform-origin: 50% 0%;
    }

    .left, .right {
      transform-origin: 0% 50%;
    }

    .floor {
      background-color: rgba(0, 0, 0, .5);
      filter: blur(50px);
      height: 100%;
      position: absolute;
      transform: translateZ(-50px);
      width: 100%;
    }

    .right {
      transition-delay: .3s;
    }

    .back {
      transition-delay: .6s;
    }

    .left {
      transition-delay: .9s;
    }

    .top {
      transition-delay: 1.2s;
    }

    &.ready {
      .back, .front {
        transform: rotateX(90deg);
      }

      .left, .right {
        transform: rotateY(-90deg);
      }
    }
  }

  @keyframes v-cube-rotate {
    0% {
      transform: rotateX(54.5deg) rotateZ(45deg);
    }
    20%, 100% {
      transform: rotateX(54.5deg) rotateZ(225deg);
    }
  }

  @keyframes v-cube-rotate-reverse {
    0% {
      transform: rotateX(54.5deg) rotateZ(225deg);
    }
    20%, 100% {
      transform: rotateX(54.5deg) rotateZ(45deg);
    }
  }
</style>
