import {getToken, removeToken} from "@/utils/auth";
import {login, logout} from "@/api/user";
import {resetRouter} from "@/router";


const getDefaultState = () => {
    return {
        token: getToken(),
        
        User:{
            id: 8,
            account: "2011110108",
            password: null,
            name: "学生账号1",
            avatarURL: "https://cos-for-scd-1312783961.cos.ap-shanghai.myqcloud.com/defaultAvator.png",
            role: 0,
            sex: 0,
            teamId: 1,
            finalScore: 90.0,
            team: {
                id: 11,
                teamID: 1,
                studentID: 8,
                studentCharacter: 1,
                studentCharacterLabel: "组长",
                user: {
                    id: 8,
                    account: "2011110108",
                    password: null,
                    name: "学生账号1",
                    avatarURL: "https://cos-for-scd-1312783961.cos.ap-shanghai.myqcloud.com/defaultAvator.png",
                    role: 0,
                    sex: 0,
                    teamId: null,
                    finalScore: null,
                    team: null,
                    enabled: true,
                    authorities: [
                        {
                            authority: "ROLE_学生"
                        }
                    ],
                    accountNonLocked: true,
                    credentialsNonExpired: true,
                    username: "2011110108",
                    accountNonExpired: true
                }
            },
            enabled: true,
            authorities: [
                {
                    authority: "ROLE_学生"
                }
            ],
            accountNonLocked: true,
            credentialsNonExpired: true,
            username: "2011110108",
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
        const { username, password } = user
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                console.log(1)
                console.log(response.data)
                const { data } = response
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
