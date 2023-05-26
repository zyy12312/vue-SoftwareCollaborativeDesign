import request from "@/utils/request";

export function createMaterial(material) {
    return request({
        url: '/material/createMaterial',
        method: 'POST',
        data:JSON.stringify(material)
    })
}
export function editMaterial(material) {
    return request({
        url: '/material/editMaterial',
        method: 'POST',
        data:JSON.stringify(material)
    })
}
export function releaseMaterial(materialIDList) {
    return request({
        url: '/material/releaseMaterial',
        method: 'POST',
        data:JSON.stringify(materialIDList)
    })
}
export function getAllMaterials() {
    return request({
        url: '/material/getAllMaterials',
        method: 'GET',
    })
}
export function getReleasedMaterial() {
    return request({
        url: '/material/getReleasedMaterial',
        method: 'GET',
    })
}
export function deleteMaterial(materialIDList) {
    return request({
        url: '//material/deleteMaterial',
        method: 'DELETE',
        data:JSON.stringify(materialIDList)
    })
}
