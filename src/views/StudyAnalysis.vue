<template>
<el-main style="background-color: #ffffff">
    <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align: left">
            <span>{{ name }}的学习分析</span>
        </div>
        <el-row >
            <el-col :span="12"><div class="grid-content bg-purple-dark" style="margin-top: 50px">
                <i class="el-icon-s-check"></i>课程访问
            </div></el-col>
        </el-row>
        <el-row style="margin-top: 100px">
            <el-col :span="12">
                <div class="grid-content bg-purple-dark" >
                <el-col :span="12"><div class="grid-content bg-purple-dark" style="text-align: right;margin-top: 12px">
                    <i class="el-icon-chat-dot-square"></i>
                </div></el-col>
                <el-col :span="12">
                    <div  class="grid-content bg-purple-dark" style="text-align: left">
                    <p>发表贴子数</p>
                    <p>/讨论总帖子数</p>
                </div>
                </el-col>
                    <div  class="grid-content bg-purple-dark" >
                        <a style="font-family: 'Curlz MT',serif;font-size: 70px;color: #13ce66">{{discuss.submitAmount}}</a>
                        <a style="font-size: 30px"> /</a>
                        <a style="font-family: 'Curlz MT',serif;font-size: 30px;color: #263445"> {{discuss.total}}</a>
                    </div>
            </div></el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-dark" >
                    <el-col :span="12"><div class="grid-content bg-purple-dark" style="text-align: right;margin-top: 12px">
                        <i class="el-icon-document-copy"></i>
                    </div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-dark" style="text-align: left">
                        <p>作业交付数</p>
                        <p>/作业布置总数</p>
                    </div>
                    </el-col>
                    <div  class="grid-content bg-purple-dark" >
                        <a style="font-family: 'Curlz MT',serif;font-size: 70px;color: #13ce66">{{tasks.submitAmount}}</a>
                        <a style="font-size: 30px"> /</a>
                        <a style="font-family: 'Curlz MT',serif;font-size: 30px;color: #263445"> {{tasks.taskAmount}}</a>
                    </div>
                </div></el-col>
        </el-row>
    </el-card>
</el-main>
</template>

<script >
import {Message} from "element-ui";
import {discussStatistic} from "@/api/discuss";
import {taskStatistic} from "@/api/task";

export default {
    name:"StudyAnalysis",
    data(){
        return{
            name:this.$store.getters.user.name,
            discuss:[
                // {mydiscuss:1,alldiscuss:10}
            ],
            tasks:[
                // {submittask:1,alltask:2}
            ]
        }
    },
    methods:{

    },
    mounted() {
        discussStatistic().then((res)=>{
            if (res.code===200){
                let resultbody = res.data
                console.log(resultbody)
                this.discuss = resultbody
                Message.success(res.msg)
            }
        }).catch((err)=>{
            Message.error(err)
        });
        taskStatistic().then((res)=>{
            if (res.code===200){
                let resultbody = res.data
                console.log(resultbody)
                this.tasks = resultbody
                Message.success(res.msg)
            }
        }).catch((err)=>{
            Message.error(err)
        });
    }
}
</script>

<style scoped>
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

/deep/ .el-icon-s-check{
    font-size: 60px;
}

/deep/ .el-icon-chat-dot-square{
    font-size: 60px;
}

/deep/ .el-icon-news{
    font-size: 60px;
}
/deep/ .el-icon-download{
    font-size: 60px;
}
/deep/ .el-icon-document-copy{
    font-size: 60px;
}
</style>