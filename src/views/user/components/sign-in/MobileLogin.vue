<template>
  <div>
    <!-- 手机号 验证码 发送 -->
    <div class="formData">
      <p style="color: #a0a5af">{{ _t18('login_mobileCode') }}</p>
      <div>
        <input v-model="formData3.mobile" type="text" :placeholder="_t18('login_mobileCode')" />
        <div class="right" style="position: relative">
          <i class="teshu"></i>
          <i style="color: #fff">+</i>
          <p style="color: #fff">{{ formData3.areaCode }}</p>
          <svg-load name="jiantou10x5-x" class="jiantou" @click="showAreaCode" />
        </div>
      </div>
    </div>
    <div class="formData">
      <p style="color: #a0a5af">{{ _t18('login_code') }}</p>
      <div>
        <input v-model="formData3.code" type="text" :placeholder="_t18('login_please')" />
        <p v-if="!flag" @click="send()">{{ _t18('login_send') }}</p>
        <p v-else><van-count-down :time="time" format="ss" @finish="finish" /></p>
      </div>
    </div>
    <Footer :type="0" :formDataToLogin="formData3" @refersh="refreshCode" />
    <AreaCode :show="show" @handel-click="close" @handel-select="select" />
  </div>
</template>

<script setup>
import './../style.scss'

import { mobileCode } from '@/api/user'
import { useToast } from '@/hook/useToast'
import { _t18 } from '@/utils/public'

import AreaCode from './../areaCode.vue'
import Footer from './../signFooter.vue'

const { _toast } = useToast()
/**
 * 表单数据
 */
const formData3 = ref({
  type: 3, //自定义注册类型：1普通2邮箱3手机
  mobile: '',
  password: '', //密码
  code: '', //验证码
  areaCode: '93' //区号
})
if (['bitbyex'].includes(__config._APP_ENV)) {
  formData3.value.areaCode = '1'
}

// 发送||倒计时
const show = ref(false)
// 选择区号面板
const showAreaCode = () => {
  show.value = true
}
// 关闭区号面板
const close = () => {
  show.value = false
}
// 选择区号
const select = (v) => {
  formData3.value.areaCode = v
}
/**
 * 倒计时
 */

// 倒计时
const time = ref(0)
const flag = ref(false)
const send = () => {
  // 手机发送验证码
  if (formData3.value.mobile == '') {
    _toast(`login_please_mobileCode`)
    return
  }
  mobileCode('LOGIN', formData3.value.areaCode + formData3.value.mobile).then((res) => {
    if (res.code == '200') {
      flag.value = true
      time.value = 60 * 1000
    }
  })
}
// 倒计时结束
const finish = () => {
  flag.value = false
}
const refreshCode = () => {}
</script>

<style lang="scss" scoped>
.teshu {
  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    left: -8px;
    width: 0.026667rem;
    height: 0.666667rem;
    background: #979797;
  }
}
</style>
