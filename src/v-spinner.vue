<template>
  <div class="v-spinner" v-bind:class="'v-spinner-' + type">
    <div class="v-spinner-inner" v-bind:style="spinnerStyle">
      <template v-for="(name, arr) in types">
        <template v-if="name == type">
          <div class="v-spinner-child" v-for="d in arr" track-by="$index"></div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
      },
    },

    data() {
      return {
        types: {
          bubbles: Array(12),
          circles: Array(12),
          waves: Array(5),
        },
      };
    },

    computed: {
      spinnerStyle() {
        if (!this.size) {
          return null;
        }

        return {
          height: `${this.size}px`,
          width: `${this.size}px`,
        };
      },

    },

  };
</script>

<style lang="sass">
  @import './variables.scss';

  .v-spinner {
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 100%;

    &-inner {
      height: 50px;
      left: 50%;
      position: absolute;
      transform: translate3d(-50%, -50%, 0);
      top: 50%;
      width: 50px;
    }

    &-bubbles,
    &-circles {
      $animationDuration: 1.2s;
      $childCount: 12;

      .v-spinner-child {
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;

        &:before {
          animation: $animationDuration infinite ease-in-out both;
          background-color: $v-spinner-color;
          border-radius: 100%;
          content: '';
          display: block;
          height: 15%;
          margin: 0 auto;
          width: 15%;
        }

        @for $i from 2 through $childCount {
          &:nth-child(#{$i}) {
            transform: rotate(360deg / $childCount * ($i - 1));
          }
        }

        @for $i from 2 through $childCount {
          &:nth-child(#{$i}):before {
            animation-delay: - $animationDuration + $animationDuration / $childCount * ($i - 1);
          }
        }
      }
    }

    &-bubbles {
      .v-spinner-child:before {
        animation-name: v-spinner-bubbles;
      }
    }

    &-circles {
      .v-spinner-child:before {
        animation-name: v-spinner-circles;
      }
    }

    &-waves {
      $animationDuration: 1.2s;
      $childCount: 5;
      $delayRange: 0.4s;

      font-size: 10px;
      text-align: center;

      .v-spinner-child {
        animation: v-spinner-waves $animationDuration infinite ease-in-out;
        background-color: $v-spinner-color;
        display: inline-block;
        height: 100%;
        width: 10%;

        &:not(:first-child) {
          margin-left: 3px;
        }

        @for $i from 1 through $childCount {
          &:nth-child(#{$i}) {
            animation-delay: -$animationDuration + $delayRange / ($childCount - 1) * ($i - 1);
          }
        }
      }
    }
  }

  @keyframes v-spinner-bubbles {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1.0);
    }
  }

  @keyframes v-spinner-circles {
    0%, 80%, 100% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
  }

  @keyframes v-spinner-waves {
    0%, 40%, 100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1.0);
    }
  }
</style>
