<template>
    <el-main>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark" >
                        <p  style="color: black;font-size: 20px;text-align: left">软件协同设计课程网站</p>
                        <p  style="color: #8f8c8c;font-size: 15px;text-align: left">2022-2023 2022-2023第二学期 计算机系-计算机科学教研室</p>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item style="text-align: left">授课教师<el-avatar shape="circle" size="large" src="assets/logo.png" /></el-menu-item>
                        <el-menu-item index="1" ><i class="el-icon-s-custom"></i><a href="https://www.ele.me" target="_blank" >班级成员</a></el-menu-item>
                        <el-menu-item index="2" ><i class="el-icon-star-off"></i><a href="https://www.ele.me" target="_blank" >课程信息</a></el-menu-item>
                        <el-menu-item index="5" ><i class="el-icon-s-marketing"></i><a href="https://www.ele.me" target="_blank" >成绩</a></el-menu-item>
                        <el-menu-item index="6" ><i class="el-icon-pie-chart"></i><a href="https://www.ele.me" target="_blank" >学习分析</a></el-menu-item>
                    </el-menu>
                </div>
            </el-col>
            <el-col >
                <el-tabs v-model="activeName" @tab-click="handleClick" >
                    <el-tab-pane label="章节" name="first" ><ChapterDetail></ChapterDetail></el-tab-pane>
                    <el-tab-pane label="课程分组" name="third"><CourseGroup></CourseGroup></el-tab-pane>
                    <el-tab-pane label="小组交流" name="fourth"><GroupChat></GroupChat></el-tab-pane>
                    <el-tab-pane label="资料" name="fife"><DataBank></DataBank></el-tab-pane>
                    <el-tab-pane label="作业" name="six"><StudentTask></StudentTask></el-tab-pane>
                    <el-tab-pane label="讨论" name="eight"><StudyDiscuss></StudyDiscuss></el-tab-pane>
                    <el-tab-pane label="教师-分组" name="thirteen"><TeacherTeam></TeacherTeam></el-tab-pane>
                    <el-tab-pane label="教师-成绩" name="fourteen"><TeacherGrade></TeacherGrade></el-tab-pane>
                    <el-tab-pane label="教师-作业" name="fifteen"><TeacherTask></TeacherTask></el-tab-pane>
                    <el-tab-pane label="教师-资料" name="sixteen"><TeacherDataBank></TeacherDataBank></el-tab-pane>
                    <el-tab-pane label="教师-作业-提交详情" name="seventeen"><TeacherTask_submissionDetail></TeacherTask_submissionDetail></el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </el-main>

</template>

<script >



import ChapterDetail from "@/views/ChapterDetail.vue";
// import DiscussDetail from "@/views/DiscussDetail.vue";
import StudentTask from "@/views/StudentTask.vue";
import DataBank from "@/views/DataBank.vue";
import CourseGroup from "@/views/CourseGroup.vue";
import GroupChat from "@/views/GroupChat.vue";
import StudyDiscuss from "@/views/StudyDiscuss.vue";
import TeacherGrade from "@/views/teacher/TeacherGrade.vue";
import TeacherTeam from "@/views/teacher/TeacherTeam.vue";
import TeacherTask from "@/views/teacher/TeacherTask.vue";
import TeacherTask_submissionDetail from "@/views/teacher/TeacherTask_submissionDetail.vue";
import TeacherDataBank from "@/views/teacher/TeacherDataBank.vue";

export default {
    name:"PageTitle",
    components: {
        StudyDiscuss, GroupChat, CourseGroup, DataBank, StudentTask, ChapterDetail, TeacherTeam, TeacherGrade,TeacherTask,TeacherDataBank,TeacherTask_submissionDetail}, //DiscussDetail
    data() {
        return {
            activeName: 'first',
            //active:0
        };
    },
    methods: {
        getIndex(index){
            this.indexs=index;
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
    },
};
</script>

<style scoped>
::v-deep .el-tabs__nav-scroll{
    width:75%;
    margin:0 auto
}
</style>
