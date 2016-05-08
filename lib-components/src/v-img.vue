<template>
  <div class="v-img" v-bind:class="imgClass" v-bind:style="imgSize">
    <v-spinner v-if="loading" type="bubbles" v-bind:size="computedSpinnerStyle"></v-spinner>
    <p class="v-img-msg" v-if="!loading && error" transition="img">加载失败</p>

    <template v-if="!loading && loaded">
      <img v-if="adaptive" v-bind:src="src" transition="img" alt="">
      <div class="img" v-if="!adaptive" transition="img"
        v-bind:style="[imgSize, imgStyle]"></div>
    </template>
  </div>
</template>

<script>
  import { _, $ } from 'ylib';

  import { eventMixin } from './mixins';

  import vSpinner from './v-spinner.vue';

  export default {
    mixins: [eventMixin],

    components: {
      vSpinner,
    },

    props: {
      src: {
        type: String,
        required: true,
      },
      adaptive: {
        type: Boolean,
        default: false,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      lazy: {
        type: Boolean,
        default: false,
      },
      threshold: {
        type: Number,
        default: 50,
      },
      spinnerSize: {
        type: Number,
        default: 50,
      },
    },

    data() {
      return {
        loading: false,
        loaded: false,
        error: false,
        cache: false,
      };
    },

    computed: {
      imgClass() {
        return {
          'v-img-loading': this.loading,
          'v-img-loaded': !this.loading && this.loaded,
          'v-img-error': !this.loading && this.error,
          'v-img-cache': this.cache,
        };
      },

      imgSize() {
        if (this.adaptive) {
          return null;
        }

        const style = {};

        if (this.width > 0) {
          style.width = `${this.width}px`;
        }

        if (this.height > 0) {
          style.height = `${this.height}px`;
        }

        return style;
      },

      imgStyle() {
        return {
          'background-image': `url("${this.src}")`,
        };
      },

      computedSpinnerStyle() {
        let spinnerSize = this.spinnerSize;

        spinnerSize = Math.min(spinnerSize, $(this.$el).width() * 0.8);
        spinnerSize = Math.min(spinnerSize, $(this.$el).height() * 0.8);

        return spinnerSize;
      },
    },
    watch: {
      src() {
        this.load();
      },
    },
    ready() {
      if (this.lazy) {
        this.on(window, 'scroll', _.throttle(this.onScroll, 200));
      } else {
        this.load();
      }
    },

    methods: {
      load(isForce) {
        this.error = false;

        let img = document.createElement('img');
        img.src = this.src;

        if (img.complete && !isForce) {
          this.loading = false;
          this.loaded = true;

          this.cache = true;
          this.onSuccess();
        } else {
          this.loading = true;
          this.loaded = false;

          img.onload = this.onSuccess.bind(this);
          img.onerror = this.onError.bind(this);
        }

        img = null;
      },

      onSuccess() {
        this.loading = false;
        this.loaded = true;
      },

      onError() {
        this.loading = false;
        this.error = true;
      },

      onScroll() {
        if (!this.loading && !this.loaded && !this.error
          && $(this.$el).isInViewport(this.threshold)) {
          this.off(window, 'scroll');
          this.load();
        }
      },

    },

  };
</script>

<style lang="sass">
  .v-img {
    height: 100%;
    margin-left: auto;
    margin-right: auto;
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
      align-items: center;
      background-color: #efefef;
      display: flex;
      justify-content: center;
    }

    &-spinner {
      animation: v-img-loading 1s infinite linear;
      border-color: rgba(0, 0, 0, .15) rgba(0, 0, 0, .15) #fff;
      border-radius: 50%;
      border-style: solid;
      border-width: 5px;
      left: 50%;
      max-width: 80%;
      position: absolute;
      top: 50%;
      transform: translate3d(-50%, -50%, 0) ;
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
        transition: opacity .3s ease;
      }

      .img-enter {
        opacity: 0;
      }
    }
  }

  @keyframes v-img-loading {
    0% {
      transform: translate(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%, 0) rotate(360deg);
    }
  }
</style>
