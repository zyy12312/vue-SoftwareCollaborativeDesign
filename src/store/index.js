import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from "@/App.vue";
import user from "@/store/modules/user";


Vue.use(Vuex)

const index = new Vuex.Store({
    modules: {
        app,
        user
    },
    getters
})

export default index
