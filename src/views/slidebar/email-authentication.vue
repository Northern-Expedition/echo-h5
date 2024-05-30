<!-- 绑定邮箱 -->
<template>
  <HeaderBar
    :currentName="_t18('sidebar_certified')"
    :cuttentRight="cuttentRight"
    :border_bottom="true"
  ></HeaderBar>
  <div class="content-box">
    <div class="bind-not" v-if="!bind">
      <div class="item">
        <div class="text">{{ _t18('login_emailCode') }}</div>
        <div class="input">
          <input type="text" v-model="formData.email" :placeholder="_t18('recharge_input')" />
        </div>
      </div>
      <div class="item">
        <div class="text">{{ _t18('verification_code') }}</div>
        <div class="input">
          <input type="text" v-model="formData.code" :placeholder="_t18('recharge_input')" />
          <div class="code-box">
            <div class="wait-code" v-if="flag">
              <van-count-down :time="time" format="ss" @finish="finish" />
            </div>
            <div class="send-code" v-else @click="send">{{ _t18('login_send') }}</div>
          </div>
        </div>
      </div>
      <div class="btnBox" @click="submit">
        <ButtonBar :btnValue="_t18('btnConfirm', ['bitmake'])" />
      </div>
    </div>
    <div class="bind-yes" v-else>
      <div class="top">
        <img src="@/assets/defi/email.png" alt="" />
        <div class="text">{{ _t18('email_bind_success') }}</div>
        <div class="email">{{ _t18('email_your') }}：{{ email }}</div>
      </div>

      <div class="change-email" @click="bind = false">{{ _t18('email_update') }}</div>
      <div class="back" @click="$router.push('/')">{{ _t18('backhome') }}</div>
    </div>
  </div>
</template>
<script setup>
import HeaderBar from '@/components/HeaderBar/index.vue'
import ButtonBar from '@/components/common/ButtonBar/index.vue'
import { emailCode, emailBind } from '@/api/user'
import { useUserStore } from '@/store/user/index'
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'
import { _t18 } from '@/utils/public'
import { useToast } from '@/hook/useToast'
const { _toast } = useToast()
const userStore = useUserStore()
userStore.getUserInfo()
// 用户信息
const { userInfo } = storeToRefs(userStore)
const cuttentRight = { iconRight: [{ iconName: 'kefu', clickTo: 'event_serviceChange' }] }
const email = ref(userInfo.value.user?.email)
const bind = ref(email.value)
//表单信息
const formData = ref({
  email: '',
  code: ''
})
/**
 * 倒计时
 */

// 倒计时
const time = ref(0)
const flag = ref(false)
const send = () => {
  // 邮箱发送验证码
  if (formData.value.email == '') {
    // showToast('请补充邮箱地址')
    _toast('login_please_emailCode')
    return
  }
  emailCode('BIND', formData.value.email).then((res) => {
    console.log(res)
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
const submit = () => {
  // bind.value = true
  // email.value=formData.value.email
  if (formData.value.email == '') {
    // showToast('请补充邮箱地址')
    _toast('login_please_emailCode')
    return
  }
  if (formData.value.code == '') {
    // showToast('验证码')
    _toast('verification_code')
    return
  }
  emailBind(formData.value.email, formData.value.code).then((res) => {
    if (res.code == '200') {
      // showToast('绑定成功')
      _toast('email_bind_success')
      email.value = formData.value.email
      bind.value = true
    } else {
      showToast(res.msg)
    }
  })
}
</script>
<style lang="scss" scoped>
* {
  font-size: 16px;
  color: var(--ex-default-font-color);
}
.header {
  display: flex;
  .title {
    margin-left: 10px;
  }
}
.content-box {
  width: 100%;

  .bind-not {
    padding: 0 15px;
    .item {
      width: 100%;

      .text {
        margin: 0.533333rem 0;
        font-size: 0.373333rem;
        color: var(--ex-input-label-color2);
      }

      .input {
        width: 100%;
        height: 50px;
        padding: 0 10px;
        background: #161a33;
        border-radius: 0.213333rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        input {
          height: 100%;
          background: #161a33;
          border: none;
          font-size: 14px;
        }
        .code-box {
          position: absolute;
          right: 0.66667rem;
          min-width: 2.026667rem;
          height: 0.906667rem;
          background: linear-gradient(39deg, #cb4ee8 0%, #10f4b1 100%);
          border-radius: 0.186667rem;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--ex-default-reverse-font-color);
          div {
            font-size: 14px;
            color: var(--ex-font-color);
          }
        }
      }
    }
    .btnBox {
      margin-top: 50px;
    }

    .back {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      background: var(--ex-default-background-color);
      border: 1px solid var(--ex-border-color4);
      color: var(--ex-font-color9);
      font-size: 14px;
    }
  }

  .bind-yes {
    padding: 0 15px;
    .top {
      margin-top: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 132px;
        height: 100px;
      }
      .text {
        color: var(--ex-font-color6);
        text-align: center;
        font-size: 16px;
        margin: 30px 0 20px 0;
      }
      .email {
        text-align: center;
        font-size: 14px;
        color: var(--ex-font-color17);
      }
    }
    .change-email {
      margin: 50px 0 20px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      color: var(--ex-font-color);
      background: var(--ex-div-bgColor1);
      font-size: 14px;
      border-radius: 0.186667rem;
      opacity: 1;
    }
    .back {
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.186667rem;
      height: 50px;
      background: var(--ex-default-background-color);
      border: 1px solid var(--ex-border-color4);
      color: var(--ex-font-color9);
    }
  }
}
</style>
