<template>
    <div class="login-container flex-center">
        <el-form
            ref="formRef"
            class="form animate__animated animate__bounceInDown"
            :model="formData"
            :rules="rules"
            status-icon
            @keydown.native.enter="onSubmit"
        >
            <h2 class="form__title flex-center">
                <el-image :src="logo" style="width: 46px;" />
                Login
            </h2>
            <el-form-item prop="account">
                <el-input v-model.trim="formData.account" placeholder="账号" />
            </el-form-item>
            <el-form-item prop="password">   
                <el-input v-model.trim="formData.password" show-password placeholder="密码" />
            </el-form-item>
            <el-form-item>
                <el-button
                    class="submit-btn"
                    :loading="loading"
                    @click="onSubmit"
                >
                    Login
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

import logo from '@/assets/img/logo.png';

const store = useStore();
const route = useRoute();
const router = useRouter();

const formRef = ref(null);
const formData = reactive({
    account: '',
    password: ''
});
const loading = ref(false);
const rules = {
    account: { required: true, message: '请输入账号' },
    password: { required: true, message: '请输入密码' }
};

function onSubmit() {
    formRef.value.validate(async valid => {
        if (valid) {
            loading.value = true;
            const resp = await store.dispatch('user/login', formData);
            loading.value = false;
            if (resp) {
                const { redirect } = route.query;
                router.push(redirect && redirect.indexOf('/login') !== 0 ? redirect : '/');
                ElMessage.success('登录成功');
            }
        }
    });
}
</script>

<style lang="scss" scope>
.login-container {
    position: relative;
    height: 100%;
    background-image: linear-gradient(94.3deg, rgb(26, 33, 61) 10.9%, rgb(81, 84, 115) 87.1%);
    color: #fff;

    &::before,
    &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
        
    }

    &::before {
        width: 450px;
        height: 450px;
        transform: translate(-100%, -80%);
        background-color: #ffe53b;
        background-image: linear-gradient(147deg, #ffe53b 0%, #ff2525 74%);
        animation: pulse 1.5s infinite;
    }

    &::after {
        width: 300px;
        height: 300px;
        transform: translate(10%, 20%);
        background-color: #fa8bff;
        background-image: linear-gradient(45deg, #fa8bff 0%, #2bd2ff 52%, #2bff88 90%);
        animation: pulse 1.6s infinite;
    }

    @keyframes pulse {
        50% {
            box-shadow: 0 0 0 50px rgba(255, 255, 255, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
        }
    }
}

.form {
    background-color: rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 1;
    width: 320px;
    padding: 40px 30px;
    border-radius: 8px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-right-color: rgba(255, 255, 255, 0.1);
    border-bottom-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);

    .form__title {
        font-weight: 300;
        margin-top: 0;
        margin-bottom: 30px;
    }
    
    .el-form-item {
        margin-bottom: 24px;
    }

    .el-input__wrapper {
        height: 50px;
        line-height: 50px;
        border-radius: 8px;
        background-color: transparent;
        border-color: rgba(255, 255, 255, 0.5);
    }

    .el-input__inner {
        color: #fff;
    }
}

.submit-btn {
    width: 100%;
    border-radius: 8px;
    border: none;
    height: 50px;
    background-image: linear-gradient(to right, #02aab0 0%, #00cdac 51%, #02aab0 100%);
    background-size: 200% auto;
    color: #fff;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    transition: ease 0.4s;

    &:hover {
        background-position: right center;
        color: #fff;
    }

    &:not(.is-disabled):active {
        transform: scale(0.95);
    }
}
</style>
