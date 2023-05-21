<template>
    <el-main>
        <el-card>
            <div slot="header" class="clearfix">
                <span v-for="item in items" v-bind:key="item.title1">
                    <el-row >
                        <el-col :span="5"><div class="grid-content bg-purple-light" >{{item.title1}}</div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light">{{item.title2}}</div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light">{{item.title3}}</div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light">{{item.title4}}</div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light">{{item.title5}}</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">发布</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">编辑</div></el-col>
                        <el-col :span="2"><div class="grid-content bg-purple-light">删除</div></el-col>
                    </el-row>
                </span>
            </div>
            <div v-for="(data,index) in datas" v-bind:key="index">
                <el-row>
<!--                资料名称dataName，附件名称attachmentName，附件大小attachmentSize，下载图标，资料状态（未发布，已发布）-->
                    <el-col :span="5">
                        <div class="grid-content bg-purple-light" style="margin-top: 5px">{{data.dataName}}</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content bg-purple-light" style="font-size: 13px;margin-top: 5px">{{data.attachmentName}}</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{data.attachmentSize}}</div>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text" @click="dialogFormVisible_download = true;getIndex(data.index)" style="font-size: 16px">
                            <i class="el-icon-download"></i>
                        </el-button>
                        <el-dialog title="文件下载" :visible.sync="dialogFormVisible_download" v-if="indexs===data.index">
                            <el-row>
                                <el-col :span="20">
                                    <div class="grid-content bg-purple-dark" style="margin-top: 13px;text-align: left">{{data.title}}</div>
                                </el-col>
                            </el-row>
                        </el-dialog>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{data.status}}</div>
                    </el-col>
                    <el-col :span="2" v-if="data.status === '未发布'">
                        <el-button type="primary" plain @click="publish(data.id)">发布</el-button>
                    </el-col>
                    <el-col :span="2" v-else>
                        <el-button type="primary" plain disabled>发布</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="success" plain @click="dialogFormVisible_edit = true;">编辑</el-button>
                        <el-dialog :visible.sync="dialogFormVisible_edit" >
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
                    <el-col :span="2">
                        <el-button type="danger" plain @click="removeItem(index)">删除</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="grid-content bg-purple-light" >
                <el-button type="primary" @click="dialogFormVisible_add = true;"  style="font-size: 16px" >添加资料</el-button>
                <el-dialog :visible.sync="dialogFormVisible_add" >
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
    name: "TeacherDataBank",
    data() {
        return {
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
                dataName: '需求分析课件',
                attachmentName: '需求分析2023-3-3.pptx',
                attachmentSize: '178MB',
                status: '已发布'
            },{
                id: '202',
                dataName: '需求分析报告要求',
                attachmentName: '模版1.docx',
                attachmentSize: '11MB',
                status: '已发布'
            },{
                id: '203',
                dataName: '系统设计课件',
                attachmentName: '系统设计课件2023-5-13.pptx',
                attachmentSize: '112MB',
                status: '未发布'
            }
            ],
            items:[
                {title1:"资料名称",title2:"附件名称",title3:"附件大小",title4:"下载",title5:"资料状态"}
            ],
            characters: [],
            inputName: '',
            inputDetail: '',
            inputDeadline: '',
            inputCharacter: ''

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
        publish(dataID){
            console.log("发布资料，资料编号："+dataID);
        },
        edit_confirm(dataID,dataName){
            console.log("完成第"+dataID+"个资料的编辑操作，修改后的资料名称："+dataName);
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
