<template>
  <div class="v-list">
    <div class="list-loading" v-if="loading" >
      <v-spinner type="bubbles" v-bind:size="40"></v-spinner>
    </div>
    <div class="list-nodata" v-if="nodata">
      <solt name="nodata"></solt>
    </div>
    <slot name="list" v-if="!nodata"></slot>
  </div>
</template>

<script>
  import { $, _ } from 'ylib';

  import eventMixin from './mixins/eventMixin';
  import vSpinner from './v-spinner.vue';

  export default {
    components: {
      vSpinner,
    },

    mixins: [eventMixin],

    props: {
      opposite: {
        type: Boolean,
        default: false,
      },
      limit: {
        type: Number,
        default: 10,
      },
      loader: Function,
      scroller: {
        type: String,
        default: 'body',
      },
      distance: {
        type: String,
        default: '2.5%',
      },
    },

    data() {
      return {
        loading: false,
        nodata: false,
        isend: true,
        offset: 0,
        total: 0,
        lastUpdateTime: null,
        items: [],
      };
    },

    ready() {
    },

    methods: {
      addItem(item) {
        if (item) {
          this.items.push(item);
          this.$dispatch('itemsChange', this.items);

          if (this.opposite) {
            this.calcOppositeScrollTop();
          }
        }
        return this;
      },

      bindScroll() {
        if (this.limit) {
          this.on(window, 'scroll', _.throttle(() => {
            if (!this.isend && !this.loading && !this.isSafePosition()) {
              this.loadMore();
            }
          }, 1000 / 60));
        }
        return this;
      },

      calcOppositeScrollTop() {
        const $this = $(this.$el);

        const oldHeight = $this.height();
        const oldScrollTop = $(this.scroller).scrollTop();

        this.$nextTick(() => {
          this.scrollTo(oldScrollTop + ($this.height() - oldHeight));
        });

        return this;
      },

      loadFromServer() {
        this.error = null;
        this.loading = true;

        let params;

        if (this.limit) {
          params = {
            offset: this.offset,
            limit: this.limit,
          };

          if (this.offset > 0 && this.lastUpdateTime) {
            params.lastupdatetime = this.lastUpdateTime;
          }
        }

        return this.loader(params).then((result) => {
          this.loading = false;
          this.setData(result);
        }, (err) => {
          this.loading = false;
          this.error = err;
        });
      },

      loadMore() {
        this.offset += this.limit;
        return this.loadFromServer();
      },

      init() {
        if (this.opposite) {
          this.$nextTick(() => {
            this.scrollToBottom();

            setTimeout(() => {
              this.bindScroll();
            }, 0);
          });
        } else {
          this.bindScroll();
        }

        return this;
      },

      isSafePosition() {
        const $scroller = $(this.scroller);
        const offset = $(this.$el).offset();

        const maxScrollTop = offset.height + offset.top - window.innerHeight;
        const curScrollTop = $scroller.scrollTop();

        const isPercent = this.distance.indexOf('%') !== -1;
        const distance = isPercent ?
          maxScrollTop * parseFloat(this.distance) / 100 : parseFloat(this.distance);

        const remainScrollTop = this.opposite ? curScrollTop : (maxScrollTop - curScrollTop);

        return remainScrollTop > distance;
      },

      refresh() {
        this.offset = 0;
        return this.loadFromServer();
      },

      scrollTo(value) {
        $(this.scroller).scrollTop(value);
        return this;
      },

      scrollToBottom() {
        const offset = $(this.$el).offset();
        const maxScrollTop = offset.height + offset.top - window.innerHeight;

        this.scrollTo(maxScrollTop);
        return this;
      },

      scrollToTop() {
        this.scrollTo(0);
        return this;
      },

      setData(data) {
        if (this.limit && !(data && Array.isArray(data.list))) {
          throw new Error('列表 -> 解析返回结果失败');
        }

        if (this.limit) {
          const list = this.opposite ? data.list.reverse() : data.list;

          if (this.offset) {
            if (this.opposite) {
              this.items = list.concat(this.items);
              this.calcOppositeScrollTop();
            } else {
              this.items = this.items.concat(list);
            }
          } else {
            this.items = list;
            this.lastUpdateTime = data.lastupdatetime;
          }

          this.total = data.total;
          this.isend = !list.length || this.total <= this.items.length;
        } else {
          this.items = data;
        }

        this.$dispatch('itemschange', this.items);
        return this;
      },

    },

  };
</script>

<style lang="sass">
  .v-list {
    .list-loading,
    .list-nodata {
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
</style>
