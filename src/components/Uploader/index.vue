<template>
	<div class="uploader pr">
		<input
			type="file"
            :multiple="multiple"
			class="upload-file"
            :accept="accept"
			@change="onChange"
		/>

        <slot />
	</div>
</template>

<script setup>
defineProps({
    multiple: {
        type: Boolean,
        default: false
    },
    accept: {
        type: String,
        default: 'image/*'
    }
});
const emit = defineEmits(['change']);

const onChange = (e) => {
    emit('change', e.target.files);
    e.target.value = '';
}
</script>

<style lang="scss" scoped>
.upload-file {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}
</style>