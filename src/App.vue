<template>
  <div id="app">
      <NavBar></NavBar>
      <PageTitle></PageTitle>
      <NavFoot></NavFoot>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import FileUpload from "@/components/FileUpload.vue";
import NavBar from "@/components/NavBar.vue";
import NavFoot from "@/components/NavFoot.vue";
import PageTitle from "@/components/PageTitle.vue";
//import StudyDiscuss from "@/components/StudyDiscuss.vue";

export default {
  name: 'App',
  components: {
      PageTitle,
      //StudyDiscuss,
      NavFoot,
      NavBar,
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
