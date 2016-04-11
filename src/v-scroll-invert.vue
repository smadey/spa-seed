<template>
  <div class="v-scroll-invert">
    <div v-el:origin class="origin">
      <slot></slot>
    </div>
    <div v-el:mask class="revert-mask">
      <div v-el:revert class="revert">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import _ from 'lodash';

  import { domEventDestroyers } from './mixins';

  export default {
    mixins: [domEventDestroyers],

    props: {
      initColor: {
        type: String,
        default: '#000',
      },
    },

    data() {
      return {
        originColor: this.initColor,
      };
    },

    ready() {
      const scrollFn = _.throttle(this.onScroll, 1000 / 60);

      $(window).on('scroll', scrollFn);

      this.addDomEventDestroyer('windowScroll', () => {
        $(window).off('scroll', scrollFn);
      });

      this.setColors(this.originColor, this.originColor);
    },

    methods: {
      getReferenceByPoint(x, y) {
        const ATTR_NAME = 'scroll-invert-color';

        const el = document.elementFromPoint(x, y);

        let $el = $(el);
        let color = $el.attr(ATTR_NAME);

        if (!color) {
          $el = $el.closest(`[${ATTR_NAME}]`);
          color = $el.attr(ATTR_NAME);
        }

        if (!color) {
          color = this.initColor;
        }

        if (!$el.length) {
          $el = null;
        }

        return { color, $el };
      },

      onScroll() {
        const winScrollTop = $(window).scrollTop();

        const $el = $(this.$el);
        const elOffset = $el.offset();
        const elX = elOffset.left;
        const elStartY = elOffset.top - winScrollTop;
        const elEndY = elStartY + $el.outerHeight();

        $el.parent().css('z-index', -1);

        const startRef = this.getReferenceByPoint(elX, elStartY);
        const endRef = this.getReferenceByPoint(elX, elEndY);

        $el.parent().css('z-index', '');

        if (startRef.color !== endRef.color) {
          let elCurrY;

          if (startRef.$el) {
            elCurrY = startRef.$el.offset().top - winScrollTop + startRef.$el.outerHeight();
          } else if (endRef.$el) {
            elCurrY = endRef.$el.offset().top - winScrollTop;
          }

          const ratio = (elCurrY - elStartY) * 100 / (elEndY - elStartY);

          this.setColors(startRef.color, endRef.color);
          this.setPosition(`${ratio}%`);
        } else if (this.originColor !== startRef.color) {
          this.originColor = startRef.color;
          this.setColors(startRef.color, endRef.color);
        }
      },

      setColors(originColor, revertColor) {
        const ATTR_NAME = 'scroll-invert-el';

        $(this.$els.origin).find(`[${ATTR_NAME}]`).css('color', originColor);
        $(this.$els.revert).find(`[${ATTR_NAME}]`).css('color', revertColor);
      },

      setPosition(top) {
        $(this.$els.mask).css('top', top);
        $(this.$els.revert).css('top', `-${top}`);
      },

    },

  };
</script>

<style lang="sass">
  .v-scroll-invert {
    overflow: hidden;
    position: absolute;

    .origin,
    .revert-mask,
    .revert {
      height: 100%;
      left: 0;
      overflow: hidden;
      position: absolute;
      top: 0;
      width: 100%;
    }

    .origin {
      z-index: 0;
    }

    .revert-mask {
      z-index: 1;
    }
  }
</style>
