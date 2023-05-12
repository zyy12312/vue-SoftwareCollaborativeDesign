<template >
    <el-main>
   <ul id="example">
       <li v-for="item in items" v-bind:key="item.message">
           <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
           <el-menu-item index="1" >
               <i class="el-icon-chat-round"></i>
               <a href="https://www.ele.me" target="_blank" style="font-size: 18px">{{item.message}}</a>

           </el-menu-item>
               <div style="text-align: right">
               <a style="font-size: 15px;text-align: right ">{{item.time}}</a>
               <p>
                   <a href="DiscussDetail.vue"><el-button type="primary" >查看详情</el-button></a>
                   <a><el-button type="warning"  @click=" removeItem(index) ">删除帖子</el-button></a>
               </p>
               </div>
           </el-menu>
       </li>
   </ul>
    </el-main>
</template>

<script >

export default {
    name:"StudyDiscuss",
    el:'#example',
    data() {
        return {
            items: [
                {message: '什么时候开始？',time:'2023/5/11 19:40'},
                {message: '什么是事实？',time:'2023/5/11 19:40'}
            ]
        }
    },

    methods: {
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
        }
    },
    mounted() {
        console.log("StudydiscussPageMounted！")
    }

}
</script>

<style scoped>

</style>
