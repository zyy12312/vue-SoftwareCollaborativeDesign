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
                <div v-for="submission in submissions" v-bind:key="submission.id">
                    <div v-if="submission.targetID===taskIndex">
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">{{ submission.submitterName }}</div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple-light">{{ submission.teamID }}</div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">{{ submission.submitTime }}</div>
                            </el-col>
                            <el-col :span="6">
                            <el-button type="warning" plain @click="dialogFormVisible = true;getIndex(submission.index)"
                                       style="font-size: 16px">查看作业
                            </el-button>
                            <el-dialog title="作业详情" :visible.sync="dialogFormVisible" v-if="indexs===submission.index">
                                <el-tabs type="card">
                                    <el-card>
                                                <el-row>
                                                    <el-col :span="24"><div
                                                        class="grid-content bg-purple"
                                                        style="text-align: left">作业内容：</div></el-col>
                                                    <el-col :span="24"><div
                                                        class="grid-content bg-purple-light"
                                                        style="margin-top: 13px;text-align: left">{{submission.detail }}</div></el-col>
                                                </el-row>
                                    </el-card>
                                    <el-card>
                                        <div slot="header" class="clearfix">
                                            <span v-for="titleGroup2 in titleGroups2" v-bind:key="titleGroup2.title1">
                                                <el-row>
                                                    <el-col :span="12"><div
                                                        class="grid-content bg-purple-light">{{titleGroup2.title1 }}</div></el-col>
                                                    <el-col :span="8"><div
                                                        class="grid-content bg-purple-light">{{titleGroup2.title2 }}</div></el-col>
                                                </el-row>
                                            </span>
                                        </div>
                                        <div>
                                            <el-row>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple-light"
                                                         style="margin-top: 13px">{{ submission.fileName }}
                                                    </div>
                                                </el-col>
                                                <el-col :span="8">
                                                    <div class="grid-content bg-purple-light"
                                                         style="margin-top: 13px">{{ submission.filesize }}
                                                    </div>
                                                </el-col>
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
                                            <div v-for="sub in submit" v-bind:key="sub.file">
                                                <el-row>
                                                    <el-col :span="12">
                                                        <div class="grid-content bg-purple-light"
                                                             style="margin-top: 5px">{{ sub.score }}
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="8">
                                                        <div class="grid-content bg-purple-light"
                                                             style="margin-top: 2px">{{ sub.comment }}
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content bg-purple-light">
                                                            <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible_comment = true;">评分
                                                            </el-button>
                                                            <el-dialog :visible.sync="dialogFormVisible_comment" >
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
                                            </div>
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


export default {
    name: 'TeacherTask_submissionDetail',
    el: "#task_submissionDetail",
    data() {
        return {
            score:" ",
            comment:" ",
            submit: [
                {score: "未评分", comment: "未给评语"}
            ],
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
            dialogFormVisible_comment: false,
            indexs: "",
            // taskIndex: this.$route.query.taskIndex, //发请求的时候使用这个，接收上个页面传过来的数据
            taskIndex: "101", //仅做测试用
            dialogFormVisible: "",
            submissions: [
                {
                    id: "1",
                    submitterName: "aaa",
                    teamID: "5",
                    detail: "第五组需求分析报告",
                    fileName: "分析报告.docx",
                    filesize: "200KB",
                    fileURL: "",
                    targetID: "101",
                    targetType: "0",
                    score: "88",
                    submitTime: "2023-03-21 17:08:58",
                    comment: "完成的不错"
                },
                {
                    id: "2",
                    submitterName: "bbb",
                    teamID: "4",
                    detail: "第四组需求分析报告",
                    fileName: "分析报告.docx",
                    filesize: "200KB",
                    fileURL: "",
                    targetID: "101",
                    targetType: "0",
                    score: "76",
                    submitTime: "2023-03-22 12:08:58",
                    comment: "还可以，继续加油"
                },
                {
                    id: "3",
                    submitterName: "ddd",
                    teamID: "2",
                    detail: "第二组需求分析报告",
                    fileName: "分析报告.docx",
                    filesize: "200KB",
                    fileURL: "",
                    targetID: "101",
                    targetType: "0",
                    score: "95",
                    submitTime: "2023-03-24 13:08:58",
                    comment: "非常好"
                },
                {
                    id: "4",
                    submitterName: "ccc",
                    teamID: "3",
                    detail: "第三组需求分析报告",
                    fileName: "分析报告.docx",
                    filesize: "200KB",
                    fileURL: "",
                    targetID: "101",
                    targetType: "0",
                    score: "",
                    submitTime: "2023-03-25 14:08:58",
                    comment: ""
                },
                {
                    id: "5",
                    submitterName: "bbb",
                    teamID: "8",
                    detail: "第八组系统设计报告，绘制活动图",
                    fileName: "分析报告.docx",
                    filesize: "200KB",
                    fileURL: "",
                    targetID: "102",
                    targetType: "0",
                    score: "88",
                    submitTime: "2023-03-02 17:08:58",
                    comment: "完成的不错"
                },
                {
                    id: "6",
                    submitterName: "ccc",
                    teamID: "1",
                    detail: "第一组系统设计报告",
                    fileName: "分析报告.docx",
                    filesize: "200KB",
                    fileURL: "",
                    targetID: "102",
                    targetType: "0",
                    score: "",
                    submitTime: "2023-04-11 17:08:58",
                    comment: ""
                },
                {
                    id: "7",
                    submitterName: "ddd",
                    teamID: "3",
                    detail: "第三组程序代码",
                    fileName: "分析报告.docx",
                    filesize: "200KB",
                    fileURL: "",
                    targetID: "103",
                    targetType: "0",
                    score: "",
                    submitTime: "2023-05-19 17:08:58",
                    comment: ""
                },
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
    // watch: { //发请求的时候使用
    //     '$route': 'gettingData'
    // },
    // created() { //发请求的时候使用
    //     this.gettingData()
    // },
    methods: {
        // 获取小组编号数据
        // gettingData() { //发请求的时候使用
        //     this.taskIndex = this.$route.query.taskIndex
        // },
        getIndex(index) {
            this.indexs = index;
        },
        giveComment(submissionID, score, comment) {
            this.dialogFormVisible_comment = false
            console.log("给编号为"+submissionID+"的作业评分："+score+"，评语："+comment)
        }
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
