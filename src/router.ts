import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Devices from './views/Devices.vue';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [ 
    {
      path: '/',
      name: 'devices',
      component: Devices,
    },
  ],
});
