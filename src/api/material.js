const request = this.$axios.request

export function createMaterial(material) {
    return request({
        url: '/material/createMaterial',
        method: 'POST',
        material
    })
}
export function editMaterial(material) {
    return request({
        url: '/material/editMaterial',
        method: 'POST',
        material
    })
}
export function releaseMaterial(materialIDList) {
    return request({
        url: '/material/releaseMaterial',
        method: 'POST',
        materialIDList
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
        materialIDList
    })
}
