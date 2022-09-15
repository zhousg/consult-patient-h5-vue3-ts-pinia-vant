<script setup lang="ts">
const fn = () => console.log('组件业务')
</script>

<template>
  <div class="login-page">
    <cp-nav-bar title="登录" right-text="右侧按钮" @click-right="fn"></cp-nav-bar>
  </div>
</template>

<style lang="scss" scoped></style>
