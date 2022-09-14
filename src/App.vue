<script setup lang="ts">
import { useUserStore } from './stores/user'

const store = useUserStore()
</script>

<template>
  <div>App组件</div>
  <div>用户：{{ store.user }}</div>
  <button @click="store.setUser({ id: '1', mobile: '1', avatar: '1', account: '1', token: '1' })">
    登录
  </button>
  <button @click="store.delUser()">退出</button>
</template>
