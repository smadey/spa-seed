<template>
  <div class="v-img" v-bind:class="{'v-img-loading': loading, 'v-img-loaded': !loading && loaded, 'v-img-error': !loading && error, 'v-img-cache': cache}">
    <div class="v-img-spinner" v-if="loading" v-bind:style="spinnerStyle"></div>
    <p class="v-img-msg" v-if="!loading && error" transition="img">加载失败</p>

    <template v-if="!loading && loaded">
      <img v-if="adaptive" v-bind:src="src" transition="img" alt="">
      <div class="img" v-if="!adaptive" transition="img" v-bind:style="imgStyle"></div>
    </template>
  </div>
</template>

<script>
  export default {
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
        default: 0
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
      imgStyle () {
        return {
          'background-image': 'url("' + this.src + '")'
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
        console.log(arguments)
        this.load()
      }
    },
    ready () {
      if (this.lazy) {
        if (window.addEventListener) {
          window.addEventListener('scroll', onScroll.bind(this), false)
        }
      } else {
        this.load()
      }

      function onScroll () {
        if (!this.loading && !this.loaded && !this.error && this.isInViewport()) {
          this.load()

          if (window.removeEventListener) {
            window.removeEventListener('scroll', onScroll)
          }
        }
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

      isInViewport () {
        let winWidth = window.innerWidth
        let winHeight = window.innerHeight

        let winScrollTop = window.pageYOffset
        let winScrollLeft = window.pageXOffset

        let offset = this.getOffset()
        let width = this.$el.innerWidth
        let height = this.$el.innerHeight

        let isTopOfScreen = winScrollTop >= offset.top + height - this.threshold
        let isRightOfScreen = winWidth + winScrollLeft <= offset.left - this.threshold
        let isBottomOfScreen = winHeight + winScrollTop <= offset.top - this.threshold
        let isLeftOfScreen = winScrollLeft >= offset.left + width - this.threshold

        return !isTopOfScreen && !isRightOfScreen && !isBottomOfScreen && !isLeftOfScreen
      },

      getOffset () {
        let el = this.$el

        if (!el.getClientRects().length) {
          return { top: 0, left: 0 }
        }

        let rect = el.getBoundingClientRect()

        if (rect.width || rect.height) {
          let docElem = el.ownerDocument.documentElement

          return {
            top: rect.top + window.pageYOffset - docElem.clientTop,
            left: rect.left + window.pageXOffset - docElem.clientLeft
          }
        }

        return rect
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

    &:not(&-cache) {
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
