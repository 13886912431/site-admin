<template>
    <header class="header">
        <div class="top flex-space-between">
            <div class="top-left">

            </div>
            
            <div class="top-right">
                <el-color-picker v-model="color" @change="onChangeColor" />

                <el-popover
                    placement="bottom"
                    trigger="hover"
                    popper-class="choose-theme"
                >
                    <template #reference>
                        <i class="icon-zhuti top-right-item"></i>
                    </template>
                    <ul>
                        <li
                            v-for="theme in store.getters.themes"
                            :key="theme.name"
                            class="flex-center"
                            :class="{ active: currentTheme === theme.value }"
                            @click="onChangeTheme(theme.value)"
                        >
                            {{ theme.name }}
                            <el-icon><Check /></el-icon>
                        </li>
                    </ul>
                </el-popover>

                <!-- 头像 -->
                <el-avatar
                    :size="30"
                    class="top-right-item"
                    :src="user.avatar"
                />

                <el-dropdown>
                    <span class="el-dropdown-link">
                        <span>{{ user.name }}</span>
                        <el-icon class="el-icon--right"><ArrowDown /></el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click.native="$router.push('/info')">
                                个人信息
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="logout" divided>
                                退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>

        <TagsView />
    </header>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessageBox } from 'element-plus';

import TagsView from './TagsView.vue';

const store = useStore();
const router = useRouter();
const route = useRoute();

const user = computed(() => store.getters.user || {});
const currentTheme = computed(() => store.getters.currentTheme);
const color = ref('#409eff');

function onChangeColor(value) {
    document.documentElement.style = `--el-color-primary: ${value}; --primary-color: ${value}`;
}

function onChangeTheme(value) {
    store.commit('app/SET_THEME', value);
}

async function logout() {
    try {
        await ElMessageBox.confirm('确定要退出登录吗?', {
            type: 'warning',
        });
        await store.dispatch('user/logout');
        router.push({
            path: '/login',
            query: {
                redirect: route.fullPath
            }
        });
    } catch (error) {
        
    }
}
</script>
