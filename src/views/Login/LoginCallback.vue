<script setup lang="ts">
import { loginByQQ } from '@/services/user'
import { onMounted } from 'vue'
// 1. 进行登录
// 1.1 通过QQ的js文件提供的API获取你登录后的openId(就是登录后标识)

// 1.2 如果后台的数据库中存储了 openId + 你的账号手机号  去登录就可以成功，否则失败
onMounted(() => {
  if (window.QC.Login.check()) {
    // 代表QQ已经登录过
    window.QC.Login.getMe((id) => {
      console.log('openId', id)
      // 进行登录
      loginByQQ(id)
        .then(() => {
          console.log('登录成功')
        })
        .catch(() => {
          console.log('登录失败')
        })
    })
  }
})
</script>

<template>
  <div class="login-page">login-callback</div>
</template>

<style lang="scss" scoped></style>
