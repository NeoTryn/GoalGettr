import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './../views/HomeView.vue'
import TaskView from './../views/TaskView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/task', component: TaskView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
