import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from "@/App.vue";
import user from "@/store/modules/user";
import character from "@/store/modules/character";


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        character
    },
    getters
})

export default store
