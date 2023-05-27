import request from "@/utils/request";

export function inputGrade(idAndGrade) {
    return request({
        url: '/grade/inputGrade',
        method: 'POST',
        data:JSON.stringify(idAndGrade)

    })
}
export function getGradeList() {
    return request({
        url: '/grade/getGradeList',
        method: 'GET',
    })
}
export function getStuGrade() {
    return request({
        url: '/grade/getStuGrade',
        method: 'GET',
    })
}
