import {getToken, setToken} from "@/utils/auth";
import {login} from "@/api/user";


const getDefaultState = () => {
    return {
        token: getToken(),
        User:{
            role:0
        }
    }
}

const state = getDefaultState()


const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_User: (state, user) => {
        state.User = user
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        // const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: userInfo.account.trim(), password: userInfo.password.trim() }).then(response => {
                const { data } = response.data.data
                commit('SET_TOKEN', data.token)
                this.$store.getters.user = data.User
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    //
    // // get user info
    // getInfo({ commit, state }) {
    //     return new Promise((resolve, reject) => {
    //         getInfo(state.token).then(response => {
    //             const { data } = response
    //
    //             if (!data) {
    //                 return reject('Verification failed, please Login again.')
    //             }
    //
    //             const { name, avatar } = data
    //
    //             commit('SET_NAME', name)
    //             commit('SET_AVATAR', avatar)
    //             resolve(data)
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },
    //
    // // user logout
    // logout({ commit, state }) {
    //     return new Promise((resolve, reject) => {
    //         logout(state.token).then(() => {
    //             removeToken() // must remove  token  first
    //             resetRouter()
    //             commit('RESET_STATE')
    //             resolve()
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },
    //
    // // remove token
    // resetToken({ commit }) {
    //     return new Promise(resolve => {
    //         removeToken() // must remove  token  first
    //         commit('RESET_STATE')
    //         resolve()
    //     })
    // }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
