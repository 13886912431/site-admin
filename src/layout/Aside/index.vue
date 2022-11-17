<template>
    <el-aside class="aside" :class="{ collapse }">
        <div class="logo ellipsis-1">管理后台</div>

        <el-scrollbar>
            <el-menu
                :default-active="$route.path"
                router
                :collapse="collapse"
            >
                <SideItem
                    v-for="route in routes"
                    :key="route.path"
                    root
                    :route="route"
                />
            </el-menu>
        </el-scrollbar>

        <div class="bottom-btn flex-center c-p" @click="toggleCollapse">
            <el-icon>
                <component :is="collapse ? 'ArrowRight' : 'ArrowLeft'" />
            </el-icon>
        </div>
    </el-aside>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import SideItem from './SideItem.vue';

const store = useStore();

const routes = computed(() => store.getters.routes);
const collapse = computed(() => store.getters.collapse);

function toggleCollapse() {
    store.commit('app/TOGGLE_COLLAPSE');
}
</script>
