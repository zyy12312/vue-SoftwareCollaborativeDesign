<template>
    <el-main>
        <el-collapse v-model="activeName" accordion>
                <div v-for="team_all in teams" v-bind:key="team_all[0].id">
                        <el-card class="box-card"> <!--每一个课程的卡片-->
                            <div slot="header" class="clearfix">
                                <span>第{{ team_all[0].teamID }}组分组详情</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="goChat(team_all[0].teamID)">交流入口
                                </el-button>
                            </div>
                            <div v-for="cla in clas" :key="cla.title1" class="team font">
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
                            <div v-for="team_each in team_all" v-bind:key="team_each.id">
                                <el-row>
                                    <el-col :span="8">
                                        <div class="grid-content bg-purple">{{ team_each.studentID }}</div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="grid-content bg-purple-light">{{ team_each.studentName }}</div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="grid-content bg-purple">{{ team_each.character }}</div>
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
                    <el-input v-model="added_leader">
                        <template slot="prepend">组长姓名：</template>
                    </el-input>
                </div>
<!--                <div>-->
<!--                    <el-autocomplete-->
<!--                        class="inline-input"-->
<!--                        v-model="inputCharacter"-->
<!--                        :fetch-suggestions="querySearch"-->
<!--                        @select="handleSelect">-->
<!--                        <template slot="prepend">组长姓名：</template>-->
<!--                    </el-autocomplete>-->
<!--                </div>-->
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

export default {
    name: 'TeacherTeam',

    el: "#team",
    data() {
        return {
            dialogFormVisible_add: false,
            added_leader: '',
            teams:[
                [
                    {id:"1",teamID:"5",studentID:"2035060301",studentName: "aaa",character:"小组长"},
                    {id:"2",teamID:"5",studentID:"2035060302",studentName: "bbb",character:"计划经理"},
                    {id:"3",teamID:"5",studentID:"2035060303",studentName: "ccc",character:"产品经理"},
                    {id:"4",teamID:"5",studentID:"2035060304",studentName: "ddd",character:"质量经理，测试经理"},
                ], [
                    {id:"5",teamID:"2",studentID:"2035060306",studentName: "fff",character:"小组长"},
                    {id:"6",teamID:"2",studentID:"2035060307",studentName: "ggg",character:"计划经理"},
                    {id:"7",teamID:"2",studentID:"2035060308",studentName: "hhh",character:"产品经理"},
                    {id:"8",teamID:"2",studentID:"2035060309",studentName: "iii",character:"质量经理"},
                    {id:"9",teamID:"2",studentID:"2035060310",studentName: "jjj",character:"测试经理"},
                ]
            ],

            clas:[
                {title1:"成员学号",title2:"成员名称",title3:"对应角色"}
            ]
        };
    },
    created() {
        // this.getList()
    },
    methods: {
        // Map<Integer, List<Team>> groupMap
        getList() {
            teamInfo()
                .then((res)=>{
                    if (res.data.code===200){
                        let resultbody = res.data.data
                        this.items = resultbody
                        Message.success(res.data.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },

        goChat(teamID){
            console.log("进入讨论界面，小组号："+teamID)
        },

        // 新建小组
        addTeamConfirm(){
            console.log("add1:leader="+this.added_leader)
            addTeam(this.added_leader)
                .then((res)=>{
                    console.log("add2:leader="+this.added_leader)
                    if (res.data.code===200){
                        Message.success(res.data.msg)
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