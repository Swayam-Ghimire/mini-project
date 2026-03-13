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
      <StatusCard heading="Projects" attribute="projects" :count="countProjects">
        <svg
          xmlns="http://www.w3.org"
          width="24"
          height="24"
          fill="red"
          class="bi bi-folder2-open me-2 text-primary"
          viewBox="0 0 16 16"
        >
          <path
            d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184l.79.891h5.135A1.5 1.5 0 0 1 15 5.5V13a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13zM2.5 3a.5.5 0 0 0-.5.5V13a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V5.5a.5.5 0 0 0-.5-.5H8.336a.5.5 0 0 1-.377-.171l-.887-1.002C6.56 3.251 6.042 3 5.264 3z"
          />
        </svg>
      </StatusCard>

      <!-- User card -->
      <StatusCard heading="Users" attribute="users" :count="countUsers">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </StatusCard>
    </div>
  </div>
</template>
