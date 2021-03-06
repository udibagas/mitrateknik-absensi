
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale });
Vue.use(VueRouter);

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faHome,
    faUsers,
    faFilter,
    faClock,
    faSignOutAlt,
    faCalendar
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faHome,
    faUsers,
    faFilter,
    faClock,
    faSignOutAlt,
    faCalendar
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import App from './views/App'
import Home from './views/Home'
import User from './views/User'
import Log from './views/Log'
import TimeSlot from './views/TimeSlot'
import moment from 'moment'
import store from './store'

let routes = [
    {
        path: '/',
        name: '/',
        component: Home
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    }
]

if (USER.admin === 1) {
    routes.push({
        path: '/user',
        name: 'user',
        component: User
    },
    {
        path: '/timeSlot',
        name: 'timeSlot',
        component: TimeSlot
    })
}

routes.push(
    { path: '/log', name: 'log', component: Log },
    { path: '*', component: Home }
)

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

const app = new Vue({
    el: '#app',
    components: { App },
    router,
    store,
    data: {
        time: moment().format('DD MMM YYYY HH:mm:ss')
    },
    mounted: function() {
        let vm = this
        setInterval(function () {
            vm.time = moment().format('DD MMM YYYY HH:mm:ss')
        }, 1000)
    }
});
