<template>
    <el-main>
        <el-collapse v-model="activeNames" @change="handleChange">
            <ul id="discuss">
                <li v-for="item in discuss" v-bind:key="item.title">
                    <el-collapse-item :title="item.title" name="0" v-show="discuss">
                        <div>{{ item.detail }}</div>
                        <div style="text-align: right">
                            <a style="font-size: 15px ">{{ item.discussTime }}</a>
                            <p>
                                <el-button type="text" @click="dialogFormVisible = true">回复帖子</el-button>
                                <el-dialog title="回复帖子"
                                           :visible.sync="dialogFormVisible" append-to-body>
                                    <el-form :model="form">
                                        <el-form-item label="帖子名称" :label-width="formLabelWidth">
                                            <el-input v-model="discuss.title" auto-complete="off"></el-input>
                                        </el-form-item>
                                        <el-form-item label="帖子内容" :label-width="formLabelWidth">
                                            <el-input v-model="discuss.detail" auto-complete="off"></el-input>
                                        </el-form-item>
                                        <el-form-item label="回复时间" :label-width="formLabelWidth">
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
                                        <el-button
                                            @click="dialogFormVisible = false">取 消</el-button>
                                        <el-button type="primary"
                                                   @click="dialogFormVisible = false;confirm">确 定</el-button>
                                    </div>
                                </el-dialog>
                            </p>
                        </div>
                    </el-collapse-item>
                </li>
                <li v-for="reply in replies" v-bind:key="reply.detail">
                    <el-collapse-item title="回帖" :name="reply.replyTarget">
                        <div>{{ reply.detail }}</div>
                        <div style="text-align: right">
                            <a style="font-size: 15px ">{{ reply.time }}</a>
                            <p>
                                <el-button type="text" @click="dialogFormVisible1 = true;createReply">回复回帖</el-button>
                            </p>
                        </div>
                        <div>
                            <el-dialog title="回复回帖"
                                       :visible.sync="dialogFormVisible1" append-to-body>
                                <el-form :model="form">
                                    <el-form-item label="回帖名称" :label-width="formLabelWidth">
                                        <el-input v-model="discuss.title" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="回帖内容" :label-width="formLabelWidth">
                                        <el-input v-model="discuss.detail" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="回帖时间" :label-width="formLabelWidth">
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
                                    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                                    <el-button type="primary" @click="dialogFormVisible1 = false;createReply">确 定
                                    </el-button>
                                </div>
                            </el-dialog>
                        </div>

                    </el-collapse-item>
                </li>
            </ul>
        </el-collapse>

    </el-main>

</template>

<script>
// import {createDiscuss} from '@/api/discuss'
// import {Message} from "element-ui";
import {createReply} from "@/api/discuss";
import {Message} from "element-ui";

export default {
    name: "DiscussDetail",
    el: '#discuss',
    data() {
        return {
            activeNames: ['0'],
            // initem: this.$router.query.param,
            discuss: [
                {id:1,title: '什么时候开始？', detail: '明天就开始',authorID:this.$store.getters.user.account,
                    filesURL:"",discussTime: '2023-05-11 19:40:33'},
            ],
            replies: [
                {detail: '确定是明天吗？', authorID:this.$store.getters.user.account,
                    filesURL:"",replyTime: '2023-05-12 12:30:28', replyIsDiscuss:"",replyTarget: 1},
                {detail: '真的是明天吗？',authorID:this.$store.getters.user.account,
                    filesURL:"",replyTime: '2023-05-12 14:30:22', replyIsDiscuss:"",replyTarget: 1}
            ],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            form: {
                id:'',
                title: '',
                detail:'',
                authorID:this.$store.getters.user.account,
                filesURL:'',replyTime: '', replyIsDiscuss:"",replyTarget: ''
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
    methods: {
        handleChange(val) {
            console.log(val);
        },

        createReply(){
            console.log("title:"+this.form.title)
            createReply(this.form)
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
