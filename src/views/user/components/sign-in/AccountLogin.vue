<template>
  <div>
    <!-- 账号 密码 验证码 -->
    <div class="formData">
      <p>{{ _t18('account', ['bitmake', 'aams']) }}</p>
      <div>
        <input
          v-model="formData1.username"
          type="text"
          :placeholder="_t18('login_name', ['bitmake'])"
        />
      </div>
    </div>
    <div class="formData">
      <p>{{ _t18('login_pwd') }}</p>
      <div>
        <input
          v-model="formData1.password"
          :type="showk ? 'text' : 'password'"
          :placeholder="_t18('login_please')"
        /><svg-load :name="showk ? 'yanjin-k' : 'yanjin-g'" @click="showk = !showk" />
      </div>
    </div>
    <p class="forgotPwd" @click="$router.push('/forgot-password')">
      {{ _t18('forget_pwd', ['bitmake']) }}?
    </p>
    <div v-if="mainStore.getISCode" class="formData">
      <p>{{ _t18('login_code') }}</p>
      <div>
        <input v-model="formData1.code" type="text" :placeholder="_t18('login_please')" /><span
          @click="refreshCode"
        >
          <img :src="codeUrl" />
        </span>
      </div>
    </div>
    <Footer :type="0" :formDataToLogin="formData1" @refersh="refreshCode" />
  </div>
</template>

<script setup>
import './../style.scss'

import { useMainStore } from '@/store/index.js'
import { _t18 } from '@/utils/public'

import Footer from './../signFooter.vue'

const mainStore = useMainStore()
const formData1 = ref({
  type: 1, //自定义注册类型：1普通2邮箱3手机
  username: '', //用户名/邮箱/手机号
  password: '', //密码
  code: '' //验证码
})
// ***************刷新验证码**************
// 时间戳
const timestamp = ref(+new Date())
// 图形验证码地址
const codeUrl = computed(
  () => `${mainStore.verificationCodeUrl}?codeType=LOGIN&timestamp=${timestamp.value}`
)

// 刷新验证码
const refreshCode = () => {
  timestamp.value = +new Date()
}
// 眼睛
const showk = ref(false)
</script>

<style lang="scss" scoped>
.formData {
  padding-right: 0.5px;
  margin-top: 0.373333rem;
  position: relative;
  p {
    font-size: 0.373333rem;
    color: var(--ex-input-label-color);
  }
}
</style>
