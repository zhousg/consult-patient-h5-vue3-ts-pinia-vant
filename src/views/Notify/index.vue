<script setup lang="ts">
import { request } from '@/utils/request'
import { onMounted } from 'vue'

onMounted(() => {
  request(import.meta.env.VITE_APP_CALLBACK + '/patient/message/sys/list').then(
    (res) => {
      console.log(res)
    }
  )
})
</script>

<template>
  <div class="notify-page">notify</div>
</template>

<style lang="scss" scoped></style>
