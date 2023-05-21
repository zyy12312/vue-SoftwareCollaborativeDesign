<template>
    <el-main>
        <el-row>
            <MainPageTitle></MainPageTitle>
            <MainPageBody></MainPageBody>
        </el-row>
    </el-main>

</template>

<script>



import MainPageTitle from "@/components/MainPageTitle.vue";
import MainPageBody from "@/components/MainPageBody.vue";

export default {
    name: "PageTitle",
    components: {
        MainPageBody,
        MainPageTitle,

    }, //DiscussDetail
    mounted() {
    }
};
</script>


