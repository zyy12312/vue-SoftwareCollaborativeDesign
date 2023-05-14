<template>
<el-main>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="text-align: center">小组交流聊天室</span>
        </div>
        <div v-for="info in infos" :key="info.info" class="text item box">
            <el-row v-if="info.name===myName">
                <el-col :span="24" style="text-align: right">
                    <div class="grid-content bg-purple-dark" >
                        <div style="font-size: 14px">{{ info.name }}</div>
                        <div style="font-size: 14px"> {{info.info}}<el-avatar round width="50px" height="50px" :src="info.url"></el-avatar></div>
                    </div>

                </el-col>
            </el-row>
            <el-row v-else>
                <el-col :span="24" style="text-align: left">
                    <div class="grid-content bg-purple-dark" >
                        <div style="font-size: 14px">{{ info.name }}</div>
                        <div style="font-size: 14px"><el-avatar round width="50px" height="50px" :src="info.url"></el-avatar> {{info.info}}</div>
                    </div>
                </el-col>
            </el-row>

        </div>
        <el-row>
            <el-col :span="20"><div class="grid-content bg-purple " >
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="textarea"
                    class="box">
                </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light">
                    <el-button type="primary" style="margin-top: 10px" @click="send">发送</el-button>
            </div></el-col>
        </el-row>

    </el-card>

</el-main>
</template>

<script >


export default {
    name:"GroupChat",
    computed: {

    },
    data(){
        return {
            textarea: '',
            myName:"张三",
            infos:[
                {info:"你到底是谁？",name:"张三",url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"},
                {info:"你猜猜我是谁",name:"李四",url:"https://img01.yzcdn.cn/vant/cat.jpeg"},
                {info:"你信不信我给你啪啪两下！",name:"张三",url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"},
            ]
        }
    },
    methods:{
        send(){

        },
        open8() {
            this.$notify({
                title: '自定义位置',
                message: '右下角弹出的消息',
                position: 'bottom-right'
            });
        },
    }
}
</script>


<style scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 15px;
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
    width:100%;
    background-color: #89c5d2;
}
.box {
    padding: 10px;
    overflow: auto;
}
</style>