import Vue from 'vue';
import Router from 'vue-router';
import store from './store.ts'
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Devices from './views/Devices.vue';
import Dashboard from './components/Dashboard.vue';
Vue.use(Router);

let router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [ 
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/devices',
          alias: '',
          component: Devices,
          name: 'Devices',
          meta: {
              requiresAuth: true
            }
        }
      ],
      meta: {
              requiresAuth: true
            }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
