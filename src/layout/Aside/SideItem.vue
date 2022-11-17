<template>
    <div v-if="!route.meta?.hidden">
        <el-menu-item v-if="route.children?.length === 1 && route.children[0].meta.only" :index="route.children[0].path">
            <Item :icon="route.children[0].meta.icon" :title="route.children[0].meta.title" />
        </el-menu-item>

        <el-menu-item v-else-if="!route.children || !root" :index="route.path">
            <Item :icon="route.meta.icon" :title="route.meta.title" />
        </el-menu-item>

        <el-sub-menu v-else :index="route.path" popper-class="sub-menu-popup">
            <template #title>
                <Item :icon="route.meta.icon" :title="route.meta.title" />
            </template>
            <SideItem
                v-for="child in route.children"
                :key="child.path"
                :route="child"
            />
        </el-sub-menu>
    </div>
</template>

<script setup>
import Item from './Item.vue';

defineProps({
    route: Object,
    root: Boolean
});
</script>
