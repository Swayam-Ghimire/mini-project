<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup' // for validation schema this is a library

const store = useStore()
const router = useRouter()

// local state
const mode = ref('login') // 'login' | 'register'
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

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

async function onSubmitRegister(values) {
  // console.log('Registered (fake)', { name: name.value, email: email.value })
  const result = await store.dispatch('register', {
    name: values.name,
    email: values.email,
    password: values.password,
  })
  if (result.ok) {
    router.push('/dashboard') // Use router.push when navigating within a component (e.g., in a method triggered by a button click)
    // name.value = ''
    // email.value = ''
    // password.value = ''
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
            <input
              v-model.trim="email"
              type="email"
              class="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div class="mb-3">
            <input
              v-model.trim="password"
              type="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div class="d-grid gap-2 mt-4">
            <button class="btn btn-dark" type="submit">Login</button>
            <div class="text-center mt-2">
              <span class="text-muted small">Don't have an account? </span>
              <a
                href="/auth"
                class="text-decoration-none small fw-bold"
                @click.prevent="switchTo('register')"
                >Register</a
              >
            </div>
          </div>
        </form>
        <p v-if="error" class="text-danger text-center small mt-3">{{ error }}</p>
      </div>

      <!-- REGISTER PANEL -->
      <div v-show="mode === 'register'" class="card shadow-sm border-0 p-4 auth-panel register">
        <h2 class="text-center mb-4 fw-bold">Register</h2>
        <Form :validation-schema="schema" @submit="onSubmitRegister"> <!-- @submit emits form values not a dom event -->
          <div class="mb-3">
            <Field name="name" type="text" class="form-control" placeholder="Name" />
            <ErrorMessage name="name" class="text-danger small mt-1" />
          </div>
          <div class="mb-3">
            <Field name="email" type="email" class="form-control" placeholder="Email" />
            <ErrorMessage name="email" class="text-danger small mt-1" />
          </div>
          <div class="mb-3">
            <Field name="password" type="password" class="form-control" placeholder="Password" />
            <ErrorMessage name="password" class="text-danger small mt-1" />
          </div>
           <div class="mb-3">
            <Field name="confirmPassword" type="password" class="form-control" placeholder="Confirm Password" />
            <ErrorMessage name="confirmPassword" class="text-danger small mt-1" />
          </div>
          <div class="d-grid gap-2 mt-4">
            <button class="btn btn-dark" type="submit">Create Account</button>
            <div class="text-center mt-2">
              <span class="text-muted small">Already have an account? </span>
              <a
                href="/auth"
                class="text-decoration-none small fw-bold"
                @click.prevent="switchTo('login')"
                >Login</a
              >
            </div>
          </div>
        </Form>
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
