<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--      <FileUpload></FileUpload>-->
      <NavBar></NavBar>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import FileUpload from "@/components/FileUpload.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'App',
  components: {
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
