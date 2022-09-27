import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 80,
    host: true,
    open: true
  },
  // 默认是/基准路径
  base: '/',
  plugins: [
    vue({
      reactivityTransform: true
    }),
    // 默认自动加载 components 下的组件，通用级别组件。
    Components({
      // 默认是 true 开启自动生成组件的类型声明文件，vant的组件已经有类型声明文件，只要导入了就会使用类型声明。
      dts: false,
      // 在main.ts已经引入了所有的样式，不需要自动导入要是，只需要自动导入组件即可。
      resolvers: [VantResolver({ importStyle: false })]
    }),
    // 打包svg图标
    createSvgIconsPlugin({
      // 指定svg图标的目录
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
