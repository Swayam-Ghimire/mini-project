import { createStore } from 'vuex'
const store = createStore({
  state() {
    return {
      // users
      users: [], //fetch via api
      currentUser: null,

      // projects
      projects: [],
      currentProject: null,

      // tasks
      tasks: [],
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    //The !! syntax in JavaScript is used to convert a value to its boolean equivalent.
  },

  mutations: {
    // Users and authentication methods
    SET_USERS(state, users) {
      // to set users will call in actions asynchronously
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

    // Project methods

    // MARK_AS_COMPLETED(state, project) {},

    SET_PROJECT(state, projects) {
      state.projects = projects
    },
    SET_CURRENT_PROJECT(state, project) {
      state.currentProject = project
    },
    ADD_PROJECT(state, project) {
      state.projects.push(project)
    },

    // NEW: Find the exact project by ID and replace it with the updated one
    EDIT_PROJECT(state, updatedProject) {
      const index = state.projects.findIndex((p) => p.id === updatedProject.id)
      if (index !== -1) {
        state.projects[index] = updatedProject
      }
    },

    // NEW: Filter out the deleted project by its ID
    DELETE_PROJECT(state, projectId) {
      state.projects = state.projects.filter((p) => p.id !== projectId)
    },
  },

  actions: {
    // Users action
    async fetchUsers({ commit }) {
      try {
        const response = await fetch('http://localhost:3001/users') // promise
        const users = await response.json() // promise | users json data
        commit('SET_USERS', users) // set garcha reactive users array
      } catch (error) {
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        })
        // json-server responds with the newly created user, including its auto-generated ID!
        const createdUser = await response.json()

        commit('ADD_USER', createdUser)
        commit('SET_CURRENT_USER', createdUser)
        return { ok: true }
      } catch (error) {
        console.error('Registration failed:', error)
        return { ok: false, message: 'server error' }
      }
    },
    login({ state, commit, getters }, { email, password }) {
      const user = state.users.find((u) => u.email === email && u.password === password)
      if (!user) return { ok: false, message: 'Invalid login' }

      commit('SET_CURRENT_USER', user)
      return { ok: true }
    },

    // Project actions
    async fetchProjects({ commit }) {
      try {
        const response = await fetch('http://localhost:3001/projects')
        const projects = await response.json()
        commit('SET_PROJECT', projects)
        return { ok: true }
      } catch (error) {
        console.log('Error fetching projects:', error)
        return { ok: false }
      }
    },

    async addProject({ commit }, { name, description }) {
      const newProject = {
        name: name,
        description: description,
        completed: false,
      }
      try {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProject),
        }
        const response = await fetch('http://localhost:3001/projects', options)
        const createdProject = await response.json() // Gets the project with the new ID!

        // FIXED: Commit the createdProject so the frontend has the ID
        commit('ADD_PROJECT', createdProject)
        commit('SET_CURRENT_PROJECT', createdProject)
        return { ok: true }
      } catch (error) {
        console.log('Addition failed:', error)
        return { ok: false }
      }
    },

    // NEW: Edit Action (Accepts the project ID and the new data)
    async editProject({ commit }, { id, updates }) {
      try {
        // Use PATCH to update only specific fields (like name, description, or completed status)
        const response = await fetch(`http://localhost:3001/projects/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        })
        const updatedProject = await response.json()

        commit('EDIT_PROJECT', updatedProject)
        return { ok: true }
      } catch (error) {
        console.log('Update failed: ', error)
        return { ok: false }
      }
    },

    // NEW: Delete Action (Requires only the ID of the project to delete)
    async deleteProject({ commit }, id) {
      try {
        // Call the delete endpoint
        await fetch(`http://localhost:3001/projects/${id}`, {
          method: 'DELETE',
        })

        // Remove it from the local Vuex state
        commit('DELETE_PROJECT', id)
        return { ok: true }
      } catch (error) {
        console.log('Deletion failed:', error)
        return { ok: false }
      }
    },
  },
})

export default store
