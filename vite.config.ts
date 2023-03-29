/// <reference types="vitest/config" />

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 配置组件自动注册的插件
// 配置 vant UI 组件库的解析器
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 80,
    host: true
  },
  test: {
    environment: 'happy-dom'
  },
  plugins: [
    viteMockServe({
      // 在哪个文件夹下编写模拟接口的代码
      mockPath: './src/mock',
      // 在开发环境开启mock
      localEnabled: true
    }),
    createHtmlPlugin(),
    vue(),
    // 样式重复引入，类型声明文件重复了
    Components({
      dts: false,
      resolvers: [VantResolver({ importStyle: false })]
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    })
  ],
  //  base: '/hm',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
