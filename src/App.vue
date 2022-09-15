<script setup lang="ts">
import { Button as VanButton } from 'vant'
import { useUserStore } from './stores'
import type { User } from './types/user'
import { request } from './utils/rquest'

const store = useUserStore()
const login = () => {
  request<User>('login/password', 'POST', {
    mobile: '13211112222',
    password: 'abc12345'
  })
    .then((res) => {
      store.setUser(res.data)
    })
    .catch((e) => {
      // 报错，业务失败
      console.log(e)
    })
}

const getUserInfo = () => {
  request('patient/myUser').then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <van-button type="success" @click="login">登录</van-button>
  <van-button type="success" @click="getUserInfo">获取用户信息</van-button>
</template>
