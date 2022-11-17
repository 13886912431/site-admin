<template>
    <div class="tags-view flex-space-between">
        <el-tabs
            v-model="value"
            closable
            type="card"
            @tab-remove="removeTab"
        >
            <el-tab-pane
                v-for="item in tagsView"
                :key="item.path"
                :name="item.fullPath"
                :label="item.meta.title"
            />
        </el-tabs>

        <el-dropdown>
            <el-button type="primary">
                更多
                <el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click.native="closeOther">
                        关闭其他
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="closeAll">
                        关闭所有
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="reload">
                        刷新
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();
const reload = inject('reload');

const value = computed({
    get: () => route.fullPath,
    set: val => {
        router.push(val);
    }
});

const tagsView = computed(() => store.getters.tagsView);

function removeTab(fullPath) {
    if (route.fullPath === fullPath) {
        const index = tagsView.value.findIndex(i => i.fullPath === fullPath);
        if (index === 0 && tagsView.value.length > 1) {
            // 往后
            router.push(tagsView.value[index + 1].fullPath);
        } else if (index - 1 >= 0) {
            // 往前
            router.push(tagsView.value[index - 1].fullPath);
        } else {
            router.push('/');
        }
    }
    store.commit('tagsView/DEL_TAGS_VIEW', fullPath);
}

function closeOther() {
    store.commit('tagsView/DEL_OTHER_TAGS_VIEW', route.fullPath);
}

function closeAll() {
    store.commit('tagsView/DEL_ALL_TAGS_VIEW');
    router.push('/');
}
</script>

<style lang="scss" scoped>
[data-theme=dark] .tags-view {
    border-color: #343434;
}

.tags-view {
    height: 40px;
    padding: 0 10px;
    border-top: 1px solid #f6f6f6;

    :deep(.el-tabs) {
        margin-right: 30px;
        flex-grow: 1;
        height: 100%;
        width: 0;

        .el-tabs__header {
            margin: 0;
            border: none;
        }

        .el-tabs__nav {
            border: none;
        }

        .el-tabs__nav-prev,
        .el-tabs__nav-next {
            line-height: 40px;
        }

        .el-tabs__item {
            margin: 0 3px;
            font-weight: 400;
            border-left: none;
            
            &.is-active {
                border-bottom: 2px solid var(--primary-color);
            }
        }
    }
}
</style>