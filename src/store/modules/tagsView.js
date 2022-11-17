import { getStorage, setStorage } from '@/utils/storage';

const TAGS_VIEW = 'tags_view';

const state = {
    tagsView: getStorage(TAGS_VIEW, []),
};

const mutations = {
    ADD_TAGS_VIEW: (state, route) => {
        const index = state.tagsView.findIndex(v => v.path === route.path);
        if (index !== -1) {
            state.tagsView[index] = { ...route };
        } else {
            state.tagsView.push({ ...route });
        }
        setStorage(TAGS_VIEW, state.tagsView);
    },
    DEL_TAGS_VIEW: (state, fullPath) => {
        for (const [i, v] of state.tagsView.entries()) {
            if (v.fullPath === fullPath) {
                state.tagsView.splice(i, 1);
                break;
            }
        }
        setStorage(TAGS_VIEW, state.tagsView);
    },
    DEL_OTHER_TAGS_VIEW: (state, fullPath) => {
        state.tagsView = state.tagsView.filter(v => v.meta.affix || v.fullPath === fullPath);
        setStorage(TAGS_VIEW, state.tagsView);
    },
    DEL_ALL_TAGS_VIEW: state => {
        state.tagsView = state.tagsView.filter(tag => tag.meta.affix);
        setStorage(TAGS_VIEW, state.tagsView);
    }
};

const actions = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
