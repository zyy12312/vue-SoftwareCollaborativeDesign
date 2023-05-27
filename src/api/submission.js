import request from "@/utils/request";

export function addSubmission(submission) {
    return request({
        url: '/submission/addSubmission',
        method: 'POST',
        data:JSON.stringify(submission)

    })
}
export function editSubmission(submission) {
    return request({
        url: '/submission/editSubmission',
        method: 'POST',
        data:JSON.stringify(submission)
    })
}
export function getSubmissionToTask(taskID) {
    return request({
        url: '/submission/getSubmissionToTask?taskID='+taskID,
        method: 'GET',
        // params:{
        //     "taskID":taskID
        // }
    })
}
export function getSubmissionListToSubTask(subTaskID) {
    return request({
        url: '/submission/getSubmissionListToSubTask?subTaskID='+subTaskID,
        method: 'GET',
        // params:{
        //     "subTaskID" :subTaskID
        // }

    })
}
export function readover(result) {
    return request({
        url: '/submission/readover',
        method: 'DELETE',
        data:JSON.stringify(result)
    })
}
