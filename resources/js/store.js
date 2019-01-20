import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hari: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'],
        areas: [],
        departments: [],
        devices: [],
        gates: [],
        persons: [],
        timeslots: [],
        api_token: USER.api_token
    },
    mutations: {
        getAreas (state) {
            let params = { api_token: state.api_token }
            axios.get(API_URL + '/area', { params: params }).then(function(r) {
                state.areas = r.data
            }).catch(function(e) {
                console.log(e);
            })
        },
        getDepartments (state) {
            let params = { api_token: state.api_token }
            axios.get(API_URL + '/department', { params: params }).then(function(r) {
                state.departments = r.data
            }).catch(function(e) {
                console.log(e);
            })
        },
        getDevices (state) {
            let params = { api_token: state.api_token }
            axios.get(API_URL + '/device', { params: params }).then(function(r) {
                state.devices = r.data
            }).catch(function(e) {
                console.log(e);
            })
        },
        getGates (state) {
            let params = { api_token: state.api_token }
            axios.get(API_URL + '/gate', { params: params }).then(function(r) {
                state.gates = r.data
            }).catch(function(e) {
                console.log(e);
            })
        },
        getPersons (state) {
            let params = { api_token: state.api_token }
            axios.get(API_URL + '/person', { params: params }).then(function(r) {
                state.persons = r.data
            }).catch(function(e) {
                console.log(e);
            })
        },
        getTimeslots (state) {
            let params = { api_token: state.api_token }
            axios.get(API_URL + '/timeSlot', { params: params }).then(function(r) {
                state.timeslots = r.data
            }).catch(function(e) {
                console.log(e);
            })
        }
    }
})
