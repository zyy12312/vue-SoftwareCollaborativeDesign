<template>
    <div>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="id" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="姓名" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="年龄" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.age }}</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            :page-size="pageSize"
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="handlePageChange"
            @prev-click="handlePageChange"
            @next-click="handlePageChange"
        />
    </div>
</template>
<script>
export default {
    name:"CourseInfo",
    data() {
        return {
            //表格请求的数据
            tableData: [
                {
                    id: 1,
                    name: "滕滕",
                    age: 24,
                },
                {
                    id: 2,
                    name: "滕滕",
                    age: 24,
                },
                {
                    id: 3,
                    name: "滕滕",
                    age: 24,
                },
                {
                    id: 4,
                    name: "滕滕",
                    age: 24,
                },
            ],
            pageSize: 3, //一次渲染数据量
            total: 7, //数据总条数
        };
    },
    methods: {
        //请求数据
        getDataList() {

        },
        //处理：点击页码、上一页、下一页按钮事件
        handlePageChange(pageNumber) {
            this.currentPage = pageNumber;
            this.$nextTick(() => {
                //调用请求数据
                this.getDataList();
            });
        },
    },
};
</script>