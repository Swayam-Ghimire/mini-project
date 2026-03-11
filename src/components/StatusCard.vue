<script setup>
import { RouterLink } from 'vue-router'
import { defineProps, ref } from 'vue'
const props = defineProps({
  heading: String,
  attribute: String,
  count: {
    type: Number,
    default: 0
  }
})
</script>

>
<template>
  <!-- Only the Column wrapper stays here -->
  <div class="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
    <div class="card h-100 shadow-sm border-0" style="width: 20rem; min-height: 250px">
      <div class="card-body d-flex flex-column text-center p-4">
        <h5 class="card-title d-flex align-items-center justify-content-center mb-4">
          <!-- SVG Icon remains same -->
          {{ heading }}
        </h5>

        <div class="display-3 fw-bold mb-2 text-dark">{{ count }}</div>
        <p class="text-muted mb-4">{{ heading }} entries</p>

        <RouterLink to="/projects" :class="['fw-bold','mt-auto', 'py-2', attribute === 'projects' ? 'btn btn-danger' : '', attribute === 'users' ? 'btn btn-dark' : '',]">
          View Details
        </RouterLink>
      </div>
    </div>
  </div>
</template>
