import request from "@/utils/request";

export function createDiscuss(discuss) {
    return request({
        url: '/discuss/createDiscuss',
        method: 'POST',
        data:JSON.stringify(discuss)
    })
}
export function createReply(reply) {
    return request({
        url: '/discuss/createReply',
        method: 'POST',
        data:JSON.stringify(reply)
    })
}
export function editDiscuss(discuss) {
    return request({
        url: '/discuss/editDiscuss',
        method: 'POST',
        data:JSON.stringify(discuss)

    })
}
export function editReply(reply) {
    return request({
        url: '/discuss/editReply',
        method: 'POST',
        data:JSON.stringify(reply)
    })
}
export function getDiscussList() {
    return request({
        url: '/discuss/getDiscussList',
        method: 'GET',
    })
}
export function getReplyList(discussID) {
    return request({
        url: '/discuss/getReplyList',
        method: 'GET',
        data:JSON.stringify(discussID)
    })
}
export function deleteDiscuss(discussIDList) {
    return request({
        url: '/discuss/deleteDiscuss',
        method: 'DELETE',
        data:JSON.stringify(discussIDList)

    })
}
export function deleteReply(replyIDList) {
    return request({
        url: '/discuss/deleteReply',
        method: 'DELETE',
        data:JSON.stringify(replyIDList)
    })
}
