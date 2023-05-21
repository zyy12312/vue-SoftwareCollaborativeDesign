<script>
import TeacherTask from "@/views/teacher/TeacherTask.vue";
import TeacherTeam from "@/views/teacher/TeacherTeam.vue";
import ChapterDetail from "@/views/ChapterDetail.vue";
import StudentTask from "@/views/StudentTask.vue";
import DataBank from "@/views/DataBank.vue";
import TeacherGrade from "@/views/teacher/TeacherGrade.vue";
import StudyDiscuss from "@/views/StudyDiscuss.vue";
import TeacherDataBank from "@/views/teacher/TeacherDataBank.vue";
import GroupChat from "@/views/GroupChat.vue";
import CourseGroup from "@/views/CourseGroup.vue";
export default ({
    name: "MainPageBody",
    components: {
        CourseGroup,
        GroupChat,
        TeacherDataBank,
        StudyDiscuss,
        TeacherGrade,
        DataBank,
        StudentTask,
        ChapterDetail,
        TeacherTeam,
        TeacherTask
    },
    data() {
        return {
            activeName: 'first',
            //active:0
        };
    },
    methods: {
        getIndex(index) {
            this.indexs = index;
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
    },
    mounted() {

    }
})
</script>
<template>
    <el-col>
        <el-tabs v-if="$store.getters.user.role === 1" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="章节" name="first">
                <ChapterDetail></ChapterDetail>
            </el-tab-pane>
            <el-tab-pane label="讨论" name="eight">
                <StudyDiscuss></StudyDiscuss>
            </el-tab-pane>
            <el-tab-pane label="分组" name="thirteen">
                <TeacherTeam></TeacherTeam>
            </el-tab-pane>
            <el-tab-pane label="成绩管理" name="fourteen">
                <TeacherGrade></TeacherGrade>
            </el-tab-pane>
            <el-tab-pane label="作业管理" name="fifteen">
                <TeacherTask></TeacherTask>
            </el-tab-pane>
            <el-tab-pane label="资料管理" name="sixteen">
                <TeacherDataBank></TeacherDataBank>
            </el-tab-pane>
        </el-tabs>
        <el-tabs v-else-if="$store.getters.user.role === 0" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="章节" name="first">
                <ChapterDetail></ChapterDetail>
            </el-tab-pane>
            <el-tab-pane label="课程分组" name="third">
                <CourseGroup></CourseGroup>
            </el-tab-pane>
            <el-tab-pane label="小组交流" name="fourth">
                <GroupChat></GroupChat>
            </el-tab-pane>
            <el-tab-pane label="资料" name="fife">
                <DataBank></DataBank>
            </el-tab-pane>
            <el-tab-pane label="作业" name="six">
                <StudentTask></StudentTask>
            </el-tab-pane>
            <el-tab-pane label="讨论" name="eight">
                <StudyDiscuss></StudyDiscuss>
            </el-tab-pane>
        </el-tabs>
    </el-col>
</template>
<style scoped>
::v-deep .el-tabs__nav-scroll {
    width: fit-content;
    margin: 0 auto
}
</style>

