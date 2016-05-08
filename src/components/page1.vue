<template>
  <div class="page1">
    This is page1.

    <a v-link="{name: 'page2'}">Go to Page2</a>
  </div>
</template>

<script>
  export default {
  };
</script>

<style lang="sass">
  .page1 {
    color: #000;
  }
</style>
