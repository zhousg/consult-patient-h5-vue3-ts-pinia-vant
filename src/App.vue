<script setup lang="ts">
import { Button as VanButton } from 'vant'
import { useUserStore } from './stores'
import axios from './utils/request'

const store = useUserStore()

const getUser = () => {
  axios.request({
    url: 'patient/myUser',
    method: 'get'
  })
}
</script>

<template>
  <div>
    App {{ store.user }}
    <van-button
      type="primary"
      @click="
        store.setUser({
          id: '1',
          avatar: '1',
          token: '1',
          mobile: '1',
          account: '1'
        })
      "
      >登录</van-button
    >
    <van-button type="primary" @click="store.delUser()">退出</van-button>
    <van-button @click="getUser">获取用户信息</van-button>
  </div>
</template>
