const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/home.vue')
      },
      {
        path: 'create',
        component: () => import('pages/create.vue')
      },
      {
        path: 'search',
        component: () => import('pages/search.vue')
      },
      {
        path: 'scheduler',
        component: () => import('pages/scheduler.vue')
      },
      {
        path: 'login',
        component: () => import('pages/login.vue'),
        meta: {
          authRequired: false
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/404.vue')
  })
}

export default routes
