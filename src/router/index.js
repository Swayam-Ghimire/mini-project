import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js'
import AuthView from '@/views/Auth/AuthView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import TasksView from '@/views/TasksView.vue'

const routes = [
  {path: '/', component: AuthView, name: 'Auth'},
  {path: '/dashboard', component: DashboardView, name: 'Dashboard', meta: { requiresAuth:true }},
  {path: '/projects', component: ProjectsView, name: 'Projects', meta: { requiresAuth:true }},
  {path: '/tasks', component: TasksView, name: 'Tasks', meta: { requiresAuth:true }},
  {path: '/profile', component: ProfileView, name: 'Profile', meta: { requiresAuth:true }}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Setting up Global Navigation Guard
router.beforeEach((to, from, next)=>{
  // Check if the route we are navigating TO has the requiresAuth meta tag
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth) /* Vue Router builds to.matched by matching the current URL against the route configuration during navigation.  It selects only the route records (from the routes array) that correspond to the target path*/ 

  const isAuthenticated = store.getters.isAuthenticated

  if (requiresAuth && !isAuthenticated) {
    // if the page requires authe and the user is not logged in
    next('/')
  }
  else {
    // let them proceed to page they requested
    return next()
  }
})



export default router 

