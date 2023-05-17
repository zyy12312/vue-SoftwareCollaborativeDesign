<template>
<el-main style="background-color: #E2E1E4">
    <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align: left">
            <span>{{ name }}的学习分析</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
        </div>
    </el-card>
</el-main>
</template>

<script >
export default {
    name:"StudyAnalysis",
    data(){
        return{
            name:"郑总",

        }
    },
    methods:{

    }
}
</script>

<style scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
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
    width: 100%;
}
</style>