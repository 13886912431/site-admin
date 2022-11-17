<template>
    <i :class="icon"></i>
    <span>{{ title }}</span>
</template>

<script setup>
defineProps({
    icon: String,
    title: String
});
</script>