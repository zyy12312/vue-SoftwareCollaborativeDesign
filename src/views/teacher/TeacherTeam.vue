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
                            <div v-for="(team_each,insideIndex) in team_all" v-bind:key="insideIndex">
                                <el-row>
                                    <el-col :span="8">
                                        <div class="grid-content bg-purple">{{ team_each.studentID }}</div>
                                    </el-col>
<!--                                    <el-col :span="8">-->
<!--                                        <div class="grid-content bg-purple-light">{{ team_each.user.name }}</div>-->
<!--                                    </el-col>-->
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
                    <el-input v-model="added_leader">
                        <template slot="prepend">组长姓名：</template>
                    </el-input>
                </div>
<!--                <div>-->
<!--                    <el-autocomplete-->
<!--                        class="inline-input"-->
<!--                        v-model="inputstudentCharacterLabel"-->
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

    data() {
        return {
            dialogFormVisible_add: false,
            activeName: 'first',
            added_leader: '',
            teams:[
                // [
                //     {id:"1",teamID:"5",studentID:"2035060301",studentName: "aaa",studentCharacterLabel:"小组长"},
                //     {id:"2",teamID:"5",studentID:"2035060302",studentName: "bbb",studentCharacterLabel:"计划经理"},
                //     {id:"3",teamID:"5",studentID:"2035060303",studentName: "ccc",studentCharacterLabel:"产品经理"},
                //     {id:"4",teamID:"5",studentID:"2035060304",studentName: "ddd",studentCharacterLabel:"质量经理，测试经理"},
                // ], [
                //     {id:"5",teamID:"2",studentID:"2035060306",studentName: "fff",studentCharacterLabel:"小组长"},
                //     {id:"6",teamID:"2",studentID:"2035060307",studentName: "ggg",studentCharacterLabel:"计划经理"},
                //     {id:"7",teamID:"2",studentID:"2035060308",studentName: "hhh",studentCharacterLabel:"产品经理"},
                //     {id:"8",teamID:"2",studentID:"2035060309",studentName: "iii",studentCharacterLabel:"质量经理"},
                //     {id:"9",teamID:"2",studentID:"2035060310",studentName: "jjj",studentCharacterLabel:"测试经理"},
                // ]
            ],

            clas:[
                {title1:"成员学号",title2:"成员名称",title3:"对应角色"}
            ]
        };
    },
    mounted() {
        this.getList()
    },
    methods: {
        async getList() {
            await teamInfo()
                .then((res)=>{
                    console.log("res:")
                    console.log(res)
                    if (res.code===200){
                        this.teams = res.data
                        console.log("teams:")
                        console.log(this.teams)
                        console.log("studentID:")
                        console.log(this.teams[0].team[0].studentID)
                        console.log("studentCharacterLabel:")
                        console.log(this.teams[0].team[0].studentCharacterLabel)
                        console.log("user name:")
                        console.log(this.teams[0].team[0].user.name)
                        Message.success(res.msg)
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