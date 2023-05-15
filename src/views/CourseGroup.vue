<template >
  <el-main>
       <el-card class="box-card" v-if="haveGroup==='true'"><!--根据haveGroup的值判断card-->
          <div slot="header" class="clearfix">
              <span >分组详情</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="goChat">交流入口</el-button>
          </div>
          <div v-for="cla in clas" :key="cla.title1" class="item font">
              <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple-light" >{{cla.title1}}</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">{{cla.title2}}</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">{{cla.title3}}</div></el-col>
              </el-row>
          </div>
          <div v-for="item in items" :key="item.member" class="text item">
              <el-row>
              <el-col :span="8"><div class="grid-content bg-purple-light" >{{item.groupId}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple-light">{{item.member}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple-light">{{item.position}}</div></el-col>
              </el-row>
          </div>
      </el-card>
      <el-card v-else v-for="inv in invitation" :key="inv.groupId">
          <div slot="header" class="clearfix">
              <span >分组邀请</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="refuse">拒绝邀请</el-button>
              <el-button style="float: right; padding: 3px 0;margin-right: 30px" type="text" @click="accept">接受邀请</el-button>
          </div>
          <div v-for="cla in clasp" :key="cla.title1" class="item font">
              <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple-light" >{{cla.title1}}</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">{{cla.title2}}</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">{{cla.title3}}</div></el-col>
              </el-row>
          </div>
          <div  class="text item">
              <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple-light" >{{inv.groupId}}</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">{{inv.leader}}</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">{{inv.time}}</div></el-col>
              </el-row>
          </div>
      </el-card>
  </el-main>
</template>

<script >
export default {
    name:"CourseGroup",
    el:"group",
    data(){
        return{
            haveGroup:"true",
            items:[
                {groupId:"第五组",member: "张三",position:"小组长"},
                {groupId:"第五组",member: "李四",position:"计划经理"},
                {groupId:"第五组",member: "王五",position:"产品经理"},
                {groupId:"第五组",member: "老六",position:"质量经理"},
            ],
            clas:[
                {title1:"组号",title2:"成员",title3:"对应角色"}
            ],
            clasp:[
                {title1:"组号",title2:"组长",title3:"邀请时间"}
            ],
            invitation:[
                {groupId:"第五组",leader: "张三",time:"2023.03.12 13:22"},
                {groupId:"第一组",leader: "林董",time:"2023.03.14 10:22"},
            ]
        }
    },
    methods:{
        goChat(){
            this.$router.push("/ChatRoom");
        },
        accept(){

        },
        refuse(){

        }
    }

}
</script>


<style scoped>
.text {
    font-size: 14px;
    text-align: left;
}

.item {
    margin-bottom: 18px;
}

.font{
    font-family: "微软雅黑 Light",serif;
    font-size: 16px;
    text-align: left;
}

.clearfix:before,
.clearfix:after {
    display: table;

    content: "";
}
.clearfix:after {
    clear: both;

}

.box-card {
    width: 100%;
}
</style>