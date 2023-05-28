<template>
    <el-main>
        <el-collapse v-model="activeName" accordion>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>作业详情</span>
                </div>
                <div v-for="titleGroup1 in titleGroups1" :key="titleGroup1.title1" class="team font">
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">{{ titleGroup1.title1 }}</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-light">{{ titleGroup1.title2 }}</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">{{ titleGroup1.title3 }}</div>
                        </el-col>
                        <el-col :span="6"><div class="grid-content bg-purple-light">编辑</div></el-col>
                    </el-row>
                    </div>
                <div v-for="(submission,outIndex) in submissions" v-bind:key="outIndex">
                    <div v-if="Number(submission.targetID)===Number(taskIndex)">
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">{{ submission.submitter.name }}</div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple-light">{{ submission.teamID }}</div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">{{ submission.submitTime }}</div>
                            </el-col>
                            <el-col :span="6">
                            <el-button type="warning" plain @click="dialogFormVisible = true;getIndex(submission.id)"
                                       style="font-size: 16px">查看作业
                            </el-button>
                            <el-dialog title="作业详情" :visible.sync="dialogFormVisible" v-if="indexs===submission.id" append-to-body><!--v-if="indexs===submission.index" -->
                                <el-tabs type="card">
                                    <el-card>
                                        <el-row>
                                            <el-col :span="24"><div
                                                class="grid-content bg-purple"
                                                style="text-align: left">作业内容：</div></el-col>
                                            <el-col :span="24"><div
                                                class="grid-content bg-purple-light"
                                                style="margin-top: 13px;text-align: left">{{submission.detail}}</div></el-col>
                                        </el-row>
                                    </el-card>
                                    <el-card>
                                        <div slot="header" class="clearfix">
                                            <span v-for="titleGroup2 in titleGroups2" v-bind:key="titleGroup2.title1">
                                                <el-row>
                                                    <el-col :span="12"><div
                                                        class="grid-content bg-purple-light">{{titleGroup2.title1 }}</div></el-col>
<!--                                                    <el-col :span="8"><div-->
<!--                                                        class="grid-content bg-purple-light">{{titleGroup2.title2 }}</div></el-col>-->
                                                </el-row>
                                            </span>
                                        </div>
                                        <div>
                                            <el-row>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple-light" style="margin-top: 13px">{{ submission.filesURL }}</div>
                                                </el-col>
<!--                                                <el-col :span="8">-->
<!--                                                    <div class="grid-content bg-purple-light"-->
<!--                                                         style="margin-top: 13px">{{ submission.filesize }}-->
<!--                                                    </div>-->
<!--                                                </el-col>-->
                                                <el-col :span="4">
                                                    <div class="grid-content bg-purple-light">
                                                        <el-button type="text" @click="dialogFormVisible = true"
                                                                   style="font-size: 16px">
                                                            <i class="el-icon-download"></i>
                                                        </el-button>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-card>
                                        <el-card>
                                            <div slot="header" class="clearfix">
                                        <span v-for="titleGroup3 in titleGroups3" v-bind:key="titleGroup3.title1">
                                            <el-row>
                                                <el-col :span="12"><div
                                                    class="grid-content bg-purple-light">{{titleGroup3.title1}}</div></el-col>
                                                <el-col :span="8"><div
                                                    class="grid-content bg-purple-light">{{titleGroup3.title2 }}</div></el-col>
                                                <el-col :span="4">
                                                    <div class="grid-content bg-purple-light">
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </span>
                                            </div>
                                                <el-row>
                                                    <el-col :span="12">
                                                        <div class="grid-content bg-purple-light" style="margin-top: 5px">{{ submission.score }}</div>
                                                    </el-col>
                                                    <el-col :span="8">
                                                        <div class="grid-content bg-purple-light" style="margin-top: 2px">{{ submission.comment }}</div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content bg-purple-light">
                                                            <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible_comment = true;">评分
                                                            </el-button>
                                                            <el-dialog :visible.sync="dialogFormVisible_comment" append-to-body>
                                                                <div class="block">
                                                                    <label for="score">在此键入分数</label>
                                                                    <el-slider
                                                                        id="score"
                                                                        v-model="score"
                                                                        show-input>
                                                                    </el-slider>
                                                                </div>
                                                                <div>
                                                                    <el-input v-model="comment">
                                                                        <template slot="prepend">评语：</template>
                                                                    </el-input>
                                                                </div>
                                                                <div slot="footer" class="dialog-footer">
                                                                    <el-button @click="dialogFormVisible_comment = false">取 消</el-button>
                                                                    <el-button type="primary" @click="giveComment(submission.id, score, comment)">确 定</el-button>
                                                                </div>
                                                            </el-dialog>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                        </el-card>
                                </el-tabs>
                            </el-dialog>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-card>
        </el-collapse>
    </el-main>

</template>

<script>


// import {Message} from "element-ui";

import {Message} from "element-ui";
import {getSubmissionToTask, readover} from "@/api/submission";

export default {
    name: 'TeacherTask_submissionDetail',
    data() {
        return {
            activeName: 'first',
            score:" ",
            comment:" ",
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
            dialogFormVisible_comment: false,
            indexs: "",
            taskIndex: this.$route.query.taskIndex, //接收上个页面传过来的数据
            dialogFormVisible: "",
            submissions: [
            ],
            titleGroups1: [
                {title1: "提交人", title2: "团队编号", title3: "提交时间"}
            ],
            titleGroups2: [
                {title1: "附件名", title2: "大小"}
            ],
            titleGroups3: [
                {title1: "成绩", title2: "评语"}
            ],
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

        async getList() {
            console.log("taskIndex:"+this.taskIndex)
            await getSubmissionToTask(this.taskIndex)
                .then((res)=>{
                    console.log("res:")
                    console.log(res)
                    if (res.code===200){
                        this.submissions = res.data
                        console.log("submissions:")
                        console.log(this.submissions)
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                    Message.error(err)
                })
        },

        //评分
        giveComment(submissionID, score, comment) {
            this.dialogFormVisible_comment = false
            console.log("给编号为"+submissionID+"的作业评分："+score+"，评语："+comment)
            readover({
                "submissionId":submissionID,
                "grade":Number(score),
                "comment":comment,
            }).then((res)=>{
                    if (res.code===200){
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },

        getIndex(index) {
            this.indexs = index;
        },
    },

    created() {
        console.log("teacher submission detail created. taskIndex="+this.taskIndex)
        // console.log(typeof this.taskIndex) //number

        this.getList()
    }
}

</script>

<style scoped>
.text team {
    align-items: center;
    justify-content: center;
    justify-items: center;
}

el-row {
    align-items: center;
    flex: auto;
    justify-content: center;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>