import request from "@/utils/request";

export function addTeam(map) {
    return request({
        url: '/team/teacher/addTeam',
        method: 'POST',
        map
    })
}
export function teamInfo() {
    return request({
        url: '/team/teacher/teamInfo',
        method: 'GET',
    })
}
export function studentTeamInfo() {
    return request({
        url: '/team/student',
        method: 'GET',
    })
}
export function getInvitation() {
    return request({
        url: '/team/student/invitation',
        method: 'GET',
    })
}
export function sendInvitation(invitation) {
    return request({
        url: '/team/student/invitation',
        method: 'POST',
        invitation
    })
}
export function acceptInvitation(invitationId) {
    return request({
        url: '/team/student/acceptInvitation',
        method: 'PUT',
        invitationId
    })
}
export function rejectInvitation(invitationIds) {
    return request({
        url: '/team/student/rejectInvitation',
        method: 'PUT',
        invitationIds
    })
}
