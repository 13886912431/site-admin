<template>
    <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="justify-end"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
    />
</template>

<script setup>
defineProps({
    total: Number,
    pageSize: Number,
    currentPage: Number
});
</script>

<style lang="scss" scoped>
.el-pagination {
    padding: 25px 0 20px 20px;
}
</style>