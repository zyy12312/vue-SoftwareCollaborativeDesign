
<template>
<el-main style="background-color: #E2E1E4">
    <div v-for="score in scores"  :key="score" class="text item " >
    <el-row>
        <el-col :span="8"><div class="grid-content1 bg-purple-dark boxx">{{score.teacherScore}}分<div class="font">教师评分</div></div></el-col>
        <el-col :span="8"><div class="grid-content1 bg-purple-dark boxx">{{score.overallScore}}分<div class="font">综合成绩</div></div></el-col>
        <el-col :span="8"><div class="grid-content1 bg-purple-dark boxx">{{score.finalScore}}分<div class="font">期末成绩</div></div></el-col>
    </el-row>
    </div>
    <el-card class="box-card" >
        <div slot="header" class="clearfix" >
            <span v-for="item in items" :key="item" >
            <el-row>
                <el-col :span="9"><div class="grid-content bg-purple ">{{item.title1}}</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple-light " style="text-align: left">{{item.title2}}</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple " style="text-align: left">{{item.title3}}</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple-light " style="text-align: left">{{item.title4}}</div></el-col>
            </el-row>
            </span>
        </div>
        <div v-for="(task,id) in tasks" :key="id" class="text item" style="text-align: left;">
            <el-row>
                <el-col :span="9"><div class="grid-content bg-purple " style="margin-top: 12px">{{task.name}}</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple-light " style="margin-top: 12px">{{task.record}}</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple " style="margin-top: 11px">{{task.mark}}</div></el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple-light ">
                            <el-button type="text" @click="dialogFormVisible = true;getIndex(id)"  style="font-size: 16px" >点击查看</el-button>
                            <el-dialog :title="task.title" :visible.sync="dialogFormVisible" v-if="indexs===id">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix" style="text-align: center;font-size: 18px">
                                        <span>教师评语</span>
                                    </div>
                                    <div  class="text item" style="font-size: 16px">
                                        {{task.comment}}
                                    </div>
                                </el-card>
                            </el-dialog>
                </div></el-col>
            </el-row>
        </div>
    </el-card>
</el-main>
</template>

<script >
export default {
    name:"StudentMark",
    data(){
        return{
            dialogFormVisible: false,
            indexs:0,
            scores:[
                {teacherScore:45,overallScore:40,finalScore:85}
            ],
            items:[
                {title1:"任务",title2:"提交记录",title3:"评分",title4:"查看评语",}
            ],
            tasks:[
                {id:1,name:"DES实现",record:"2023.05.13 11:30",mark:"未评分",comment:"无"},
                {id:2,name:"DES实现",record:"2023.05.13 11:30",mark:"未评分",comment:"无1"}
            ]
        }
    },
    methods:{
        getIndex(index){
            this.indexs=index;
        },
    }
}
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: #ffffff;
}
.bg-purple {
    background: #ffffff;
}
.bg-purple-light {
    background: #ffffff;
}
.grid-content1 {
    border-radius: 4px;
    min-height: 150px;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #ffffff;
}
.boxx{
    font-size: 55px;
    font-family: '微软雅黑 Light',serif;
    margin-top: 5px;
}

.font{
   font-size: 25px;
    font-family: 'Helvetica Neue',serif;
    margin-top: 25px;
}

.font1{
    font-size: 20px;
    margin-top: 15px;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    width: 100%;
}
</style>