<template>
  <div id="v-sticky" class="bs-docs-section">
    <h1 class="page-header">
      <a href="#v-sticky" class="anchor">V-Sticky</a>
    </h1>

    <div class="bs-example">
      <v-sticky v-on:fixed="onFixed" v-on:unfixed="onUnfixed">
        <h1>this is the first sticky element</h1>
      </v-sticky>

      <v-sticky :top="50">
        <h2>this is the second sticky element</h2>
      </v-sticky>

      <button v-on:click="stop">停止</button>
      <button v-on:click="resume">开始</button>
    </div>

    <pre><code class="language-markup"><script type="language-mark-up">
<v-sticky v-on:fixed="onFixed" v-on:unfixed="onUnfixed">
  <h1>this is the first sticky element</h1>
</v-sticky>

<v-sticky :top="50">
  <h2>this is the second sticky element</h2>
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
          <td><code>0</code></td>
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
    },
    methods: {
      onFixed () {
        console.log('fixed')
      },

      onUnfixed () {
        console.log('unfixed')
      },

      stop () {
        this.$broadcast('sticky.stop')
      },

      resume () {
        this.$broadcast('sticky.resume')
      }
    }
  }
</script>

<style lang="sass">
  @import '../src/sass-mixins/_mixin.scss';

  #v-sticky {
    padding-bottom: 200px;
  }

</style>
