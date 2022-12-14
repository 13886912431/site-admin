import { createStore } from 'vuex';

import getters from './getters';

import user from './modules/user';
import permission from './modules/permission';
import app from './modules/app';
import tagsView from './modules/tagsView';

export default createStore({
    modules: {
        user,
        permission,
        app,
        tagsView
    },
    getters
});
