<template>
    <el-main>
        <el-table
            :data="gradeData"
            stripe
            border
            height="250"
            style="width: 100%">
            <el-table-column
                prop="title"
                label="作业标题">
            </el-table-column>
            <el-table-column
                prop="deadline"
                label="截止时间">
            </el-table-column>
            <el-table-column
                prop="character"
                label="作业负责人">
            </el-table-column>
            <el-table-column
                prop="handed/total"
                label="已交/总计">
            </el-table-column>
            <el-table-column
                prop="TaskStatus"
                label="作业状态">
            </el-table-column>
            <el-table-column>
                <el-button type="primary" plain>发布</el-button>
            </el-table-column>
            <el-table-column>
                <el-button type="success" plain>编辑</el-button>
            </el-table-column>
            <el-table-column>
                <el-button type="danger" plain>删除</el-button>
            </el-table-column>
        </el-table>
        <el-button type="primary">添加作业</el-button>
    </el-main>

</template>

<script>
export default {
    name: "TeacherGrade",
    data() {
        return {
            gradeData: [{
                title: '1',
                deadline: '2035060301',
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
