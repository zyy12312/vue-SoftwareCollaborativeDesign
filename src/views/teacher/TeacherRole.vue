<template>
    <el-main>
        <el-collapse v-model="activeName" accordion>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h1>欢迎进入教师账号</h1>
                    <h3>请选择本学期的学生组队角色标签</h3>
                    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                        <el-tree
                            :data="data"
                            :props="defaultProps"
                            accordion
                        ></el-tree>
                    </div>
                </div>

                <div>
                    <el-input v-model="characterName[0]" placeholder="请输入角色名1" style="margin-top: 20px"></el-input>
                    <el-input v-model="characterName[1]" placeholder="请输入角色名2" style="margin-top: 20px"></el-input>
                    <el-input v-model="characterName[2]" placeholder="请输入角色名3" style="margin-top: 20px"></el-input>
                    <el-input v-model="characterName[3]" placeholder="请输入角色名4" style="margin-top: 20px"></el-input>
                    <el-input v-model="characterName[4]" placeholder="请输入角色名5" style="margin-top: 20px"></el-input>
                </div>

                <el-button type="primary" round style="margin-top: 20px" @click="createRoles()">提交</el-button>
            </el-card>
        </el-collapse>
    </el-main>

</template>

<script>

import {Message} from "element-ui";
import {addCharacter} from "@/api/character";

export default {
    name: "TeacherGrade",
    data() {
        return {
            activeName: "first",
            characterName:[],
            data: [{
                label: '往年角色标签',
                children: [
                    {
                        label: '2018年角色标签',
                        children: [{
                            label: '小组长，产品经理，开发经理，计划经理，质量经理，测试经理'
                        }]
                    },
                    {
                        label: '2019年角色标签',
                        children: [{
                            label: '小组长，产品经理，开发经理，计划经理，测试经理'
                        }]
                    },
                    {
                        label: '2020年角色标签',
                        children: [{
                            label: '组长，产品经理，开发经理，计划经理和质量经理，测试经理'
                        }]
                    },
                    {
                        label: '2021年角色标签',
                        children: [{
                            label: '小组长，产品经理，开发经理，质量经理，测试经理'
                        }]
                    },
                    {
                        label: '2022年角色标签',
                        children: [{
                            label: '小组长，产品经理，开发经理，测试经理'
                        }]
                    }
                ]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        async createRoles(){
            let counter = 0;
            for(var i in this.characterName){
                await addCharacter(this.characterName[i])
                    .then((res)=>{
                        if (res.code===200){
                            counter +=1;
                            // Message.success(res.msg)
                        }
                    }).catch((err)=>{
                    Message.error(err)
                })
            }
            if (counter === this.characterName.length){
                //将教师的finalScore置为1，接下来再登陆教师时直接进入主界面
                this.$store.getters.user.finalScore=1
                //跳转至教师主界面
                this.$router.push("/basepage")
            }

        }
    }
}

</script>


<style scoped>

</style>
