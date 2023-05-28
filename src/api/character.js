import request from "@/utils/request";

export function getCharacterMap() {
    return request({
        url: '/character/getCharacterMap',
        method: 'GET',
    })
}


export function addCharacter(characterName) {
    return request({
        url: '/character/addCharacter',
        method: 'POST',
        data: {"characterName":characterName}
    })
}
