<template>
    <el-main>
        <el-card>
            <div slot="header" class="clearfix">
                <span v-for="item in items" v-bind:key="item.title1">
                <el-row>
                    <el-col :span="8"><div class="grid-content bg-purple-light">{{ item.title1 }}</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">{{ item.title2 }}</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">{{ item.title3 }}</div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple-light">{{ item.title4 }}</div></el-col>
                </el-row>
                </span>
            </div>
            <div v-for="(task,index) in tasks" v-bind:key="index" >
                <el-row>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light" style="margin-top: 13px">{{ task.title }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light" style="margin-top: 13px">{{ task.description }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light" style="margin-top: 13px">{{task.filesURL.length}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                            <el-button style="float: right; padding: 18px ;margin-top: 5px" type="text" @click="dialogFormVisible=true;getIndex(task.id)">查看附件</el-button>
                            <el-dialog title="附件下载" :visible.sync="dialogFormVisible" v-if="indexs===task.id">
                                <el-row>
                                    <el-col :span="20">
                                        <div class="grid-content bg-purple-dark"
                                             style="margin-top: 13px;text-align: left" v-for="file in task.filesURL" :key="file">
                                            {{ file }}
                                            <el-link :href="file">
                                                <el-button type="text"
                                                           @click="getIndex(task.index);download(task.index)"
                                                           style="font-size: 16px">
                                                    <i class="el-icon-download"></i>
                                                </el-button>
                                            </el-link>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-dialog>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </el-main>

</template>

<script>
import {Message} from "element-ui";
import { getReleasedMaterial} from "@/api/material";

export default {
    name: "DataBank",
    el: "data",
    data() {
        return {
            items: [
                {title1: "资料名称", title2: "资料简介", title3:"附件数量", title4: "附件下载"},
            ],
            tasks: [
                // {id: 1, title: "第五章PPT", description:'',fileURLs: "https://cos-for-scd-1312783961.cos.ap-shanghai.myqcloud.com/defaultAvator.png", },
                // {id: 2, title: "实验要求", fileURLs: "实验要求.docx",}
            ],
            dialogFormVisible: false,
            indexs: "",
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
    mounted() {
        getReleasedMaterial().then((res)=>{
            if (res.code===200){
                let resultbody = res.data
                console.log(resultbody)
                this.tasks = resultbody
                Message.success(res.msg)
            }
        }).catch((err)=>{
            Message.error(err)
        });
    },
    methods: {
        getIndex(index) {
            this.indexs = index;
        },
        download(index) {
            this.indexs = index;                   //下载对应资料的方法
        },
        getFileNameAndType(url){
            return  (url).substring((url).lastIndexOf("/")+1);
        },
        getFileName(nameAndType){
            return (nameAndType).split(".")[0];
        },
        getFileType(nameAndType){
            return (nameAndType).split(".")[1];
        },
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
