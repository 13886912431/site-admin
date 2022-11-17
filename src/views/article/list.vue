<template>
    <ProTable
        :data="tableData"
        :loading="tableLoading"
        :options="options"
        :page="page"
        @add="$router.push('/article/add')"
        @delete-row="handleDeleteRow"
        @edit-row="$router.push(`/article/add?editId=${$event.id}`);"
        @change-page="getTableData"
        @change-limit="handleChangeLimit"
        @refresh="getTableData"
    >
        <template #image="{ row }">
            <div v-if="row.image">
                <img :src="row.image" style="max-width: 150px; width: 100%;" />
            </div>
            <el-tag size="small" type="info" v-else>没有图片</el-tag>
        </template>

        <template #classify="{ row }">
            <router-link
                to="/article/classify"
                class="el-link el-link--primary is-underline"
            >
                {{ row.classify?.name }}
            </router-link>
        </template>
    </ProTable>
</template>

<script setup>
import { ref, reactive } from 'vue';

import { getArticleList, deleteArticle } from '@/api/article';
import { formatDate } from '@/utils/util';

const tableLoading = ref(false);
const tableData = ref([]);
const page = reactive({
    page: 1,
    limit: 10,
    total: 0
});
const options = {
    columns: [
        {
            label: '发布时间',
            formatter: row => formatDate(row.createdAt)
        },
        {
            label: '标题',
            prop: 'title'
        },
        {
            label: '图片',
            slot: 'image'
        },
        {
            label: '描述',
            prop: 'description'
        },
        {
            label: '分类',
            slot: 'classify',
        },
        {
            label: '浏览次数',
            prop: 'scanCount'
        },
        {
            label: '评论次数',
            prop: 'commentCount'
        },
    ]
};

getTableData();

async function getTableData() {
    if (tableLoading.value) return;
    tableLoading.value = true;
    const resp = await getArticleList({
        page: page.page,
        limit: page.limit,
    });
    tableData.value = resp.rows;
    page.total = resp.total;
    tableLoading.value = false;
}

function handleChangeLimit() {
    page.page = 1;
    getTableData();
}

// 删除一个
async function handleDeleteRow(row) {
    const resp = await deleteArticle(row.id);
    if (resp) {
        ElMessage.success("删除成功");
    }
}
</script>