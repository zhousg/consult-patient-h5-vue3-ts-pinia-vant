import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  // 默认是/基准路径
  base: '/',
  plugins: [
    vue(),
    Components({
      // 默认是 true 开启自动生成组件的类型声明文件，vant的组件已经有类型声明文件，只要导入了就会使用类型声明。
      dts: false,
      // 在main.ts已经引入了所有的样式，不需要自动导入要是，只需要自动导入组件即可。
      resolvers: [VantResolver({ importStyle: false })]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
