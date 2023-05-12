<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--      <FileUpload></FileUpload>-->
<!--      <submit-window></submit-window>-->
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
// import NavBarr from "@/components/PageTitle.vue";
// import SubmitWindow from "@/components/SubmitWindow.vue";
//import StudyDiscuss from "@/components/StudyDiscuss.vue";

export default {
  name: 'App',
  components: {
      // SubmitWindow,
      //StudyDiscuss,
      PageTitle,
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
