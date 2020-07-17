export default [
  {
    path: '/',
    name: 'redindex',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      title: '小豆芽助手',
      keepAlive: true
    },
    component: () => import('@/views/index.vue')
  },
  {
    path: '/error404',
    name: 'error404',
    meta: {
      title: '404'
    },
    component: () => import('@/views/error/error404.vue')
  }
]
