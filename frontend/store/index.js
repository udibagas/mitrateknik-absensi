export const state = () => ({
  areas: [],
  departments: [],
  devices: [],
  gates: [],
  persons: [],
  timeslots: [],
})

export const mutations = {
  setAreas(state, data) {
    state.areas = data
  },

  setDepartments(state, data) {
    state.departments = data
  },

  setDevices(state, data) {
    state.devices = data
  },

  setGates(state, data) {
    state.gates = data
  },

  setPersons(state, data) {
    state.persons = data
  },

  setTimeSlots(state, data) {
    state.timeslots = data
  },
}

export const actions = {
  async getAreas({ commit }) {
    const data = await this.$axios.$get('/api/area')
    commit('setAreas', data)
  },

  async getDepartments({ commit }) {
    const data = await this.$axios.$get('/api/department')
    commit('setDepartments', data)
  },

  async getDevices({ commit }) {
    const data = await this.$axios.$get('/api/device')
    commit('setDevices', data)
  },

  async getGates({ commit }) {
    const data = await this.$axios.$get('/api/gate')
    commit('setGates', data)
  },

  async getPersons({ commit }) {
    const data = await this.$axios.$get('/api/person')
    commit('setPersons', data)
  },

  async getTimeslots({ commit }) {
    const data = await this.$axios.$get('/api/timeSlot')
    commit('setTimeSlots', data)
  },
}
