<template>
  <div id="app">
      <NavBar></NavBar>
<!--      <AllNavigation></AllNavigation>-->
      <PageTitle></PageTitle>
      <NavFoot></NavFoot>
<!--      <router-view></router-view>-->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import FileUpload from "@/components/FileUpload.vue";
import NavBar from "@/views/NavBar.vue";
import NavFoot from "@/views/NavFoot.vue";
// import AllNavigation from "@/views/AllNavigation.vue";
import PageTitle from "@/views/PageTitle.vue";
//import StudyDiscuss from "@/components/StudyDiscuss.vue";


export default {
  name: 'App',
  components: {
      PageTitle,
      NavFoot,
      NavBar
      // PageTitle,
      // AllNavigation,
      //StudyDiscuss,
      // NavFoot,
      // NavBar,
      // FileUpload,
    // HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
