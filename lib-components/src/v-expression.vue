<template>
  {{{html}}}
</template>

<script>
  import expressions from './img/expression';

  let div;

  function encode(content) {
    if (typeof content !== 'string' || !content) {
      return '';
    }

    if (!div) {
      div = document.createElement('div');
    }

    if (div.innerText) {
      div.innerText = content;
    } else {
      div.textContent = content; // Support firefox
    }

    return div.innerHTML;
  }

  export default {
    props: {
      content: {
        type: String,
        required: true,
      },
    },

    computed: {
      html() {
        return encode(this.content).replace(/\{:([a-z]+):\}/g, (match, key) =>
          `<img class="v-expression" src="${expressions[key]}" />`
        );
      },
    },

  };
</script>

<style lang="sass">
  .v-expression {
    margin-top: -0.2em;
    vertical-align: middle;
    width: 1.4em;
  }
</style>
