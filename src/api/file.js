import request from "@/utils/request";

export function inputGrade(file) {
    return request({
        url: '/file/upload',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data:file
    })
}
