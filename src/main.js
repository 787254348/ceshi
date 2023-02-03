import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import permission from './utils/permission';
import i18n from './i18n';
import './styles/index.less';
import "./assets/iconfont/iconfont.css";
import 'devextreme/dist/css/dx.light.css';
import './components/y-editor/index.js';//注册富文本编辑器自定义模块

const app = createApp(App);

app.use(store);
app.use(router);
app.use(permission);
app.use(i18n);

app.mount('#app');
