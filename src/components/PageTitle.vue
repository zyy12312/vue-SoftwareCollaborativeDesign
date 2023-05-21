<template>
    <el-main>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark" >
                        <p  style="color: black;font-size: 20px;text-align: left">软件协同设计课程网站</p>
                        <p  style="color: #8f8c8c;font-size: 15px;text-align: left">2022-2023 2022-2023第二学期 计算机系-计算机科学教研室</p>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item style="text-align: left">授课教师<el-avatar shape="circle" size="large" src="assets/logo.png" /></el-menu-item>
                        <el-menu-item index="1" ><i class="el-icon-s-custom"></i><a href="https://www.ele.me" target="_blank" >班级成员</a></el-menu-item>
                        <el-menu-item index="2" ><i class="el-icon-star-off"></i><a href="https://www.ele.me" target="_blank" >课程信息</a></el-menu-item>
                    </el-menu>
                </div>
            </el-col>
            <el-col >
                <el-tabs v-model="activeName" @tab-click="handleClick" >
                    <el-tab-pane label="讨论详情" name="first" align="center"></el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </el-main>

</template>

<script >




export default {
    name:"PageTitle",
    components: {},
    data() {
        return {
            activeName: 'first',
            //active:0
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
    },
};
</script>

<style scoped>
::v-deep .el-tabs__nav-scroll{
    width:75%;
    margin:0 auto
}

</style>
