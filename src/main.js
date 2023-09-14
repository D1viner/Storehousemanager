import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 引入ElementPlus组件
import ElementPlus from 'element-plus'
// 引入ElementPlus样式
import 'element-plus/dist/index.css'
// 引入暗黑模式的样式
import 'element-plus/theme-chalk/dark/css-vars.css'

// 引入路由的配置
import router from "./router/index.js"

// 引入store
import store from './store/index.js'

const app = createApp(App)

// 加载ElementPlus
app.use(ElementPlus)

// 加载路由
app.use(router);

// 加载store
app.use(store);

app.mount('#app')
