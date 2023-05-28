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

                <div v-for="grade in gradeData" v-bind:key="grade.id">
                        <el-row style="margin-top: 20px">
                            <el-col :span="4">
                                <div class="grid-content bg-purple">{{ grade.studentId }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple-light">{{ grade.studentName }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple">{{ grade.GroupGrade }}</div>
                            </el-col>
                            <el-col :span="4">
                                <el-input v-model="grade.finalGrade" placeholder="请输入期末成绩"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple">{{ grade.totalGrade }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple-light" >
                                    <el-button type="primary" @click="saveGrade(grade.studentId, grade.totalGrade)"  style="font-size: 16px" >保存</el-button>
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
            gradeData: [{
                id: 1,
                studentId: '2035060301',
                studentName: '王小虎',
                GroupGrade: '87',
                finalGrade: "",
                totalGrade: 'N/A'
            },{
                id: 2,
                studentId: '2035060302',
                studentName: '王小虎',
                GroupGrade: '87',
                finalGrade: "",
                totalGrade: '78'
            },{
                id: 3,
                studentId: '2035060303',
                studentName: '王小虎',
                GroupGrade: '87',
                finalGrade: "",
                totalGrade: '70'
            },{
                id: 4,
                studentId: '2035060304',
                studentName: '王小虎',
                GroupGrade: '87',
                finalGrade: "",
                totalGrade: 'N/A'
            },{
                id: 5,
                studentId: '2035060305',
                studentName: '王小虎',
                GroupGrade: '87',
                finalGrade: "",
                totalGrade: '99'
            },{
                id: 6 ,
                studentId: '2035060306',
                studentName: '王小虎',
                GroupGrade: '87',
                finalGrade: "",
                totalGrade: 'N/A'
            },{
                id: 7,
                studentId: '2035060307',
                studentName: '王小虎',
                GroupGrade: '87',
                finalGrade: "",
                totalGrade: '67'
            } ],
            titleGroups:[
                {title1:"学号",title2:"姓名",title3:"小组成绩",title4:"期末成绩",title5:"总成绩"}
            ]
        }
    },
    methods: {
        //获取成绩列表
        async getList() {
            await getGradeList()
                .then((res)=>{
                    if (res.code===200){
                        this.gradeData = res.data
                        console.log(this.gradeData)
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                    Message.error(err)
                })
        },

        //保存成绩
        saveGrade(id, score){
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
