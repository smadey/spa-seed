<template>
  <div class="v-img" v-bind:class="imgClass">
    <div class="v-img-spinner" v-if="loading" v-bind:style="spinnerStyle"></div>
    <p class="v-img-msg" v-if="!loading && error" transition="img">加载失败</p>

    <template v-if="!loading && loaded">
      <img v-if="adaptive" v-bind:src="src" transition="img" alt="">
      <div class="img" v-if="!adaptive" transition="img" v-bind:style="imgStyle"></div>
    </template>
  </div>
</template>

<script>
  import {_, $} from 'ylib'
  import {domEventDestroyers} from './vue-mixins/index'

  export default {
    mixins: [domEventDestroyers],
    props: {
      src: {
        type: String,
        required: true
      },
      adaptive: {
        type: Boolean,
        default: false
      },
      lazy: {
        type: Boolean,
        default: false
      },
      threshold: {
        type: Number,
        default: 50
      },
      spinnerSize: {
        type: String,
        default: '50px'
      },
      avatar: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        loading: false,
        loaded: false,
        error: false,
        cache: false
      }
    },
    computed: {
      imgClass () {
        return {
          'v-img-loading': this.loading,
          'v-img-loaded': !this.loading && this.loaded,
          'v-img-error': !this.loading && this.error,
          'v-img-cache': this.cache
        }
      },

      imgStyle () {
        return {
          'background-image': `url("${this.src}")`
        }
      },

      spinnerStyle () {
        let size = parseInt(this.spinnerSize, 10)
        let unit = this.spinnerSize.replace(size, '')

        return {
          'height': size + unit,
          'margin-left': -size / 2 + unit,
          'margin-top': -size / 2 + unit,
          'width': size + unit
        }
      }
    },
    watch: {
      src () {
        this.load()
      }
    },
    ready () {
      if (this.lazy) {
        let scrollFn = _.throttle(this.onScroll, 200)

        $(window).on('scroll', scrollFn)

        this.addDomEventDestroyer('windowScroll', () => {
          $(window).off('scroll', scrollFn)
        })
      } else {
        this.load()
      }
    },

    methods: {
      load () {
        this.loading = true
        this.loaded = false
        this.error = false

        let img = document.createElement('img')
        img.src = this.src

        if (img.complete) {
          this.cache = true
          this.onSuccess()
        } else {
          img.onload = this.onSuccess.bind(this)
          img.onerror = this.onError.bind(this)
        }

        img = null
      },

      onSuccess () {
        this.loading = false
        this.loaded = true
      },

      onError () {
        this.loading = false
        this.error = true
      },

      onScroll () {
        if (!this.loading && !this.loaded && !this.error && $(this.$el).isInViewport(this.threshold)) {
          this.execDomEventDestroyer('windowScroll')
          this.load()
        }
      }
    }
  }
</script>

<style lang="sass">
  @import './sass-mixins/_mixin.scss';

  @include keyframe(img-loading) {
    0% {
      @include transform(rotate(0deg));
    }
    100% {
      @include transform(rotate(360deg));
    }
  }

  .v-img {
    height: 100%;
    position: relative;
    width: 100%;

    &-loading {
      background-color: #efefef;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: contain;
    }

    &-loaded {
    }

    &-error {
      @include align-items(center);
      background-color: #efefef;
      @include display-flex();
      @include justify-content(center);
    }

    &-spinner {
      @include animation(img-loading 1s infinite linear);
      border-color: rgba(0, 0, 0, .15) rgba(0, 0, 0, .15) #fff;
      border-radius: 50%;
      border-style: solid;
      border-width: 5px;
      left: 50%;
      position: absolute;
      top: 50%;
      @include transform(translateZ(0));
    }

    &-msg {
      color: #666;
      margin-bottom: 0;
      text-align: center;
    }

    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
    }

    .img {
      background-color: transparent;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }

    &:not([class*='cache']) {
      .img-transition {
        opacity: 1;
        @include transition(opacity .3s ease);
      }

      .img-enter {
        opacity: 0;
      }
    }
  }

</style>
