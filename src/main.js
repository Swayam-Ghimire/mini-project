// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Bootstrap JS (includes Popper)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
