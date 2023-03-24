<script setup lang="ts">
/* global QC */
import { useMobileCode } from '@/composables'
import { loginByQQ } from '@/services/user'
import { codeRules, mobileRules } from '@/utils/rules'
import { ref } from 'vue'
import { onMounted } from 'vue'

const openId = ref('')
const isNeedBind = ref(false)
onMounted(() => {
  if (QC.Login.check()) {
    QC.Login.getMe((id: string) => {
      openId.value = id
      loginByQQ(id)
        .then(() => {
          // 登录成功
        })
        .catch(() => {
          // 登录失败
          isNeedBind.value = true
        })
    })
  }
})

const mobile = ref('')
const code = ref()
const { onSend, time, form } = useMobileCode(mobile, 'bindMobile')
</script>

<template>
  <div class="login-page" v-if="isNeedBind">
    <cp-nav-bar></cp-nav-bar>
    <div class="login-head">
      <h3>手机绑定</h3>
    </div>
    <van-form autocomplete="off" ref="form">
      <van-field
        v-model="mobile"
        :rules="mobileRules"
        name="mobile"
        placeholder="请输入手机号"
      ></van-field>
      <van-field
        v-model="code"
        :rules="codeRules"
        name="code"
        placeholder="请输入验证码"
      >
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="onSend">
            {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
          </span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-button
          style="margin-top: 50px"
          block
          round
          type="primary"
          native-type="submit"
        >
          立即绑定
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/login.scss';
</style>
