<script setup>
import ButtonGroup from './ButtonGroup.vue'

// Define the props that the parent component is passing down
defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },

  taskNumber: {
    type: Number,
    default: 0,
  },
})
// Define emits so we can tell the parent when Edit or Delete or Mark As complete are clicked
const emit = defineEmits(['toggle-complete', 'update-project', 'delete-project', 'project-tasks'])
</script>

<template>
  <div class="col-sm-6 mb-3 mt-4">
    <div class="card h-100 bg-light">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <h5 class="card-title fw-bold mb-0" style="max-width: 70%">
            {{ name }}
          </h5>

          <div class="btn-group">
            <!-- tick button -->
            <!-- // listen to events emitted by ButtonGroup.vue and re-emit them to ProjectsView.vue -->
            <ButtonGroup
              :completed="completed"
              :id="id"
              @toggle-complete="emit('toggle-complete', $event)"
              @update-project="emit('update-project', $event)"
              @delete-project="emit('delete-project', $event)"
            />
          </div>
        </div>

        <p class="card-text text-muted small mb-4">
          {{ description }}
        </p>
        <span class="small fw-bold text-dark">Total Tasks: {{ taskNumber }}</span>

        <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
          <!-- Status Badge -->
          <div v-if="completed" class="badge bg-success-subtle text-success border border-success">
            Completed
          </div>
          <div v-else class="badge bg-warning-subtle text-danger border border-danger">
            In Progress
          </div>

          <!-- Small "View Tasks" Button -->
          <div>
            <button class="btn btn-primary fw-bold" style="font-size: 0.75rem" @click="emit('project-tasks', id)">
              View Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
