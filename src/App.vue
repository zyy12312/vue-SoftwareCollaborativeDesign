<template>
    <div id="app">
<!--        <NavBar></NavBar>-->

        <router-view/>

<!--        <NavFoot></NavFoot>-->
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import FileUpload from "@/components/FileUpload.vue";
// import NavBar from "@/views/NavBar.vue";
// import NavFoot from "@/views/NavFoot.vue";
// import AllNavigation from "@/views/AllNavigation.vue";
// import PageTitle from "@/views/HomePage.vue";
//import StudyDiscuss from "@/components/StudyDiscuss.vue";



export default {
  name: 'App',
  components: {
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
