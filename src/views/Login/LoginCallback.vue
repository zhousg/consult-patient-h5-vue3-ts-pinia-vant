<script setup lang="ts">
import { bindMobile, loginByQQ } from '@/services/user'
import { onMounted, ref } from 'vue'
import { mobileRules, codeRules } from '@/utils/rules'
import { Toast } from 'vant'
import { useUserStore } from '@/stores'
import type { User } from '@/types/user'
import { useRouter } from 'vue-router'
import { useMobileCode } from '@/composable'
// 1. 进行登录
// 1.1 通过QQ的js文件提供的API获取你登录后的openId(就是登录后标识)
// 1.2 如果后台的数据库中存储了 openId + 你的账号手机号  去登录就可以成功，否则失败

// 2. 绑定手机号
// 2.1 记录两个数据 openId isBind(是否需要绑定)
const openId = ref('')
const isBind = ref(false)
onMounted(() => {
  if (window.QC.Login.check()) {
    // 代表QQ已经登录过
    window.QC.Login.getMe((id) => {
      console.log('openId', id)
      openId.value = id
      // 进行登录
      loginByQQ(id)
        .then((res) => {
          loginSuccess(res.data)
        })
        .catch(() => {
          console.log('登录失败')
          isBind.value = true
        })
    })
  }
})

const mobile = ref('')
const code = ref('')

const { form, time, send } = useMobileCode(mobile, 'bindMobile')

// 绑定手机号
// 成功：
// 1. 存储用户信息
// 2. 在登录页面点击QQ按钮的需要记录来源页，根据回跳地址进行跳转如果没有默认是个人中心
// 3. 删除记录的来源页数据
// 4. 提示登录成功
const store = useUserStore()
const router = useRouter()
const loginSuccess = (u: User) => {
  store.setUser(u)
  router.replace(store.returnUrl || '/user')
  store.updateReturnUrl('')
  Toast.success('登录成功')
}
const bind = async () => {
  const res = await bindMobile({
    mobile: mobile.value,
    code: code.value,
    openId: openId.value
  })
  loginSuccess(res.data)
}
</script>

<template>
  <div class="login-page" v-if="isBind">
    <cp-nav-bar></cp-nav-bar>
    <div class="login-head">
      <h3>手机绑定</h3>
    </div>
    <van-form autocomplete="off" ref="form" @submit="bind">
      <van-field
        name="mobile"
        v-model="mobile"
        :rules="mobileRules"
        placeholder="请输入手机号"
      ></van-field>
      <van-field name="code" v-model="code" :rules="codeRules" placeholder="请输入验证码">
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="send">{{
            time > 0 ? `${time}s后再次发送` : '发送验证码'
          }}</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"> 立即绑定 </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/login.scss';
</style>
