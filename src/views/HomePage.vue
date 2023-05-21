<template>
    <el-main>
        <el-row>
            <keep-alive>
                <MainPageTitle></MainPageTitle>
                <!--            <router-view></router-view>-->
            </keep-alive>
            <MainPageBody></MainPageBody>
        </el-row>
    </el-main>

</template>

<script>



import MainPageTitle from "@/components/MainPageTitle.vue";
import MainPageBody from "@/components/MainPageBody.vue";

export default {
    name: "HomePage",
    components: {
        MainPageBody,
        MainPageTitle,

    }, //DiscussDetail
    mounted() {
    }
};
</script>


