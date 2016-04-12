<template>
  <span v-bind:style="{width: max/2 + 'em'}">{{text}}</span>
</template>

<script>
  export default {
    props: {
      max: {
        type: Number,
        default: 6,
      },
    },

    data() {
      return {
        text: '.',
      };
    },

    ready() {
      this.update();
    },

    methods: {
      update() {
        let len = this.text.length;
        len = len === this.max ? 1 : (len + 1);

        this.text = Array(len + 1).join('.');

        setTimeout(() => this.update(), 200);
      },
    },

  };
</script>

<style scoped>
  span {
    display: inline-block;
    font-weight: bolder;
    letter-spacing: 2px;
  }
</style>
