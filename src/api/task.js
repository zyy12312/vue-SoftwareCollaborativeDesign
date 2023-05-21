import request from "@/utils/request";

export function taskList() {
    return request({
        url: '/task/taskList',
        method: 'GET',
    })
}
export function taskDetail(taskID) {
    return request({
        url: '/task/detail',
        method: 'GET',
        taskID
    })
}
export function subTaskList(taskID) {
    return request({
        url: '/task/subTaskList',
        method: 'GET',
        taskID
    })
}
export function subTaskDetail(subTaskID) {
    return request({
        url: '/task/subTaskDetail',
        method: 'GET',
        subTaskID
    })
}
export function releaseTask(taskIDList) {
    return request({
        url: '/task/releaseTask',
        method: 'POST',
        taskIDList
    })
}
export function createTask(task) {
    return request({
        url: '/task/createTask',
        method: 'POST',
        task
    })
}
//?????
export function createSubTask(subTask) {
    return request({
        url: '/task/createSubTask',
        method: 'POST',
        subTask
    })
}
export function editTask(task) {
    return request({
        url: '/task/editTask',
        method: 'POST',
        task
    })
}
export function editSubTask(subtask) {
    return request({
        url: '/task/editSubTask',
        method: 'POST',
        subtask
    })
}
export function deleteTask(taskIDList) {
    return request({
        url: '/task/deleteTask',
        method: 'DELETE',
        taskIDList
    })
}
export function createMaterial(subtaskIDList) {
    return request({
        url: '/task/deleteSubTask',
        method: 'DELETE',
        subtaskIDList
    })
}
