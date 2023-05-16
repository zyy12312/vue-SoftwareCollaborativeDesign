<template>
    <el-main>
        <el-card>
            <div slot="header" class="clearfix">
                <span v-for="item in items" v-bind:key="item.title1">
                    <el-row >
                        <el-col :span="8"><div class="grid-content bg-purple-light" >{{item.title1}}</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light">{{item.title2}}</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light">{{item.title3}}</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light">{{item.title4}}</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light">{{item.title5}}</div></el-col>
                    </el-row>
                </span>
            </div>
            <div v-for="(task,index) in tasks" v-bind:key="index">
                <el-row>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light" style="margin-top: 5px">{{task.title}}</div>
                        <div class="grid-content bg-purple-light" style="font-size: 13px;margin-top: 5px">截止：{{task.deadline}}</div>
                    </el-col>
                    <el-col :span="4">

                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{task.form}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{task.status}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light" style="margin-top: 10px">{{task.type}}</div>
                    </el-col>
                    <el-col :span="4" >
                        <div class="grid-content bg-purple-light"></div>
                        <div class="grid-content bg-purple-light" >
                            <el-button type="text" @click="dialogFormVisible = true;getIndex(task.index)"  style="font-size: 16px" >查看作业</el-button>
                            <el-dialog :title="task.title" :visible.sync="dialogFormVisible" v-if="indexs===task.index">
                                <el-row>
                                    <el-col :span="20">
                                        <div class="grid-content bg-purple-dark" style="margin-top: 13px;text-align: left">{{task.status}}（若学生多次提交，成绩计算请以评分规则为准）</div>
                                    </el-col>
                                    <el-col :span="4"  >
                                        <div class="grid-content bg-purple-light" v-if="task.leader===myRole">
                                            <el-button style="float: right; padding: 3px 0;margin-top: 13px" type="text" @click="write">提交</el-button>
                                        </div>
                                        <div class="grid-content bg-purple-light" v-else>
                                            <el-button style="float: right; padding: 3px 0;margin-top: 13px" type="text" @click="write" disabled>提交</el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                                    <el-tab-pane label="作业要求" name="first" >
                                        <el-card >
                                                <div slot="header" class="clearfix">
                                                    <span>
                                                       <el-row >
                                                           <el-col :span="24"><div class="grid-content bg-purple" style="text-align: left">作业详情：</div></el-col>
                                                           <el-col :span="24"><div class="grid-content bg-purple-light" style="margin-top: 13px;text-align: left" >{{task.detail}}</div></el-col>
                                                       </el-row>
                                                    </span>
                                                </div>
                                                <el-row>
                                                    <el-col :span="12"><div class="grid-content bg-purple" style="margin-top: 13px;text-align: left">作业交付截止</div></el-col>
                                                    <el-col :span="12"><div class="grid-content bg-purple-light" style="margin-top: 13px">{{task.deadline}}</div></el-col>
                                                </el-row>
                                                <el-row>
                                                    <el-col :span="12"><div class="grid-content bg-purple" style="margin-top: 13px;text-align: left">任务负责人</div></el-col>
                                                    <el-col :span="12"><div class="grid-content bg-purple-light" style="margin-top: 13px">{{task.leader}}</div></el-col>
                                                </el-row>
                                                <el-row>
                                                    <el-col :span="12"><div class="grid-content bg-purple" style="margin-top: 13px;text-align: left">计分规则</div></el-col>
                                                    <el-col :span="12"><div class="grid-content bg-purple-light" style="margin-top: 13px">最后一次得分</div></el-col>
                                                </el-row>
                                            <el-row>
                                                <el-col :span="20">
                                                    <div class="grid-content bg-purple-dark" style="margin-top: 13px;text-align: left">{{task.request}}</div>
                                                </el-col>
                                                <el-col :span="4"  >
                                                    <div class="grid-content bg-purple-light" v-if="task.leader===myRole">
                                                        <el-button type="text" @click="dialogFormVisible2 = true">任务分配</el-button>
                                                        <el-dialog title="任务分配" :visible.sync="dialogFormVisible2">
                                                            <el-card class="box-card">
                                                                <div slot="header" class="clearfix">
                                                                    <span>
                                                                        <el-row >
                                                                            <el-col :span="24"><div class="grid-content bg-purple-light" style="margin-top: 13px;text-align: left" >
                                                                                <el-form :model="form">
                                                                               <el-form-item label="任务分配说明：" :label-width="formLabelWidth">
                                                                              <el-input v-model="form.name" auto-complete="off"></el-input>
                                                                              </el-form-item>
                                                                                </el-form></div>
                                                                            </el-col>
                                                                        </el-row>
                                                                        <el-row >
                                                                        <el-col :span="24"><div class="grid-content bg-purple-light" style="margin-top: 13px;text-align: left">任务提交栏：</div></el-col>
                                                                    </el-row>
                                                                    </span>
                                                                </div>
                                                                <div v-for="role in roles" :key="role.role" class="text item">
                                                                    <el-row >
                                                                        <el-col :span="6"><div class="grid-content bg-purple-light" style="margin-top: 13px;text-align: left">{{role.role}}：</div></el-col>
                                                                        <el-col :span="18"><div class="grid-content bg-purple-light" style="margin-top: 13px"><el-input placeholder="请输入内容" v-model="input4">
                                                                        </el-input></div></el-col>
                                                                    </el-row>
                                                                </div>
                                                            </el-card>
                                                            <div slot="footer" class="dialog-footer">
                                                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                                                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                                                            </div>
                                                        </el-dialog>
                                                    </div>
                                                    <div class="grid-content bg-purple-light" v-else>
                                                        <el-button style="float: right; padding: 3px 0;margin-top: 13px" type="text" @click="write" disabled>任务分配</el-button>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                            <el-card>
                                                <div slot="header" class="clearfix">
                                                      <span v-for="cl in cla" v-bind:key="cl.title1">
                                                          <el-row >
                                                             <el-col :span="12"><div class="grid-content bg-purple-light" >{{cl.title1}}</div></el-col>
                                                             <el-col :span="8"><div class="grid-content bg-purple-light">{{cl.title2}}</div></el-col>
                                                          </el-row>
                                                      </span>
                                                </div>
                                                <div >
                                                    <el-row>
                                                        <el-col :span="12">
                                                            <div class="grid-content bg-purple-light" style="margin-top: 13px">{{task.file}}</div>
                                                        </el-col>
                                                        <el-col :span="8">
                                                            <div class="grid-content bg-purple-light" style="margin-top: 13px">{{task.filesize}}</div>
                                                        </el-col>
                                                        <el-col :span="4">
                                                            <div class="grid-content bg-purple-light">
                                                                <el-button type="text" @click="dialogFormVisible = true" style="font-size: 16px">
                                                                    <i class="el-icon-download"></i>
                                                                </el-button>
                                                            </div>
                                                        </el-col>
                                                    </el-row>
                                                </div>
                                            </el-card>
                                    </el-tab-pane>
                                    <el-tab-pane label="我的作业" name="second">
                                        <el-card >
                                            <div slot="header" class="clearfix">
                                                    <span>
                                                       <el-row >
                                                           <el-col :span="24"><div class="grid-content bg-purple" style="text-align: left">作业详情：</div></el-col>
                                                           <el-col :span="24"><div class="grid-content bg-purple-light" style="margin-top: 13px;text-align: left" >{{task.detail}}</div></el-col>
                                                       </el-row>
                                                    </span>
                                            </div>
                                            <el-row>
                                                <el-col :span="12"><div class="grid-content bg-purple" style="margin-top: 13px;text-align: left">作业交付截止</div></el-col>
                                                <el-col :span="12"><div class="grid-content bg-purple-light" style="margin-top: 13px">{{task.deadline}}</div></el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="12"><div class="grid-content bg-purple" style="margin-top: 13px;text-align: left">任务负责人</div></el-col>
                                                <el-col :span="12"><div class="grid-content bg-purple-light" style="margin-top: 13px">{{task.leader}}</div></el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="12"><div class="grid-content bg-purple" style="margin-top: 13px;text-align: left">计分规则</div></el-col>
                                                <el-col :span="12"><div class="grid-content bg-purple-light" style="margin-top: 13px">最后一次得分</div></el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="24">
                                                    <div class="grid-content bg-purple-dark" style="margin-top: 13px;text-align: left">{{task.request}}</div>
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                        <el-card>
                                            <div slot="header" class="clearfix">
                                                      <span v-for="cl in clas" v-bind:key="cl.title1">
                                                          <el-row >
                                                             <el-col :span="12"><div class="grid-content bg-purple-light" >{{cl.title1}}</div></el-col>
                                                             <el-col :span="8"><div class="grid-content bg-purple-light">{{cl.title2}}</div></el-col>
                                                             <el-col :span="4" >
                                                                  <div class="grid-content bg-purple-light">
                                                                      <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible1 = true">写作业</el-button>
                                                                      <el-dialog title="提交作业" :visible.sync="dialogFormVisible1">
                                                                      <el-form :model="form">
                                                                           <el-form-item label="作业名称" :label-width="formLabelWidth">
                                                                                   <el-input v-model="form.name" auto-complete="off"></el-input>
                                                                           </el-form-item>
                                                                      <el-form-item label="作业提交区域" :label-width="formLabelWidth">
                                                                          <div class="upload">
                                                                              <el-upload
                                                                               class="upload-demo"
                                                                               ref="upload"
                                                                               action="https://jsonplaceholder.typicode.com/posts/"
                                                                               :on-preview="handlePreview"
                                                                                 :on-remove="handleRemove"
                                                                               :file-list="fileList"
                                                                               :auto-upload="false">
                                                                                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                                                       <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器
                                                                 </el-button>
                                                                     <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                                                 </el-upload>
                                                                </div>
                                                                </el-form-item>
                                                            </el-form>
                                                              <div slot="footer" class="dialog-footer">
                                                             <el-button @click="dialogFormVisible = false">取 消</el-button>
                                                               <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
                                                        <div class="grid-content bg-purple-light" style="margin-top: 5px">{{sub.subTime}}</div>
                                                    </el-col>
                                                    <el-col :span="8">
                                                        <div class="grid-content bg-purple-light" style="margin-top: 2px">{{sub.score}}</div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content bg-purple-light">
                                                            <el-button style="float: right; padding: 3px 0" type="text" @click="search">查看详情</el-button>
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
export default {
    name:"StudentTask",
    el:"#Task",
    data(){
        return{
            activeName2: 'first',
            myRole:"产品经理",
            indexs:0,
            items:[
                {title1:"作业名称",title2:"作业形式",title3:"状态",title4:"类型",title5:"交付"},
            ],
            tasks:[
                {index:1,title:"分布式实验",detail: "开发一个java web 网站，该网站提供一个页面，可以输入图书名称，输出该书的库存。程序应该首先访问缓存输出查询结果，如果缓存没有该数据",
                    deadline:"2023.05.17 18:00",request:"多人合作完成,并提交报告",file:"分布式实验.docx",filesize:"200KB",form:"个人作业",status:"未提交",type:"负责人发布",leader:"计划经理"},
                {index:2,title:"DES实现",detail:"设计一个图书馆数据库，包含一个图书表books,该表有id,bookname, inventory三个字段（假设书名不会重复），并自行提前录入若干图书数据。",
                    deadline:"2023.05.20 14:00",request:"多人合作完成",file:"DES实现.docx",filesize:"203KB",form:"小组作业",status:"已提交",type:"教师发布",leader:"产品经理"},
            ],
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
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            dialogFormVisible3: false,
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
            input4:'',
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
        getIndex(index){
            this.indexs=index;
        },
        clicks(index){
            this.indexs=index;
        },
        search(){

        },
        write(){

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
</style>