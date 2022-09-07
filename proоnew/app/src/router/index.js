import { createRouter, createWebHistory } from 'vue-router'

const ifAuthenticated = (to, from, next) => {
 if (localStorage.getItem('token')) {
   next();
   return;
 }
 router.push({ 
   name: 'login',
   params: {
     returnTo: to.path,
     query: to.query,
   },
 });
};

const ifAdmin = (to, from, next) => {
 if (localStorage.getItem('auth_user_role') == 'ADMIN') {
   next();
   return;
 }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/TotalViews.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/book/view/:book_id',
      name: 'book_view',

      component: () => import('../views/BookView.vue'),
       beforeEnter: ifAuthenticated
    },
    
    {
      path: '/sign',
      name: 'sign',

      component: () => import('../views/SignUpViews.vue')
    },
    {
      path: '/login',
      name: 'login',

      component: () => import('../views/LoginViews.vue')
    },
    {
      path: '/first',
      name: 'first',

      component: () => import('../views/FirstViews.vue'),
       beforeEnter: ifAuthenticated
    },
    {
      path: '/second',
      name: 'second',

      component: () => import('../views/SecondViews.vue'),
       beforeEnter: ifAuthenticated
    },
    {
      path: '/third',
      name: 'third',

      component: () => import('../views/ThirdViews.vue'),
       beforeEnter: ifAuthenticated
    },
    {
      path: '/book',
      name: 'book',

      component: () => import('../views/AddBook.vue'),
       beforeEnter: ifAdmin
    },
  ]
  
})

export default router
