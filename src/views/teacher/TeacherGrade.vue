<template>
    <el-main>
        <el-collapse v-model="activeName" accordion>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <div v-for="titleGroup in titleGroups" :key="titleGroup.title1" class="team font">
                        <el-row>
                            <el-col :span="4">
                                <div class="grid-content bg-purple">{{ titleGroup.title1 }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple-light">{{ titleGroup.title2 }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple">{{ titleGroup.title3 }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple">{{ titleGroup.title4 }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple">{{ titleGroup.title5 }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple">保存</div>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div v-for="(grade,outIndex) in gradeData" v-bind:key="outIndex">
                        <el-row style="margin-top: 20px">
                            <el-col :span="4">
                                <div class="grid-content bg-purple">{{ grade.student.id }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple-light">{{ grade.student.name }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple">{{ grade.groupScore }}</div>
                            </el-col>
                            <el-col :span="4">
                                <el-input v-model="grade.finalScore" placeholder="请输入期末成绩"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple" >{{ grade.totalScore }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple-light" >
                                    <el-button type="primary" @click="saveGrade(grade.student.id, parseFloat(grade.finalScore))"  style="font-size: 16px" >保存</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>

            </el-card>
        </el-collapse>
    </el-main>

</template>

<script>
import {Message} from "element-ui";
import {getGradeList, inputGrade} from "@/api/grade";

export default {
    name: "TeacherGrade",
    data() {
        return {
            activeName:"first",
            gradeData: [],
            titleGroups:[
                {title1:"学号",title2:"姓名",title3:"小组成绩",title4:"期末成绩",title5:"总成绩"}
            ]
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        //获取成绩列表
        async getList() {
            await getGradeList()
                .then((res)=>{
                    if (res.code===200){
                        this.gradeData = res.data
                        for(var grade in this.gradeData){
                            this.gradeData[grade].totalScore = this.gradeData[grade].totalScore.toFixed(1)
                            this.gradeData[grade].groupScore = this.gradeData[grade].groupScore.toFixed(1)
                        }
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                    Message.error(err)
                })
        },

        //保存成绩
        saveGrade(id, score){
            console.log(typeof id+","+typeof score)
            inputGrade({"studentID":id, "finalScore":score})
                .then((res)=>{
                    if (res.code===200){
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        }
    }
}

</script>


<style scoped>

</style>
