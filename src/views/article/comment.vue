<template>
    <ProTable
        :data="tableData"
        :options="options"
        :loading="tableLoading"
        :page="page"
        @delete-row="handleDeleteCommentRow"
        @refresh="getTableData"
        @change-page="getTableData"
        @change-limit="handleChangeLimit"
    >
        <!-- 回复表格 -->
        <template #expand="{ row }">
            <div class="px-5 py-2">
                <ProTable
                    v-if="row.replyCount > 0"
                    :data="replyTableData[row.id]" 
                    :options="replyOptions"
                    
                    @delete-row="handleDeleteReplyRow($event, row.id)"
                    @refresh="getReplyData(row.id)"
                >
                    <template #empty>
                        <el-button @click="getReplyData(row.id)" type="primary" size="small">获取回复</el-button>
                    </template>
                </ProTable>
                
                <el-tag v-else type="info">没有回复</el-tag>
            </div>
        </template>

        <template #article="{ row }">
            <router-link
                :to="`/article/add?editId=${row.article?.id}`"
                class="el-link el-link--primary is-underline"
            >
                {{ row.article?.title }}
            </router-link>
        </template>
    </ProTable>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';

import { getComment, deleteComment, deleteReply, getReply } from '@/api/comment';
import { formatDate } from '@/utils/util';

const tableLoading = ref(false);
const tableData = ref([]);
const page = reactive({
    page: 1,
    limit: 10,
    total: 0
});
const articleId = ref(-1);
const options = {
    showAdd: false,
    showRowEdit: false,
    columns: [
        {
            label: '评论时间',
            formatter: row => formatDate(row.createdAt)
        },
        {
            label: '昵称',
            formatter: row => row.user?.name
        },
        {
            label: '评论内容',
            prop: 'content'
        },
        {
            label: '评论文章',
            slot: 'article'
        }
    ]
};

// 回复
const replyTableData = reactive({});
const replyOptions = {
    showAdd: false,
    showRowEdit: false,
    height: '300px',
    columns: [
        {
            label: '回复时间',
            formatter: row => formatDate(row.createdAt, "YYYY-MM-DD hh:mm")
        },
        {
            label: '昵称',
            formatter: row => row.user?.name
        },
        {
            label: '@',
            formatter: row => row.toUser?.name
        },
        {
            label: '评论内容',
            prop: 'content'
        }
    ]
};

getTableData();

async function getTableData() {
    if (tableLoading.value) return;
    tableLoading.value = true;
    const resp = await getComment({
        page: page.page,
        limit: page.limit,
        articleId: articleId.value
    });
    tableData.value = resp.rows;
    page.total = resp.total;
    tableLoading.value = false;
}

// 删除一条评论
async function handleDeleteCommentRow(row) {
    const resp = await deleteComment(row.id);
    if (resp) {
        const index = tableData.value.indexOf(row);
        if (index !== -1) {
            tableData.value.splice(index, 1);
            page.total -= 1;
        }
        ElMessage.success('删除成功');
    }
}

// 删除一条回复
async function handleDeleteReplyRow(row, commentId) {
    const resp = await deleteReply(row.id);
    if (resp) {
        const index = replyTableData[commentId].indexOf(row);
        if (index !== -1) {
            replyTableData[commentId].splice(index, 1);
        }
        ElMessage.success('删除成功');
    }
}

function handleChangeLimit() {
    page.page = 1;
    getTableData();
}

// -------------------------------------------------------

// 获取回复数据
async function getReplyData(id) {
    const resp = await getReply({
        commentId: id,
        limit: 100000000,       // 直接全部获取，懒得写分页了
    });
    if (resp) {
        replyTableData[id] = resp.rows;
    }
}
</script>
