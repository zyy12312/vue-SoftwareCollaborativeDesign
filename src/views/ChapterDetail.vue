<template>
  <el-main>
      <el-collapse v-model="activeName" accordion>
          <ul id="charpter">
              <li v-for="item in items" v-bind:key="item.title">
                  <el-collapse-item :title="item.title" :name="item.number" >
                      <div>{{item.detail}}</div>
                  </el-collapse-item>
              </li>
          </ul>
      </el-collapse>
  </el-main>

</template>

<script>


export default {
    name:'ChapterDetail',

    el:"#charpter",
    data() {
        return {
            activeName: '1',
            items:[
                {title:"第一章节",detail:"与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；",number:"1"},
                {title: "第二章节",detail: "在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。",number: "2"},
                {title: "第三章节",detail: "原因一般是本地安装的webpack，npm，vue等可能不是最新版本，默认install只会安装最新版本，这时容易出错，如我这个就是因为webpack本地是4，而他要求是5以上的。",number: "3"}
            ]
        };
    },
    methods:{


}

}

</script>

<style scoped>

</style>