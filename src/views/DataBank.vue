<template>
    <el-main>
        <el-card>
            <div slot="header" class="clearfix">
                <span v-for="item in items" v-bind:key="item.title1">
                <el-row>
                    <el-col :span="8"><div class="grid-content bg-purple-light">{{ item.title1 }}</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">{{ item.title2 }}</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">{{ item.title3 }}</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">{{ item.title4 }}</div></el-col>
                </el-row>
                </span>
            </div>
            <div v-for="(task,index) in tasks" v-bind:key="index">
                <el-row>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light" style="margin-top: 13px">{{ task.title }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light" style="margin-top: 13px">{{ task.filename }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light" style="margin-top: 13px">{{ task.size }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light"></div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                            <el-button type="text"
                                       @click="dialogFormVisible = true;getIndex(task.index);download(task.index)"
                                       style="font-size: 16px">
                                <i class="el-icon-download"></i>
                            </el-button>
                            <el-dialog title="文件下载" :visible.sync="dialogFormVisible" v-if="indexs===task.index">
                                <el-row>
                                    <el-col :span="20">
                                        <div class="grid-content bg-purple-dark"
                                             style="margin-top: 13px;text-align: left">{{ task.title }}
                                        </div>
                                    </el-col>
                                </el-row>
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
    name: "DataBank",
    el: "data",
    data() {
        return {
            items: [
                {title1: "资料名称", title2: "附件名称", title3: "附件大小", title4: "下载"},
            ],
            tasks: [
                {index: 1, title: "第五章PPT", filename: "chapter 5.ppt", size: "3MB"},
                {index: 2, title: "实验要求", filename: "实验要求.docx", size: "200KB"}
            ],
            dialogFormVisible: false,
            indexs: "",
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
        }
    },
    methods: {
        getIndex(index) {
            this.indexs = index;
        },
        download(index) {
            this.indexs = index;                   //下载对应资料的方法
        }
    }
}
</script>


<style scoped>
.clearfix:before,
.clearfix:after {
    display: table;

    content: "";
}

.clearfix:after {
    clear: both;

}
</style>
