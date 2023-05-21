<template>
    <el-main>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="float: right;font-size: 14px">本班级总共有 {{ teacherNumber }}位教师 {{
                    studentNumber
                    }}名学生</span>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix" style="text-align: left">
        <span v-for="title in titles" v-bind:key="title.title1">
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{ title.title1 }}</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">{{ title.title2 }}</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">{{ title.title3 }}</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">{{ title.title4 }}</div></el-col>
                </el-row>
                </span>
            </div>
            <div v-for="(student,id) in pageList" :key="id" class="text item" style="text-align: left">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light profile" style="margin-top: 10px">
                            <el-avatar round width="50px" height="50px" :src="student.avatarURL" class="avatar"></el-avatar>
                            <div class="info">
                                <div class="name">{{ student.name }}</div>
                                <div class="student-id">{{ student.account }}</div>
                            </div>

                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light" style="margin-top: 20px">{{ student.role }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light" style="margin-top: 20px">{{ student.sex }}</div>
                    </el-col>
                    <el-col :span="4" v-if="student.role==='学生'">
                        <div class="grid-content bg-purple-light" style="margin-top: 20px">第{{ student.teamId }}组
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="block">
                <el-pagination
                        backgroud
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="current"
                        :page-sizes="[1,2,5,10]"
                        :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>
    </el-main>
</template>

<script>

export default {
    name: "ClassMember",
    data() {
        return {
            activeName: 'first',
            teacherNumber: 1,
            studentNumber: 10,
            current: 1, //初始页
            pagesize: 10,
            total: 0,//总条数
            pageList: [],//循环数据
            students: [
                {
                    id: 1,
                    account: "1001",
                    name: "林董",
                    avatarURL: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                    role: "教师",
                    sex: "男",
                    teamId: "无"
                },
                {
                    id: 2,
                    account: "10001",
                    name: "郑总",
                    avatarURL: "https://img01.yzcdn.cn/vant/cat.jpeg",
                    role: "学生",
                    sex: "女",
                    teamId: "5"
                },
                {
                    id: 3,
                    account: "10002",
                    name: "李都",
                    avatarURL: "https://img01.yzcdn.cn/vant/cat.jpeg",
                    role: "学生",
                    sex: "男",
                    teamId: "6"
                },
                {
                    id: 4,
                    account: "10003",
                    name: "李是",
                    avatarURL: "https://img01.yzcdn.cn/vant/cat.jpeg",
                    role: "学生",
                    sex: "男",
                    teamId: "8"
                },
                {
                    id: 5,
                    account: "10004",
                    name: "李等等",
                    avatarURL: "https://img01.yzcdn.cn/vant/cat.jpeg",
                    role: "学生",
                    sex: "男",
                    teamId: "1"
                },
                {
                    id: 6,
                    account: "10005",
                    name: "老六",
                    avatarURL: "https://img01.yzcdn.cn/vant/cat.jpeg",
                    role: "学生",
                    sex: "男",
                    teamId: "2"
                },
                {
                    id: 7,
                    account: "10006",
                    name: "宝宝",
                    avatarURL: "https://img01.yzcdn.cn/vant/cat.jpeg",
                    role: "学生",
                    sex: "男",
                    teamId: "3"
                },
                {
                    id: 8,
                    account: "10007",
                    name: "导师",
                    avatarURL: "https://img01.yzcdn.cn/vant/cat.jpeg",
                    role: "学生",
                    sex: "男",
                    teamId: "2"
                },
                {
                    id: 9,
                    account: "10008",
                    name: "刘伟",
                    avatarURL: "https://img01.yzcdn.cn/vant/cat.jpeg",
                    role: "学生",
                    sex: "男",
                    teamId: "3"
                },
                {
                    id: 10,
                    account: "10009",
                    name: "小丑",
                    avatarURL: "https://img01.yzcdn.cn/vant/cat.jpeg",
                    role: "学生",
                    sex: "男",
                    teamId: "5"
                },
                {
                    id: 11,
                    account: "100010",
                    name: "坤哥",
                    avatarURL: "https://img01.yzcdn.cn/vant/cat.jpeg",
                    role: "学生",
                    sex: "男",
                    teamId: "5"
                },
            ],
            titles: [
                {title1: "班级成员", title2: "课程角色", title3: "性别", title4: "学生组号"}
            ]
        };
    },
    created() {
        //调用获取数据
        this.getData()
    },

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        getData() {
            //发送接口并赋值
            this.total = this.students.length
            // 拷贝一份数据
            let list = JSON.parse(JSON.stringify(this.students))
            // splice处理数组的方法会改变原数组,所以需要拷贝一份
            this.pageList = list.splice(0, this.pagesize)
        },
        //改变当前页数
        handleSizeChange(val) {
            // 只要换页数就直接返回1页
            this.pagesize = val
            this.current = 1
            this.pageList = this.students.slice(0, this.pagesize)
        },
        // 改变当前页码
        handleCurrentChange(val) {
            this.current = val
            //如果页码为1,就正常切割
            if (val === 1) {
                this.pageList = this.students.slice(0, this.pagesize)
                return
            }
            // 当前页码不为1时
            val = (val - 1) * this.pagesize
            this.pageList = this.students.slice(val, val + this.pagesize)
        },

    },
}
</script>


<style scoped>
.profile {
    display: flex;
    align-items: center;
}

.avatar {
    width: 50px;
    height: 50px;
    /* 添加其他样式属性 */
}

.info {
    margin-left: 10px;
    /* 添加其他样式属性 */
}

.name {
    font-size: 16px;
    font-weight: bold;
    /* 添加其他样式属性 */
}

.student-id {
    font-size: 14px;
    color: gray;
    /* 添加其他样式属性 */
}
</style>
