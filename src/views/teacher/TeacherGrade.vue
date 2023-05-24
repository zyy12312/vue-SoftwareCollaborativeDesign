<!--<template>-->
<!--    <el-main>-->
<!--        <el-table-->
<!--            :data="gradeData"-->
<!--            stripe-->
<!--            border-->
<!--            height="250"-->
<!--            style="width: 100%">-->
<!--            <el-table-column-->
<!--                prop="id"-->
<!--                label="序号">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                prop="studentId"-->
<!--                label="学号">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                prop="studentName"-->
<!--                label="姓名">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                prop="GroupGrade"-->
<!--                label="小组成绩">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                label="期末成绩">-->
<!--                <el-input v-model="gradeData[index].finalGrade" placeholder="请输入期末成绩"></el-input>-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                prop="totalGrade"-->
<!--                label="总成绩" >-->
<!--            </el-table-column>-->
<!--        </el-table>-->
<!--        <el-button type="primary">保存</el-button>-->
<!--        <el-button type="success">确认并计算总成绩</el-button>-->
<!--    </el-main>-->

<!--</template>-->

<template>
    <el-main>
        <el-collapse v-model="activeName" accordion>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <div v-for="titleGroup in titleGroups" :key="titleGroup.title1" class="team font">
                        <el-row>
                            <el-col :span="6">
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
                            <el-col :span="6">
                                <div class="grid-content bg-purple">{{ titleGroup.title5 }}</div>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div v-for="grade in gradeData" v-bind:key="grade.id">
                        <el-row>
                            <el-col :span="6">
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
                            <el-col :span="6">
                                <div class="grid-content bg-purple">{{ grade.totalGrade }}</div>
                            </el-col>
                        </el-row>
                    </div>
                <div class="grid-content bg-purple-light" >
                    <el-button type="primary" @click="saveGrade()"  style="font-size: 16px" >保存</el-button>
                </div>
            </el-card>
        </el-collapse>
    </el-main>

</template>

<script>
export default {
    name: "TeacherGrade",
    data() {
        return {
            gradeData: [{
                id: '1',
                studentId: '2035060301',
                studentName: '王小虎',
                GroupGrade: '87',
                finalGrade: "",
                totalGrade: 'N/A'
            },{
                id: '2',
                studentId: '2035060302',
                studentName: '王小虎',
                GroupGrade: '87',
                finalGrade: "",
                totalGrade: '78'
            },{
                id: '3',
                studentId: '2035060303',
                studentName: '王小虎',
                GroupGrade: '87',
                finalGrade: "",
                totalGrade: '70'
            },{
                id: '4',
                studentId: '2035060304',
                studentName: '王小虎',
                GroupGrade: '87',
                finalGrade: "",
                totalGrade: 'N/A'
            },{
                id: '5',
                studentId: '2035060305',
                studentName: '王小虎',
                GroupGrade: '87',
                finalGrade: "",
                totalGrade: '99'
            },{
                id: '6',
                studentId: '2035060306',
                studentName: '王小虎',
                GroupGrade: '87',
                finalGrade: "",
                totalGrade: 'N/A'
            },{
                id: '7',
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
        saveGrade(){

        }
    }
}

</script>


<style scoped>

</style>
