import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/Auth/AuthView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import TasksView from '@/views/TasksView.vue'

const routes = [
  {path: '/', component: AuthView, name: 'Auth'},
  {path: '/dashboard', component: DashboardView, name: 'Dashboard'},
  {path: '/projects', component: ProjectsView, name: 'Projects'},
  {path: '/tasks', component: TasksView, name: 'Tasks'},
  {path: '/profile', component: ProfileView, name: 'Profile'}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})



export default router 

