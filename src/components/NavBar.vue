<template>
    <el-header >
        <div class="school-icon">
            <a href="https://www.usst.edu.cn/main.htm">
                <img src="../assets/logo.png">
            </a>
        </div>
        <div class="buttons-middle">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
        </div>
        <div class="personal-buttons">
            <el-avatar shape="circle" size="large" src="../assets/logo.png" />

        </div>
    </el-header>
</template>

<script>
export default {
    name: "NavBar"
}
</script>

<style scoped>

    .school-icon{
        /*background: #2c3e50;*/
        height: 100%;
        width: 30%;
    }
    .buttons-middle{
        /*background: #2c3e50;*/
        height: 100%;
        background: #42b983;

    }
    .el-menu{
        background: #42b983;

    }
    .el-header{
        margin-top: 0;
        background: #42b983;
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
