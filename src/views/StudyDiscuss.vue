<template>
    <el-main>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible=true">添加帖子</el-button>
                <el-dialog title="添加帖子" :visible.sync="dialogFormVisible">
                    <el-form :model="discuss">
                        <el-form-item label="帖子名称" :label-width="formLabelWidth">
                            <el-input v-model="discuss.title" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="帖子内容" :label-width="formLabelWidth">
                            <el-input v-model="discuss.detail" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="帖子时间" :label-width="formLabelWidth">
                        <div class="block">
                            <el-date-picker
                                v-model="discuss.discussTime"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false;createDiscuss(discuss)">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
            <div v-for="item in items" v-bind:key="item">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">
                        <i class="el-icon-chat-round"></i>
                        <a href="https://www.ele.me" target="_blank" style="font-size: 18px">{{ item.message }}</a>
                    </el-menu-item>
                    <div style="text-align: right">
                        <a style="font-size: 15px;text-align: right ">{{ item.time }}</a>
                        <p>
                            <a>
                                <el-button type="primary" @click="goDiscussDetail(item)">查看详情</el-button>
                            </a>
                            <a>
                                <el-button type="warning" @click=" removeItem(index) ">删除帖子</el-button>
                            </a>
                        </p>
                    </div>
                </el-menu>
            </div>
        </el-card>
    </el-main>
</template>

<script>
import router from "@/router";
import {createDiscuss} from "@/api/discuss";
import {Message} from "element-ui";

export default {
    name: "StudyDiscuss",
    components: {},
    el: '#example',
    data() {
        return {
            indexs: "",
            dialogFormVisible:false,
            items: [
                {index: 1, title: '什么时候开始？', detail: '明天就开始', discussTime:'',
                    authorID:this.$store.getters.user.account, filesURL:'',dataTime: '2023-05-11 19:40:55'},
                {index: 2, title: '什么是事实？', detail: '明天就开始世俗喜欢', discussTime:'',
                    authorID:this.$store.getters.user.account, filesURL:'',dataTime: '2023-05-11 19:40:59'}
            ],
            discuss: {
                title: '',
                detail: '',
                discussTime:'',
                authorID:this.$store.getters.user.account,
                filesURL:'',
                delivery: false,
            },
            formLabelWidth: '120px'
        }
    },

    methods: {
        handleSelect(){

        },
        createDiscuss(){
            console.log("title:"+this.discuss.title)
            createDiscuss(this.discuss)
                .then((res)=>{
                    if (res.data.code===200){
                        // let resultbody = res.data.data
                        // this.discuss = resultbody
                        Message.success(res.data.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },
        removeItem(index) {
            // console.log("remove Item Index:"+index)
            this.$confirm("此操作将删除信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.discuss.splice(index, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        goDiscussDetail() {
            console.log(this.$router.currentRoute.fullPath)
            router.push('/basepage' + '/discussdetail');
        },
        getIndex(index) {
            this.indexs = index;
        }
    },
    mounted() {
        console.log("StudydiscussPageMounted！")
    }

}
</script>

<style scoped>

</style>
