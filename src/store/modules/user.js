import {getToken, removeToken} from "@/utils/auth";
import {login, logout} from "@/api/user";
import {resetRouter} from "@/router";


const getDefaultState = () => {
    return {
        token: getToken(),
        User:{
            id: 13,
            account: "101010",
            password: null,
            name: "教师账号",
            avatarURL: "https://cos-for-scd-1312783961.cos.ap-shanghai.myqcloud.com/defaultAvator.png",
            role: 1,
            sex: 1,
            teamId: null,
            finalScore: 0.0,
            team: null,
            enabled: true,
            authorities: [
                {
                    authority: "ROLE_教师"
                }
            ],
            accountNonLocked: true,
            credentialsNonExpired: true,
            username: "101010",
            accountNonExpired: true
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
    login({ commit }, user) {
        // const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login(user).then(response => {
                // console.log(1)
                // console.log(response)
                const { data } = response.data.data
                // console.log(response.data.data)
                commit('SET_User',data)
                commit('SET_TOKEN', data.token)
                // this.$store.getters.user = data
                // setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

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

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
