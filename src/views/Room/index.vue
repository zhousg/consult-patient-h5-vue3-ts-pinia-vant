<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { onMounted, onUnmounted, ref } from 'vue'
import { baseURL } from '@/utils/rquest'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import type { TimeMessages, Message } from '@/types/room'
import { MsgType } from '@/enums'

const store = useUserStore()
const route = useRoute()
// 1. 建立连接
// 安装 socket.io-client 包
// 组件挂载完毕  建立连接，组件卸载，关闭连接

let socket: Socket
const list = ref<Message[]>([])
onUnmounted(() => {
  socket.close()
})
onMounted(() => {
  socket = io(baseURL, {
    // 身份认证
    auth: {
      token: `Bearer ${store.user?.token}`
    },
    // 订单ID
    query: {
      // 地址栏取出orderId，在建立连接的时候发送给，socket服务器
      orderId: route.query.orderId
    }
  })
  // 连接成功，connect 固定写法
  socket.on('connect', () => {
    console.log('连接成功')
  })
  // 关闭连接
  socket.on('disconnect', () => {
    console.log('断开连接')
  })
  // 发生错误
  socket.on('error', (err) => {
    console.log('发生错误', err)
  })

  // 聊天记录（默认消息）
  // 1. 绑定消息记录事件，后台连接成功主动发消息
  // 2. 拿到消息分组之后，处理成可以的消息列表 Message[]
  // 3. 响应式数据，接收数据，依据数据渲染即可
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    // 处理消息：分组的时间自己组织成一条通用消息，items取出来放后面
    const arr: Message[] = []
    data.forEach((item) => {
      arr.push({
        id: item.createTime,
        msgType: MsgType.Notify,
        createTime: item.createTime,
        msg: {
          content: item.createTime
        }
      })
      arr.push(...item.items)
    })
    // 将处理好的数据放置list中
    list.value.unshift(...arr)
  })
})
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="问诊室" />
    <room-status></room-status>
    <room-message :list="list"></room-message>
    <room-action></room-action>
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
