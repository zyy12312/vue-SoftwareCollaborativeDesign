<template>
    <el-header >
        <div class="school-icon">
            <a href="https://www.usst.edu.cn/main.htm">
                <img src="../assets/logo.png" >
            </a>
        </div>
        <div class="personal-buttons profile">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color=" #74759B" >
                <el-submenu index="1" >
                    <template slot="title"><a style="color: #eef4fa;font-family: '微软雅黑 Light',serif;font-size: 18px">我的选择</a></template>
                    <el-menu-item index="1-1" @click="$router.push('/modifyinfo')">修改个人信息</el-menu-item>
                    <el-menu-item index="1-2" @click="$router.push('/login')">退出登录</el-menu-item>
                </el-submenu>
            </el-menu>
            <el-avatar round width="50px" height="50px" :src="this.$store.getters.user.avatarURL" class="avatar"/>

        </div>
    </el-header>
</template>

<script>
export default {
    name: "NavBar",
    data(){
        return {
            activeIndex: '1',
            avaterURL: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        };
    },
    methods:{
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    }
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
