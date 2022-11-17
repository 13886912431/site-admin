<template>
    <el-card>
        <div class="menu flex-space-between">
            <div class="menu-left">
                <el-button
                    type="primary"
                    icon="Plus"
                    v-if="mixinOptions.showAdd"
                    @click="$emit('add')"
                >
                    新 增
                </el-button>

                <el-popconfirm title="确定将选择的数据删除吗？" v-if="mixinOptions.showDelete" @confirm="emit('delete', selection);">
                    <template #reference>
                        <el-button
                            type="danger"
                            icon="Delete"
                            plain
                            :disabled="selection.length === 0"
                        >
                            删 除
                        </el-button>
                    </template>
                </el-popconfirm>
            </div>
            <div class="menu-right">
                <el-button
                    icon="Refresh"
                    circle
                    v-if="mixinOptions.showRefresh"
                    @click="$emit('refresh')"
                />
            </div>
        </div>

        <el-table
            :data="data" 
            v-loading="loading"
            :border="mixinOptions.border"
            :stripe="mixinOptions.stripe"
            :size="mixinOptions.size"
            :height="mixinOptions.height"
            @selection-change="selection = $event"
        >
            <!-- empty -->
            <template #empty>
                <slot name="empty"></slot>
            </template>

            <!-- expand -->
            <el-table-column type="expand" width="50" align="center" v-if="$slots.expand">
                <template #default="{ row }">
                    <slot name="expand" :row="row"></slot>
                </template>
            </el-table-column>
    
            <!-- checkbox -->
            <el-table-column v-if="mixinOptions.selection" type="selection" width="50" align="center" />
            
            <!-- id -->
            <el-table-column prop="id" label="#" width="50" align="center" />
            
            <!-- 自定义列 -->
            <el-table-column
                v-for="item in mixinOptions.columns"
                :key="item.label"
                :prop="item.prop"
                :label="item.label"
            >
                <template #default="{ row }" v-if="item.formatter">
                    <span>{{ item.formatter(row) }}</span>
                </template>
                <template #default="{ row }" v-else-if="item.slot" >
                    <slot :name="item.slot" :row="row"></slot>
                </template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column label="操作" align="center" width="120" v-if="mixinOptions.showRowEdit || mixinOptions.showRowDelete">
                <template #default="{ row }">
                    <el-button
                        type="primary" 
                        icon="Edit" 
                        circle
                        v-if="mixinOptions.showRowEdit"
                        @click="$emit('edit-row', row)"
                    />

                    <el-popconfirm title="确认删除吗？" v-if="mixinOptions.showRowDelete" @confirm="emit('delete-row', row)">
                        <template #reference>
                            <el-button
                                type="danger"
                                icon="Delete"
                                circle
                            />
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <Pagination
            v-if="page"
            :total="page.total"
            v-model:current-page="page.page"
            v-model:page-size="page.limit"
            @current-change="$emit('change-page', $event)"
            @size-change="$emit('change-limit', $event)"
        />
    </el-card>
</template>

<script setup>
import { computed, ref } from 'vue';

const emit = defineEmits(['delete-row', 'delete']);

const defaultOptions = {
    size: 'default',
    stripe: false,
    selection: false,
    height: '600px',
    border: true,
    showAdd: true,
    showDelete: false,
    showRefresh: true,
    showRowEdit: true,
    showRowDelete: true,
    columns: []
};

const props = defineProps({
    // 表格数据
    data: {
        type: Array,
        default: () => []
    },
    // 表格加载中
    loading: {
        type: Boolean,
        default: false
    },
    // 选项
    options: {
        type: Object,
        default: () => ({})
    },
    // 分页
    page: Object
});

const selection = ref([]);

// 混合默认选项
const mixinOptions = computed(() => ({ ...defaultOptions, ...props.options }));
</script>

<style lang="scss" scoped>
:deep(.el-table) {
    thead {
        font-weight: 500;
    }
}
.menu {
    margin-bottom: 10px;
}
</style>