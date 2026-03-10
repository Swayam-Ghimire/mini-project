<template>
  <!-- LOGIN PANEL -->
  <div v-show="mode === 'login'" class="auth-panel login">
    <h2>Login</h2>
    <form @submit.prevent="onSubmitLogin">
      <input v-model.trim="email" type="email" placeholder="Email" required />
      <input v-model.trim="password" type="password" placeholder="Password" required />
      <div class="row">
        <button type="submit">Login</button>
        <button type="button" @click="switchTo('register')">Register</button>
      </div>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>

  <!-- REGISTER PANEL -->
  <div v-show="mode === 'register'" class="auth-panel register">
    <h2>Register</h2>
    <form @submit.prevent="onSubmitRegister">
      <input v-model.trim="name" type="text" placeholder="Name" required />
      <input v-model.trim="email" type="email" placeholder="Email" required />
      <input v-model.trim="password" type="password" placeholder="Password" required />
      <div class="row">
        <button type="submit">Create Account</button>
        <button type="button" @click="switchTo('login')">Login</button>
      </div>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

// local state (fake for now)
const mode = ref('register') // 'login' | 'register'
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

async function onSubmitRegister() {
  // TODO: dispatch to Vuex later: await store.dispatch('auth/register', { name, email, password })
  console.log('Registered (fake)', { name: name.value, email: email.value })
  // reset fields & go to login
  name.value = ''
  email.value = ''
  password.value = ''
  switchTo('login')
}

async function onSubmitLogin() {
  // TODO: replace with Vuex login:
  // const ok = await store.dispatch('auth/login', { email: email.value, password: password.value })
  // if (ok) router.push('/dashboard'); else error.value = 'Invalid credentials'

  console.log('Logged in (fake)', { email: email.value })
  email.value = ''
  password.value = ''
  router.push('/dashboard') 
}
</script>

<style scoped>
.auth-panel { max-width: 360px; margin: 40px auto; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff; }
h2 { margin-bottom: 12px; }
form { display: grid; gap: 10px; }
input { padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; }
.row { display: flex; gap: 8px; }
button { padding: 8px 12px; border: none; border-radius: 6px; background: #111827; color: #fff; cursor: pointer; }
button[type="button"] { background: #6b7280; }
.error { color: #b91c1c; margin-top: 6px; }
</style>
