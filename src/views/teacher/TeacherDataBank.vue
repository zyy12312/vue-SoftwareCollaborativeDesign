<template>
    <el-main>
        <el-card>
            <div slot="header" class="clearfix">
                <span v-for="item in items" v-bind:key="item.title1">
                    <el-row >
                        <el-col :span="4"><div class="grid-content bg-purple-light" >{{item.title1}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.title2}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.title3}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.title4}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.title5}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.title6}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.title7}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">发布</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">编辑</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">删除</div></el-col>
                    </el-row>
                </span>
            </div>
            <div v-for="(data,index) in datas" v-bind:key="index">
                <el-row>
<!--                title1:"资料标题",title2:"资料详情",title3:"附件名称",title4:"下载",title5:"资料状态",title6:"创建时间",title7:"发布时间"-->
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light" style="margin-top: 5px">{{data.title}}</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light" style="font-size: 13px;margin-top: 5px">{{data.description}}</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{data.fileName}}</div>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="text" @click="dialogFormVisible_download = true;getIndex(data.index)" style="font-size: 16px">
                            <i class="el-icon-download"></i>
                        </el-button>
                        <el-dialog title="文件下载" :visible.sync="dialogFormVisible_download" v-if="indexs===data.index" append-to-body>
                            <el-row>
                                <el-col :span="20">
                                    <div class="grid-content bg-purple-dark" style="margin-top: 13px;text-align: left">{{data.title}}</div>
                                </el-col>
                            </el-row>
                        </el-dialog>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{data.state}}</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{data.createTime}}</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{data.releaseTime}}</div>
                    </el-col>
                    <el-col :span="2" v-if="data.state === '未发布'">
                        <el-button type="primary" plain @click="publishData(data.id)">发布</el-button>
                    </el-col>
                    <el-col :span="2" v-else>
                        <el-button type="primary" plain disabled >发布</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="success" plain @click="dialogFormVisible_edit = true;">编辑</el-button>
                        <el-dialog :visible.sync="dialogFormVisible_edit" append-to-body>
                            <div>
                                <el-input v-model="inputName">
                                    <template slot="prepend">资料名称：</template>
                                </el-input>
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
                                           @click="dialogFormVisible_edit = false; editDataConfirm(index)">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="danger" plain @click="deleteDataConfirm(data.id)">删除</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="grid-content bg-purple-light" >
                <el-button type="primary" @click="dialogFormVisible_add = true;"  style="font-size: 16px" >添加资料</el-button>
                <el-dialog :visible.sync="dialogFormVisible_add" append-to-body>
                    <div>
                        <el-input v-model="inputName">
                            <template slot="prepend">资料名称：</template>
                        </el-input>
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
                            @click="dialogFormVisible_add = false">取 消</el-button>
                        <el-button type="primary"
                                   @click="dialogFormVisible_add = false; addDataConfirm(index)">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-card>
    </el-main>

</template>

<script>
import {Message} from "element-ui";
import {createMaterial, deleteMaterial, editMaterial, releaseMaterial} from "@/api/material";

export default {
    name: "TeacherDataBank",
    data() {
        return {
            edited_data: {
                id: '',
                state: '',
                title: '',
                createTime: '',
                description: '',
                releaseTime: '',
                fileURLs: '',
            },
            added_data: {
                id: '',
                state: '',
                title: '',
                createTime: '',
                description: '',
                releaseTime: '',
                fileURLs: '',
            },
            dialogFormVisible_upload: false,
            dialogFormVisible_edit: false,
            dialogFormVisible_add: false,
            dialogFormVisible_download: false,
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
                name: '学习要求.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }, {
                name: '课堂重点截图.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }],
            indexs:0,
            datas: [{
                id: '201',
                state: '已发布',
                title: '需求分析报告要求',
                createTime: '2023-03-23 09:00:00',
                description: '需求分析报告要求ppt，包含上课要点',
                releaseTime: '2023-03-24 09:00:00',
                fileURLs: 'v1/v2/v3/v4/需求报告.pptx',
                fileName: ''
            },{
                id: '201',
                state: '已发布',
                title: '系统设计课件',
                createTime: '2023-03-23 09:00:00',
                description: '系统设计课件ppt，包含上课要点',
                releaseTime: '2023-04-24 09:00:00',
                fileURLs: 'v1/v2/v3/v4/系统设计课件.pptx',
                fileName: ''
            },{
                id: '201',
                state: '未发布',
                title: '代码提交要求',
                createTime: '2023-04-23 09:00:00',
                description: '代码提交要求ppt，包含上课要点',
                releaseTime: '',
                fileURLs: 'v1/v2/v3/v4/代码提交要求.pptx',
                fileName: ''
            }
            ],
            items:[
                {title1:"资料标题",title2:"资料详情",title3:"附件名称",title4:"下载",title5:"资料状态",title6:"创建时间",title7:"发布时间"}
            ],
            characters: [],
            inputName: '',
            inputDetail: '',
            inputDeadline: '',
            inputCharacter: ''

        }
    },
    methods: {
        //编辑资料
        editDataConfirm(index){
            this.edited_data.id=this.datas[index].id
            this.edited_data.character=this.datas[index].character
            this.edited_data.state=this.datas[index].state
            console.log("edit1:inputTitle="+this.edited_data.inputTitle)
            // console.log("edit1:id="+this.edited_data.id)
            editMaterial(this.edited_data)
                .then((res)=>{
                    console.log("edit:inputTitle="+this.edited_data.inputTitle)
                    if (res.code===200){
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },
        edit_confirm(dataID,dataName){
            console.log("完成第"+dataID+"个资料的编辑操作，修改后的资料名称："+dataName);
        },


        //新建资料
        addDataConfirm(index){
            this.edited_data.id=this.datas[index].id
            this.edited_data.character=this.datas[index].character
            this.edited_data.state=this.datas[index].state
            console.log("add1:inputTitle="+this.added_data.inputTitle)
            createMaterial(this.added_data)
                .then((res)=>{
                    console.log("add2:inputTitle="+this.added_data.inputTitle)
                    if (res.code===200){
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },

        //删除资料
        deleteDataConfirm(dataId){
            this.$confirm("此操作将删除该资料, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.titles.splice(dataId, 1);
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
            console.log("delete1:deleted_id="+dataId)
            deleteMaterial(dataId)
                .then((res)=>{
                    console.log("delete2:deleted_id="+dataId)
                    if (res.code===200){
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },
        
        //发布资料
        publishData(dataID){
            console.log("publish1:published_id="+dataID)
            let dataIDList = [dataID]
            releaseMaterial(dataIDList)
                .then((res)=>{
                    console.log("publish2:published_id="+dataID)
                    if (res.code===200){
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
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
        loadAll() {
            return [
                { "value": "小组长"},
                { "value": "产品经理"},
                { "value": "开发经理"},
                { "value": "质量和计划经理"},
                { "value": "测试经理"},
            ];
        },
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
