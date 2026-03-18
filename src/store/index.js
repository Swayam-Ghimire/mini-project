import api from '@/services/api'
import { createStore } from 'vuex'
const store = createStore({
  state() {
    return {
      // users
      users: [], //fetch via api
      currentUser: null,

      // projects
      projects: [], //fetch via api
      currentProject: null,

      // tasks
      tasks: [],
      currentTasks: [], // To hold tasks of the currently selected project
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    //The !! syntax in JavaScript is used to convert a value to its boolean equivalent.
    getTaskCountByProject: (state) => (projectId) => {
      return state.tasks.filter((task) => task.projectId === projectId).length
    },
  },

  // A dynamic getter that calculates tasks per project!

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

    MARK_AS_COMPLETED(state, project) {
      const index = state.projects.findIndex((p) => p.id === project.id)
      if (index !== -1) {
        state.projects[index].completed = !state.projects[index].completed // toggle the completed status
      }
    },

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

    // Task mutations

    SET_TASKS(state, tasks) {
      state.tasks = tasks
    },

    SET_CURRENT_TASKS(state, tasks) {
      state.currentTasks = tasks
    },

    ADD_TASK(state, task) {
      state.tasks.push(task)
    },

    MARK_TASK_COMPLETED(state, task) {
      const index = state.currentTasks.findIndex((t) => t.id === task.id)
      if (index !== -1) {
        state.currentTasks[index].completed = !state.currentTasks[index].completed
      }
    },
  },

  actions: {
    // ================= USERS =================

    async fetchUsers({ commit }) {
      try {
        const response = await api.get('/users')
        const users = response.data
        commit('SET_USERS', users)
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
        const response = await api.post('/users', newUser)
        const createdUser = response.data

        commit('ADD_USER', createdUser)
        commit('SET_CURRENT_USER', createdUser)

        return { ok: true }
      } catch (error) {
        console.error('Registration failed:', error)
        return { ok: false, message: 'server error' }
      }
    },

    login({ state, commit }, { email, password }) {
      const user = state.users.find((u) => u.email === email && u.password === password)

      if (!user) return { ok: false, message: 'Invalid login' }

      commit('SET_CURRENT_USER', user)
      return { ok: true }
    },

    // ================= PROJECTS =================

    async fetchProjects({ commit }) {
      try {
        const response = await api.get('/projects')
        const projects = response.data
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
        const response = await api.post('/projects', newProject)
        const createdProject = response.data

        commit('ADD_PROJECT', createdProject)
        commit('SET_CURRENT_PROJECT', createdProject)

        return { ok: true }
      } catch (error) {
        console.log('Addition failed:', error)
        return { ok: false }
      }
    },

    async editProject({ commit }, { id, updates }) {
      try {
        const response = await api.patch(`/projects/${id}`, updates)
        const updatedProject = response.data

        commit('EDIT_PROJECT', updatedProject)
        return { ok: true }
      } catch (error) {
        console.log('Update failed: ', error)
        return { ok: false }
      }
    },

    async deleteProject({ commit }, id) {
      try {
        await api.delete(`/projects/${id}`)
        commit('DELETE_PROJECT', id)
        return { ok: true }
      } catch (error) {
        console.log('Deletion failed:', error)
        return { ok: false }
      }
    },

    async toggleProjectCompletion({ commit }, project) {
      try {
        const response = await api.patch(`/projects/${project.id}`, {
          completed: !project.completed,
        })
        const updatedProject = response.data

        commit('MARK_AS_COMPLETED', updatedProject)
        return { ok: true }
      } catch (error) {
        console.log('Error toggling completion: ', error)
        return { ok: false }
      }
    },

    // ================= TASKS =================

    async fetchTasks({ commit }) {
      try {
        const response = await api.get('/tasks')
        const tasks = response.data

        commit('SET_TASKS', tasks)
        return { ok: true }
      } catch (error) {
        console.log('Error fetching tasks: ', error)
        return { ok: false }
      }
    },

    async addTask({ commit, state }, { name, projectId }) {
      const newTask = {
        name: name,
        projectId: parseInt(projectId),
        completed: false,
      }

      try {
        const response = await api.post('/tasks', newTask)
        const task = response.data

        commit('ADD_TASK', task)
        commit('SET_CURRENT_TASKS', [...state.currentTasks, task])

        return { ok: true }
      } catch (error) {
        console.log('Error occured while adding the task', error)
        return { ok: false }
      }
    },

    async toggleTaskCompletion({ commit }, task) {
      try {
        const response = await api.patch(`/tasks/${task.id}`, {
          completed: !task.completed,
        })
        const updatedTask = response.data

        commit('MARK_TASK_COMPLETED', updatedTask)
        return { ok: true }
      } catch (error) {
        console.log('Error occurred while toggling task completion:', error)
        return { ok: false }
      }
    },

    async fetchTasksByProject({ commit }, projectId) {
      try {
        const response = await api.get(`/projects/${projectId}/tasks`)
        const tasks = response.data

        commit('SET_CURRENT_TASKS', tasks)
        return { ok: true }
      } catch (error) {
        console.log('Error', error)
        return { ok: false }
      }
    },
  },
})

export default store
