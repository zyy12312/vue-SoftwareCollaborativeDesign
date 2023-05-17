<template>
    <el-main style="background-color: #E2E1E4">
        <el-card class="box-card">
            <div slot="header" class="clearfix" style="text-align: left">
                <span><i class="el-icon-s-management"></i>课程信息</span>
            </div>
            <div v-for="item in items"  :key="item" class="text item" style="text-align: left">
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">{{item.title1}}：   {{item.name}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">{{item.title2}}：   {{item.classify}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">{{item.title3}}：  {{item.code}}</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">{{item.title4}}：   {{item.department}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">{{item.title5}}：   {{item.term}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">{{item.title6}}：   {{item.start}}</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">{{item.title7}}：   {{item.type}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">{{item.title8}}：   {{item.practice}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">{{item.title9}}：   {{item.teacher}}</div></el-col>
            </el-row>
            </div>
        </el-card>
    </el-main>
</template>
<script>
export default {
    name:"CourseInfo",
    data() {
        return {
            items:[
                {title1:"课程名称",title2:"必选修别",title3:"课程代码",title4:"开设系级",title5:"学年学期",
                    title6:"开始日期",title7:"课程类型",title8:"实习实数",title9:"授课老师",
                    name:"软件协同设计",classify:"必修",code:"EB88D2E4EF72250AE053",department:"光电信息与计算机工程学院",
                    term:"2022-2023 第二学期",start:"2023-02-13",type:"一般课程",practice:"0.0",teacher:"张三"}
            ],

        };
    },
    methods: {

    }
};
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

/deep/ .el-icon-s-management{
    font-size: 30px;
}

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
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #ffffff;
}
</style>