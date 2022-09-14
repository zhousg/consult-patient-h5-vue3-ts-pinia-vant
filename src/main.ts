import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

import './styles/main.scss'

const app = createApp(App)

// vue使用pinia插件，use(pinia的插件)
app.use(createPinia().use(persist))
app.use(router)

app.mount('#app')
