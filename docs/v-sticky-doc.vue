<template>
  <div id="v-sticky" class="bs-docs-section">
    <h1 class="page-header">
      <a href="#v-sticky" class="anchor">V-Sticky</a>
    </h1>

    <div class="bs-example">
      <v-sticky>
        <h1>this is the sticky element</h1>
      </v-sticky>
    </div>

    <pre><code class="language-markup"><script type="language-mark-up">
<v-sticky>
  <h1>this is the sticky element</h1>
</v-sticky>
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
          <td>top</td>
          <td><code>Number</code></td>
          <td><code>undefined</code></td>
          <td>fixed的top值</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import vSticky from '../src/v-sticky.vue'

  export default {
    components: {
      vSticky
    }
  }
</script>

<style lang="sass">
  @import '../src/sass-mixins/_mixin.scss';

  #v-sticky .v-sticky {
  }

</style>
