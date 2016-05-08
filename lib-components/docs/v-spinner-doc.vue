<template>
  <div id="v-spinner" class="bs-docs-section">
    <h1 class="page-header">
      <a href="#v-spinner" class="anchor">V-Spinner</a>
    </h1>

    <div class="bs-example">
      <v-spinner type="bubbles" v-bind:size="40"></v-spinner>
      <v-spinner type="circles" v-bind:size="50"></v-spinner>
      <v-spinner type="waves" v-bind:size="60"></v-spinner>
    </div>

    <pre><code class="language-markup"><script type="language-mark-up">
<v-spinner type="bubbles" v-bind:size="40"></v-spinner>
<v-spinner type="circles" v-bind:size="50"></v-spinner>
<v-spinner type="waves" v-bind:size="60"></v-spinner>
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
          <td>type</td>
          <td><code>String</code>(<code>required</code>)</td>
          <td><code>bubbles</code></td>
          <td>旋转类型类型，可选类型：<code>bubbles</code>、<code>circles</code></td>
        </tr>
        <tr>
          <td>size</td>
          <td><code>Number</code></td>
          <td><code>undefined</code></td>
          <td>旋转器的尺寸</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import vSpinner from '../src/v-spinner.vue';

  export default {
    components: {
      vSpinner,
    },
  };
</script>

<style lang="sass">
  #v-spinner {
    .bs-example {
      display: flex;
    }

    .v-spinner {
      background-color: #ddd;
      height: 80px;
      width: 80px;
    }
  }

</style>
