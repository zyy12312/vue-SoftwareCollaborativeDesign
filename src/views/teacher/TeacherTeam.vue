<template>
    <el-main>
        <el-collapse v-model="activeName" accordion>
                <div v-for="(team_all,outIndex) in teams" v-bind:key="outIndex">
                        <el-card class="box-card"> <!--每一个课程的卡片-->
                            <div slot="header" class="clearfix">
                                <span>第{{ team_all.team[0].teamID }}组分组详情</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="goChat(team_all.team[0].teamID)">交流入口
                                </el-button>
                            </div>
                            <div v-for="(cla,claIndex) in clas" :key="claIndex" class="team font">
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
                            <div v-for="(team_each,insideIndex) in team_all.team" v-bind:key="insideIndex">
                                <el-row style="margin-top: 10px">
                                    <el-col :span="8">
                                        <div class="grid-content bg-purple">{{ team_each.studentID }}</div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="grid-content bg-purple-light">{{ team_each.user.name }}</div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="grid-content bg-purple">{{ team_each.studentCharacterLabel }}</div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                </div>

        </el-collapse>
        <div class="grid-content bg-purple-light" >
            <el-button type="primary" @click="dialogFormVisible_add = true;"  style="font-size: 16px" >添加小组</el-button>
            <el-dialog :visible.sync="dialogFormVisible_add" append-to-body>
                <div>
                    <el-input v-model="added_team.teamID">
                        <template slot="prepend">组号：</template>
                    </el-input>
                </div>
                <div>
<!--                    <el-autocomplete-->
<!--                        class="inline-input"-->
<!--                        v-model="added_team.studentID"-->
<!--                        :fetch-suggestions="querySearch">-->
<!--                        <template slot="prepend">组长姓名：</template>-->
<!--                    </el-autocomplete>-->


<!--                    <el-select v-model="added_team.studentID" placeholder="组长姓名:">-->
<!--                        <el-option v-for="item in unGroupedStudentNameList"-->
<!--                                   :key="item.value" :label="item.value" :value="item.value">-->
<!--                        </el-option>-->
<!--                    </el-select>-->


                    <el-select v-model="added_team.studentID" placeholder="组长姓名:">
                        <el-option v-for="item in unGroupedStudentList"
                                   :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button
                        @click="dialogFormVisible_add = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogFormVisible_add = false; addTeamConfirm()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </el-main>

</template>

<script>


import {Message} from "element-ui";
import {addTeam, teamInfo} from "@/api/team";
import {getUnGroupedStudentList} from "@/api/user";
import router from "@/router";

export default {
    name: 'TeacherTeam',

    data() {
        return {
            dialogFormVisible_add: false,
            activeName: 'first',
            added_team: {
                teamID: '',
                studentID: '',
                studentCharacter: 1
            },
            teams:[],

            clas:[
                {title1:"成员学号",title2:"成员名称",title3:"对应角色"}
            ],

            unGroupedStudentList:{
                id:'',
                name:''
            },

            // unGroupedStudentNameList:[
            //     {"value":"学生账号8"},
            //     {"value":"学生账号4"},
            //     {"value":"学生账号2"},
            //     {"value":"学生账号1"}
            // ]
        };
    },
    mounted() {
        this.getList()
        this.loadUnGroupedStudentList()
        // console.log("unGroupedStudentNameList")
        // console.log(this.unGroupedStudentNameList)
    },
    methods: {
        async getList() {
            await teamInfo()
                .then((res)=>{
                    if (res.code===200){
                        this.teams = res.data
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },

        querySearch(queryString, cb) {
            var unGroupedStudentList = this.unGroupedStudentList;
            var results = queryString ? unGroupedStudentList.filter(this.createFilter(queryString)) : unGroupedStudentList;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },

        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        async loadUnGroupedStudentList() {
            await getUnGroupedStudentList().then((res)=>{
                if (res.code===200){
                    this.unGroupedStudentList = res.data
                    // console.log("list1:")
                    // console.log(this.unGroupedStudentList)
                    // console.log("name:")
                    // console.log(this.unGroupedStudentList[0].name)
                    Message.success(res.msg)
                }
            }).catch((err)=>{
                Message.error(err)
            })
            //遍历unGroupedStudentList，取出所有的name，并装入unGroupedStudentNameList
            // this.unGroupedStudentNameList = [];
            // for (var i in this.unGroupedStudentList) {
            //     console.log(this.unGroupedStudentList[i].name);
            //     var studentNameMap = new Map();
            //     studentNameMap.set("value", this.unGroupedStudentList[i].name)
            //     this.unGroupedStudentNameList.push(studentNameMap)
            // }
            // console.log("unGroupedStudentNameList")
            // console.log(this.unGroupedStudentNameList)
        },
        
        goChat(teamID){
            console.log("进入讨论界面，小组号："+teamID)
            // this.$router.push({
            //     path: '/basepage/homepage/teachergroupchat',
            //     query: {
            //         teamID:teamID
            //     }
            // })

            router.push({name:"TeacherGroupChat", params:{teamID:Number(teamID)}})
        },

        // 新建小组
        addTeamConfirm(){
            console.log("add1:leader="+this.added_team)
            addTeam(this.added_team)
                .then((res)=>{
                    if (res.code===200){
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },

    }

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
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>