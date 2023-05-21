import Vue from 'vue'
import Router from "vue-router"

Vue.use(Router)

import StudentLayout from "@/layouts/StudentLayout.vue";
import TeacherLayout from "@/layouts/TeacherLayout.vue";

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
                path: '/homepage',
                component :()=>import('@/views/HomePage.vue'),
                children: [
                    //发帖详情
                    {
                        path: "studydiscuss",
                        component : ()=> import('@/views/StudyDiscuss.vue'),
                        children: [

                        ],
                        hidden: true
                    },
                    {
                        path : "/discussdetail",
                        name : "DiscussDetail",
                        component : () => import('@/views/DiscussDetail'),
                        hidden : false
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
        ],
        hidden: true
    },


    {
        path: "/task",
        component :() =>import('@/views/Task'),
        hidden: true
    },
    //主页面
    {
        path: "/main",
        component :()=> import('@/views/BasePage.vue'),
        children : [
            //初始页面
            {
                path: "/basepage",
                name:"BasePage",
                component : ()=> import('@/views/HomePage.vue'),
                children :[
                    {
                        path: "classmember",
                        name:"ClassMember",
                        component : ()=> import('@/views/ClassMember'),
                        hidden: true
                    }
                ],
                hidden: true
            },
        ],
        hidden: false
    },
    {
        path: "/information",
        component : ()=> import('@/views/Information'),
        hidden: true
    },
    // studentRoutes,
    // teacherRoutes,
    { path: '*', redirect: '/404', hidden: true }
]

//学生端路由表
export const studentRoutes = [
    {
        path : "/student",
        component : StudentLayout,

        name : StudentLayout,
        children : [
            //组队管理
            {
                path: "group",
                component : ()=> import('@/views/student/Group'),
                hidden: true
            },
            //资料中心
            {
                path: "information",
                redirect: '/information',
                hidden: true
            },
            //任务中心
            {
                path: "task",
                redirect: "/task",
                hidden: true
            },
            //发帖讨论
            {
                path: "discuss",
                redirect : "/discuss"
            },
            //团队内交流

            {
                path: "chat",
                component: () => import('@/views/student/Chat')
            }
        ],
        hidden : true
    }
]

//教师端路由表
export const teacherRoutes = [
    // {
    //     path: "/teacher",
    //     component :TeacherLayout,
    //     name :TeacherLayout,
    //     children : [
    //         //组队管理
    //         {
    //             path: "teacherGroup",
    //             component : ()=> import('@/views/teacher/TeacherTeam.vue'),
    //             hidden: true
    //         },
    //         //资料管理
    //         {
    //             path: "information",
    //             redirect: '/information',
    //             hidden: true
    //         },
    //         //任务管理
    //         {
    //             path: "task",
    //             redirect: "/task",
    //             hidden: true
    //         },
    //         //发帖讨论
    //         {
    //             path: "discuss",
    //             redirect : "/discuss"
    //         },
    //         //教师端与各个团队交流
    //         // {
    //         //     path: "chat",
    //         //     component: () => import('@/views/teacher/Chat')
    //         // },
    //         //教师端成绩管理
    //         {
    //             path: "grade",
    //             component: () => import('@/views/teacher/TeacherGrade.vue')
    //         }
    //     ],
    //     hidden :true,
    // }
    {
        path: "/teacher",
        component :TeacherLayout,
        name :TeacherLayout,
        children : [
            //组队管理
            {
                path: "teacherGroup",
                component : ()=> import('@/views/teacher/TeacherTeam.vue'),
                hidden: true
            },
            //资料管理
            {
                path: "information",
                redirect: '/information',
                hidden: true
            },
            //任务管理
            {
                path: "task",
                redirect: "/task",
                hidden: true
            },
            //发帖讨论
            {
                path: "discuss",
                redirect : "/discuss"
            },
            //教师端与各个团队交流
            // {
            //     path: "chat",
            //     component: () => import('@/views/teacher/Chat')
            // },
            //教师查看作业详情
            {
                path: "task_submissionDetail",
                component: () => import('@/views/teacher/TeacherTask_submissionDetail.vue')
            },
            //教师端成绩管理
            {
                path: "grade",
                component: () => import('@/views/teacher/TeacherGrade.vue')
            }
        ],
        hidden :true,
    }
]

const createRouter = () => new Router(
    {
        scrollBehavior: () => ({ y: 0 }),
        routes: baseRoutes
    }
)

const createStudentRouter = () => new Router(
    {
        scrollBehavior: () => ({ y: 0 }),
        routes: baseRoutes.concat(studentRoutes)
    }
)
const createTeacherRouter = () => new Router(
    {
        scrollBehavior: () => ({ y: 0 }),
        routes: baseRoutes.concat(teacherRoutes)
    }
)
const router = createRouter()

export function resetRouter() {
    let newRouter = createRouter()
    // if (true==true) {
        newRouter = createStudentRouter()
    // } else {
        newRouter = createTeacherRouter()
    // }
    router.matcher = newRouter.matcher // reset router
}

export default router
