<script setup>
import { defineProps, defineEmits } from 'vue'
import TaskItem from './TaskItem.vue'
import draggable from 'vuedraggable'
defineProps({
  tasks: {
    type: Array,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['toggle'])

// Handle the drag event
const onDragChange = (event) => {
  if (event.added) {
    emit('toggle', event.added.element.id) // Emit the exact same toggle event as when we click the checkbox, this way we can reuse the same logic to update the task's completion status in the store
  }
}
</script>

<template>
  <!-- Task Columns -->
  <div class="row g-4 mt-2">
    <!-- In Progress Column -->
    <div class="row-lg-6">
      <div class="card shadow-sm h-100">
        <div class="card-header bg-light d-flex justify-content-between align-items-center">
          <span class="mb-0 fw-semibold text-sm fs-6">{{ title }}</span>
          <span
            :class="{
              badge: true,
              'bg-primary': title === 'In Progress',
              'bg-success': title === 'Completed',
            }"
            >{{ tasks.length }}</span
          >
        </div>

        <div class="card-body p-0">
          <draggable
            :list="tasks"
            group="tasks"
            item-key="id"
            class="list-group min-vh-50"
            @change="onDragChange"
            ghost-class="bg-light"
          >
            <template #item="{ element }">
              <TaskItem :task="element" @toggle="emit('toggle', $event)" />
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* A tiny bit of CSS to make sure empty lists can still be dropped into! */
.min-vh-50 {
  min-height: 50px;
}
/* Optional: change the cursor to a grabber hand */
.list-group-item {
  cursor: grab;
}
.list-group-item:active {
  cursor: grabbing;
}
</style>
