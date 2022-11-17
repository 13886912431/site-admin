<template>
    <ProTable
        :options="options"
        :data="tableData"
        :loading="tableLoading"
        @refresh="getTableData"
    >

    </ProTable>
</template>

<script setup>
import { ref } from 'vue';

import { getClassify } from '@/api/classify';
import { formatDate } from '@/utils/util';

const tableLoading = ref(false);
const tableData = ref([]);

const options = {
    showAdd: false,
    showRowEdit: false,
    showRowDelete: false,
    columns: [
        {
            label: '创建时间',
            formatter: row => formatDate(row.createdAt)
        },
        {
            label: '分类名',
            prop: 'name'
        },
        {
            label: '文章数量',
            prop: 'articleCount'
        }
    ]
};

getTableData();

async function getTableData() {
    if (tableLoading.value) return;
    tableLoading.value = true;
    const resp = await getClassify();
    tableData.value = resp;
    tableLoading.value = false;
}
</script>