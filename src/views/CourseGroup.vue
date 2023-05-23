<template>
    <el-main>
        <el-card class="box-card" v-if="haveGroup!=null"><!--根据haveGroup的值判断card-->
            <div slot="header" class="clearfix">
                <span>分组详情</span>
            </div>
            <div v-for="cla in clas" :key="cla.title1" class="item font">
                <el-row>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">{{ cla.title1 }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ cla.title2 }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ cla.title3 }}</div>
                    </el-col>
                </el-row>
            </div>
            <div v-for="item in items" :key="item.name" class="text item">
                <el-row v-if="user.teamId===item.teamId">
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">{{ item.teamId }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ item.name }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ item.role }}</div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card v-else v-for="inv in invitation" :key="inv.teamId">
            <div slot="header" class="clearfix" v-if="inv.state==='未接受'">
                <span>分组邀请</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="refuse;inv.state='已拒绝' ">
                    拒绝邀请
                </el-button>
                <a v-if="inv.state==='已拒绝'">
                    <el-button style="float: right; padding: 3px 0;margin-right: 30px" type="text"
                               @click="accept;inv.state='已接受';user.teamId=inv.teamId;haveGroup=inv.teamId" disabled>接受邀请
                    </el-button>
                </a>
                <a v-else>
                    <el-button style="float: right; padding: 3px 0;margin-right: 30px" type="text"
                               @click="accept;inv.state='已接受';user.teamId=inv.teamId;haveGroup=inv.teamId">接受邀请
                    </el-button>
                </a></div>
            <div slot="header" class="clearfix" v-else-if="inv.state==='已拒绝'">
                <span>分组邀请</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="refuse;inv.state='已拒绝' ">
                    拒绝邀请
                </el-button>
                <el-button style="float: right; padding: 3px 0;margin-right: 30px" type="text"
                           @click="accept;inv.state='已接受';user.teamId=inv.teamId;haveGroup=inv.teamId" disabled>接受邀请
                </el-button>
            </div>
            <div v-for="cla in clasp" :key="cla.title1" class="item font">
                <el-row>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">{{ cla.title1 }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ cla.title2 }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ cla.title3 }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ cla.title4 }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ cla.title5 }}</div>
                    </el-col>
                </el-row>
            </div>
            <div class="text item">
                <el-row>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">{{ inv.teamId }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ inv.leader }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ inv.role }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ inv.invitationTime }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ inv.state }}</div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </el-main>
</template>

<script>
export default {
    name: "CourseGroup",
    el: "group",
    data() {
        return {
            haveGroup:this.$store.getters.user.teamId,
            id: "",
            user: [
                {teamId: this.$store.getters.user.teamId}
            ],
            items: [
                {teamId: "第五组", name: "张三", role: "小组长"},
                {teamId: "第五组", name: "李四", role: "计划经理"},
                {teamId: "第五组", name: "王五", role: "产品经理"},
                {teamId: "第五组", name: "老六", role: "质量经理"},
                {teamId: "第一组", name: "张三", role: "小组长"},
                {teamId: "第一组", name: "李四", role: "计划经理"},
                {teamId: "第一组", name: "王五", role: "产品经理"},
                {teamId: "第一组", name: "老六", role: "质量经理"},
            ],
            clas: [
                {title1: "组号", title2: "成员", title3: "对应角色"}
            ],
            clasp: [
                {title1: "组号", title2: "组长", title3: "邀请职位", title4: "邀请时间", title5: "状态"}
            ],
            invitation: [
                {teamId: "第五组", leader: "张三", role: "测试经理", invitationTime: "2023.03.12 13:22", state: "未接受"},
                {teamId: "第一组", leader: "林董", role: "测试经理", invitationTime: "2023.03.14 10:22", state: "已拒绝"},
            ]
        }
    },
    methods: {
        goChat() {
            this.$router.push("/ChatRoom");
        },

        accept() {

        },
        refuse() {

        }
    }

}
</script>


<style scoped>
.text {
    font-size: 14px;
    text-align: left;
}

.item {
    margin-bottom: 18px;
}

.font {
    font-family: "微软雅黑 Light", serif;
    font-size: 16px;
    text-align: left;
}

.clearfix:before,
.clearfix:after {
    display: table;

    content: "";
}

.clearfix:after {
    clear: both;

}

.box-card {
    width: 100%;
}
</style>
