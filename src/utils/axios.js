import axios from 'axios';
import { ElMessage } from 'element-plus';

import router from '@/router';
import store from '@/store';

const instance = axios.create();

instance.interceptors.request.use(request => {
    const token = store.getters.token;
    if (token) {
        request.headers.authorization = 'bearer ' + token;
    }
    return request;
}, error => Promise.reject(error));

instance.interceptors.response.use(async response => {
    let { code, data, msg } = response.data;
    if (code === 401) {
        await store.dispatch('user/logout');
        router.push(`/login?redirect=${router.currentRoute.value.path}`);
    }
    if (code !== 0) {
        ElMessage.error(msg);
        return null;
    }
    return data || true;
}, error => Promise.reject(error));

export default instance;
