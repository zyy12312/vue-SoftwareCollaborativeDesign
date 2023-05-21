<template>
    <el-col :span="24">
        <div class="grid-content bg-purple-dark">
            <p style="color: black;font-size: 20px;text-align: left">软件协同设计课程网站</p>
            <p style="color: #8f8c8c;font-size: 15px;text-align: left">2022-2023 2022-2023第二学期
                计算机系-计算机科学教研室</p>
            <el-menu  class="el-menu-demo" mode="horizontal">
                <el-menu-item style="text-align: left">授课教师
                    <el-avatar shape="circle" size="large" src="assets/logo.png"/>
                </el-menu-item>
                <el-menu-item index="1" @click="$router.push('/classmember')"><i class="el-icon-s-custom"/>
                    班级成员
                </el-menu-item>
                <el-menu-item index="2" @click="$router.push('/courseinfo')"><i class="el-icon-star-off"/>课程信息
                </el-menu-item>
                <el-menu-item v-if="$store.getters.user.role===0" index="3" @click="$router.push('/studentmark')"><i
                        class="el-icon-s-marketing"/>成绩
                </el-menu-item>
                <el-menu-item v-if="$store.getters.user.role===0" index="4" @click="$router.push('/studyanalysis')"><i
                        class="el-icon-pie-chart"/>学习分析
                </el-menu-item>
            </el-menu>
        </div>
    </el-col>
</template>
<script>


export default ({
    name: "MainPageTitle"
})
</script>

