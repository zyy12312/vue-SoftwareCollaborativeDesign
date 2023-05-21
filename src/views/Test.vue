<template>
    <div id="app">
        <NavBar></NavBar>

        <router-view/>

        <NavFoot></NavFoot>
    </div>

</template>
<script>
import {defineComponent} from 'vue'
import NavBar from "@/views/NavBar.vue";
import NavFoot from "@/views/NavFoot.vue";

export default defineComponent({
    name: "TestPage",
    components: {NavFoot, NavBar}
})
</script>

