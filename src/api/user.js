import request from "@/utils/request";
export function createUser(user) {
    return request({
        url: '/user/createUser',
        method: 'POST',
        data:JSON.stringify(user)
    })
}
export function editUser(user) {
    return request({
        url: '/user/editUser',
        method: 'POST',
        data:JSON.stringify(user)
    })
}
export function getUnGroupedStudentList() {
    return request({
        url: '/user/getUnGroupedStudentList',
        method: 'GET',
    })
}
export function getAllStudentList() {
    return request({
        url: '/user/getAllStudentList',
        method: 'GET',
    })
}
export function getAllUserList() {
    return request({
        url: '/user/getAllUserList',
        method: 'GET',
    })
}
export function logout() {
    return request({
        url: '/user/logout',
        method: 'DELETE',
    })
}
export function login(user) {

    return request({
        url: '/user/login',
        method: 'POST',
        data:JSON.stringify(user)
    })
}
