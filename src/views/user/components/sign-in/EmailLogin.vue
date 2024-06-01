<template>
  <div>
    <!-- 邮箱 验证码 发送 -->
    <div class="formData">
      <p style="color: #a0a5af">{{ _t18('login_emailCode') }}</p>
      <div>
        <input v-model="formData2.email" type="text" :placeholder="_t18('login_emailCode')" />
      </div>
    </div>
    <div class="formData">
      <p style="color: #a0a5af">{{ _t18('login_code') }}</p>
      <div>
        <input v-model="formData2.code" type="text" :placeholder="_t18('login_please')" />
        <p v-if="!flag" @click="send()">{{ _t18('login_send') }}</p>
        <p v-else><van-count-down :time="time" format="ss" @finish="finish" /></p>
      </div>
    </div>
    <Footer :type="0" :formDataToLogin="formData2" />
  </div>
</template>

<script setup>
import './../style.scss'

import { showToast } from 'vant'

import { emailCode } from '@/api/user'
import { useToast } from '@/hook/useToast'
import { _t18 } from '@/utils/public'

import Footer from './../signFooter.vue'

const { _toast } = useToast()
/**
 * 表单数据
 */
const props = defineProps({
  formData: {
    type: Object
  }
})
const emit = defineEmits(['changeForm'])
const formData2 = ref({
  type: 2, //自定义注册类型：1普通2邮箱3手机
  email: '',
  password: '', //密码
  code: '' //验证码
})
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
  emailCode('LOGIN', formData2.value.email).then((res) => {
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
</script>

<style lang="scss" scoped></style>
