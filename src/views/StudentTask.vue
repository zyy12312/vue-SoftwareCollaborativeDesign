<template>
    <el-main>
        <el-card>
            <div slot="header" class="clearfix">
                <span v-for="item in items" v-bind:key="item.title1">
                    <el-row>
                        <el-col :span="8"><div class="grid-content bg-purple-light">{{ item.title1 }}</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light">{{ item.title3 }}</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light">{{ item.title5 }}</div></el-col>
                    </el-row>
                </span>
            </div>
            <div v-for="(task,index) in tasks" v-bind:key="index">
                <el-row>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light" style="margin-top: 5px">{{ task.title }}</div>
<!--                        <div class="grid-content bg-purple-light" style="font-size: 13px;margin-top: 5px">-->
<!--                            截止：{{ task.endTime }}-->
<!--                        </div>-->
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{ task.endTime }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light"></div>
                        <div class="grid-content bg-purple-light">
                            <el-button type="text" v-if="task.characterType===myRole" @click="dialogFormVisible = true;getIndex(task.id);getSubmissionToTask(task.id)"
                                       style="font-size: 16px">查看作业
                            </el-button>
                            <el-button type="text" v-else @click="dialogFormVisible = true;getIndex(task.id);getSubmissionListToSubTask(task.id)"
                                       style="font-size: 16px">查看作业
                            </el-button>
                            <el-dialog :title="task.title" :visible.sync="dialogFormVisible" v-if="indexs===task.id"  append-to-body>
                                <el-row>
                                    <el-col :span="20">
                                        <div class="grid-content bg-purple-dark"
                                             style="margin-top: 13px;text-align: left">
                                            {{ task.state }}（若学生多次提交，成绩计算请以评分规则为准）
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="grid-content bg-purple-light" v-if="task.characterType===myRole">
                                            <el-button style="float: right; padding: 3px 0;margin-top: 13px" type="text" @click="dialogFormVisibles = true">提交
                                            </el-button>
                                            <el-dialog title="提交作业"
                                                       :visible.sync="dialogFormVisibles" append-to-body>
                                                <el-form :model="form">
                                                    <el-form-item label="作业描述"
                                                                  :label-width="formLabelWidth">
                                                        <el-input v-model="form.name"
                                                                  auto-complete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="作业提交区域"
                                                                  :label-width="formLabelWidth">
                                                        <div class="upload">
                                                            <el-upload
                                                                class="upload-demo"
                                                                ref="upload"
                                                                action="https://jsonplaceholder.typicode.com/posts/"
                                                                :on-preview="handlePreview"
                                                                :on-remove="handleRemove"
                                                                :file-list="fileList"
                                                                :auto-upload="false">
                                                                <el-button slot="trigger"
                                                                           size="small"
                                                                           type="primary">选取文件</el-button>
                                                                <el-button
                                                                    style="margin-left: 10px;"
                                                                    size="small"
                                                                    type="success"
                                                                    @click="submitUpload">上传到服务器</el-button>
                                                                <div slot="tip"
                                                                     class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                                            </el-upload>
                                                        </div>
                                                    </el-form-item>
                                                </el-form>
                                                <div slot="footer" class="dialog-footer">
                                                    <el-button
                                                        @click="dialogFormVisibles = false">取 消</el-button>
                                                    <el-button type="primary"
                                                               @click="dialogFormVisibles = false;confirm(form)">确 定</el-button>
                                                </div>
                                            </el-dialog>
                                        </div>
                                        <div class="grid-content bg-purple-light" v-else>
                                            <el-button style="float: right; padding: 3px 0;margin-top: 13px" type="text" disabled>提交
                                            </el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                                    <el-tab-pane label="作业要求" name="first">
                                        <el-card>
                                            <div slot="header" class="clearfix">
                                                    <span>
                                                       <el-row>
                                                           <el-col :span="24"><div class="grid-content bg-purple"
                                                                                   style="text-align: left">作业详情：</div></el-col>
                                                           <el-col :span="24"><div class="grid-content bg-purple-light"
                                                                                   style="margin-top: 13px;text-align: left">{{ task.detail }}</div></el-col>
                                                       </el-row>
                                                    </span>
                                            </div>
                                            <el-row>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple"
                                                         style="margin-top: 13px;text-align: left">作业交付截止
                                                    </div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple-light" style="margin-top: 13px">
                                                        {{ task.endTime }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple"
                                                         style="margin-top: 13px;text-align: left">任务负责人
                                                    </div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple-light" style="margin-top: 13px">
                                                        {{ task.characterType }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple"
                                                         style="margin-top: 13px;text-align: left">计分规则
                                                    </div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple-light" style="margin-top: 13px">
                                                        最后一次得分
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="20">
                                                    <div class="grid-content bg-purple-dark"
                                                         style="margin-top: 13px;text-align: left">{{ task.request }}
                                                    </div>
                                                </el-col>
                                                <el-col :span="4">
                                                    <div class="grid-content bg-purple-light"
                                                         v-if="task.characterType===myRole">
                                                        <el-button type="text" @click="dialogFormVisible2 = true">
                                                            任务分配
                                                        </el-button>
                                                        <el-dialog title="任务分配" :visible.sync="dialogFormVisible2" append-to-body>
                                                            <el-card class="box-card">
                                                                <div slot="header" class="clearfix">
                                                                    <span>
                                                                        <el-row>
                                                                            <el-col :span="24"><div
                                                                                    class="grid-content bg-purple-light"
                                                                                    style="margin-top: 13px;text-align: left">
                                                                                <el-form :model="form1">
                                                                               <el-form-item label="截止时间："
                                                                                             :label-width="formLabelWidth">
                                                                              <div class="block">
                                                                                 <el-date-picker
                                                                                        v-model="form1.endTime"
                                                                                        type="datetime"
                                                                                        placeholder="选择日期时间"
                                                                                        align="right"
                                                                                        :picker-options="pickerOptions1">
                                                                                 </el-date-picker>
                                                                              </div>
                                                                              </el-form-item>
                                                                                </el-form></div>
                                                                            </el-col>
                                                                        </el-row>
                                                                        <el-row>
                                                                        <el-col :span="24"><div
                                                                                class="grid-content bg-purple-light"
                                                                                style="margin-top: 13px;text-align: left">任务提交栏：</div></el-col>
                                                                    </el-row>
                                                                    </span>
                                                                </div>
                                                                <div v-for="role in roles" :key="role.role"
                                                                     class="text item">
                                                                    <el-row>
                                                                        <el-col :span="6">
                                                                            <div class="grid-content bg-purple-light"
                                                                                 style="margin-top: 13px;text-align: left">
                                                                                {{ role.role }}：
                                                                            </div>
                                                                        </el-col>
                                                                        <el-col :span="18">
                                                                            <div class="grid-content bg-purple-light"
                                                                                 style="margin-top: 13px">
                                                                                <el-input placeholder="请输入内容"
                                                                                          v-model="form1.detail">
                                                                                </el-input>
                                                                            </div>
                                                                        </el-col>
                                                                    </el-row>
                                                                </div>
                                                            </el-card>
                                                            <div slot="footer" class="dialog-footer">
                                                                <el-button @click="dialogFormVisible2 = false">取 消
                                                                </el-button>
                                                                <el-button type="primary"
                                                                           @click="dialogFormVisible2 = false;form1.targetID=task.id;form1.characterType=myRole;subtasks(form1)">确 定
                                                                </el-button>
                                                            </div>
                                                        </el-dialog>
                                                    </div>
                                                    <div class="grid-content bg-purple-light" v-else>
                                                        <el-button style="float: right; padding: 3px 0;margin-top: 13px"
                                                                   type="text" @click="subtasks(index)" disabled>任务分配
                                                        </el-button>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                        <el-card>
                                            <div slot="header" class="clearfix">
                                                      <span v-for="cl in cla" v-bind:key="cl.title1">
                                                          <el-row>
                                                             <el-col :span="12"><div
                                                                     class="grid-content bg-purple-light">{{ cl.title1 }}</div></el-col>
                                                             <el-col :span="8"><div
                                                                     class="grid-content bg-purple-light">{{ cl.title2 }}</div></el-col>
                                                          </el-row>
                                                      </span>
                                            </div>
                                            <div>
                                                <el-row>
                                                    <el-col :span="12">
                                                        <div class="grid-content bg-purple-light"
                                                             style="margin-top: 13px">{{ task.file }}
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="8">
                                                        <div class="grid-content bg-purple-light"
                                                             style="margin-top: 13px">{{ task.submitTime }}
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content bg-purple-light">
                                                            <el-button type="text" @click="dialogFormVisible = true;download(index)"
                                                                       style="font-size: 16px">
                                                                <i class="el-icon-download"></i>
                                                            </el-button>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </el-card>
                                    </el-tab-pane>
                                    <el-tab-pane label="我的作业" name="second" >
                                        <el-card>
                                            <div slot="header" class="clearfix">
                                                    <span>
                                                       <el-row>
                                                           <el-col :span="24"><div class="grid-content bg-purple"
                                                                                   style="text-align: left">作业详情：</div></el-col>
                                                           <el-col :span="24"><div class="grid-content bg-purple-light"
                                                                                   style="margin-top: 13px;text-align: left">{{ task.detail }}</div></el-col>
                                                       </el-row>
                                                    </span>
                                            </div>
                                            <el-row>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple"
                                                         style="margin-top: 13px;text-align: left">作业交付截止
                                                    </div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple-light" style="margin-top: 13px">
                                                        {{ task.endTime }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple"
                                                         style="margin-top: 13px;text-align: left">任务负责人
                                                    </div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple-light" style="margin-top: 13px">
                                                        {{ task.characterType }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple"
                                                         style="margin-top: 13px;text-align: left">计分规则
                                                    </div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple-light" style="margin-top: 13px">
                                                        最后一次得分
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="24">
                                                    <div class="grid-content bg-purple-dark"
                                                         style="margin-top: 13px;text-align: left">{{ task.request }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                        <el-card >
                                            <div slot="header" class="clearfix">
                                                      <span v-for="cl in clas" v-bind:key="cl.title1">
                                                          <el-row>
                                                             <el-col :span="12"><div
                                                                     class="grid-content bg-purple-light">{{ cl.title1 }}</div></el-col>
                                                             <el-col :span="8"><div
                                                                     class="grid-content bg-purple-light">{{ cl.title2 }}</div></el-col>
                                                             <el-col :span="4">
                                                                  <div class="grid-content bg-purple-light">
                                                                      <el-button style="float: right; padding: 3px 0"
                                                                                 type="text"
                                                                                 @click="dialogFormVisible1 = true">写作业</el-button>
                                                                      <el-dialog title="提交作业"
                                                                                 :visible.sync="dialogFormVisible1" append-to-body>
                                                                      <el-form :model="form">
                                                                           <el-form-item label="作业名称"
                                                                                         :label-width="formLabelWidth">
                                                                                   <el-input v-model="form.title"
                                                                                             auto-complete="off"></el-input>
                                                                           </el-form-item>
                                                                          <el-form-item label="作业提交区域"
                                                                                        :label-width="formLabelWidth">
                                                                              <div class="upload">
                                                                                  <el-upload
                                                                                          class="upload-demo"
                                                                                          ref="upload"
                                                                                          action="https://jsonplaceholder.typicode.com/posts/"
                                                                                          :on-preview="handlePreview"
                                                                                          :on-remove="handleRemove"
                                                                                          :file-list="fileList"
                                                                                          :auto-upload="false"
                                                                                          v-model="form.fileUrl">
                                                                                      <el-button slot="trigger"
                                                                                                 size="small"
                                                                                                 type="primary">选取文件</el-button>
                                                                                      <el-button
                                                                                              style="margin-left: 10px;"
                                                                                              size="small"
                                                                                              type="success"
                                                                                              @click="submitUpload">上传到服务器</el-button>
                                                                                      <div slot="tip"
                                                                                           class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                                                                  </el-upload>
                                                                              </div>
                                                                          </el-form-item>
                                                                      </el-form>
                                                                          <div slot="footer" class="dialog-footer">
                                                             <el-button
                                                                     @click="dialogFormVisible1 = false">取 消</el-button>
                                                               <el-button type="primary"
                                                                          @click="dialogFormVisible1 = false;confirm(form)">确 定</el-button>
                                                             </div>
                                                              </el-dialog>
                                                                  </div>
                                                             </el-col>
                                                          </el-row>
                                                      </span>
                                            </div>
                                            <div v-for="sub in submit" v-bind:key="sub.file">
                                                <el-row>
                                                    <el-col :span="12">
                                                        <div class="grid-content bg-purple-light"
                                                             style="margin-top: 5px">{{ sub.submitTime }}
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="8">
                                                        <div class="grid-content bg-purple-light"
                                                             style="margin-top: 2px">{{ sub.score }}
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content bg-purple-light">
                                                            <el-button style="float: right; padding: 3px 0" type="text" @click="searchDetail=true">查看详情</el-button>
                                                            <el-dialog title="提交作业"
                                                                       :visible.sync="searchDetail" append-to-body>
                                                                <el-form :model="form">
                                                                    <div slot="header" class="clearfix">
                                                                        <span>作业</span>
                                                                        <el-button style="float: right; padding: 3px 0" type="text" @click="searchDetail=false"><i class="el-icon-close"></i></el-button>
                                                                    </div>
                                                                    <div v-for="cl in cla" :key="cl" class="text item" style="text-align: left">
                                                                        <el-row>
                                                                            <el-col :span="12"><div
                                                                                class="grid-content bg-purple-light">{{ cl.title1 }}</div></el-col>
                                                                            <el-col :span="8"><div
                                                                                class="grid-content bg-purple-light">{{ cl.title2 }}</div></el-col>
                                                                        </el-row>
                                                                    </div>
                                                                    <div v-for="sub in submit" :key="sub" style="text-align: left">
                                                                        <el-row>
                                                                            <el-col :span="12">
                                                                                <div class="grid-content bg-purple-light"
                                                                                     style="margin-top: 13px">{{ sub.file }}
                                                                                </div>
                                                                            </el-col>
                                                                            <el-col :span="8">
                                                                                <div class="grid-content bg-purple-light"
                                                                                     style="margin-top: 13px">{{ sub.submitTime }}
                                                                                </div>
                                                                            </el-col>
                                                                        </el-row>
                                                                    </div>
                                                                </el-form>
                                                                <div slot="footer" class="dialog-footer">
                                                                    <el-button
                                                                        @click="searchDetail = false">取 消</el-button>
                                                                    <el-button type="primary"
                                                                               @click="searchDetail = false;confirm">确 定</el-button>
                                                                </div>

                                                            </el-dialog>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </el-card>
                                    </el-tab-pane>
                                </el-tabs>
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
import {addSubmission, getSubmissionListToSubTask, getSubmissionToTask} from "@/api/submission";
import {createSubTask,  taskList} from "@/api/task";

export default {
    name: "StudentTask",
    el: "#Task",
    data() {
        return {
            activeName2: 'first',
            // myRole: this.$store.getters.user.role,
            myRole:'产品经理',
            indexs: 0,
            searchDetail:false,
            pickerOptions1: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            value1: '',
            value2: '',
            items: [
                {title1: "作业名称",  title3: "提交时间",  title5: "交付"},
            ],
            tasks: [
                {
                    id: 1,
                    title: "分布式实验",
                    detail: "开发一个java web 网站，该网站提供一个页面，可以输入图书名称，输出该书的库存。程序应该首先访问缓存输出查询结果，如果缓存没有该数据",
                    endTime: "2023-05-27 18:00:00",
                    file: "分布式实验.docx",
                    fileUrl: "",
                    submitTime:'2023-05-22 18:20:20',
                    characterType: "计划经理"
                },
                {
                    id: 2,
                    title: "DES实现",
                    detail: "设计一个图书馆数据库，包含一个图书表books,该表有id,bookname, inventory三个字段（假设书名不会重复），并自行提前录入若干图书数据。",
                    endTime: "2023-05-27 14:00:45",
                    file: "DES实现.docx",
                    fileUrl:"",
                    submitTime:'2023-05-22 18:20:20',
                    characterType: "产品经理"
                },
            ],
            roles: [
                {role: "小组长"}, {role: "产品经理"}, {role: "计划质量经理"}, {role: "开发经理"}, {role: "测试经理"}
            ],
            submit: [
                {submitTime: "2023-05-13 11:30:49", score: "未评分", file: "作业"}
            ],
            cla: [
                {title1: "附件名",title2:"提交时间" }
            ],
            clas: [
                {title1: "交付历史与批改记录", title2: "原始成绩"}
            ],
            dialogFormVisible: false,
            dialogFormVisibles: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            dialogFormVisible3: false,
            form: {
                id:'',
                submitterID:'',
                teamID:'',
                targetID:'',
                title: '',
                detail: '',
                submitTime: '',
                score:'',
                comment:'',
                targetType: '',
                filesURL:'',
                state:''
            },
            form1:{
                teamID:this.$store.getters.user.teamId,
                characterType:'',
                detail: '',
                endTime:'',
                targetID: '',
                filesURL:'',
            },
            input4: '',
            formLabelWidth: '120px',
            fileList: [{
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }, {
                name: 'food2.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }]
        }
    },
    mounted() {
        taskList().then((res)=>{

            if (res.code===200){
                let resultbody = res.data
                this.tasks = resultbody
                Message.success(res.msg)
            }
        }).catch((err)=>{
            Message.error(err)
        });

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

            this.form.submitTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }, 1000);
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        getIndex(index) {
            this.indexs = index;
        },
        clicks(index) {
            this.indexs = index;
        },
        write(index) {
            index;             //对应写作业操作方法
        },
        download(index) {
            index;               //下载对应文件的方法
        },
        subtasks(subTask){
            console.log("详情:"+this.form1.detail)
            console.log("时间:"+this.form1.endTime)
            createSubTask(subTask)
                .then((res)=>{
                    if (res.code===200){
                        let resultbody = res.data
                        this.submit = resultbody
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })//对应任务分配方法
        },
        confirm(form){
            console.log("详情:"+form.title)
            console.log("时间:"+form.submitTime)
            addSubmission(form).then((res)=>{
                    if (res.code === 200){
                        let resultbody = res.data
                        this.submit = resultbody
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
                                 //对应写作业的确认按钮
        },
        getSubmissionToTask(taskId) {
            console.log(taskId)
            getSubmissionToTask(taskId).then((res) => {
                if (res.code === 200) {
                    let resultbody = res.data
                    this.submit = resultbody
                    Message.success(res.msg)
                }
            }).catch((err) => {
                Message.error(err)
            })
        },
        getSubmissionListToSubTask(subTaskID){
            getSubmissionListToSubTask(subTaskID).then((res) => {
                if (res.code === 200) {
                    let resultbody = res.data
                    this.submit = resultbody
                    Message.success(res.msg)
                }
            }).catch((err) => {
                Message.error(err)
            })
        }
    },

}
</script>


<style scoped>
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    width: 100%;
}

.el-input {
    width: 100%;
}
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
    text-align: left;
}
.clearfix:after {
    clear: both
}

.box-card {
    width: 100%;
}
</style>