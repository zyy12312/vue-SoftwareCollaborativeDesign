<template>
<el-main>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="text-align: center">小组交流聊天室</span>
        </div>
        <div v-for="info in infos" :key="info.info" class="text item box">
            <el-row v-if="info.senderID===myId">
                <el-col :span="24" style="text-align: center"><a>{{info.sendTime}}</a></el-col>
                <el-col :span="24" style="text-align: right">
                    <div class="grid-content bg-purple-dark  " >
                            <div class="info " >
                                <div class="name" >{{ myName }}</div>
                                <div class="student-id">{{info.detail}}<el-avatar round width="50px" height="50px" :src="url" class="avatar"></el-avatar></div>
                            </div>
                    </div>
                </el-col>
            </el-row>
            <el-row v-else>
                <el-col :span="24" style="text-align: center" ><a v-if="info.teamID===myTeam">{{info.sendTime}}</a></el-col>
                <el-col :span="24" style="text-align: left">
                    <div  v-for="usr in users" :key="usr.name">
                    <div class="grid-content bg-purple-dark " v-if="usr.teamId===info.teamID && usr.id===info.senderID">
                        <div class="info">
                            <div class="name">{{ usr.name }}</div>
                            <div class="student-id"> <el-avatar round width="50px" height="50px" :src="usr.avatarURL" class="avatar"></el-avatar>{{info.detail}}</div>
                        </div>
                    </div>
                        <div class="grid-content bg-purple-dark " v-else-if="usr.role===1 && usr.id===info.senderID">
                            <div class="info">
                                <div class="name">{{ usr.name }}</div>
                                <div class="student-id"> <el-avatar round width="50px" height="50px" :src="usr.avatarURL" class="avatar"></el-avatar>{{info.detail}}</div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>

        </div>
        <el-row>
            <el-col :span="20"><div class="grid-content bg-purple ">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="textarea.detail"
                    class="box">
                </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light">
                    <el-button type="primary" style="margin-top: 10px" @click="sends(textarea);refresh">发送</el-button>
            </div></el-col>
        </el-row>

    </el-card>

</el-main>
</template>

<script >


import {Message} from "element-ui";
import {getAllUserList} from "@/api/user";
import {getMessageList, sendMessage} from "@/api/communication";

export default {
    name:"GroupChat",
    computed: {

    },
    created() {
        setInterval(() => {
            const currentTime = new Date();
            const year = currentTime.getFullYear();
            const month = String(currentTime.getMonth() + 1).padStart(2, '0');
            const day = String(currentTime.getDate()).padStart(2, '0');
            const hours = String(currentTime.getHours()).padStart(2, '0');
            const minutes = String(currentTime.getMinutes()).padStart(2, '0');
            const seconds = String(currentTime.getSeconds()).padStart(2, '0');

            this.textarea.sendTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }, 1000);
    },
    data(){
        return {
            time:"",
            textarea: {detail:"",sendTime:"",senderID:this.$store.getters.user.id,teamID:this.$store.getters.user.team.teamID},
            myId:this.$store.getters.user.id,
            myName:this.$store.getters.user.name,
            myTeam:this.$store.getters.user.team.teamID,
            url:this.$store.getters.user.avatarURL,
            infos:[
                // {detail:"你到底是谁？",sendTime:"",senderID:"2011110108",teamID:""},
                // {detail:"你猜猜我是谁",sendTime:"",senderID:"",teamID:""},
                // {detail:"你信不信我给你啪啪两下！",sendTime:"",senderID:"2011110108",teamID:""},
            ],
            users:[
                {name:"",avaterURL: "",teamId:"",id:'',role:''}
            ],
            send: {detail:"",sendTime:'',senderID:this.$store.getters.user.id,teamID:this.$store.getters.user.team.teamID}

        }
    },
    mounted() {
        getAllUserList().then((res)=>{
            if (res.code===200 ){
                let resultbody = res.data
                this.users = resultbody
                Message.success(res.msg)
            }
        }).catch((err)=>{
            Message.error(err)
        });
        getMessageList(this.$store.getters.user.team.teamID).then((res)=>{
            console.log("id="+this.$store.getters.user.team.teamID)
            if (res.code===200){
                let resultbody = res.data
                this.infos = resultbody
                Message.success(res.msg)
            }
        }).catch((err)=>{
            Message.error(err)
        });
    },
    methods:{
        refresh() {
            location.reload();
        },
        sends(textarea){
            console.log("详情:"+this.textarea.detail)
            console.log("时间:"+this.textarea.sendTime)
            sendMessage(textarea)
                .then((res)=>{
                    if (res.code===200){
                        let resultbody = res.data
                        this.infos = resultbody
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },
        open8() {
            this.$notify({
                title: '自定义位置',
                message: '右下角弹出的消息',
                position: 'bottom-right'
            });
        },

    }
}
</script>


<style scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 15px;
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
    width:100%;
    background-color: #89c5d2;
}
.box {
    padding: 10px;
    overflow: auto;
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
.avatar {
    width: 50px;
    height: 50px;
    /* 添加其他样式属性 */
}
.profile {
    display: v-bind(myName);
    align-items: center;

}
.profile1 {
    display: flex;
    align-items: center;
}
</style>