<script>
export default ({
    name: "MainPageBody",
    components: {

    },
    data() {
        return {
            activeName: 'first',
            paths:{
                "first" : '/chapterdetail',
                "third" : '/coursegroup',
                'fourth' : '/groupchat',
                "fife" : '/databank',
                "six" : '/studenttask',
                "eight" : '/studydiscuss',
                "thirteen" : '/teacherteam',
                "fourteen" : '/teachergrade',
                "fifteen" : '/teachertask',
                "sixteen" : '/teacherdatabank'
            }
            //active:0
        };
    },
    methods: {
        getIndex(index) {
            this.indexs = index;
        },
        handleClick(tab) {
            let basepath = "/homepage";
             console.log(basepath+this.paths[tab.name])
            this.$router.push(basepath+this.paths[tab.name])
            this.activeName = tab.name
            // console.log(this.activeName);
            // console.log(tab, event);
        },
    },
    mounted() {
        let url = window.location.href
        let currentTag = (url).substring((url).lastIndexOf("/"))
        console.log("current"+currentTag)

        for (let key in this.paths){
            console.log(key)
            if (this.paths[key] === currentTag){
                this.activeName = key
                break
            }
        }
    }
})
</script>
<template>
    <el-col>
        <keep-alive>
            <el-tabs v-if="$store.getters.user.role === 1" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="章节" name="first">
                    <!--                <ChapterDetail></ChapterDetail>-->
                </el-tab-pane>
                <el-tab-pane label="讨论" name="eight">
                    <!--                <StudyDiscuss></StudyDiscuss>-->
                </el-tab-pane>
                <el-tab-pane label="分组" name="thirteen">
                    <!--                <TeacherTeam></TeacherTeam>-->
                </el-tab-pane>
                <el-tab-pane label="成绩管理" name="fourteen">
                    <!--                <TeacherGrade></TeacherGrade>-->
                </el-tab-pane>
                <el-tab-pane label="作业管理" name="fifteen">
                    <!--                <TeacherTask></TeacherTask>-->
                </el-tab-pane>
                <el-tab-pane label="资料管理" name="sixteen">
                    <!--                <TeacherDataBank></TeacherDataBank>-->
                </el-tab-pane>
            </el-tabs>
            <el-tabs v-else-if="$store.getters.user.role === 0" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="章节" name="first">
                    <!--                <ChapterDetail></ChapterDetail>-->
                </el-tab-pane>
                <el-tab-pane label="课程分组" name="third">
                    <!--                <CourseGroup></CourseGroup>-->
                </el-tab-pane>
                <el-tab-pane label="小组交流" name="fourth">
                    <!--                <GroupChat></GroupChat>-->
                </el-tab-pane>
                <el-tab-pane label="资料" name="fife">
                    <!--                <DataBank></DataBank>-->
                </el-tab-pane>
                <el-tab-pane label="作业" name="six">
                    <!--                <StudentTask></StudentTask>-->
                </el-tab-pane>
                <el-tab-pane label="讨论" name="eight">
                    <!--                <StudyDiscuss></StudyDiscuss>-->
                </el-tab-pane>
            </el-tabs>
        </keep-alive>
        <router-view/>
    </el-col>
</template>
<style scoped>
::v-deep .el-tabs__nav-scroll {
    width: fit-content;
    margin: 0 auto
}
</style>

