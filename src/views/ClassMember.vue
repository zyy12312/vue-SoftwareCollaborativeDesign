<template>
<el-main>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span  style="float: right;font-size: 14px" >本班级总共有 {{teacherNumber}}位教师 {{studentNumber}}名学生</span>
        </div>
    </el-card>
    <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align: left">
        <span v-for="title in titles" v-bind:key="title.title1">
                <el-row >
                    <el-col :span="12"><div class="grid-content bg-purple-light" >{{title.title1}}</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">{{title.title2}}</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">{{title.title3}}</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">{{title.title4}}</div></el-col>
                </el-row>
                </span>
        </div>
        <div v-for="(student,id) in students" :key="id" class="text item" style="text-align: left">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light" style="margin-top: 10px">
                        <el-avatar round width="50px" height="50px" :src="student.avatarURL"></el-avatar>
                        {{student.name}}   {{student.account}}
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-light" style="margin-top: 20px">{{student.role}}</div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-light" style="margin-top: 20px">{{student.sex}}</div>
                </el-col>
                <el-col :span="4" v-if="student.role==='学生'">
                    <div class="grid-content bg-purple-light" style="margin-top: 20px">第{{student.teamId}}组</div>
                </el-col>
            </el-row>
        </div>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[1,2,5,10]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total=total>
            </el-pagination>
        </div>
    </el-card>
</el-main>
</template>

<script >

export default {
    name:"ClassMember",
    data() {
        return {
            activeName: 'first',
            teacherNumber:1,
            studentNumber:10,
            queryInfo: {
                query:"",
                pagenum: 1, //当前的页数
                pagesize: 2, //每页的数量
            },
            total:11,
            students:[
                {id:1,account:"1001",name:"张三",avatarURL:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",role:"教师",sex:"女",teamId:""},
                {id:2,account:"10001",name:"李四",avatarURL:"https://img01.yzcdn.cn/vant/cat.jpeg",role:"学生",sex:"男",teamId:"5"},
                {id:3,account:"10002",name:"李都",avatarURL:"https://img01.yzcdn.cn/vant/cat.jpeg",role:"学生",sex:"男",teamId:"6"},
                {id:4,account:"10003",name:"李是",avatarURL:"https://img01.yzcdn.cn/vant/cat.jpeg",role:"学生",sex:"男",teamId:"8"},
                {id:5,account:"10004",name:"李等等",avatarURL:"https://img01.yzcdn.cn/vant/cat.jpeg",role:"学生",sex:"男",teamId:"1"},
                {id:6,account:"10002",name:"老六",avatarURL:"https://img01.yzcdn.cn/vant/cat.jpeg",role:"学生",sex:"男",teamId:"2"},
                {id:7,account:"10002",name:"宝宝",avatarURL:"https://img01.yzcdn.cn/vant/cat.jpeg",role:"学生",sex:"男",teamId:"3"},
                {id:8,account:"10002",name:"导师",avatarURL:"https://img01.yzcdn.cn/vant/cat.jpeg",role:"学生",sex:"男",teamId:"2"},
                {id:9,account:"10002",name:"刘伟",avatarURL:"https://img01.yzcdn.cn/vant/cat.jpeg",role:"学生",sex:"男",teamId:"3"},
                {id:10,account:"10002",name:"小丑",avatarURL:"https://img01.yzcdn.cn/vant/cat.jpeg",role:"学生",sex:"男",teamId:"5"},
                {id:11,account:"10002",name:"坤哥",avatarURL:"https://img01.yzcdn.cn/vant/cat.jpeg",role:"学生",sex:"男",teamId:"5"},
            ],
            titles:[
                {title1:"班级成员",title2:"课程角色",title3:"性别",title4:"学生组号"}
            ]
        };
    },
    created() {
        this.getUsersList();
    },
    methods: {
        $http: undefined,
        handleClick(tab, event) {
            console.log(tab, event);
        },
        async getUsersList() {
            const { data: res } = await this.$http.get("student", {
                id:this.students.id,
            });
            if(res.meta.status!==200){
                return this.$message.error("获取用户列表失败！");
            }
            console.log(res);
            this.students = res.data.student;
            this.total = res.data.total;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.queryInfo.pagesize = val;//重新指定每页数据量
            this.getUsersList();//带着新的分页请求获取数据

        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.queryInfo.pagenum = val;//重新指定当前页
            this.getUsersList();//带着新的分页请求获取数据


        },

    },
}
</script>


<style scoped>

</style>