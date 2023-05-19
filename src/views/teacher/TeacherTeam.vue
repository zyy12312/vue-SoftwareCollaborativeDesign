<template>
    <el-main>
        <el-collapse v-model="activeName" accordion>
            <ul id="team">
                <li v-for="team in teams" v-bind:key="team.title">
                    <el-card class="box-card"> <!--每一个课程的卡片-->
                        <div slot="header" class="clearfix">
                            <span>第{{ teams[0].teamID }}组分组详情</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="goChat">交流入口
                            </el-button>
                        </div>
                        <div v-for="cla in clas" :key="cla.title1" class="team font">
                            <el-row>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">{{ cla.title1 }}</div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple-light">{{ cla.title2 }}</div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">{{ cla.title3 }}</div>
                                </el-col>
                            </el-row>
                        </div>
                        <div v-for="team in teams" :key="team.studentName" class="text team">
                            <el-row>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">{{ team.studentID }}</div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple-light">{{ team.studentName }}</div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple">{{ team.character }}</div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </li>
            </ul>
        </el-collapse>
    </el-main>

</template>

<script>


export default {
    name: 'TeacherTeam',

    el: "#team",
    data() {
        return {
            activeName: '1',
            teams:[
                {teamID:"5",studentID:"2035060301",studentName: "张三",character:"小组长"},
                {teamID:"5",studentID:"2035060302",studentName: "李四",character:"计划经理"},
                {teamID:"5",studentID:"2035060303",studentName: "王五",character:"产品经理"},
                {teamID:"5",studentID:"2035060304",studentName: "老六",character:"质量经理"}
            ],
            clas:[
                {title1:"成员学号",title2:"成员名称",title3:"对应角色"}
            ]
        };
    },
    methods: {}

}

</script>

<style scoped>
.text team{
    align-items: center;
    justify-content: center;
    justify-items: center;
}
el-row{
    align-items: center;
    flex: auto;
    justify-content: center;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>