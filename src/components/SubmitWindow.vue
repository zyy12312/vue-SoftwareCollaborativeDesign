<template>
  <div class="submit">
      <el-form :label-position:="top"  label-width="80px" >
          <el-form-item label=""></el-form-item>
          <FileUpload></FileUpload>
      </el-form>
  </div>
</template>

<script>
// import FileUpload from "@/components/FileUpload.vue";

export default {
    name: "SubmitWindow"
}
</script>

<style scoped>

</style>
