<!-- 初级认证 -->
<script setup>
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { uploadKYC } from '@/api/user'
import HeaderBar from '@/components/HeaderBar/index.vue'
import { useToast } from '@/hook/useToast'
import { useUserStore } from '@/store/user/index'
import { _t18 } from '@/utils/public'

import Success from './components/success.vue'

const { push } = useRouter()
const { _toast } = useToast()
const userStore = useUserStore()
userStore.getUserInfo()
// 用户信息
const { userInfo } = storeToRefs(userStore)
const formData = reactive({
  userName: '',
  number: ''
})
const cuttentRight = { iconRight: [{ iconName: 'kefu', clickTo: 'event_serviceChange' }] }
// 是否初级认证
const primaryAuth = ref(userInfo.value.detail?.auditStatusPrimary)
// 审核状态 0未申请 1通过 3审核中 2拒绝
// 提交认证信息
const submit = () => {
  if (formData.userName == '') {
    // showToast('请填写姓名')
    _toast('advanced_please_name')
    return
  }
  if (formData.number == '') {
    // showToast('请填写身份证号')
    _toast('advanced_please_cardName')
    return
  }
  // realName 姓名 ,idCard 证件号码 ,flag 1 初级 2高级
  let params = `realName=${formData.userName}&idCard=${formData.number}&flag=1`
  uploadKYC(params).then((res) => {
    if (res.code == '200') {
      // showToast('提交成功，请等待...')
      _toast('advanced_please_wait')
      primaryAuth.value = '3'
      userStore.getUserInfo()
    } else {
      showToast(res.msg)
      primaryAuth.value = '2'
    }
  })
}
const reSubmit = () => {
  primaryAuth.value = '0'
}
</script>
<template>
  <!-- 导航条 -->
  <HeaderBar :currentName="_t18('sidebar_primary')" :cuttentRight="cuttentRight" />
  <div v-if="primaryAuth == '0' || primaryAuth == null" class="content">
    <div class="tip advanced_txt">
      <image-load filePath="tips.png" class="tips" />
      {{ _t18('advanced_txt', ['aams']) }}
    </div>
    <div v-if="['coinsexpto'].includes(_getConfig('_APP_ENV'))" class="tip_info">
      {{ _t18('basic_certification_info') }}
    </div>
    <div class="form">
      <div class="label">{{ _t18('advanced_name') }}：</div>
      <div class="formInput">
        <input v-model="formData.userName" :placeholder="_t18('login_please')" class="form-input" />
      </div>
      <div class="label">{{ _t18('advanced_license_number') }}：</div>
      <div class="formInput">
        <input v-model="formData.number" :placeholder="_t18('login_please')" class="form-input" />
      </div>
    </div>
    <div class="btnBox" @click="submit">
      <ButtonBar :btnValue="_t18('advanced_submit')" />
    </div>
  </div>
  <div v-if="primaryAuth == '3'" class="success">
    <Success
      :text="_t18('under_review')"
      :message="_t18('please_wait')"
      :imgUrl="'defi/zhong.png'"
      :color="'#333'"
    >
      <template #btn>
        <div class="btnBox" @click="push('/home')">
          <div class="btn1">{{ _t18('quote_finish') }}</div>
        </div>
      </template>
    </Success>
  </div>
  <div v-if="primaryAuth == '2'" class="success">
    <Success :text="_t18('Audit_failure')" :imgUrl="'defi/failed.png'" :color="'#333'">
      <template #btn>
        <div class="btnBox" @click="reSubmit">
          <ButtonBar :btnValue="_t18('Resubmit')" />
        </div>
      </template>
    </Success>
  </div>
  <div v-if="primaryAuth == '1'">
    <Success :text="_t18('advanced_success')" :imgUrl="'defi/success.png'" />
    <div class="fromContent">
      <div>{{ _t18('advanced_name') }}：{{ userInfo.detail?.realName }}</div>
      <div>{{ _t18('advanced_license_number') }}：{{ userInfo.detail?.idCard }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding: 30px 15px 0 15px;
  color: var(--ex-default-font-color);
  .tip {
    font-size: 12px;
    color: #8885fb;
  }
  .tip_info {
    font-size: 12px;
    text-align: left;
  }
  .advanced_txt {
    font-size: 0.373333rem;
    margin-bottom: 0.64rem;
    text-align: left;
    .tips {
      width: 0.426667rem;
      height: 0.426667rem;
      margin: 0 0.053333rem;
      vertical-align: top;
    }
  }
  .form {
    padding-top: 0.133333rem;
    font-size: 0.373333rem;
    .label {
      color: var(--ex-input-label-color2);
      text-align: left;
    }
    .formInput {
      align-items: center;
      margin: 0.24rem 0 0.64rem;

      input {
        padding: 0 0.373333rem;
        width: 100%;
        height: 1.226667rem;
        font-size: 0.373333rem;
        border-radius: 0.213333rem;
        background: var(--ex-input-background-color);
        border: 0.026667rem solid rgba(0, 0, 0, 0);
        &::placeholder {
          color: var(--ex-input-font-color);
          font-size: 14px;
        }
      }
    }
  }
  .btnBox {
    width: 100%;
    margin-top: 50px;
  }
}
.fromContent {
  color: var(--ex-default-font-color);
  padding: 1.866667rem 0.4rem;
  div {
    border: 0.026667rem solid var(--ex-input-focus-color);
    margin-bottom: 0.533333rem;
    padding: 0.426667rem 0.346667rem;
    border-radius: 0.213333rem;
    background: var(--ex-input-background-color);
    color: var(--ex-default-font-color);
  }
}
.success {
  color: var(--ex-default-font-color);
  margin-top: 100px;
  .btnBox {
    width: 100%;
    margin-top: 1.333333rem;
    .btn1 {
      border: 0.026667rem solid var(--ex-btn-boder-color) !important;
      background: var(--ex-btn-background-color) !important;
      color: var(--ex-btn-font-color) !important;
      text-align: center;
      border-radius: 0.08rem;
      font-size: 0.426667rem;
      padding: 0.426667rem 0;
      border-radius: 0.213333rem;
    }
  }
}
</style>
