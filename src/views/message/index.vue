<template>
    <ProTable
        :data="tableData" 
        :loading="tableLoading"
        :options="options"
        :page="page"
        @delete-row="handleDeleteRow"
        @change-page="getTableData"
        @change-limit="getTableData"
        @refresh="getTableData"
    >
        
    </ProTable>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';

import { formatDate } from '@/utils/util';
import { getMessage, deleteMessage } from '@/api/message';

const tableLoading = ref(false);
const tableData = ref([]);
const page = reactive({
    page: 1,
    limit: 10,
    total: 0
});

const options = {
    showAdd: false,
    columns: [
        {
            label: '留言时间',
            formatter: row => formatDate(row.createdAt, "YYYY-MM-DD hh:mm")
        },
        {
            label: '昵称',
            prop: 'name'
        },
        {
            label: '留言内容',
            prop: 'content'
        }
    ]
};

getTableData();

async function getTableData() {
    if (tableLoading.value) return;
    tableLoading.value = true;
    const resp = await getMessage({
        page: page.page,
        limit: page.limit,
    });
    tableData.value = resp.rows;
    page.total = resp.total;
    tableLoading.value = false;
}

async function handleDeleteRow(row) {
    const resp = await deleteMessage(row.id);
    if (resp) {
        const index = tableData.value.indexOf(row);
        if (index !== -1) {
            tableData.value.splice(index, 1);
            page.total -= 1;
        }
        ElMessage.success('删除成功');
    }
}
</script>
