import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
//导入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

//安装图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$http = axios
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')








