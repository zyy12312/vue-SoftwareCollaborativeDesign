<template>
    <el-main>
        <el-card>
            <div slot="header" class="clearfix">
                <span v-for="item in items" v-bind:key="item.title1">
                    <el-row >
                        <el-col :span="7"><div class="grid-content bg-purple-light" >{{item.title1}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.title2}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.title3}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.title4}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.title5}}</div></el-col>
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
                        <div class="grid-content bg-purple-light" style="font-size: 13px;margin-top: 5px">{{task.deadline}}</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{task.character}}</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{task.handledTotal}}</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{task.status}}</div>
                    </el-col>
                    <el-col :span="2" v-if="task.status === '未开始'">
                        <el-button type="primary" plain @click="publish(task.id)">发布</el-button>
                    </el-col>
                    <el-col :span="2" v-else>
                        <el-button type="primary" plain disabled>发布</el-button>
                    </el-col>
                    <el-col :span="2" v-if="task.status === '进行中'">
                        <el-button type="success" plain @click="dialogFormVisible_edit = true;">编辑</el-button>
                        <el-dialog :visible.sync="dialogFormVisible_edit" >
                            <div>
                                <el-input v-model="inputTitle">
                                    <template slot="prepend">标题：</template>
                                </el-input>
                            </div>
                            <div>
                                <el-input v-model="inputDetail">
                                    <template slot="prepend">详情：</template>
                                </el-input>

                            </div>
                            <div>
                                <el-input v-model="inputDeadline">
                                    <template slot="prepend">截止日期：</template>
                                </el-input>
                            </div>
                            <div>
                                <el-autocomplete
                                    class="inline-input"
                                    v-model="inputCharacter"
                                    :fetch-suggestions="querySearch"
                                    @select="handleSelect">
                                    <template slot="prepend">作业负责人：</template>
                                </el-autocomplete>
                            </div>
                            <div class="grid-content bg-purple-light">
                                <el-button style="float: right; padding: 3px 0"
                                           type="text"
                                           @click="dialogFormVisible_upload = true">上传文件</el-button>
                                <el-dialog title="上传文件"
                                           :visible.sync="dialogFormVisible_upload">
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
                                           @click="dialogFormVisible_edit = false">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-col>
                    <el-col :span="2" v-else>
                        <el-button type="success" plain disabled>编辑</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="danger" plain @click="removeItem(index)">删除</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="warning" plain @click="checkItem(index)">批阅</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="grid-content bg-purple-light" >
                <el-button type="primary" @click="dialogFormVisible_add = true;"  style="font-size: 16px" >添加作业</el-button>
                <el-dialog :visible.sync="dialogFormVisible_add" >
                    <div>
                        <el-input v-model="inputTitle">
                            <template slot="prepend">标题：</template>
                        </el-input>
                    </div>
                    <div>
                        <el-input v-model="inputDetail">
                            <template slot="prepend">详情：</template>
                        </el-input>

                    </div>
                    <div>
                        <el-input v-model="inputDeadline">
                            <template slot="prepend">截止日期：</template>
                        </el-input>
                    </div>
                    <div>
                        <el-autocomplete
                            class="inline-input"
                            v-model="inputCharacter"
                            :fetch-suggestions="querySearch"
                            @select="handleSelect">
                            <template slot="prepend">作业负责人：</template>
                        </el-autocomplete>
                    </div>
                        <div class="grid-content bg-purple-light">
                            <el-button style="float: right; padding: 3px 0"
                                       type="text"
                                       @click="dialogFormVisible_upload = true">上传文件</el-button>
                            <el-dialog title="提交作业"
                                       :visible.sync="dialogFormVisible_upload">
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
                                   @click="dialogFormVisible_add = false">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-card>
    </el-main>

</template>

<script>
export default {
    name: "TeacherTask",
    data() {
        return {
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
            // 作业标题title,截止时间deadline,作业负责人character,已交/总计handledTotal,作业状态status
            tasks: [{
                id: '101',
                title: '撰写需求分析报告，绘制用例图',
                deadline: '2023.5.1',
                character: '产品经理',
                handledTotal: '6/6',
                status: '已截止'
            },{
                id: '102',
                title: '撰写系统设计报告，绘制活动图',
                deadline: '2023.6.1',
                character: '开发经理',
                handledTotal: '5/6',
                status: '进行中'
            },{
                id: '103',
                title: '提交程序代码',
                deadline: '2023.6.10',
                character: '开发经理',
                handledTotal: '0/6',
                status: '未开始'
            },
            ],
            items:[
                {title1:"作业标题",title2:"截止时间",title3:"作业负责人",title4:"已交/总计",title5:"作业状态"}
            ]
        }
    },
    methods: {
        handleDelete(row, index) {
            this.$notify({
                title: 'Success',
                message: 'Delete Successfully',
                type: 'success',
                duration: 2000
            })
            this.list.splice(index, 1)
        },
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
        getIndex(index){
            this.indexs=index;
        },
        clicks(index){
            this.indexs=index;
        },
        search(){

        },
        write(){

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
        handleSelect(item) {
            console.log(item);
        },
        publish(taskID){
            console.log("发布任务，任务编号："+taskID);
        },
        removeItem(index) {
            this.$confirm("此操作将删除信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.items.splice(index, 1);
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
        checkItem(index) {
            console.log("批阅作业详情。作业编号："+index)
            this.$router.push({
                path: 'task_submissionDetail',
                query: {
                    taskIndex:index
                }
            })
        }
    },
    mounted() {
        this.characters = this.loadAll();
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
