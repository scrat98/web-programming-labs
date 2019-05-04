<template>
  <div id="content">
    <div class="d-flex justify-content-around mt-2 mb-2">
      <b-button to="/documents">Documents List</b-button>
      <b-button variant="success" @click="save">Save new doc</b-button>
    </div>
    <div id="editor">
      <textarea v-model="content" @change="onChange"></textarea>
      <div v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>

<script>
  import marked from 'marked';
  import api from '../api/documents';

  export default {
    data() {
      return {
        content: '# hello',
        saved: true,
      };
    },
    computed: {
      compiledMarkdown: function () {
        if (!this.content) return '';
        return marked(this.content, { sanitize: true });
      },
    },
    methods: {
      onChange() {
        this.saved = false;
        console.log('CHANGE');
      },
      save() {
        api
          .createDocument(this.content)
          .then((doc) => {
            this.$router.replace(`/document/${doc._id}`);
          })
          .catch(() => alert('Unable to create document'));
      },
    },
  };
</script>

<style scoped>
  #content, #editor {
    margin: 0;
    height: 100%;
    font-family: "Helvetica Neue", Arial, sans-serif;
    color: #333;
  }

  textarea, #editor div {
    display: inline-block;
    border: 1px solid #ccc;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }

  textarea {
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: "Monaco", courier, monospace;
    padding: 20px;
  }
</style>
