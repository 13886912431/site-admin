<template>
    <el-card v-loading="uploadLoading" element-loading-text="上传中...">
        <div class="top flex-space-between">
            <div class="top-left">
                <Uploader multiple class="d-inline-block mr-2" @change="onUpload">
                    <el-button type="primary" icon="Upload">上传</el-button>
                </Uploader>

                <el-button
                    type="danger"
                    icon="Delete"
                    plain
                    :disabled="checkboxGroup.length === 0"
                    @click="handleDelete"
                >
                    删 除
                </el-button>
            </div>

            <div class="top-right">
                <el-button
                    icon="Refresh"
                    circle
                    @click="getImageList"
                />
            </div>
        </div>

        <div class="input-button flex-space-between">
            <el-input
                placeholder="输入图片链接直接添加"
                v-model.trim="imageUrl"
                clearable
                size="large"
                @keydown.native.enter="onAdd"
            />
            <el-button @click="onAdd" type="primary" :disabled="imageUrl.length === 0" size="large">添加</el-button>
        </div>

        <div class="mt-5" v-loading="imageLoading">
            <el-checkbox-group v-model="checkboxGroup" v-if="fileList.length > 0">
                <el-space wrap>
                    <div class="file oh pr" v-for="(item, index) in fileList" :key="item.id">
                        <el-checkbox :label="item.id">
                            <el-image :src="item.url" fit="cover" />
                            <span class="actions flex-center">
                                <el-tooltip effect="dark" content="放大" placement="top">
                                    <span @click.prevent="onPicturePreview(index)">
                                        <el-icon><ZoomIn /></el-icon>
                                    </span>
                                </el-tooltip>
                                <el-tooltip effect="dark" :content="item.url" placement="top">
                                    <span @click.prevent="onCopy(item.url)">
                                        <el-icon><CopyDocument /></el-icon>
                                    </span>
                                </el-tooltip>
                                <el-tooltip effect="dark" content="删除" placement="top">
                                    <span @click.prevent="handleDeleteOne(item.id)">
                                        <el-icon><Delete /></el-icon>
                                    </span>
                                </el-tooltip>
                            </span>
                        </el-checkbox>
                    </div>
                </el-space>
            </el-checkbox-group>

            <el-empty description="暂无图片" v-else />
        </div>

        <el-image-viewer :url-list="urlList" v-if="viewerVisible" :initial-index="viewerIndex" @close="viewerVisible = false" />
    </el-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

import { getImage, deleteImage, addImage } from '@/api/image';
import { upload } from '@/api/resources';
import { copy } from '@/utils/util';

const fileList = ref([]);
const imageLoading = ref(false);
const viewerIndex = ref(0);
const viewerVisible = ref(false);
const uploadLoading = ref(false);
const imageUrl = ref('');
const checkboxGroup = ref([]);

const urlList = computed(() => fileList.value.map(i => i.url));

getImageList();

async function getImageList() {
    imageLoading.value = true;
    const resp = await getImage();
    fileList.value = resp;
    imageLoading.value = false;
}

async function onUpload(files) {
    if (files.length) {
        uploadLoading.value = true;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            formData.append('file', file);
        }
        const resp = await upload(formData);
        if (resp) {
            fileList.value.push(...resp);
            ElMessage.success('上传成功');
            uploadLoading.value = false;
        }
    }
}

async function handleDeleteOne(id) {
    await ElMessageBox.confirm('确定删除吗？', {
        type: 'warning'
    });
    const resp = await deleteImage([id]);
    if (resp) {
        getImageList();
        ElMessage.success('删除成功');
    }
}

function onPicturePreview(index) {
    viewerIndex.value = index;
    viewerVisible.value = true;
}

function onCopy(url) {
    copy(url);
    ElMessage.success('复制成功');
}

async function onAdd() {
    const resp = await addImage({
        url: imageUrl.value
    });
    if (resp) {
        imageUrl.value = '';
        ElMessage.success('添加成功');
        fileList.value.push(resp);
    }
}

async function handleDelete() {
    await ElMessageBox.confirm('确定将选择的数据删除', {
        type: 'warning'
    });
    const resp = await deleteImage(checkboxGroup.value);
    if (resp) {
        checkboxGroup.value = [];
        getImageList();
        ElMessage.success('删除成功');
    }
}
</script>

<style lang="scss" scoped>
.input-button {
    margin-top: 15px;

    :deep(.el-input__wrapper) {
        border-radius: 4px 0 0 4px;
    }

    .el-button {
        border-radius: 0 4px 4px 0;
    }
}

:deep(.el-checkbox-group) {
    .el-checkbox {
        width: 100%;
        height: 100%;
    }

    .el-checkbox__input {
        position: absolute;
        left: 5px;
        top: 5px;
    }

    .el-checkbox__label {
        padding-left: 0;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
}

.file {
    border: 1px solid #c0ccda;
    border-radius: 6px;
    width: 150px;
    height: 150px;

    .el-image {
        width: 100%;
        height: 100%;
    }

    .actions {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s;

        span {
            display: none;
            cursor: pointer;

            &:not(:first-child) {
                margin-left: 15px;
            }
        }

        &:hover {
            opacity: 1;
            span {
                display: inline-block;
            }
        }
    }
}




</style>
