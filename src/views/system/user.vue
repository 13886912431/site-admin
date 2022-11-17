<template>
    <ProTable
        :data="tableData" 
        :loading="tableLoading"
        :options="options"
        @delete-row="handleDeleteRow"
        @refresh="getTableData"
    >
    
    </ProTable>
</template>

<script>
import { ref, defineComponent } from 'vue';

import { getUser, deleteUser } from '@/api/user';

export default defineComponent({
    setup() {
        const tableDataRef = ref([]);
        const tableLoadingRef = ref(true);
        getUser().then(resp => {
            tableDataRef.value = resp;
            tableLoadingRef.value = false;
        })
        return {
            tableLoading: tableLoadingRef,
            tableData: tableDataRef,
            options: {
                showAdd: false,
                showRowEdit: false,
                columns: [
                    {
                        label: '姓名',
                        prop: 'name'
                    },
                    {
                        label: '账号',
                        prop: 'account'
                    },
                    {
                        label: '角色',
                        prop: 'roles',
                        formatter: row => row.roles.join(',')
                    },
                ]
            }
        };
    },
    methods: {
        async handleDeleteRow(row) {
            const resp = await deleteUser(row.id);
            if (resp) {
                const index = this.tableData.indexOf(row);
                if (index !== -1) {
                    this.tableData.splice(index, 1);
                }
                this.$message.success("删除成功");
            }
        },
        async getTableData() {
            if (this.tableLoading) return;
            this.tableLoading = true;
            const resp = await getUser();
            this.tableData = resp;
            this.tableLoading = false;
        }
    },
});
</script>