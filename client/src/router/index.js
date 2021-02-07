import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tasks',
    component: () => import(/* webpackChunkName: "tasks" */ '@/views/TasksView.vue'),
  },
  {
    path: '/tasks/new',
    name: 'new',
    component: () => import(/* webpackChunkName: "newTask" */ '@/views/NewTaskView.vue'),
  },
  {
    path: '/tasks/:id',
    name: 'task',
    component: () => import(/* webpackChunkName: "task" */ '@/views/TaskView.vue'),
    props: true,
  },
  {
    path: '/404',
    alias: '*',
    name: 'notFound',
    component: () => import(/* webpackChunkName: "notFound" */ '@/views/404.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let isPopStateEventFired = false
  if (from.name === 'task') {
    const onPopState = () => {
      isPopStateEventFired = true
      next({ name: 'tasks' })
      window.removeEventListener('popstate', onPopState)
    }
    window.addEventListener('popstate', onPopState)
  }

  if (!isPopStateEventFired) {
    next()
  }
})

export default router
