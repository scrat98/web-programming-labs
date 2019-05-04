import api from './baseApiConfig';

export default {
  fetchDocuments() {
    return api().get('documents').then(res => res.data);
  },
  fetchDocument(id) {
    return api().get(`documents/${id}`).then(res => res.data);
  },
  createDocument(content) {
    return api().post('documents', { content }).then(res => res.data);
  },
  deleteDocument(id) {
    return api().delete(`documents/${id}`).then(res => res.data);
  },
  saveDocument(id, content) {
    return api().put(`documents/${id}`, { content }).then(res => res.data);
  },
};
