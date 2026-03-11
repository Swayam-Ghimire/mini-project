<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import StatusCard from '@/components/StatusCard.vue'

const store = useStore()
const router = useRouter()
const countUsers = ref(store.state.users.length) // counting projects
const countProjects = ref(store.state.projects.length) // counting users
const name = ref(store.state.currentUser ? store.state.currentUser.name : '')
</script>
<template>
  <Navbar />
  <h1 class="mt-5 fw-bold text-center display-6">Welcome {{ name }}</h1>

  <!-- Parent container and row handle the horizontal alignment -->
  <div class="container mt-5">
    <div class="row justify-content-center g-4">
      <StatusCard heading="Projects" attribute="projects" :count=countProjects />
      <StatusCard heading="Users" attribute="users" :count=countUsers />
    </div>
  </div>
</template>
