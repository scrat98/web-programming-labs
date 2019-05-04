<template>
  <b-container fluid>
    <b-button variant="success" @click="newDocument" class="mb-4">New Document</b-button>
    <b-table hover show-empty :items="items" :fields="fields">
      <template slot="actions" slot-scope="row">
        <b-button @click="edit(row.item, row.index)" class="mr-1">
          Edit
        </b-button>
        <b-button variant="danger" @click="remove(row.item, row.index)">
          Delete
        </b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
  import api from '../api/documents';

  export default {
    name: 'Documents Lists',
    data() {
      return {
        items: [],
        fields: [{ _id: 'id' }, { key: 'actions', label: 'Actions' }],
      };
    },
    mounted() {
      api.fetchDocuments().then(docs => (this.items = docs));
    },
    methods: {
      newDocument() {
        this.$router.replace(`/new`);
      },
      edit(item) {
        this.$router.replace(`/document/${item._id}`);
      },
      remove(item, index) {
        api.deleteDocument(item._id).then(() => this.items.splice(index, 1));
      },
    },
  };
</script>
