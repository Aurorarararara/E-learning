import { createApp } from 'vue'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
// 引入路由
import router from './router/'

// createApp(App)
//     .use(ElementUI)
//     .use(router)
//     .mount('#app')

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 去掉Vue warn警告
app.config.warnHandler = () => null;

app.use(ElementUI)
    .use(router)
    .mount("#app")
