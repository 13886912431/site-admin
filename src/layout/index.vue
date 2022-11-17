<template>
    <el-container>
        <Aside />

        <el-container class="flex-column">
            <Header />

            <el-main>
                <router-view v-slot="{ Component }">
                    <transition name="slide-right" mode="out-in">
                        <component :is="Component" v-if="isRouterAlive" />
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { nextTick, ref, provide } from 'vue';

import Aside from './Aside/index.vue';
import Header from './Header/index.vue';

const isRouterAlive = ref(true);
provide('reload', reload);

function reload() {
    isRouterAlive.value = false;
    nextTick(() => {
        isRouterAlive.value = true;
    });
}
</script>

<style lang="scss" scoped>
.el-container {
    height: 100vh;
}
</style>