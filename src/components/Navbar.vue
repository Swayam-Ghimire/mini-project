<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'

const store = useStore()
const router = useRouter()
const active = ref('')
const logout = () => {
  store.commit('LOGOUT') // Call mutations method logout
  router.push('/')
}
// dynamic class according to url get current url from router and render.
const toggle = (tab) => {
  active.value = tab
}
</script>
<template>
  <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
    <div class="container-fluid">
      <!-- Brand Name or Logo -->
      <RouterLink to="/dashboard" class="navbar-brand">Project Management</RouterLink>

      <!-- Mobile Toggler Button -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarMain"
        aria-controls="navbarMain"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible Content -->
      <div class="collapse navbar-collapse" id="navbarMain">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink
              to="/projects"
              :class="[
                'nav-link',
                active === 'projects' ? 'fw-bold text-decoration-underline text-white' : '',
              ]"
              aria-current="page"
              @click="toggle('projects')"
              >Projects</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/profile" :class="[
                'nav-link',
                active === 'users' ? 'fw-bold text-decoration-underline text-white' : '',
              ]" @click="toggle('users')">Users</RouterLink>
          </li>
        </ul>

        <!-- Optional Search Form -->
        <!-- <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form> -->
        <li class="nav-item">
          <button
            @click="logout"
            class="btn btn-outline-danger d-flex align-items-center"
            id="logoutBtn"
          >
            <svg
              xmlns="http://www.w3.org"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-box-arrow-right me-2"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fill-rule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
            Logout
          </button>
        </li>
      </div>
    </div>
  </nav>
</template>
