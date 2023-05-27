import request from "@/utils/request";

export function sendMessage(message) {
    return request({
        url: '/communication/sendMessage',
        method: 'POST',
        data:JSON.stringify(message)

    })
}

export function getMessageList(teamID) {
    return request({
        url: '/communication/getMessageList',
        method: 'GET',
        params:{
            "teamID":parseInt(teamID)
        }
    })
}
