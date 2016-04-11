<template>
  <div id="v-scroll-in" class="bs-docs-section">
    <h1 class="page-header">
      <a href="#v-scroll-in" class="anchor">V-Scroll-In</a>
    </h1>

    <div class="bs-example">
      <v-scroll-in>
        <h3>This is scroll in content</h3>
      </v-scroll-in>
    </div>

    <pre><code class="language-markup"><script type="language-mark-up">
<v-scroll-in>
  <h3>This is scroll in content</h3>
</v-scroll-in>
    </script></code></pre>

    <h2>Options</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>threshold</td>
          <td><code>Number</code></td>
          <td><code>0</code></td>
          <td>延迟加载提前量</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import vScrollIn from '../src/v-scroll-in.vue';

  export default {
    components: {
      vScrollIn,
    },
  };
</script>

<style lang="sass">
  #v-scroll-in {

    .v-scroll-in {
      background-color: #000;
      color: #fff;
      padding: 10px;
    }
  }

</style>
