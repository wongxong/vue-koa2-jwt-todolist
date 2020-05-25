import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Signin',
    component: () => import('../views/signin.vue')
  },
  {
    path: '/todoList',
    name: 'TodoList',
    component: () => import('../views/todoList.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  if(to.path === '/') {
    if(token) {
      next('/todoList');
    } else {
      next();
    }
  } else {
    if(token) {
      next();
    } else {
      next('/');
    }
  }
});

export default router;
