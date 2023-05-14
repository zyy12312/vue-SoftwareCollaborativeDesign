<template>
    <el-main>
        <el-card>
            <div slot="header" class="clearfix">
                <span v-for="item in items" v-bind:key="item.title1">
                <el-row >
                    <el-col :span="8"><div class="grid-content bg-purple-light" >{{item.title1}}</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">{{item.title2}}</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">{{item.title3}}</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">{{item.title4}}</div></el-col>
                </el-row>
                </span>
            </div>
            <div v-for="task in tasks" v-bind:key="task.title">
                <el-row>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light" style="margin-top: 13px">{{task.title}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light" style="margin-top: 13px">{{task.filename}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light" style="margin-top: 13px">{{task.size}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light"></div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                            <el-button type="text" @click="dialogFormVisible = true" style="font-size: 16px">
                                <i class="el-icon-download"></i>
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </el-main>

</template>

<script >
export default {
    name:"DataBank",
    el:"data",
    data(){
        return{
            items:[
                {title1:"资料名称",title2:"附件名称",title3:"附件大小",title4:"下载"},
            ],
            tasks:[
                {title:"第五章PPT", filename:"chapter 5.ppt",size:"3MB"},
                {title:"实验要求",filename:"实验要求.docx",size:"200KB"}
            ],
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px',
        }
    },
    methods:{

    }
}
</script>


<style scoped>
.clearfix:before,
.clearfix:after {
    display: table;

    content: "";
}
.clearfix:after {
    clear: both;

}
</style>