import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './components/app.vue';
import Page1 from './components/page1.vue';
import Page2 from './components/page2.vue';

import './filters';

Vue.use(VueRouter);

const router = new VueRouter({
  hashbang: false,
});

router.map({
  '/': {
    component: Page1,
  },
  '/page2': {
    name: 'page2',
    component: Page2,
  },
});

router.start(App, 'app');
