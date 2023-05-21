import request from "@/utils/request";

export function sendMessage(message) {
    return request({
        url: '/communication/sendMessage',
        method: 'POST',
        message
    })
}

export function getMessageList(teamID) {
    return request({
        url: '/communication/getMessageList',
        method: 'GET',
        teamID
    })
}
