<template>
  <div id="v-img" class="bs-docs-section">
    <h1 class="page-header">
      <a href="#v-img" class="anchor">V-Img</a>
    </h1>

    <div class="bs-example">
      <v-img src="http://www.ibabycenter.com/front/images/index/1.png" adaptive></v-img>
    </div>

    <pre><code class="language-markup"><script type="language-mark-up">
<v-img src="http://www.ibabycenter.com/front/images/index/1.png" adaptive></v-img>
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
          <td>src</td>
          <td><code>String</code>(<code>required</code>)</td>
          <td><code>undefined</code></td>
          <td>图片地址</td>
        </tr>
        <tr>
          <td>spinnerSize</td>
          <td><code>String</code></td>
          <td><code>50px</code></td>
          <td>加载状态的尺寸</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import vImg from '../src/v-img.vue'

  export default {
    components: {
      vImg
    }
  }
</script>

<style lang="sass">
  @import '../src/sass-mixins/_mixin.scss';

  #v-img .v-img {
    height: 100px;
    margin: 10px auto;
    width: 100px;
  }

</style>
