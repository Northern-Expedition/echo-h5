<template>
  <div>
    <div class="formData">
      <!-- 账号 -->
      <p style="color: #a0a5af">{{ _t18('account', ['bitmake']) }}</p>
      <div>
        <input v-model="formData1.username" type="text" :placeholder="_t18('login_please')" />
      </div>
    </div>
    <div class="formData">
      <!-- 密码 -->
      <p style="color: #a0a5af">{{ _t18('login_pwd') }}</p>
      <div>
        <input
          v-model="formData1.password"
          :type="showk ? 'text' : 'password'"
          :placeholder="_t18('login_please')"
        />
        <svg-load :name="showk ? 'yanjin-k' : 'yanjin-g'" @click="showk = !showk" />
      </div>
    </div>
    <div class="formData">
      <!-- 确认密码 -->
      <p style="color: #a0a5af">{{ _t18('register_pwd_require') }}</p>
      <div>
        <input
          v-model="formData1.password2"
          :type="requireShowk ? 'text' : 'password'"
          :placeholder="_t18('login_please')"
          @input="inputPass"
        /><svg-load
          :name="requireShowk ? 'yanjin-k' : 'yanjin-g'"
          @click="requireShowk = !requireShowk"
        />
      </div>
    </div>
    <p v-if="requirePass" class="requirePass">*{{ _t18('register_pwd_diff') }}</p>
    <div class="formData">
      <!-- 邀请码 选填-->
      <p style="color: #a0a5af">
        {{ _t18('register_invitation') }}
        <!-- <i v-if="REGISTER_REQUIRED_ACTIVECODE.includes(platform_setting)">({{ _t18('required')}})</i> -->
        <i v-if="REGISTER_REQUIRED_ACTIVECODE.includes(_getConfig('_APP_ENV'))"
          >({{ _t18('required') }})</i
        >
        <i v-else
          >({{
            _t18(['tokencan'].includes(_getConfig('_APP_ENV')) ? 'register_optional' : 'optional')
          }})</i
        >
      </p>
      <div>
        <input v-model="formData1.invitCode" type="text" :placeholder="_t18('login_please')" />
      </div>
    </div>
    <div v-if="mainStore.getISCode" class="formData">
      <!-- 验证码 -->
      <p style="color: #a0a5af">{{ _t18('login_code') }}</p>
      <div>
        <input v-model="formData1.code" type="text" :placeholder="_t18('login_please')" /><span
          @click="refreshCode"
        >
          <img :src="codeUrl" />
        </span>
      </div>
    </div>

    <Footer :type="1" :formDataToRegister="formData1" @refersh="refreshCode" />
  </div>
</template>

<script setup>
import './../style.scss'

import { useRoute } from 'vue-router'

import { REGISTER_REQUIRED_ACTIVECODE } from '@/config'
import { useMainStore } from '@/store/index.js'
import { _t18 } from '@/utils/public'

import Footer from './../signFooter.vue'

const route = useRoute()
const mainStore = useMainStore()
/**
 * 表单数据
 */
const formData1 = ref({
  type: 1, //自定义注册类型：1普通2邮箱3手机
  username: '', //用户名/邮箱/手机号
  password: '', //密码
  password2: '', //二次密码
  invitCode: route.query.invite_code, //邀请码
  code: '' //验证码
})
/**
 * 图形验证码
 */
// 时间戳
const timestamp = ref(+new Date())
// 图形验证码地址
const codeUrl = computed(
  () => `${mainStore.verificationCodeUrl}?codeType=REGISTER&timestamp=${timestamp.value}`
)
// 刷新验证码
const refreshCode = () => {
  timestamp.value = +new Date()
}
const requirePass = ref(false)
const inputPass = () => {
  requirePass.value = formData1.value.password2 !== formData1.value.password ? true : false
}
// 眼睛
const showk = ref(false)
const requireShowk = ref(false)
</script>

<style lang="scss" scoped></style>
