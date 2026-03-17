<script setup>
    import { defineProps, defineEmits } from 'vue';
    defineProps({
      task: {
        type: Object,
        default: {}
      }
    })
    const emit = defineEmits(['toggle'])
</script>

<template>
  <li class="list-group-item d-flex align-items-center justify-content-between"
  >
    <!-- Left Section -->
    <div class="d-flex align-items-center gap-3">
      <!-- Checkbox -->
      <input type="checkbox" class="form-check-input" @change="emit('toggle', task.id)" :checked="task.completed"/>

      <!-- Task Name -->
      <span :class="{ 'fs-6': true, 'text-decoration-line-through text-muted': task.completed }">
        {{ task.name }}
      </span>
    </div>
  </li>
</template>
