<template>
    <el-main>
        <el-card>
            <div slot="header" class="clearfix">
                <span v-for="title in titles" v-bind:key="title.title1">
                    <el-row >
                        <el-col :span="7"><div class="grid-content bg-purple-light" >{{title.title1}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">{{title.title2}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">{{title.title3}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">{{title.title4}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">{{title.title5}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">发布</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">编辑</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">删除</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">批阅</div></el-col>
                    </el-row>
                </span>
            </div>
            <div v-for="(task,index) in tasks" v-bind:key="index">
                <el-row>
                    <el-col :span="7">
                        <div class="grid-content bg-purple-light" style="margin-top: 5px">{{task.title}}</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light" style="font-size: 13px;margin-top: 5px">{{task.endTime}}</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{task.characterLabel}}</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{task.handledTotal}}</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px" v-if="task.state===0">未发布</div>
                        <div class="grid-content bg-purple-light" style="margin-top: 10px" v-else>已发布</div>
                    </el-col>
                    <el-col :span="2" v-if="task.state === 0">
                        <el-button type="primary" plain @click="publishTask(task.id,index)">发布</el-button>
                    </el-col>
                    <el-col :span="2" v-else>
                        <el-button type="primary" plain disabled>发布</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="success" plain @click="edit(index)">编辑</el-button>
                        <el-dialog :visible.sync="dialogFormVisible_edit" append-to-body>
                            <div>
                                <el-input v-model="edited_task.inputTitle">
                                    <template slot="prepend">标题：</template>
                                </el-input>
                            </div>

                            <div>
                                <el-input v-model="edited_task.inputDetail">
                                    <template slot="prepend">详情：</template>
                                </el-input>

                            </div>
                            <div>
                                <el-input v-model="edited_task.inputEndTime">
                                    <template slot="prepend">截止日期：</template>
                                </el-input>
                            </div>
                            <div>
                                <el-autocomplete
                                    class="inline-input"
                                    v-model="edited_task.characterLabel"
                                    :fetch-suggestions="querySearch">
                                    <template slot="prepend">作业负责人：</template>
                                </el-autocomplete>
                            </div>
                            <div class="grid-content bg-purple-light">
                                <el-button style="float: right; padding: 3px 0"
                                           type="text"
                                           @click="dialogFormVisible_upload = true">上传文件</el-button>
                                <el-dialog title="上传文件"
                                           :visible.sync="dialogFormVisible_upload" append-to-body>
                                    <el-form :model="form">
                                        <el-form-item :label-width="formLabelWidth">
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
                                            @click="dialogFormVisible_upload = false">取 消</el-button>
                                        <el-button type="primary"
                                                   @click="dialogFormVisible_upload = false">确 定</el-button>
                                    </div>
                                </el-dialog>

                            </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button
                                    @click="dialogFormVisible_edit = false">取 消</el-button>
                                <el-button type="primary"
                                           @click="dialogFormVisible_edit = false; editTaskConfirm(index)">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="danger" plain @click="deleteTaskConfirm(task.id)">删除</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="warning" plain @click="checkItem(task.id)">批阅</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="grid-content bg-purple-light" >
                <el-button type="primary" @click="dialogFormVisible_add = true;"  style="font-size: 16px" >添加作业</el-button>
                <el-dialog :visible.sync="dialogFormVisible_add" append-to-body>
                    <div>
                        <el-input v-model="added_task.inputTitle">
                            <template slot="prepend">标题：</template>
                        </el-input>
                    </div>
                    <div>
                        <el-input v-model="added_task.inputDetail">
                            <template slot="prepend">详情：</template>
                        </el-input>

                    </div>
                    <div>
                        <el-input v-model="added_task.inputEndTime">
                            <template slot="prepend">截止日期：</template>
                        </el-input>
                    </div>
                    <div>
                        <el-autocomplete
                            class="inline-input"
                            v-model="added_task.characterLabel"
                            :fetch-suggestions="querySearch">
                            <template slot="prepend">作业负责人：</template>
                        </el-autocomplete>
                    </div>
                        <div class="grid-content bg-purple-light">
                            <el-button style="float: right; padding: 3px 0"
                                       type="text"
                                       @click="dialogFormVisible_upload = true">上传文件</el-button>
                            <el-dialog title="提交作业"
                                       :visible.sync="dialogFormVisible_upload" append-to-body>
                                <el-form :model="form">
                                    <el-form-item :label-width="formLabelWidth">
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
                                        @click="dialogFormVisible_upload = false">取 消</el-button>
                                    <el-button type="primary"
                                               @click="dialogFormVisible_upload = false">确 定</el-button>
                                </div>
                            </el-dialog>
                        </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button
                            @click="dialogFormVisible_add = false">取 消</el-button>
                        <el-button type="primary"
                                   @click="dialogFormVisible_add = false; addTaskConfirm()">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-card>
        <router-view/>
    </el-main>

</template>

<script>

import {createTask, deleteTask, editTask, releaseTask, taskList} from "@/api/task";
import {Message} from "element-ui";
// import {toNumber} from "vue/src/shared/util";
export default {
    name: "TeacherTask",
    data() {
        return {
            formLabelWidth: '120px',
            inputCharacter_edit: "",
            inputCharacter_add: "",

            edited_task: {
                inputTitle: '',
                inputDetail: '',
                inputEndTime: '',
                id: '',
                characterType: '',
                characterLabel: '',
                state: '',
            },
            added_task: {
                inputTitle: '',
                inputDetail: '',
                inputEndTime: '',
                characterType: '',
                characterLabel: '',
                state: 0,
            },

            dialogFormVisible_upload: false,
            dialogFormVisible_edit: false,
            dialogFormVisible_add: false,
            form: { //没有修改过
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            fileList: [{
                name: '作业要求.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }, {
                name: '课堂重点截图.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }],
            roles:[
                {role:"小组长"},{role:"产品经理"},{role:"计划质量经理"},{role:"开发经理"},{role:"测试经理"}
            ],
            submit:[
                {subTime:"2023.05.13 11:30",score:"未评分",file:"作业"}
            ],
            cla:[
                {title1:"附件名",title2:"大小"}
            ],
            clas:[
                {title1:"交付历史与批改记录",title2:"原始成绩"}
            ],
            indexs:0,
            tasks: [],
            titles:[
                {title1:"作业标题",title2:"截止时间",title3:"作业负责人",title4:"已交/总计",title5:"作业状态"}
            ]
        }
    },

    methods: {
        //获取任务列表
        async getList() {
            await taskList()
                .then((res)=>{
                    if (res.code===200){
                        this.tasks = res.data
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                    Message.error(err)
                })
        },

        //编辑任务（点击编辑按钮）
        edit(index){
            console.log(index)
            this.edited_task.id=this.tasks[index].id
            this.edited_task.inputDetail=this.tasks[index].detail
            this.edited_task.inputEndTime=this.tasks[index].endTime
            this.edited_task.inputTitle=this.tasks[index].title
            this.edited_task.characterType=this.tasks[index].characterType
            this.edited_task.characterLabel=this.tasks[index].characterLabel
            this.edited_task.state=this.tasks[index].state
            this.dialogFormVisible_edit = true
        },


        //编辑任务（编辑后点击确认）
        editTaskConfirm(index){
            this.edited_task.characterType=1 // 通过请求找到对应的角色类型（通过字符串类型的角色找数字类型的角色）

            console.log("edit1:inputTitle="+this.edited_task.inputTitle)
            console.log("edit1:characterType="+this.edited_task.characterType)
            console.log("edit1:characterLabel="+this.edited_task.characterLabel)
            console.log("edit1:state="+this.edited_task.state)
            editTask(
                {"id":this.edited_task.id,
                "title":this.edited_task.inputTitle,
                "detail":this.edited_task.inputDetail,
                "endTime":this.edited_task.inputEndTime,
                "characterType":this.edited_task.characterType,
                "characterLabel":this.edited_task.characterLabel,
                "state":this.edited_task.state}
            )
                .then((res)=>{
                    if (res.code===200){
                        this.tasks[index].id=this.edited_task.id
                        this.tasks[index].detail=this.edited_task.inputDetail
                        this.tasks[index].endTime=this.edited_task.inputEndTime
                        this.tasks[index].title=this.edited_task.inputTitle
                        this.tasks[index].characterType=this.edited_task.characterType
                        this.tasks[index].characterLabel=this.edited_task.characterLabel
                        this.tasks[index].state=this.edited_task.state
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },

        //新建任务
        addTaskConfirm(){
            this.added_task.characterType=1 // 通过请求找到对应的角色类型（通过字符串类型的角色找数字类型的角色）

            console.log("add1:inputTitle="+this.added_task.inputTitle)
            console.log("add1:characterType="+this.added_task.characterType)
            console.log("add1:characterLabel="+this.added_task.characterLabel)
            console.log("add1:state="+this.added_task.state)
            createTask(
                {"title":this.added_task.inputTitle,
                "detail":this.added_task.inputDetail,
                "endTime":this.added_task.inputEndTime,
                "characterType":this.added_task.characterType,
                "characterLabel":this.added_task.characterLabel,
                "state":this.added_task.state})
                .then((res)=>{
                    if (res.code===200){
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },

        //删除任务
        deleteTaskConfirm(taskId){
            this.$confirm("此操作将删除信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.titles.splice(taskId, 1);
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
            console.log("delete1:deleted_id="+taskId)
            deleteTask([taskId])
                .then((res)=>{
                    console.log("delete2:deleted_id="+taskId)
                    if (res.code===200){
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },

        //发布任务
        publishTask(taskId,index){
            console.log("publish1:published_id="+taskId)
            releaseTask([taskId])
                .then((res)=>{
                    if (res.code===200){
                        this.tasks[index].state=1
                        Message.success(res.msg)
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
        },
        querySearch(queryString, cb) {
            var characters = this.characters;
            var results = queryString ? characters.filter(this.createFilter(queryString)) : characters;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                { "value": "小组长"},
                { "value": "产品经理"},
                { "value": "开发经理"},
                { "value": "质量和计划经理"},
                { "value": "测试经理"},
            ];
        },

        //跳转至批阅作业详情界面
        checkItem(taskId) {
            console.log("批阅作业详情。作业编号："+taskId)
            // console.log("cp"+this.$router.currentRoute.path)
            this.$router.push({
                path: '/basepage/task_submissionDetail',
                query: {
                    taskIndex:taskId
                }
            })
        }
    },
    mounted() {
        this.characters = this.loadAll();
        this.getList()
    }

}
</script>


<style>
.el-select .el-input {
    width: 130px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
</style>
