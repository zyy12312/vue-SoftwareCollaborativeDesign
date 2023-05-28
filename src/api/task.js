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
        params:{
            taskID:taskID
        }
    })
}
export function subTaskList(taskID) {
    return request({
        url: '/task/subTaskList',
        method: 'GET',
        params:{
            taskID:taskID
        }
    })
}
export function subTaskDetail(subTaskID) {
    return request({
        url: '/task/subTaskDetail',
        method: 'GET',
        params:{
            subTaskID:subTaskID
        }

    })
}
export function releaseTask(taskIDList) {
    return request({
        url: '/task/releaseTask',
        method: 'POST',
        data:JSON.stringify(taskIDList)
    })
}
export function createTask(task) {
    return request({
        url: '/task/createTask',
        method: 'POST',
        data:JSON.stringify(task)
    })
}
//?????
export function createSubTask(subTask) {
    return request({
        url: '/task/createSubTask',
        method: 'POST',
        data:JSON.stringify(subTask)

    })
}
export function editTask(task) {
    return request({
        url: '/task/editTask',
        method: 'POST',
        data:JSON.stringify(task)

    })
}
export function editSubTask(subtask) {
    return request({
        url: '/task/editSubTask',
        method: 'POST',
        data:JSON.stringify(subtask)
    })
}
export function deleteTask(taskIDList) {
    return request({
        url: '/task/deleteTask',
        method: 'DELETE',
        data:JSON.stringify(taskIDList)
    })
}
export function deleteSubTask(subtaskIDList) {
    return request({
        url: '/task/deleteSubTask',
        method: 'DELETE',
        data:JSON.stringify(subtaskIDList)
    })
}

