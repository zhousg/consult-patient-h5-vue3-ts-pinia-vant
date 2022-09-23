<script setup lang="ts">
import type { Message } from '@/types/room'
import { ConsultTime, MsgType } from '@/enums'
import { illnessTimeOptions, consultFlagOptions } from '@/services/constants'
import type { Image } from '@/types/consult'
import { ImagePreview } from 'vant'
import { useUserStore } from '@/stores'
import dayjs from 'dayjs'
import { nextTick } from 'vue'

defineProps<{
  list: Message[]
}>()

// 获取患病时间文字
const getIllnessTimeText = (time?: ConsultTime) => {
  return illnessTimeOptions.find((item) => item.value === time)?.label
}
// 获取是否就诊文字
const getConsultFlagText = (flag?: 0 | 1) => {
  return consultFlagOptions.find((item) => item.value === flag)?.label
}
// 预览图片
const onPreviewImage = (pictures?: Image[]) => {
  if (pictures && pictures.length) {
    // string[]
    ImagePreview(pictures.map((item) => item.url))
  }
}

const store = useUserStore()
const formatTime = (time: string) => dayjs(time).format('HH:mm')
</script>

<template>
  <template v-for="{ msgType, id, msg, from, createTime, fromAvatar } in list" :key="id">
    <!-- 病情描述 -->
    <div class="msg msg-illness" v-if="msgType === MsgType.CardPat">
      <div class="patient van-hairline--bottom">
        <p>
          {{ msg.consultRecord?.patientInfo.name }}
          {{ msg.consultRecord?.patientInfo.genderValue }}
          {{ msg.consultRecord?.patientInfo.age }}岁
        </p>
        <p>
          {{ getIllnessTimeText(msg.consultRecord?.illnessTime) }} |
          {{ getConsultFlagText(msg.consultRecord?.consultFlag) }}
        </p>
      </div>
      <van-row>
        <van-col span="6">病情描述</van-col>
        <van-col span="18">{{ msg.consultRecord?.illnessDesc }}</van-col>
        <van-col span="6">图片</van-col>
        <van-col span="18" @click="onPreviewImage(msg.consultRecord?.pictures)">点击查看</van-col>
      </van-row>
    </div>
    <!-- 温馨提示-通知 -->
    <div class="msg msg-tip" v-if="msgType === MsgType.NotifyTip">
      <div class="content">
        <span class="green">温馨提示：</span>
        <span>{{ msg.content }}</span>
      </div>
    </div>
    <!-- 通知 -->
    <div class="msg msg-tip" v-if="msgType === MsgType.Notify">
      <div class="content">
        <span>{{ msg.content }}</span>
      </div>
    </div>
    <!-- 发消息-文字 -->
    <div class="msg msg-to" v-if="msgType === MsgType.MsgText && from === store.user?.id">
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <div class="pao">{{ msg.content }}</div>
      </div>
      <van-image :src="store.user?.avatar" />
    </div>
    <!-- 发消息-图片 -->
    <div class="msg msg-to" v-if="msgType === MsgType.MsgImage && from === store.user?.id">
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <van-image fit="contain" :src="msg.picture?.url" />
      </div>
      <van-image :src="store.user?.avatar" />
    </div>
    <!-- 收消息-文字 -->
    <div class="msg msg-from" v-if="msgType === MsgType.MsgText && from !== store.user?.id">
      <van-image :src="fromAvatar" />
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <div class="pao">{{ msg.content }}</div>
      </div>
    </div>
    <!-- 收消息-图片 -->
    <div class="msg msg-from" v-if="msgType === MsgType.MsgImage && from !== store.user?.id">
      <van-image :src="fromAvatar" />
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <van-image fit="contain" :src="msg.picture?.url" />
      </div>
    </div>
    <!-- 处方消息 -->
    <!-- <div class="msg msg-recipe">
    <div class="content">
      <div class="head van-hairline--bottom">
        <div class="head-tit">
          <h3>电子处方</h3>
          <p>原始处方 <van-icon name="arrow"></van-icon></p>
        </div>
        <p>李富贵 男 31岁 血管性头痛</p>
        <p>开方时间：2022-01-15 14:21:42</p>
      </div>
      <div class="body">
        <div class="body-item" v-for="i in 2" :key="i">
          <div class="durg">
            <p>优赛明 维生素E乳</p>
            <p>口服，每次1袋，每天3次，用药3天</p>
          </div>
          <div class="num">x1</div>
        </div>
      </div>
      <div class="foot"><span>购买药品</span></div>
    </div>
  </div> -->
    <!-- 订单取消 -->
    <!-- <div class="msg msg-tip msg-tip-cancel">
    <div class="content">
      <span>订单取消</span>
    </div>
  </div> -->
  </template>
</template>

<style lang="scss" scoped>
@import '@/styles/room.scss';
</style>
