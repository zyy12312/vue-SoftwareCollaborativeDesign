<template>
    <el-main>
        <el-table
            :data="gradeData"
            stripe
            border
            height="250"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="序号">
            </el-table-column>
            <el-table-column
                prop="studentId"
                label="学号">
            </el-table-column>
            <el-table-column
                prop="studentName"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="GroupGrade"
                label="小组成绩">
            </el-table-column>
            <el-table-column
                label="期末成绩">
                <el-input v-model="input" placeholder="请输入期末成绩"></el-input>
            </el-table-column>
            <el-table-column
                prop="totalGrade"
                label="总成绩" >
            </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button type="success">确认并计算总成绩</el-button>
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
                totalGrade: 'N/A'
            },{
                id: '2',
                studentId: '2035060301',
                studentName: '王小虎',
                GroupGrade: '87',
                totalGrade: '78'
            },{
                id: '3',
                studentId: '2035060301',
                studentName: '王小虎',
                GroupGrade: '87',
                totalGrade: '70'
            },{
                id: '4',
                studentId: '2035060301',
                studentName: '王小虎',
                GroupGrade: '87',
                totalGrade: 'N/A'
            },{
                id: '5',
                studentId: '2035060301',
                studentName: '王小虎',
                GroupGrade: '87',
                totalGrade: '99'
            },{
                id: '6',
                studentId: '2035060301',
                studentName: '王小虎',
                GroupGrade: '87',
                totalGrade: 'N/A'
            },{
                id: '7',
                studentId: '2035060301',
                studentName: '王小虎',
                GroupGrade: '87',
                totalGrade: '67'
            } ],
            clas:[
                {title1:"序号",title2:"学号",title3:"姓名",title4:"小组成绩",title5:"期末成绩",title6:"总成绩"}
            ]
        }

    }
}
</script>


<style scoped>

</style>
