<template>
    <el-card style="padding: 0 20px">
        <el-tabs v-model="active">
            <el-tab-pane label="个人信息" name="info">
                <el-form
                    :model="infoFormData"
                    :rules="infoRules"
                    label-width="60px"
                    ref="infoFormRef"
                    style="max-width: 500px"
                    @keydown.native.enter="updateInfo"
                >
                    <el-form-item label="头像" prop="avatar">
                        <el-upload
                            class="avatar-uploader"
                            action="/api/resources/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <el-avatar v-if="infoFormData.avatar" :src="infoFormData.avatar" :size="160" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                        
                        <el-input v-model="infoFormData.avatar" />
                    </el-form-item>
                    <el-form-item label="姓名" prop="name" required>
                        <el-input v-model="infoFormData.name" />
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-radio-group v-model="infoFormData.gender">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="生日" prop="birthday">
                        <el-date-picker v-model="infoFormData.birthday" type="date" :editable="false" :default-value="defaultBirthday" />
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="infoFormData.email" />
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="Check" type="primary" @click="updateInfo">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>

            <el-tab-pane label="修改密码" name="pwd">
                <el-form :model="pwdFormData" :rules="pwdRules" label-width="90px" ref="pwdFormRef" style="max-width: 500px" @keydown.native.enter="updateUserPassword">
                    <el-form-item label="原密码" prop="originPassword" required>
                        <el-input v-model="pwdFormData.originPassword" type="password" show-password />
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword" required>
                        <el-input v-model="pwdFormData.newPassword" type="password" show-password />
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPassword" required>
                        <el-input v-model="pwdFormData.checkPassword" type="password" show-password />
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="Check" type="primary" @click="updateUserPassword">提交</el-button>
                        <el-button icon="Delete" @click="resetForm(pwdFormRef)">清空</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

import { updateUser, updatePassword } from '@/api/user';

const store = useStore();
const router = useRouter();

const active = ref('info');
const infoFormData = reactive({ ...store.getters.user });
const pwdFormData = reactive({});
const infoFormRef = ref(null);
const pwdFormRef = ref(null);
const defaultBirthday = new Date(2000, 0, 1);

const validatePassword = (rule, value, callback) => {
    if (pwdFormData.checkPassword !== '') {
        pwdFormRef.value.validateField('checkPassword', () => null);
    }
    callback();
};
const validateCheckPassword = (rule, value, callback) => {
    if (value !== pwdFormData.newPassword) {
        callback(new Error('密码不一致'));
    } else {
        callback();
    }
};

const infoRules = {
    name: [{ required: true, message: '请输入姓名' }],
};
const pwdRules = {
    originPassword: { required: true, message: '请输入原密码' },
    newPassword: [
        { required: true, message: '请输入新密码' },
        { validator: validatePassword, trigger: 'blur' }
    ],
    checkPassword: [
        { required: true, message: '请再次输入新密码' },
        { validator: validateCheckPassword, trigger: 'blur' }
    ]
};

function updateInfo() {
    infoFormRef.value.validate(async valid => {
        if (valid) {
            const resp = await updateUser(infoFormData);
            if (resp) {
                store.commit('user/SET_USER', resp);
                ElMessage.success('修改成功');
            }
        }
    });
}

function updateUserPassword() {
    pwdFormRef.value.validate(async valid => {
        if (valid) {
            const resp = await updatePassword(pwdFormData);
            if (resp) {
                store.dispatch('user/logout');
                ElMessage.success('修改成功');
                router.push('/login');
            }
        }
    });
}

const handleAvatarSuccess = response => {
    infoFormData.avatar = response.data[0].url;
}

const beforeAvatarUpload = rawFile => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!');
        return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!');
        return false;
    }
    return true;
}

function resetForm(formRef) {
    if (!formRef) return;
    formRef.resetFields();
}
</script>

<style lang="scss" scoped>
:deep(.avatar-uploader) {
    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);

        &:hover {
            border-color: var(--el-color-primary);
        }
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 160px;
        height: 160px;
        text-align: center;
    }
}
</style>
