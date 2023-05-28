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
                        <div class="grid-content bg-purple-light">{{ item.teamID }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ item.user.name }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ item.studentCharacterLabel }}</div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card v-else v-for="inv in invitation" :key="inv">
            <div slot="header" class="clearfix" v-if="inv.state===0">
                <span>分组邀请</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="refuse(inv.teamID);inv.state=2 ">
                    拒绝邀请
                </el-button>
                <a v-if="inv.state===2">
                    <el-button style="float: right; padding: 3px 0;margin-right: 30px" type="text"
                               @click="accept(inv.teamID);inv.state=1;user.teamID=inv.teamID;haveGroup=inv.teamID" disabled>接受邀请
                    </el-button>
                </a>
                <a v-else>
                    <el-button style="float: right; padding: 3px 0;margin-right: 30px" type="text"
                               @click="accept(inv.teamID);inv.state=1;user.teamID=inv.teamID;haveGroup=inv.teamID">接受邀请
                    </el-button>
                </a>
            </div>
            <div slot="header" class="clearfix" v-else-if="inv.state===2">
                <span>分组邀请</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="refuse(inv.teamID);inv.state=2 ">
                    拒绝邀请
                </el-button>
                <el-button style="float: right; padding: 3px 0;margin-right: 30px" type="text"
                           @click="accept(inv.teamID);inv.state=1;user.teamID=inv.teamID;haveGroup=inv.teamID" disabled>接受邀请
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
                        <div class="grid-content bg-purple-light">第{{ inv.teamID }}组</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ inv.inviter.name }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light" v-if="inv.characterID===2">产品经理</div>
                        <div class="grid-content bg-purple-light" v-else-if="inv.characterID===3">开发经理</div>
                        <div class="grid-content bg-purple-light" v-else-if="inv.characterID===4">计划质量经理</div>
                        <div class="grid-content bg-purple-light" v-else-if="inv.characterID===5">测试经理</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">{{ inv.invitationTime}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light" v-if="inv.state===0">未接受</div>
                        <div class="grid-content bg-purple-light" v-else-if="inv.state===1">已接受</div>
                        <div class="grid-content bg-purple-light" v-else-if="inv.state===2">已拒绝</div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </el-main>
</template>

<script>

import {Message} from "element-ui";
import {acceptInvitation, getInvitation, rejectInvitation, studentTeamInfo} from "@/api/team";

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
                // {teamId: "第五组", name: "张三", role: "小组长"},
                // {teamId: "第五组", name: "李四", role: "计划经理"},
                // {teamId: "第五组", name: "王五", role: "产品经理"},
                // {teamId: "第五组", name: "老六", role: "质量经理"},
                // {teamId: "第一组", name: "张三", role: "小组长"},
                // {teamId: "第一组", name: "李四", role: "计划经理"},
                // {teamId: "第一组", name: "王五", role: "产品经理"},
                // {teamId: "第一组", name: "老六", role: "质量经理"},
            ],
            clas: [
                {title1: "组号", title2: "成员", title3: "对应角色"}
            ],
            clasp: [
                {title1: "组号", title2: "组长", title3: "邀请职位", title4: "邀请时间", title5: "状态"}
            ],
            invitation: [
                // {teamId: "第五组", leader: "张三", role: "测试经理", invitationTime: "2023-03-12 13:22:55", state: "未接受"},
                // {teamId: "第一组", leader: "林董", role: "测试经理", invitationTime: "2023-03-14 10:22:20", state: "未接受"},
            ]
        }
    },
    mounted() {
        getInvitation().then((res)=>{
            // console.log(res)
            if (res.code===200){
                let resultbody = res.data
                // console.log("resbd")
                // console.log(resultbody)
                this.invitation = resultbody
                // console.log(this.invitation)
                Message.success(res.msg)
            }
        }).catch((err)=>{
            Message.error(err)
        });
        studentTeamInfo().then((res)=>{
            if (res.code===200){
                let resultbody = res.data
                this.items = resultbody
                Message.success(res.msg)
            }
        }).catch((err)=>{
            Message.error(err)
        });
        // console.log("13")
        // console.log(this.invitation)
        // console.log("14")
        // console.log(this.items)
    },
    methods: {
        goChat() {
            this.$router.push("/ChatRoom");
        },

        accept(id) {
            acceptInvitation(id).then((res)=>{
                if (res.code===200){
                    let resultbody = res.data.data
                    this.invitation = resultbody
                    Message.success(res.msg)
                }
            }).catch((err)=>{
                Message.error(err)
            });
        },
        refuse(id) {
            rejectInvitation(id).then((res)=>{
                if (res.code===200){
                    let resultbody = res.data
                    this.invitation = resultbody
                    Message.success(res.msg)
                }
            }).catch((err)=>{
                Message.error(err)
            });
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
