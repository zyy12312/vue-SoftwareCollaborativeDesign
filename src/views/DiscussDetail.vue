<template>
    <el-main>
        <el-collapse v-model="activeNames" @change="handleChange">
            <div id="discuss">
                <div v-for="item in discuss" v-bind:key="item.title">
                    <el-collapse-item :title="item.title" name="0" v-show="discuss" v-if="item.id===id">
                        <div>{{ item.detail }}</div>
                        <div style="text-align: right">
                            <a style="font-size: 15px ">{{ item.discussTime }}</a>
                            <p>
                                <el-button type="text" @click="dialogFormVisible = true">回复帖子</el-button>
                                <el-dialog title="回复帖子"
                                           :visible.sync="dialogFormVisible" append-to-body>
                                    <el-form :model="form">
                                        <el-form-item label="帖子名称" :label-width="formLabelWidth">
                                            <el-input v-model="form.title" auto-complete="off"></el-input>
                                        </el-form-item>
                                        <el-form-item label="帖子内容" :label-width="formLabelWidth">
                                            <el-input v-model="form.detail" auto-complete="off"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button
                                            @click="dialogFormVisible = false">取 消</el-button>
                                        <el-button type="primary"
                                                   @click="dialogFormVisible = false;createReply(form)">确 定</el-button>
                                    </div>
                                </el-dialog>
                            </p>
                        </div>
                    </el-collapse-item>
                </div>
                <div v-for="reply in replies" v-bind:key="reply.detail" >
                    <el-collapse-item title="回帖" :name="reply.detail" v-if="reply.replyTarget===id">
                        <div>{{ reply.detail }}</div>
                        <div style="text-align: right">
                            <a style="font-size: 15px ">{{ reply.replyTime }}</a>
                            <p>
                                <el-button type="text" @click="dialogFormVisible1 = true">回复回帖</el-button>
                            </p>
                        </div>
                        <div>
                            <el-dialog title="回复回帖"
                                       :visible.sync="dialogFormVisible1" append-to-body>
                                <el-form :model="form">
                                    <el-form-item label="回帖名称" :label-width="formLabelWidth">
                                        <el-input v-model="form.title" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="回帖内容" :label-width="formLabelWidth">
                                        <el-input v-model="form.detail" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                                    <el-button type="primary" @click="dialogFormVisible1 = false;createReply(form)">确 定
                                    </el-button>
                                </div>
                            </el-dialog>
                        </div>

                    </el-collapse-item>
                    </div>
            </div>
        </el-collapse>

    </el-main>

</template>

<script>
// import {createDiscuss} from '@/api/discuss'
// import {Message} from "element-ui";
import {createReply} from "@/api/discuss";
import {Message} from "element-ui";
import router from "@/router";

export default {
    name: "DiscussDetail",
    el: '#discuss',
    props:['id'],
    data() {
        return {
            activeNames: ['0'],
            // id:this.$route.params.id,
            discuss: [
                {id: 1, title: '什么时候开始？', detail: '明天就开始',authorID:this.$store.getters.user.account,
                    filesURL:"",discussTime: '2023-05-11 19:40:33'},
                {id: 2, title: '什么是事实？', detail: '明天就开始世俗喜欢',
                    authorID:'', filesURL:'',discussTime: '2023-05-11 19:40:59'}
            ],
            replies: [
                {detail: '确定是明天吗？', authorID:this.$store.getters.user.account,
                    filesURL:"",replyTime: '2023-05-12 14:30:22', replyIsDiscuss:"",replyTarget: 1},
                {detail: '真的是明天吗？',authorID:this.$store.getters.user.account,
                    filesURL:"",replyTime: '2023-05-12 14:30:22', replyIsDiscuss:"",replyTarget: 2}
            ],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            form: {
                id:'',
                title: '',
                detail:'',
                authorID:this.$store.getters.user.account,
                filesURL:'',replyTime:'', replyIsDiscuss:"",replyTarget: ''
            },
            formLabelWidth: '120px',
            fileList: [{
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }, {
                name: 'food2.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }]
        };
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

            this.form.replyTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }, 1000);
    },
    methods: {
        router() {
            return router
        },
        handleChange(val) {
            console.log(val);
        },

        createReply(){
            console.log("title:"+this.form.title)
            console.log("detail:"+this.form.detail)
            console.log("time:"+this.form.replyTime)
            createReply(this.form)
                .then((res)=>{
                    if (res.data.code===200){
                        let resultbody = res.data.data
                        this.replies = resultbody
                        Message.success(res.data.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },

        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }

    }
}
</script>

<style scoped>

</style>
