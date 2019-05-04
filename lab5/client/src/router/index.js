import Vue from 'vue';
import Router from 'vue-router';
import DocumentsList from '../view/DocumentsList';
import DocumentView from '../view/DocumentView';
import DocumentNew from '../view/DocumentNew';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      alias: '/new',
      name: 'DocumentNew',
      component: DocumentNew,
    },
    {
      path: '/documents',
      name: 'DocumentsList',
      component: DocumentsList,
    },
    {
      path: '/document/:id',
      name: 'DocumentView',
      component: DocumentView,
    },
  ],
});
