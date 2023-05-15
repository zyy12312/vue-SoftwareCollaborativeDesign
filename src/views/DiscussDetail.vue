<template>
  <el-main>
      <el-collapse v-model="activeNames" @change="handleChange">
      <ul id="discuss">
          <li v-for="item in items" v-bind:key="item.question">
          <el-collapse-item :title="item.question" name="1" v-show="items">
              <div>{{item.detail}}</div>
              <div style="text-align: right">
                  <a style="font-size: 15px ">{{item.time}}</a>
                  <p>
                      <el-button type="text" @click="dialogFormVisible = true">回复帖子</el-button>
                  </p>
              </div>
              <div>
                      <el-dialog title="回复帖子" :visible.sync="dialogFormVisible">
                          <el-form :model="form">
                              <el-form-item label="回复输入" :label-width="formLabelWidth">
                                  <el-input v-model="form.name" auto-complete="off"></el-input>
                              </el-form-item>
                          </el-form>
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
                          <div slot="footer" class="dialog-footer">
                              <el-button @click="dialogFormVisible = false">取 消</el-button>
                              <el-button type="primary" @click="dialogFormVisible = false;submit1(index)" >确 定</el-button>
                          </div>
                      </el-dialog>
              </div>
          </el-collapse-item>
          </li>
          <li v-for="reply in replies" v-bind:key="reply.reply">
          <el-collapse-item title="回帖" :name="reply.number">
              <div>{{reply.reply}}</div>
              <div style="text-align: right">
                  <a style="font-size: 15px ">{{reply.time}}</a>
                  <p>
                      <el-button type="text" @click="dialogFormVisible = true">回复回帖</el-button>
                  </p>
              </div>
              <div>
                  <el-dialog title="回复回帖" :visible.sync="dialogFormVisible">
                      <el-form :model="form">
                          <el-form-item label="回复输入" :label-width="formLabelWidth">
                              <el-input v-model="form.name" auto-complete="off"></el-input>
                          </el-form-item>
                      </el-form>
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
                      <div slot="footer" class="dialog-footer">
                          <el-button @click="dialogFormVisible = false">取 消</el-button>
                          <el-button type="primary" @click="dialogFormVisible = false;submit2(index)">确 定</el-button>
                      </div>
                  </el-dialog>
              </div>

          </el-collapse-item>
          </li>
      </ul>
      </el-collapse>

  </el-main>

</template>

<script >
export default {
    name:"DiscussDetail",
    el:'#discuss',
    data() {
        return {
            activeNames: ['1'],
            initem: this.$router.query.param,
            items:[
                {question:'什么时候开始？',detail:'明天就开始',time:'2023/5/11 19:40'},
            ],
            replies:[
                {reply:'确定是明天吗？',time:'2023/5/12 12:30',number:"1"},
                {reply:'真的是明天吗？',time:'2023/5/12 14:30',number:"2"}
            ],
            dialogFormVisible: false,
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
        submit1(index){
            this.API.tIndEncPerformanceSave(index)
                .then((res) => {
                    console.log(res)
                    if (res.code == 200) {
                        this.$message.success('保存成功')
                    }
                })
                .catch((err) => {
                    this.$message.error(err)
                })

        },
        submit2(index){
            this.API.tIndEncPerformanceUpdate(index).then((res) => {
                console.log(res)
                if (res.code == 200) {
                    this.$message.success('保存成功')
                }
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