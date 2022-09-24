<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { nextTick, onMounted, onUnmounted, provide, ref } from 'vue'
import { baseURL } from '@/utils/rquest'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import type { TimeMessages, Message } from '@/types/room'
import { MsgType, OrderType } from '@/enums'
import type { ConsultOrderItem, Image } from '@/types/consult'
import { getConsultOrderDetail } from '@/services/consult'
import dayjs from 'dayjs'
import { Toast } from 'vant'

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
    // 默认一个空的聊天数组
    list.value = []
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
    data.forEach((item, i) => {
      // 记录消息分组第一组的时间，作为下次获取聊天记录的时间
      if (i === 0) time.value = item.createTime
      arr.push({
        id: item.createTime,
        msgType: MsgType.Notify,
        createTime: item.createTime,
        msg: {
          content: item.createTime
        }
      })
      // arr.push(...item.items)
      item.items.forEach((item) => {
        arr.push({ ...item, notScroll: initialMsg.value === false })
      })
    })
    // 将处理好的数据放置list中
    list.value.unshift(...arr)

    // 关闭刷新效果
    loading.value = false
    if (!data.length) {
      Toast('没有聊天记录了')
    }

    // 第一次需要滚动到最底部
    nextTick(() => {
      if (initialMsg.value) {
        // 把默认加载到的消息全部改成了已读
        socket.emit('updateMsgStatus', arr[arr.length - 1].id)
        window.scrollTo(0, document.body.scrollHeight)
        initialMsg.value = false
      }
    })
  })
  // 等链接成功之后，注册事件，订单状态变更
  socket.on('statusChange', async () => {
    const res = await getConsultOrderDetail(route.query.orderId as string)
    consult.value = res.data
  })
  // 接收消息
  socket.on('receiveChatMsg', async (msg: Message) => {
    list.value.push(msg)
    // 是一个promise，等下一帧在执行（等DOM渲染完）
    await nextTick()
    // 修改消息未已读
    socket.emit('updateMsgStatus', msg.id)
    // 滚动到最底部
    window.scrollTo(0, document.body.scrollHeight)
  })
})

// 接诊状态的控制：（订单详情）
// 1. 组件挂载后，需要知道当前的接诊状态
// 2. 订单状态变更后，需要只知道已经变化，更新当前接诊状态
// 3. 依赖状态：
// 3.1 状态栏 需要条件渲染，有倒计时
// 3.2 操作栏 需要禁用和启用
const consult = ref<ConsultOrderItem>()
onMounted(async () => {
  const res = await getConsultOrderDetail(route.query.orderId as string)
  consult.value = res.data
})

// 发送文字信息
// 1. 底部操作栏组件，输入信息后需要传递给父组件（index.vue）组件
// 2. 由父组件来发送信息，通过emit发送消息 sendChatMsg
// 3. 接收消息，on receiveChatMsg接收服务器回的消息证明发送成功，追加到消息列表
// 4. 在渲染的时候，区分是自己还医生
const sendText = (text: string) => {
  // 根据后台约定发送消息：form 发送人  to 接收人  msgType消息类型 msg{content:文字}
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgText,
    msg: {
      content: text
    }
  })
}

// 发送图片信息
// 1. 底部操作栏组件，上传图片，成功后传递给父组件（index.vue）组件 {id,url} 图片对象
// 2. 由父组件来发送信息，通过emit发送消息 sendChatMsg
// 3. 在渲染的时候，区分是自己还医生
const sendImage = (img: Image) => {
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgImage,
    msg: {
      picture: img
    }
  })
}

// 加载更多聊天记录
// 1. 默认的聊天记录滚动到最底部，第二次，第三次，....  不需要滚动底部
// 2. 实现下拉刷新效果
// 3. 下拉刷新后，发送一个获取聊天记录的消息给后台
// 4. 触发聊天记录事件，记录当前时间段最早的时间，作为发送聊天记录消息的参数给后台
// 4.1 判断如果有数据，追加到数组，如果没有数据，轻提示没有数据
// 5. 再次连接socket的时候，需要清空聊天记录。
const initialMsg = ref(true)
const loading = ref(false)
// 初始化值是当前时间 YYYY-MM-DD HH:mm:ss
const time = ref(dayjs().format('YYY-MM-DD HH:mm:ss'))
const onRefresh = () => {
  socket.emit('getChatMsgList', 20, time.value, consult.value?.id)
}

// 评价
// 1. 把 未评价  和 已评价的  卡片封装在一个组件
// 2. 渲染组件的时候，把消息中的评价信息，传入组件
// 3. 根据是否有  评价内容，展示对应的卡片
// 3.1. 有数据，展示
// 3.2. 无数据，绑定表单数据，收集表单数据，提交评价
// 3.3. 评价成功，修改评价消息状态和数据，切换卡片展示
provide('consult', consult)
const completeEva = (score: number) => {
  // 加评价对象只需要一个数据 score
  const item = list.value.find((item) => item.msgType === MsgType.CardEvaForm)
  if (item) {
    item.msg.evaluateDoc = { score }
    item.msgType = MsgType.CardEva
  }
}
provide('completeEva', completeEva)
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="问诊室" />
    <room-status :status="consult?.status" :countdown="consult?.countdown"></room-status>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <room-message :list="list"></room-message>
    </van-pull-refresh>
    <room-action
      @send-text="sendText"
      @send-image="sendImage"
      :disabled="consult?.status !== OrderType.ConsultChat"
    ></room-action>
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
