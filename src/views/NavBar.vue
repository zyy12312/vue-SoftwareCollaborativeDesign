<template>
    <el-header >
        <div class="school-icon">
            <a href="https://www.usst.edu.cn/main.htm">
                <img src="../assets/logo.png" >
            </a>
        </div>
        <div class="buttons-middle">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color=" #74759B" >
                <el-menu-item index="1" style="color: #eef4fa;font-family: '微软雅黑 Light',serif;font-size: 18px">
                    <a href="https://www.ele.me" target="_blank" @click="goModifyInfo">修改个人信息</a></el-menu-item>
            </el-menu>
        </div>
        <div class="personal-buttons">
            <el-button style=" padding: 10px ;color: #f5eefa;font-family: '微软雅黑 Light',serif;font-size: 15px" type="text" @click="goLoginPage">退出登录</el-button>
            <el-avatar shape="circle" size="large" src="../assets/logo.png" />

        </div>
    </el-header>
</template>

<script>
export default {
    name: "NavBar",
    data(){
        return {
            activeIndex: '1',
        };
    },
    methods:{
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        goModifyInfo(){
                                     //对应跳转到修改个人信息界面
        },
        goLoginPage(){
                                     //对应退出登录按钮
        }
    }
}
</script>

<style scoped>

    .school-icon{
        //background: #2c3e50;
        height: 100%;
        width: 30%;
    }
    .buttons-middle{
        /*background: #2c3e50;*/
        height: 100%;
        background: #74759B;
    }
    .el-menu{
        background: #74759B;

    }
    .el-header{
        margin-top: 0;
        background: #74759B;
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex: auto;
    }
    img{
        height: 100%;
        /*width: auto;*/
        object-fit: cover;
        padding-left: 0;
    }
</style>
