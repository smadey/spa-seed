<template>
  <div class="v-loading" v-if="show">
    <v-spinner type="bubbles"></v-spinner>
  </div>
</template>

<script>
  import vSpinner from './v-spinner.vue';

  export default {
    components: {
      vSpinner,
    },

    props: {
      show: {
        type: Boolean,
        required: true,
      },
    },

    watch: {
      show(val) {
        const body = document.body;

        if (body.classList) {
          if (val) {
            body.classList.add('loading');
          } else {
            body.classList.remove('loading');
          }
        }
      },
    },

  };
</script>

<style lang="sass">
  body.loading {
    overflow: hidden;
  }

  .v-loading {
    background-color: rgba(0, 0, 0, .15);
    bottom: 0;
    left: 0;
    pointer-events: none;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;
  }

</style>
