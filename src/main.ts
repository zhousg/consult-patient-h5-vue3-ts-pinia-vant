import { createApp } from 'vue'
import { createPinia } from 'pinia'
import presist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

// 在main.css之前引入，后面需要去覆盖vant
import 'vant/lib/index.css'
import './styles/main.scss'

const app = createApp(App)

app.use(createPinia().use(presist))
app.use(router)

app.mount('#app')
