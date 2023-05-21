import request from "@/utils/request";

export function createDiscuss(discuss) {
    return request({
        url: '/discuss/createDiscuss',
        method: 'POST',
        discuss
    })
}
export function createReply(reply) {
    return request({
        url: '/discuss/createReply',
        method: 'POST',
        reply
    })
}
export function editDiscuss(discuss) {
    return request({
        url: '/discuss/editDiscuss',
        method: 'POST',
        discuss
    })
}
export function editReply(reply) {
    return request({
        url: '/discuss/editReply',
        method: 'POST',
        reply
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
        discussID
    })
}
export function deleteDiscuss(discussIDList) {
    return request({
        url: '/discuss/deleteDiscuss',
        method: 'DELETE',
        discussIDList
    })
}
export function deleteReply(replyIDList) {
    return request({
        url: '/discuss/deleteReply',
        method: 'DELETE',
        replyIDList
    })
}
