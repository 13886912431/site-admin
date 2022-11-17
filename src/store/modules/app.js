const state = {
    themes: [
        {
            name: '默认主题',
            value: 'default'
        },
        {
            name: '暗色主题',
            value: 'dark'
        }
    ],
    currentTheme: 'default',
    collapse: false
};

const mutations = {
    SET_THEME(state, theme) {
        state.currentTheme = theme;
        document.documentElement.dataset.theme = theme;
    },
    TOGGLE_COLLAPSE(state, collapse) {
        if (typeof collapse === 'boolean') {
            state.collapse = collapse;
        } else {
            state.collapse = !state.collapse;
        }
    },
};

const actions = {
    
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
