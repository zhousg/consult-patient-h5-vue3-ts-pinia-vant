<script setup lang="ts">
const fn = () => console.log('fn')

// typeof 作用：从js变量中取出对应的类型
// const obj = {
//   name: 'jack',
//   age: 10
// }
// type Obj = typeof obj
</script>

<template>
  <div class="login-page">
    <cp-nav-bar @click-right="fn" title="登录" right-text="注册"></cp-nav-bar>
    <van-button>按钮</van-button>
    <van-checkbox>复选框</van-checkbox>
  </div>
</template>

<style lang="scss" scoped></style>
