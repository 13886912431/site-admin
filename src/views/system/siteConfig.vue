<template>
    <el-card>
        <el-form
            ref="form"
            :model="formData"
            :rules="rules"
            v-loading="loading"
            label-width="100px"
            style="max-width: 500px"
        >
            <el-form-item label="站点标题" prop="siteTitle">
                <el-input v-model="formData.siteTitle" />
            </el-form-item>
            <el-form-item label="首页banner" prop="banner">
                <el-input v-model="formData.banner" />
            </el-form-item>
            <el-form-item label="github地址" prop="github">
                <el-input v-model="formData.github" />
            </el-form-item>
            <el-form-item label="qq号" prop="qq">
                <el-input v-model="formData.qq" />
            </el-form-item>
            <el-form-item label="微信号" prop="wechat">
                <el-input v-model="formData.wechat" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="formData.email" />
            </el-form-item>
            <el-form-item label="icp" prop="icp">
                <el-input v-model="formData.icp" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <el-input v-model="formData.avatar" />
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit" type="primary" :loading="loading">修改</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { getSiteConfig, updateSiteConfig } from '@/api/siteConfig';

const required = { required: true, message: '必填项', trigger: 'blur' };

export default defineComponent({
    setup() {
        const formDataRef = ref({});
        const loadingRef = ref(true);
        getSiteConfig().then(resp => {
            formDataRef.value = resp;
            loadingRef.value = false;
        });
        return {
            formData: formDataRef,
            loading: loadingRef,
            rules: {
                siteTitle: [required],
                banner: [required],
                github: [required],
                qq: [required],
                wechat: [required],
                email: [required],
                icp: [required],
                avatar: [required],
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.loading = true;
                    const resp = await updateSiteConfig(this.formData);
                    this.loading = false;
                    if (resp) {
                        this.formData = resp;
                        this.$message.success('修改成功');
                    }
                }
            });
        },
    },
})
</script>
