import { createStore } from 'vuex'
const store = createStore({
  state() {
    return {
      users: [], //fetch via api
      currentUser: null,
      projects:[],
      // tasks: [],
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    //The !! syntax in JavaScript is used to convert a value to its boolean equivalent.
  },

  mutations: {
    SET_USERS(state, users) { // to set users will call in actions asynchronously
      state.users = users
    },

    ADD_USER(state, user) {
      state.users.push(user)

    },

    SET_CURRENT_USER(state, user) {
      state.currentUser = user
    },

    LOGOUT(state) {
      state.currentUser = null
    },

    ADD_PROJECT(state, project) {
      state.projects.push(project)
    }
  },

  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await fetch('http://localhost:3001/users') // promise
        const users = await response.json() // promise | users json data 
        commit('SET_USERS', users) // set garcha reactive users array
      }
      catch(error) {
        console.log('Error fetching users:', error)
      }
    },
    async register({ state, commit }, { name, email, password }) {
      const exists = state.users.find((u) => u.email === email)
      if (exists) return { ok: false, message: 'Email already used' }
      const newUser = {
        name,
        email,
        password,
      }
      try {
        // send new user to json-server
        const response = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newUser)
        })
        // json-server responds with the newly created user, including its auto-generated ID!
        const createdUser = await response.json() 
      
      commit('ADD_USER', createdUser)
      commit('SET_CURRENT_USER', createdUser)
      return { ok: true }
      }
      catch (error) {
        console.error("Registration failed:", error)
        return {ok:false, message:'server error'}
      }


    },
    login({ state, commit, getters }, { email, password }) {
      const user = state.users.find((u) => u.email === email && u.password === password)
      if (!user) return { ok: false, message: 'Invalid login' }

      commit('SET_CURRENT_USER', user)
      return { ok: true }
    },
  },
})

export default store
