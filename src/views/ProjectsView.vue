<script setup>
import Navbar from '@/components/Navbar.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import AddButton from '@/components/AddButton.vue'

import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
const router = useRoute()
const store = useStore()

// Fetch projects

onMounted(()=>{
    store.dispatch('fetchProjects')
})

const projects = computed(()=>{return store.state.projects})
</script>
<template>
  <Navbar />
  <div class="container mt-4">
    <AddButton />

    <!-- Project card -->
    <div class="row">
      <ProjectCard v-for="project in projects" :key="project.id" :name="project.name" :description="project.description" :completed="project.completed"></ProjectCard>
    </div>
  </div>
</template>
