<template>
  <div class="v-chat-inputer">
    <form v-on:submit.prevent="onSend(text)">
      <div class="uploader">
        +<input type="file" v-model="file" v-on:change="onUpload" />
      </div>
      <textarea v-bind:placeholder="placeholder" v-model="text"></textarea>
      <input type="submit" value="发 送">
    </form>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: null,
      },
    },

    data() {
      return {
        text: '',
        file: '',
      };
    },

    ready() {
    },

    methods: {
      onSend(text) {
        this.$dispatch('send', text);
      },

      onSendSuccess() {
        this.text = '';
        this.file = '';
      },

      onUpload(e) {
        if (e.target.files[0]) {
          this.$dispatch('upload', e.target.files[0]);
        }
      },

    },

  };
</script>

<style lang="sass">
  .v-chat-inputer {
    background-color: #f7f7f7;
    border-top: 1px solid #d6d7dc;
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;

    form {
      display: flex;
      padding: 8px 5px;
    }

    .uploader {
      border: 1px solid #aaa;
      border-radius: 50%;
      color: #aaa;
      display: block;
      font-family: serif;
      font-size: 30px;
      height: 30px;
      line-height: 28px;
      overflow: hidden;
      position: relative;
      text-align: center;
      width: 30px;

      input {
        bottom: 0;
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
      }
    }

    textarea {
      -webkit-appearance: none;
      border: 1px solid #d6d7dc;
      border-radius: 3px;
      display: block;
      flex: 1;
      font-size: 14px;
      height: 34px;
      line-height: 17px;
      margin-left: 5px;
      margin-right: 5px;
      overflow: hidden;
      padding: 8px 10px;
      width: 100%;
    }

    input[type="submit"] {
      -webkit-appearance: none;
      background: #46c6fe;
      border: 0;
      border-radius: 3px;
      color: #fff;
      font-size: 14px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      width: 70px;
    }
  }
</style>
