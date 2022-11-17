<template>
    <el-card v-loading="formLoading">
        <el-form ref="form" :model="formData" :rules="rules" label-position="top">
            <el-form-item prop="title" label="文章标题">
                <el-input v-model="formData.title" />
            </el-form-item>
            <el-form-item prop="description" label="文章描述">
                <el-input
                    v-model="formData.description"
                    type="textarea"
                    :rows="3"
                />
            </el-form-item>
            <el-form-item prop="classifyName" label="文章分类">
                <el-autocomplete
                    v-model="formData.classifyName"
                    :fetch-suggestions="queryClassify"
                />
            </el-form-item>
            <el-form-item prop="markdown" label="文章内容">
                <v-md-editor
                    v-model="formData.markdown"
                    height="600px"
                    :include-level="[1, 2, 3, 4, 5, 6]"
                    left-toolbar="undo redo clear | h bold italic strikethrough quote emoji | ul ol table hr | link image code"
                    :tab-size="4"
                />
            </el-form-item>
            <el-form-item prop="image" label="图片">
                <el-input v-model="formData.image" />
            </el-form-item>
            <el-form-item>
                <template v-if="$route.query.editId">  
                    <el-button type="primary" :loading="formLoading" @click="onUpdateArticle">保存</el-button>
                    <el-button @click="$router.back">返回</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" :loading="formLoading" @click="onSubmitArticle">保存</el-button>
                    <el-tooltip effect="dark" content="此操作会将当前的文章缓存，方便下次继续编辑" placement="top-start">
                        <el-button type="primary" plain @click="onSaveArticle">缓存</el-button>
                    </el-tooltip>
                </template>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getArticleDetail, addArticle, updateArticle } from '@/api/article';
import { getClassify } from '@/api/classify';
import { pick } from 'lodash';

export default defineComponent({
    setup() {
        const route = useRoute();
        const router = useRouter();

        const formLoadingRef = ref(false);
        const formDataRef = ref({});
        const classifyRef = ref([]);
        getClassify().then(resp => {
            classifyRef.value = resp.map(it => ({ value: it.name }));
        });
        const { editId } = route.query;
        if (editId) {
            formLoadingRef.value = true;
            getArticleDetail(editId).then(resp => {
                formLoadingRef.value = false;
                if (resp) {
                    formDataRef.value = pick(resp, ['id', 'title', 'description', 'markdown', 'image']);
                    formDataRef.value.classifyName = resp.classify.name;
                } else {
                    router.replace('/article/list');
                }   
            });
        } else {
            const articleData = localStorage.getItem('saveArticleFormData');
            formDataRef.value = articleData ? JSON.parse(articleData) : {};
        }
        return {
            formData: formDataRef,
            classify: classifyRef,
            formLoading: formLoadingRef,
            rules: {
                title: { required: true, message: '请输入文章标题' },
                classifyName: { required: true, message: '请选择一个分类或者输入一个分类' },
                markdown: { required: true, message: '请在左侧输入文章内容' },
                image: { required: true, message: '请输入图片链接' },
                description: { required: true, message: '请输入文章描述' }
            }
        }
    },
    watch: {
        '$route.query'() {
            this.formData = {};
            this.$refs.form?.resetFields();
        }
    },
    methods: {
        queryClassify(queryString, cb) {
            cb(this.classify);
        },
        onSubmitArticle() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.formLoading = true;
                    const resp = await addArticle(this.formData);
                    this.formLoading = false;
                    if (resp) {
                        this.$message.success('添加成功');
                        localStorage.removeItem('saveArticleFormData');
                        this.$router.push('/article/list');
                    }
                }
            });
        },
        onUpdateArticle() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.formLoading = true;
                    const resp = await updateArticle(this.formData);
                    this.formLoading = false;
                    if (resp) {
                        this.$message.success('修改成功');
                        this.$router.push('/article/list');
                    }
                }
            });
        },
        onSaveArticle() {
            const data = pick(this.formData, ['title', 'classifyName', 'description', 'markdown', 'image']);
            localStorage.setItem('saveArticleFormData', JSON.stringify(data));
            this.$message.success('保存成功');
        },
    },
});
</script>
