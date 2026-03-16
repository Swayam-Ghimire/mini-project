<script setup>
import Navbar from '@/components/Navbar.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import AddButton from '@/components/AddButton.vue'

import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
const router = useRouter()
const store = useStore()
// state

const showModal = ref(false) //Contorls Visibility
const editingProject = ref(null) // determines add or update form and contains project details for update form

const form = ref({
  name: '',
  description: '',
}) // form data state

// Methods

const toggleComplete = (id) => {
  const project = store.state.projects.find((p) => p.id === id)
  store.dispatch('toggleProjectCompletion', project)
}
// Modal form for add form
const addProject = () => {
  editingProject.value = null
  showModal.value = true
}

// Modal form for update form
const updateProject = (id) => {
  editingProject.value = store.state.projects.find((p) => p.id === id)
  // Populate the form so the user sees the existing data!
  form.value = {
    name: editingProject.value.name,
    description: editingProject.value.description,
  }
  showModal.value = true
}

// Close modal
const closeModal = () => {
  showModal.value = false
  form.value = {
    name: '',
    description: '',
  }
}

// delete project
const deleteProject = (id) => {
  store.dispatch('deleteProject', id)
}

// push to tasks view of the project
const projectTasks = (id) => {
  router.push({name:'ProjectTasks', params: { projectId: id }})
}

// save project
const saveProject = () => {
  if (editingProject.value) {
    // update flow
    store.dispatch('editProject', { id: editingProject.value.id, updates: form.value })
  } else {
    // add flow
    store.dispatch('addProject', form.value)
  }
  closeModal()
}

// Fetch projects
onMounted(() => {
  store.dispatch('fetchProjects')
  store.dispatch('fetchTasks')
})

// initialized projects as a computed property
const projects = computed(() => {
  return store.state.projects
})


</script>
<template>
  <Navbar />
  <div class="container mt-4">
    <AddButton @add="addProject" heading='Project List' btnName="Add Project"></AddButton>

    <!-- Project card -->
    <div class="row">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :id="project.id"
        :name="project.name"
        :description="project.description"
        :completed="project.completed"
        :taskNumber="store.getters.getTaskCountByProject(project.id)"
        @toggle-complete="toggleComplete"
        @update-project="updateProject"
        @delete-project="deleteProject"
        @project-tasks="projectTasks"
      ></ProjectCard>
    </div>

    <!-- // Form Addition and Updation Modal -->
    <div
      v-if="showModal"
      class="modal fade show d-block"
      tabindex="-1"
      style="background: rgba(0, 0, 0, 0.6)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">
              {{ editingProject ? 'Edit Project' : 'Add New Project' }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <form @submit.prevent="saveProject">
              <div class="mb-3">
                <label for="projectName" class="form-label fw-semibold">Project Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="projectName"
                  v-model="form.name"
                  placeholder="e.g., Website Redesign"
                  required
                />
              </div>

              <div class="mb-4">
                <label for="projectDescription" class="form-label fw-semibold">Description</label>
                <textarea
                  class="form-control"
                  id="projectDescription"
                  rows="3"
                  v-model="form.description"
                  placeholder="What is this project about?"
                  required
                ></textarea>
              </div>

              <div class="d-flex justify-content-end gap-2 border-top pt-3">
                <button type="button" class="fw-bold btn btn-dark" @click="closeModal">
                  Cancel
                </button>

                <button type="submit" class="fw-bold btn btn-danger">
                  {{ editingProject ? 'Update Project' : 'Save Project' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
