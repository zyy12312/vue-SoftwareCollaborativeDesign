<template>
    <el-container>
        <el-aside width="330px">
            <el-card class="box-card1">
                <div slot="header" class="clearfix" v-for="user in users" :key="user">
                    <span ><el-avatar round width="200px" height="200px" :src="user.avatarURL" class="avater1"></el-avatar></span>
                    <p style="font-size: 20px">{{ user.name }}</p>
                </div>
                <el-row>
                    <el-col :span="12"><div v-for="title in titles" :key="title" class="text item" style="text-align: left;font-size: 17px">
                        {{title.title}}
                    </div></el-col>
                    <el-col :span="12"><div v-for="user in users" :key="user.account" class="text item" style="text-align: left;font-size: 17px;margin-top: 3px">
                        {{user.account}}
                    </div>
                        <div v-for="user in users" :key="user.account" class="text item" style="text-align: left;font-size: 17px">
                            {{user.role}}
                        </div>
                        <div v-for="user in users" :key="user.account" class="text item" style="text-align: left;font-size: 17px">
                            {{user.sex}}
                        </div>
                        <div v-for="user in users" :key="user.account" class="text item" style="text-align: left;font-size: 17px">
                            {{user.teamId}}
                        </div></el-col>
                </el-row>
            </el-card>
        </el-aside>
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark" style="text-align: left;font-size: 22px;font-family: '微软雅黑 Light',serif">用户个人信息</div></el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-card class="box-card">
                    <div slot="header" class="clearfix" style="text-align: left">
                        <span >修改用户个人信息</span>
                    </div>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="用户姓名">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="用户密码">
                            <el-input v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item label="用户头像">
                            <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="用户性别">
                            <el-radio-group v-model="form.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">确认修改</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-main>
        </el-container>
    </el-container>
</template>

<script >
export default {
    name:"ModifyInfo",
    data(){
        return{
            imageUrl: '',
            users:[
                {account:"1001",name:"林董",avatarURL:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",role:"教师",sex:"男",teamId:"无"}
            ],
            titles:[
                {title:"用户账号："},{title:"用户角色："},{title:"用户性别："},{title:"用户组号：",}
            ],
            form: {
                name: '',
                avaterURL:'',
                password:'',
                delivery: false,
                type: [],
                sex: '',
                desc: ''
            }
        }
    },
    methods:{
        onSubmit() {
            console.log('submit!');
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>


<style scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.avater1{
    width: 120px;
    height: 120px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    width: 100%;

}

.box-card1 {
    width: 100%;
    height: 626px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>