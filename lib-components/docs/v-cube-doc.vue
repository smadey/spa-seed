<template>
  <div id="v-cube" class="bs-docs-section">
    <h1 class="page-header">
      <a href="#v-cube" class="anchor">V-Cube</a>
    </h1>

    <div class="bs-example">
      <div class="cubes">
        <v-cube :height="100" animation="rotating" floor></v-cube>
        <v-cube :size="100" animation="rotating-reverse"></v-cube>
        <v-cube :size="100" animation="rotating-reverse"></v-cube>
      </div>
    </div>

    <pre><code class="language-markup"><script type="language-mark-up">
<div class="cubes">
  <v-cube :height="100" animation="rotating" floor></v-cube>
  <v-cube :size="100" animation="rotating-reverse"></v-cube>
  <v-cube :size="100" animation="rotating-reverse"></v-cube>
</div>
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
          <td>size</td>
          <td><code>Number</code></td>
          <td><code>undefined</code></td>
          <td>正方体的尺寸</td>
        </tr>
        <tr>
          <td>length</td>
          <td><code>Number</code></td>
          <td><code>50px</code></td>
          <td>长方体的长，默认元素的width</td>
        </tr>
        <tr>
          <td>width</td>
          <td><code>Number</code></td>
          <td><code>undefined</code></td>
          <td>长方体的宽，默认元素的height</td>
        </tr>
        <tr>
          <td>length</td>
          <td><code>Number</code></td>
          <td><code>undefined</code></td>
          <td>长方体的高，默认width和height中的最小值</td>
        </tr>
        <tr>
          <td>initialized</td>
          <td><code>Boolean</code></td>
          <td><code>false</code></td>
          <td>是否展示动画之后的状态，默认不展示，即显示初始化动画</td>
        </tr>
        <tr>
          <td>animation</td>
          <td><code>String</code></td>
          <td><code>undefined</code></td>
          <td>动画效果，可选效果：<code>rotating</code>、<code>rotating-reverse</code></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import vCube from '../src/v-cube.vue';

  export default {
    components: {
      vCube,
    },
  };
</script>

<style lang="sass">
  #v-cube .cubes {
    height: 200px;
    margin: 30px auto 80px;
    position: relative;
    width: 200px;

    .v-cube {
      left: 0;
      position: absolute;
      right: 0;

      &:nth-child(2) {
        top: 9px;
      }

      &:nth-child(3) {
        bottom: 9px;
      }
    }
  }

</style>
