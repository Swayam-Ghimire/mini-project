<script setup>
import { defineProps, defineEmits } from 'vue';
import TaskItem from './TaskItem.vue';
defineProps({
  tasks: {
    type: Array,
    required: true
  },

  title: {
    type: String,
    required: true
  }  
})
const emit = defineEmits([
  'toggle'
])
</script>

<template>
  <!-- Task Columns -->
  <div class="row g-4 mt-2">
    <!-- In Progress Column -->
    <div class="col-lg-6">
      <div class="card shadow-sm h-100">
        <div class="card-header bg-light d-flex justify-content-between align-items-center">
          <span class="mb-0 fw-semibold text-sm fs-6">{{ title }}</span>
          <span :class="{'badge': true, 'bg-primary' : title === 'In Progress', 'bg-success' : title === 'Completed'}">{{ tasks.length }}</span>
        </div>

        <div class="card-body p-0">
          <ul class="list-group">
            <TaskItem v-for="task in tasks" :key="task.id"
              :task="task" @toggle="emit('toggle', $event)"/>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
