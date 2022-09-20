import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import 'virtual:svg-icons-register'

// import '@/enums'

// 导入vant的全局样式，后面的main可以覆盖它
import 'vant/lib/index.css'
import './styles/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
