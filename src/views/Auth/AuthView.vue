<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

// local state (fake for now)
const mode = ref('login') // 'login' | 'register'
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

// helpers
function switchTo(next) {
  error.value = ''
  name.value = ''
  email.value = ''
  password.value = ''
  mode.value = next
}

// Lifecycle hooks for api call
onMounted(() => {
  store.dispatch('fetchUsers')
})


async function onSubmitRegister() {
  // console.log('Registered (fake)', { name: name.value, email: email.value })
  const result = await store.dispatch('register', {
    name: name.value,
    email: email.value,
    password: password.value,
  })
  if (result.ok) {
    router.push('/dashboard') // Use router.push when navigating within a component (e.g., in a method triggered by a button click)
    name.value = ''
    email.value = ''
    password.value = ''
  }

  error.value = result.message
}

async function onSubmitLogin() {
  // if (ok) router.push('/dashboard'); else error.value = 'Invalid credentials'

  // console.log('Logged in (fake)', { email: email.value })
  const result = await store.dispatch('login', {
    email: email.value,
    password: password.value,
  })
  if (result.ok) {
    router.push('/dashboard')
    email.value = ''
    password.value = ''
  }
  error.value = result.message
}
</script>
<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="col-12 col-sm-8 col-md-6 col-lg-4">
      
      <!-- LOGIN PANEL -->
      <div v-show="mode === 'login'" class="card shadow-sm border-0 p-4 auth-panel login">
        <h2 class="text-center mb-4 fw-bold">Login</h2>
        <form @submit.prevent="onSubmitLogin">
          <div class="mb-3">
            <input v-model.trim="email" type="email" class="form-control" placeholder="Email" required />
          </div>
          <div class="mb-3">
            <input v-model.trim="password" type="password" class="form-control" placeholder="Password" required />
          </div>
          <div class="d-grid gap-2 mt-4">
            <button class="btn btn-dark" type="submit">Login</button>
            <div class="text-center mt-2">
              <span class="text-muted small">Don't have an account? </span>
              <a href="/auth" class="text-decoration-none small fw-bold" @click.prevent="switchTo('register')">Register</a>
            </div>
          </div>
        </form>
        <p v-if="error" class="text-danger text-center small mt-3">{{ error }}</p>
      </div>

      <!-- REGISTER PANEL -->
      <div v-show="mode === 'register'" class="card shadow-sm border-0 p-4 auth-panel register">
        <h2 class="text-center mb-4 fw-bold">Register</h2>
        <form @submit.prevent="onSubmitRegister">
          <div class="mb-3">
            <input v-model.trim="name" type="text" class="form-control" placeholder="Name" required />
          </div>
          <div class="mb-3">
            <input v-model.trim="email" type="email" class="form-control" placeholder="Email" required />
          </div>
          <div class="mb-3">
            <input v-model.trim="password" type="password" class="form-control" placeholder="Password" required />
          </div>
          <div class="d-grid gap-2 mt-4">
            <button class="btn btn-dark" type="submit">Create Account</button>
            <div class="text-center mt-2">
              <span class="text-muted small">Already have an account? </span>
              <a href="/auth" class="text-decoration-none small fw-bold" @click.prevent="switchTo('login')">Login</a>
            </div>
          </div>
        </form>
        <p v-if="error" class="text-danger text-center small mt-3">{{ error }}</p>
      </div>

    </div>
  </div>
</template>


<style scoped>
input {
  padding: 10px;
  border: 1px solid #323946;
  border-radius: 6px;
}
</style>
