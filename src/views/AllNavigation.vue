<template>
    <el-main>
        <el-row>
            <el-col >
                <el-tabs v-model="activeName" @tab-click="handleClick" >
                    <el-tab-pane label="班级成员" name="first" ><ClassMember></ClassMember></el-tab-pane>
                    <el-tab-pane label="课程信息" name="second"><CourseInfo></CourseInfo></el-tab-pane>
                    <el-tab-pane label="成绩" name="third"><StudentMark></StudentMark></el-tab-pane>
                    <el-tab-pane label="学习分析" name="fourth"><StudyAnalysis></StudyAnalysis></el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </el-main>
</template>

<script >

import ClassMember from "@/views/ClassMember.vue";
import CourseInfo from "@/views/CourseInfo.vue";
import StudentMark from "@/views/StudentMark.vue";
import StudyAnalysis from "@/views/StudyAnalysis.vue";

export default {
    name:"AllNavigation",
    components: {StudyAnalysis,   StudentMark, CourseInfo, ClassMember},
    data() {
        return {
            activeName: 'first',
            //active:0
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
    },
}
</script>


<style scoped>
::v-deep .el-tabs__nav-scroll{
    width:30%;
    margin:0 auto
}
</style>