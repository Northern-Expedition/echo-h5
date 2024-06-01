<template>
  <div>
    <div class="formData">
      <!-- 邮箱 -->
      <p style="color: #a0a5af">{{ _t18('login_emailCode') }}</p>
      <div>
        <input v-model="formData2.email" type="text" :placeholder="_t18('login_emailCode')" />
      </div>
    </div>
    <div v-if="['aams'].includes(_getConfig('_APP_ENV'))" class="formData">
      <!-- 手机号 -->
      <p style="color: #a0a5af">{{ _t18('login_mobileCode') }}</p>
      <div>
        <input v-model="formData2.mobile" type="text" :placeholder="_t18('login_mobileCode')" />
        <div class="right" @click="shouAreaCode">
          <i>+</i>
          <p>{{ formData2.areaCode }}</p>
          <svg-load name="jiantou10x5-x" class="jiantou" />
        </div>
      </div>
    </div>
    <div class="formData">
      <!-- 密码 -->
      <p style="color: #a0a5af">{{ _t18('login_pwd') }}</p>
      <div>
        <input
          v-model="formData2.password"
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
          v-model="formData2.password2"
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
      <!-- 邀请码 选填 -->
      <p style="color: #a0a5af">
        {{ _t18('register_invitation') }}
        <i v-if="REGISTER_REQUIRED_ACTIVECODE.includes(_getConfig('_APP_ENV'))"
          >({{ _t18('required') }})</i
        >
        <i v-else>({{ _t18('optional') }})</i>
      </p>
      <div>
        <input v-model="formData2.invitCode" type="text" :placeholder="_t18('login_please')" />
      </div>
    </div>
    <div class="formData">
      <!-- 验证码 -->
      <p style="color: #a0a5af">{{ _t18('login_code') }}</p>
      <div>
        <input v-model="formData2.code" type="text" :placeholder="_t18('login_please')" />
        <p v-if="!flag" @click="send()">{{ _t18('login_send') }}</p>
        <p v-else><van-count-down :time="time" format="ss" @finish="finish" /></p>
      </div>
    </div>

    <Footer :type="1" :formDataToRegister="formData2" @refersh="refreshCode" />
    <AreaCode :show="show" @handel-click="close" @handel-select="select" />
  </div>
</template>

<script setup>
import './../style.scss'

import { showToast } from 'vant'
import { useRoute } from 'vue-router'

import { emailCode } from '@/api/user'
import { REGISTER_REQUIRED_ACTIVECODE } from '@/config'
import { useToast } from '@/hook/useToast'
import { _t18 } from '@/utils/public'

import AreaCode from './../areaCode.vue'
import Footer from './../signFooter.vue'

const { _toast } = useToast()
const route = useRoute()
/**
 * 表单数据
 */
const formData2 = ref({
  type: 2, //自定义注册类型：1普通2邮箱3手机
  email: '',
  password: '', //密码
  password2: '', //二次密码
  invitCode: route.query.invite_code, //邀请码
  code: '', //验证码
  mobile: '', // 手机号
  areaCode: '93' //区号
})
const requirePass = ref(false)
const inputPass = () => {
  requirePass.value = formData2.value.password2 !== formData2.value.password ? true : false
}
// 眼睛
const showk = ref(false)
const requireShowk = ref(false)
/**
 * 倒计时
 */

// 倒计时
const time = ref(0)
const flag = ref(false)
const send = () => {
  // 邮箱发送验证码
  if (formData2.value.email == '') {
    _toast(`login_please_emailCode`)

    return
  }
  emailCode('REGISTER', formData2.value.email).then((res) => {
    if (res.code == '200') {
      flag.value = true
      time.value = 60 * 1000
    } else {
      showToast(res.msg)
    }
  })
}
// 倒计时结束
const finish = () => {
  flag.value = false
}
const refreshCode = () => {}

const show = ref(false)
// 选择区号面板
const shouAreaCode = () => {
  show.value = true
}
// 关闭区号面板
const close = () => {
  show.value = false
}
// 选择区号
const select = (val) => {
  formData2.value.areaCode = val
}
</script>

<style lang="scss" scoped></style>
