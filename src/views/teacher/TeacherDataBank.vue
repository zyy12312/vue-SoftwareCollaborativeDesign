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
                <el-row style="margin-top: 20px">
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
                        <div class="grid-content bg-purple-light" style="margin-top: 10px" v-if="data.state === 0">未发布</div>
                        <div class="grid-content bg-purple-light" style="margin-top: 10px" v-else>已发布</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{data.createTime}}</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{data.releaseTime}}</div>
                    </el-col>
                    <el-col :span="2" v-if="data.state === 0">
                        <el-button type="primary" plain @click="publishData(data.id)">发布</el-button>
                    </el-col>
                    <el-col :span="2" v-else>
                        <el-button type="primary" plain disabled >发布</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="success" plain @click="edit(index)">编辑</el-button>
                        <el-dialog :visible.sync="dialogFormVisible_edit" append-to-body>
                            <div>
                                <el-input v-model="edited_data.title">
                                    <template slot="prepend">资料名称：</template>
                                </el-input>
                                <el-input v-model="edited_data.description">
                                    <template slot="prepend">资料详情：</template>
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
                                           @click="dialogFormVisible_edit = false; editDataConfirm()">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="danger" plain @click="deleteDataConfirm(data.id)">删除</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="grid-content bg-purple-light" >
                <el-button type="primary" @click="dialogFormVisible_add = true;"  style="font-size: 16px;margin-top: 20px" >添加资料</el-button>
                <el-dialog :visible.sync="dialogFormVisible_add" append-to-body>
                    <div>
                        <el-input v-model="added_data.title">
                            <template slot="prepend">资料标题：</template>
                        </el-input>
                    </div>
                    <div>
                        <el-input v-model="added_data.description">
                            <template slot="prepend">资料详情：</template>
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
                                   @click="dialogFormVisible_add = false; addDataConfirm()">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-card>
    </el-main>

</template>

<script>
import {Message} from "element-ui";
import {createMaterial, deleteMaterial, editMaterial, getAllMaterials, releaseMaterial} from "@/api/material";
import {getNowTime} from "@/utils";

export default {
    name: "TeacherDataBank",
    data() {
        return {
            formLabelWidth: '120px',
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
            edited_data: {
                id: '', //number
                state: '', //number
                title: '',
                createTime: '',
                description: '',
            },
            added_data: {
                title: '',
                createTime: '',
                description: '',
            },
            datas: [],
            items:[
                {title1:"资料标题",title2:"资料详情",title3:"附件名称",title4:"下载",title5:"资料状态",title6:"创建时间",title7:"发布时间"}
            ],

        }
    },

    methods: {
        //获取任务列表
        async getList() {
            await getAllMaterials()
                .then((res)=>{
                    if (res.code===200){
                        this.datas = res.data
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                    Message.error(err)
                })
        },

        //编辑任务（点击编辑按钮）
        edit(index){
            this.edited_data.id=this.datas[index].id
            this.edited_data.createTime=this.datas[index].createTime
            this.edited_data.title=this.datas[index].title
            this.edited_data.state=this.datas[index].state
            this.edited_data.description=this.datas[index].description
            this.dialogFormVisible_edit = true
        },


        //编辑资料
        editDataConfirm(){
            console.log("edit1:title="+this.edited_data.title)
            editMaterial(this.edited_data)
                .then((res)=>{
                    if (res.code===200){
                        Message.success(res.msg)
                    }
                }).catch((err)=>{
                Message.error(err)
            })
        },


        //新建资料
        addDataConfirm(){
            this.added_data.createTime=getNowTime()
            console.log("add1:title="+this.added_data.title)
            console.log("add1:description="+this.added_data.description)
            console.log("add1:createTime="+this.added_data.createTime)
            createMaterial(this.added_data)
                .then((res)=>{
                    // this.added_data.title=null
                    // this.added_data.description=null
                    if (res.code===200){
                        Message.success(res.msg)
                    }
                }).catch((err)=>{

                Message.error(err.message)
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
            deleteMaterial([dataId])
                .then((res)=>{
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
            releaseMaterial([dataID])
                .then((res)=>{
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
    },

    mounted() {
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
