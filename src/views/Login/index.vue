<script setup lang="ts">
const fn = () => console.log('fn')
</script>

<template>
  <div class="login-page">
    <cp-nav-bar @click-right="fn" title="登录" right-text="注册"></cp-nav-bar>
    <van-button>按钮</van-button>
    <van-checkbox>复选框</van-checkbox>
  </div>
</template>

<style lang="scss" scoped></style>
