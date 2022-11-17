import { ElMessage } from 'element-plus';

import { login, getInfo } from '@/api/user';
import { setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';
import store from '@/store';
import { isUser } from '@/utils/roles';

const state = {
    user: null,
    token: '',
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_TOKEN(state, token) {
        state.token = token;
    },
};

const actions = {
    async login({ commit }, payload) {
        const resp = await login(payload);
        if (resp) {
            if (isUser(resp.roles)) {
                ElMessage.error('抱歉，你不是管理员');
                return false;
            }
            commit('SET_TOKEN', resp.token);
            setToken(resp.token);
            return resp;
        }
        return false;
    },
    async logout({ commit }) {
        commit('SET_USER', null);
        commit('SET_TOKEN', '');
        store.commit('permission/RESET_ROUTES');
        store.commit('tagsView/DEL_ALL_TAGS_VIEW');
        removeToken();
        resetRouter();
    },
    async getInfo({ commit }) {
        const resp = await getInfo();
        if (resp) {
            commit('SET_USER', resp);
            return resp;
        }
        return false;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
