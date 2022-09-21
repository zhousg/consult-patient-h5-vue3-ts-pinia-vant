<script setup lang="ts">
import { ref } from 'vue'

// 当你的逻辑相同，但是结构不同
const useCounter = () => {
  const count = ref(0)
  const increment = () => {
    count.value++
  }
  return { count, increment }
}

const { count, increment } = useCounter()
const { count: num, increment: add } = useCounter()
</script>

<template>
  <div>
    <h1>计数器：{{ count }}</h1>
    <button @click="increment">自增</button>
  </div>
  <div>
    <p>计数器：{{ num }}</p>
    <a href="javascript:;" @click="add">自增</a>
  </div>
</template>
