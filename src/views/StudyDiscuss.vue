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
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false;createDiscuss(discuss)">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
            <div v-for="item in items" v-bind:key="item.id">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">
                        <a>提问者：{{item.authorID}}</a>
                        <i class="el-icon-chat-round"></i>
                        <a href="https://www.ele.me" target="_blank" style="font-size: 18px">{{ item.title }}</a>
                    </el-menu-item>
                    <div style="text-align: right">
                        <a style="font-size: 15px;text-align: right ">{{ item.discussTime }}</a>
                        <p>
                            <a>
                                <el-button type="primary" @click="goDiscussDetail(item.id,item.title,item.detail,item.authorID,item.discussTime)">查看详情</el-button>
                            </a>
                            <a>
                                <el-button type="primary" @click="dialogFormVisible1=true" v-if="item.authorID===authorID">编辑帖子</el-button>
                                <el-dialog title="编辑帖子" style="text-align: center" :visible.sync="dialogFormVisible1">
                                    <el-form :model="discuss1">
                                        <el-form-item label="帖子名称" :label-width="formLabelWidth">
                                            <el-input v-model="discuss1.title" auto-complete="off"></el-input>
                                        </el-form-item>
                                        <el-form-item label="帖子内容" :label-width="formLabelWidth">
                                            <el-input v-model="discuss1.detail" auto-complete="off"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                                        <el-button type="primary" @click="dialogFormVisible1 = false;editId=item.id;editDiscuss(discuss1)">确 定</el-button>
                                    </div>
                                </el-dialog>
                            </a>
                            <a>
                                <el-button type="warning" @click=" deleteDiscuss(item.id) " v-if="item.authorID===authorID">删除帖子</el-button>
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
import {createDiscuss, deleteDiscuss, editDiscuss, getDiscussList} from "@/api/discuss";
import {Message} from "element-ui";

export default {
    name: "StudyDiscuss",
    components: {},
    el: '#example',
    data() {
        return {
            time:"",
            indexs: "",
            authorID:this.$store.getters.user.id,
            // authorID:'1',
            dialogFormVisible:false,
            dialogFormVisible1:false,
            editId:'',
            items: [
                // {id: 1, title: '什么时候开始？', detail: '明天就开始',
                //     authorID:'', filesURL:'',discussTime: '2023-05-11 19:40:55'},
                // {id: 2, title: '什么是事实？', detail: '明天就开始世俗喜欢',
                //     authorID:'', filesURL:'',discussTime: '2023-05-11 19:40:59'}
            ],
            discuss: {
                id:'',
                title: '',
                detail: '',
                discussTime:'',
                authorID:this.$store.getters.user.id,
                    // filesURL:[],
            },
            discuss1: {
                id:this.editId,
                title: '',
                detail: '',
                discussTime:'',
                authorID:this.$store.getters.user.id,
                // filesURL:[],
            },
            formLabelWidth: '120px'
        }
    },

    created() {
        setInterval(() => {
            const currentTime = new Date();
            const year = currentTime.getFullYear();
            const month = String(currentTime.getMonth() + 1).padStart(2, '0');
            const day = String(currentTime.getDate()).padStart(2, '0');
            const hours = String(currentTime.getHours()).padStart(2, '0');
            const minutes = String(currentTime.getMinutes()).padStart(2, '0');
            const seconds = String(currentTime.getSeconds()).padStart(2, '0');

            this.discuss.discussTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            this.discuss1.discussTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }, 1000);
    },
    mounted(){
        getDiscussList().then((res)=>{
            if (res.code===200){
                let resultbody = res.data
                this.items = resultbody
                Message.success(res.msg)
            }
        }).catch((err)=>{
            Message.error(err)
        });
    },
    methods: {
        handleSelect(){

        },
        createDiscuss(discuss){
            console.log("title:"+discuss.title)
            console.log("detail:"+discuss.detail)
            console.log("time:"+discuss.discussTime)
            createDiscuss(discuss).then((res)=>{
                    if (res.code===200){
                        let resultbody = res.data
                        this.items = resultbody
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },
        editDiscuss(discuss){
            console.log("title:"+discuss.title)
            console.log("detail:"+discuss.detail)
            console.log("time:"+discuss.discussTime)
            editDiscuss(discuss).then((res)=>{
                if (res.code===200){
                    let resultbody = res.data
                    this.items = resultbody
                    Message.success(res.msg)
                }
            }).catch((err)=>{
                Message.error(err)
            })
        },
        deleteDiscuss(id){
            let t = [id]
            deleteDiscuss(t).then((res)=>{
                    if (res.code===200){
                        let resultbody = res.data
                        this.items = resultbody
                        Message.success(res.msg)
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
        goDiscussDetail(Id,Title, Detail,AuthorID,DiscussTime) {
            console.log("id:"+Id)
            console.log(this.$router.currentRoute.fullPath)
            router.push({name:'DiscussDetail', params:{ id:Id ,title:Title,detail:Detail,authorID:AuthorID,discussTime:DiscussTime}});

        },
        getIndex(index) {
            this.indexs = index;
        }
    },

}
</script>

<style scoped>

</style>
