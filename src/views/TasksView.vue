<script setup>
import AddButton from '@/components/AddButton.vue'
import Navbar from '@/components/Navbar.vue'
// import TaskList from '@/components/TaskList.vue'
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router' // useRoute() is used to read route data and useRouter() to navigate or control routing
import TaskList from '@/components/TaskList.vue'

const store = useStore()
const route = useRoute()

const currentProjectId = route.params.projectId

// On mounted fetch the tasks from the store
onMounted(() => {
  // fetch tasks from the store
  store.dispatch('fetchTasksByProject', currentProjectId)
})

// ref

const showModal = ref(false)
const form = ref({
  name: '',
  projectId: currentProjectId,
})
// methods
const addTask = () => {
  showModal.value = true
}

const saveTask = () => {
  store.dispatch('addTask', form.value)
  showModal.value = false
}

const closeModal = () => {
  showModal.value = false
  form.value = {
    name: '',
    projectId: currentProjectId,
  }
}

const toggleComplete = (id) => {
  const task = store.state.currentTasks.find((c) => c.id === id)
  store.dispatch('toggleTaskCompletion', task)
}


const tasks = computed(() => store.state.currentTasks) // currentTasks is the state that holds tasks of the currently selected project, it gets updated whenever we add a new task or fetch tasks for a different project

const completedTasks = computed(() => tasks.value.filter((task) => task.completed))

const inProgressTasks = computed(() => tasks.value.filter((task) => !task.completed))
</script>
<template>
  <Navbar />

  <div class="container py-4">
    <!-- Header -->
    <AddButton heading="Task List" btnName="Add Task" @add="addTask" />

    <TaskList v-show="inProgressTasks.length > 0" title="In Progress" :tasks="inProgressTasks" @toggle="toggleComplete"/>
    <TaskList v-show="completedTasks.length > 0" title="Completed" :tasks="completedTasks" @toggle="toggleComplete"/>

    <!-- // Form Addition -->
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
              Add New Task
            </h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <form @submit.prevent="saveTask">
              <div class="mb-3">
                <label for="projectName" class="form-label fw-semibold">Task Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="taskName"
                  v-model="form.name"
                  placeholder="e.g., Learn vue"
                  required
                />
              </div>
            <div class="mb-3">
              <label for="projectName" class="form-label fw-semibold">Project Id</label>
              <input type="number" class="form-control" id="projectId" v-model="form.projectId" disabled />
            </div>


              <div class="d-flex justify-content-end gap-2 border-top pt-3">
                <button type="button" class="fw-bold btn btn-dark" @click="closeModal">
                  Cancel
                </button>

                <button type="submit" class="fw-bold btn btn-danger">
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
