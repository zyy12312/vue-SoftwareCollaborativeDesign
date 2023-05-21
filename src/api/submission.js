import request from "@/utils/request";

export function addSubmission(submission) {
    return request({
        url: '/submission/addSubmission',
        method: 'POST',
        submission
    })
}
export function editSubmission(submission) {
    return request({
        url: '/submission/editSubmission',
        method: 'POST',
        submission
    })
}
export function getSubmissionToTask(taskID) {
    return request({
        url: '/submission/getSubmissionToTask',
        method: 'GET',
        taskID
    })
}
export function getSubmissionListToSubTask(subTaskID) {
    return request({
        url: '/submission/getSubmissionListToSubTask',
        method: 'GET',
        subTaskID
    })
}
