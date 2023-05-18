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
            <el-col :span="12">
                <div v-for="study in studies" :key="study" class="grid-content bg-purple-dark" style="text-align: left;margin-top: 47px;font-size: 18px">
                <p>次数：{{study.times}}</p>
                <p>时长：{{study.timelength}}</p>
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
                    <div v-for="discus in discuss" :key="discus" class="grid-content bg-purple-dark" >
                        <a style="font-family: 'Curlz MT',serif;font-size: 70px;color: #13ce66">{{discus.mydiscuss}}</a>
                        <a style="font-size: 30px"> /</a>
                        <a style="font-family: 'Curlz MT',serif;font-size: 30px;color: #263445"> {{discus.alldiscuss}}</a>
                    </div>
            </div></el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-dark" >
                <el-col :span="12">
                    <div class="grid-content bg-purple-dark" style="text-align: right;margin-top: 12px">
                    <i class="el-icon-news"></i>
                </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-dark" style="text-align: left">
                    <p> 阅读公告数</p>
                    <p>/总公告数</p>
                </div>
                </el-col>
                    <div v-for="notic in notice" :key="notic" class="grid-content bg-purple-dark" >
                        <a style="font-family: 'Curlz MT',serif;font-size: 70px;color: #13ce66">{{notic.readnotice}}</a>
                        <a style="font-size: 30px"> /</a>
                        <a style="font-family: 'Curlz MT',serif;font-size: 30px;color: #263445"> {{notic.allnotice}}</a>
                    </div>
            </div></el-col>
        </el-row>
        <el-row style="margin-top: 100px">
            <el-col :span="12">
                <div class="grid-content bg-purple-dark" >
                <el-col :span="12"><div class="grid-content bg-purple-dark" style="text-align: right;margin-top: 12px">
                    <i class="el-icon-download"></i>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-dark" style="text-align: left">
                    <p>文件查看/下载次数</p>
                    <p>/总参考资料数</p>
                </div>
                </el-col>
                    <div v-for="dat in data" :key="dat" class="grid-content bg-purple-dark" >
                        <a style="font-family: 'Curlz MT',serif;font-size: 70px;color: #13ce66">{{dat.downdata}}</a>
                        <a style="font-size: 30px"> /</a>
                        <a style="font-family: 'Curlz MT',serif;font-size: 30px;color: #263445"> {{dat.alldata}}</a>
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
                    <div v-for="task in tasks" :key="task" class="grid-content bg-purple-dark" >
                        <a style="font-family: 'Curlz MT',serif;font-size: 70px;color: #13ce66">{{task.submittask}}</a>
                        <a style="font-size: 30px"> /</a>
                        <a style="font-family: 'Curlz MT',serif;font-size: 30px;color: #263445"> {{task.alltask}}</a>
                    </div>
            </div></el-col>
        </el-row>
    </el-card>
</el-main>
</template>

<script >
export default {
    name:"StudyAnalysis",
    data(){
        return{
            name:"郑总",
            studies:[
                {times: 10,timelength:"00 小时 22 分 "}
            ],
            discuss:[
                {mydiscuss:1,alldiscuss:10}
            ],
            notice:[
                {readnotice:1,allnotice:5}
            ],
            data:[
                {downdata:2,alldata:5}
            ],
            tasks:[
                {submittask:1,alltask:2}
            ]
        }
    },
    methods:{

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