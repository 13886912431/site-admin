import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import installVMdEditor from './plugins/v-md-editor';

import ProTable from './components/ProTable/index.vue';
import Pagination from '@/components/Pagination/index.vue';
import Uploader from '@/components/Uploader/index.vue';
import permission from './directives/permission';

import 'nprogress/nprogress.css';
import './styles/index.scss';

const app = createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus, { locale: zhCn })
    .use(app => {
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component);
        }
    })
    .directive('permission', permission)
    .component('Pagination', Pagination)
    .component('Uploader', Uploader)
    .component('ProTable', ProTable);

installVMdEditor(app);

app.mount('#app');