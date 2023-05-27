import Vue from 'vue'
import Router from "vue-router"

Vue.use(Router)

//基本路由表
export const baseRoutes = [

    {
        path : "/signIn",
        component : () => import('@/views/SignInPage'),
        hidden : true
    },
    {
        path: "/",
        redirect: "/login",
        hidden: true
    },
    {
        path : "/login",
        component : () => import('@/views/LoginPage'),
        hidden : true
    },

    {
        path: "/404",
        component : ()=> import('@/views/404.vue'),
        hidden: true
    },
    {
        path: '/basepage',
        component :()=>import('@/views/BasePage.vue'),
        redirect: '/homepage',
        children: [
            {
                path : "discussdetail/:item",
                name : "DiscussDetail",
                component : () => import('@/views/DiscussDetail'),
                // redirect:"/homepage/studydiscuss",
                props:true,
                hidden : false
            },
            {
                path: "task_submissionDetail",
                component : ()=> import('@/views/teacher/TeacherTask_submissionDetail.vue'),
                hidden: true
            },
            {
                path: '/homepage',
                component :()=>import('@/views/HomePage.vue'),
                children: [

                    //发帖详情
                    {
                        path: "studydiscuss",
                        name : "StudyDiscuss",
                        component : ()=> import('@/views/StudyDiscuss.vue'),
                        // children: [

                        // ],
                        hidden: true
                    },
                    {
                        path: "chapterdetail",
                        component : ()=> import('@/views/ChapterDetail.vue'),
                        hidden: true
                    },
                    {
                        path: "coursegroup",
                        component : ()=> import('@/views/CourseGroup.vue'),
                        hidden: true
                    },
                    {
                        path: "groupchat",
                        component : ()=> import('@/views/GroupChat.vue'),
                        hidden: true
                    },
                    {
                        path: "databank",
                        component : ()=> import('@/views/DataBank.vue'),
                        hidden: true
                    },
                    {
                        path: "studenttask",
                        component : ()=> import('@/views/StudentTask.vue'),
                        hidden: true
                    },
                    {
                        path: "studydiscuss",
                        component : ()=> import('@/views/StudyDiscuss.vue'),
                        hidden: true
                    },
                    {
                        path: "teacherteam",
                        component : ()=> import('@/views/teacher/TeacherTeam.vue'),
                        hidden: true
                    },
                    {
                        path: "teachergrade",
                        component : ()=> import('@/views/teacher/TeacherGrade.vue'),
                        hidden: true
                    },
                    {
                        path: "teachertask",
                        component : ()=> import('@/views/teacher/TeacherTask.vue'),
                        hidden: true
                    },
                    {
                        path: "teacherdatabank",
                        component : ()=> import('@/views/teacher/TeacherDataBank.vue'),
                        hidden: true
                    }
                ],
                hidden: true
            },
            {
                path: "/classmember",
                name:"ClassMember",
                component : ()=> import('@/views/ClassMember.vue'),
                hidden: true
            },
            //课程信息
            {
                path: "/courseinfo",
                name:"CourseInfo",
                component : ()=> import('@/views/CourseInfo.vue'),
                hidden: true
            },
            //成绩分析（学生）
            {
                path: "/studyanalysis",
                name: "StudyAnalysis",
                component :()=>import('@/views/StudyAnalysis.vue'),
                hidden: true
            },
            //成绩（学生）
            {
                path: "/studentmark",
                name: "StudentMark",
                component :()=>import('@/views/StudentMark.vue'),
                hidden: true
            },
            //修改个人信息
            {
                path: "/modifyinfo",
                name: "ModifyInfo",
                component :()=>import('@/views/ModifyInfo.vue'),
                hidden: true
            },
        ],
        hidden: true
    },
    { path: '*', redirect: '/404', hidden: true }
]



const createRouter = () => new Router(
    {
        scrollBehavior: () => ({ y: 0 }),
        routes: baseRoutes
    }
)


const router = createRouter()

export function resetRouter() {
    let newRouter = createRouter()
    // if (true==true) {
    //     newRouter = createStudentRouter()
    // } else {
    //     newRouter = createTeacherRouter()
    // }
    router.matcher = newRouter.matcher // reset router
}

export default router
