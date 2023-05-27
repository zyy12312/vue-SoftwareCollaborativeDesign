import request from "@/utils/request";

export function getCharacterMap() {
    return request({
        url: '/character/getCharacterMap',
        method: 'GET',
    })
}
