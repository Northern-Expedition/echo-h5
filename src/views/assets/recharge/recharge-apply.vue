<!-- 充值申请 -->
<template>
  <HeaderBar :currentName="currentName" />
  <!-- 二维码 -->
  <div class="erweima">
    <QRCode :address="address" />
  </div>
  <!-- 申请信息 -->
  <div class="applyMes">
    <div class="address">
      <!-- 充值地址 -->
      <p class="top">{{ _t18('recharge_address', ['bitmake']) }}({{ route.query.type }})</p>
      <div class="bottom">
        <Copy ref="copyRef" :data="address" :fontSize="'16px'">
          <template #copyMsg>
            <span class="fw-num">{{ address }}</span>
          </template>
        </Copy>
      </div>
      <div class="btns" @click="handleCopy">{{ _t18('copy') }}</div>
    </div>
    <template
      v-if="
        !['coinsexpto', 'rxce', 'gmtoin', 'aams', 'bitbyex', 'gmmoin'].includes(
          _getConfig('_APP_ENV')
        )
      "
    >
      <div class="num">
        <!-- 充值数量 -->
        <p class="top">{{ _t18('recharge_number', ['bitmake']) }}</p>
        <div class="bottom">
          <input v-model="num" type="number" :placeholder="_t18('recharge_input')" class="ff-num" />
        </div>
      </div>
      <div class="uploadImg">
        <!-- 上传支付详情截图 -->
        <p class="top">{{ _t18('recharge_imgUpload', ['bitmake']) }}</p>
        <van-uploader v-model="fileList" :after-read="afterRead" max-count="1">
          <div class="bottom">
            <image-load filePath="defi/delete.png" name="delete" class="img" />
          </div>
        </van-uploader>
      </div>
    </template>
  </div>
  <template v-if="['coinsexpto', 'rxce', 'bitbyex', 'gmmoin'].includes(_getConfig('_APP_ENV'))">
    <!-- 复制按钮 -->
    <div class="btn" @click="_copy(address)">
      <p>{{ _t18('copy') }}</p>
    </div>
    <!-- 充值说明列表 -->
    <div v-if="['bitbyex'].includes(_getConfig('_APP_ENV'))" class="tip-list">
      <div v-for="(item, index) in tipList2" :key="index" class="tip">
        {{ item.content }}
      </div>
    </div>
    <div v-else class="tip-list">
      <div v-for="(item, index) in tipList" :key="index" class="tip">
        {{ index + 1 }}.{{ item.content }}
      </div>
    </div>
  </template>
  <template v-else-if="['gmtoin'].includes(_getConfig('_APP_ENV'))">
    <div class="tip-list">
      <div class="tip">{{ _t18('account_balance_info') }}</div>
    </div>
  </template>
  <template v-else-if="['aams', 'gmmoin'].includes(_getConfig('_APP_ENV'))"> </template>
  <template v-else>
    <!-- 确认充值 -->
    <div class="btn" @click="submit">
      <p>{{ _t18('recharge_require', ['bitmake']) }}</p>
    </div>
  </template>
</template>

<script setup>
import { debounce } from 'lodash'
import { showToast } from 'vant'
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getUserRechageNewApi, rechargeSubmit } from '@/api/account.js'
import { uploadImg } from '@/api/common/index.js'
import Copy from '@/components/common/Copy/index.vue'
import QRCode from '@/components/common/QRCode/index.vue'
import { useCopy } from '@/hook/useCopy'
import { useToast } from '@/hook/useToast'
import { useMainStore } from '@/store'
import { priceFormat } from '@/utils/decimal'
import { _getConfig, _hideAddress, _t18, _toView } from '@/utils/public'

const { _toast } = useToast()
const { _copy } = useCopy()
const route = useRoute()
const router = useRouter()
// 充值
const currentName = `${_t18('recharge', ['latcoin'])} ${route.query.type}`
/**
 * 充值说明
 */
const tipList = reactive([
  { content: _t18('recharge_tip1') },
  { content: _t18('recharge_tip2') },
  { content: _t18('recharge_tip3') },
  { content: _t18('recharge_tip4') }
])
const tipList2 = reactive([{ content: _t18('recharge_tip5') }])
const num = ref('')
const fileList = ref([])
const afterRead = (file) => {
  file.status = 'uploading'
  // 此时可以自行将文件上传至服务器
  let formData = new FormData()
  formData.append('file', file.file)
  uploadImg(formData).then((res) => {
    res = res.data
    if (res.code == '200') {
      file.res = res.data.url
      file.status = 'success'
    } else {
      showToast(res.msg)
      fileList.value = []
    }
  })
}
const submit = debounce(() => {
  if (!['coinsexpto'].includes(__config._APP_ENV) && num.value == '') {
    _toast('recharge_num') // 请填写充值数量
    return
  }
  let filePath = ''
  if (['coinsexpto'].includes(__config._APP_ENV)) {
    // 特殊平台不用上传图片
  } else {
    if (fileList.value.length == 0) {
      _toast('recharge_img') // 请上传截图
      return
    }
    const file = fileList.value[0] || {}
    filePath = file.res
    if (file.status != 'success') {
      _toast('recharge_img_load') // 图片上传中,稍后重试
      return
    }
  }
  let params = {}
  if (!['coinsexpto'].includes(__config._APP_ENV)) {
    params = {
      amount: priceFormat(num.value),
      type: route.query.type,
      coin: route.query.coin,
      filePath: filePath || '',
      address: address.value
    }
  } else {
    params = {
      amount: 0,
      type: route.query.type,
      coin: route.query.coin,
      address: address.value
    }
  }

  rechargeSubmit(params).then((res) => {
    if (res.code == '200') {
      _toast('recharge_success') // 充值成功
      num.value = ''
      setTimeout(() => {
        _toView('/recharge-order')
      }, 500)
    } else {
      showToast(res.msg)
    }
  })
}, 500)

const mainStore = useMainStore()
/**
 * 充值地址
 */
const address = computed(() => {
  let rechargeObj = mainStore.getRechargeList.find((elem) => elem.coinName == route.query.type)
  return rechargeObj.coinAddress
})
const copyRef = ref(null)
const handleCopy = () => {
  copyRef.value.toCopy()
}
</script>

<style lang="scss" scoped>
* {
  font-size: 14px;
  color: var(--ex-default-font-color);
}
.erweima {
  padding: 50px 0;
}

:deep(.icon) {
  display: none;
}

.applyMes {
  border-top: 1px solid var(--ex-border-color);
  padding: 30px 15px;
  & > div {
    margin-bottom: 20px;

    p {
      color: var(--ex-passive-font-color);
      margin-bottom: 10px;
    }
  }
  .address {
    .bottom {
      border: 1px solid rgb(208 218 213 / 10%);
      padding: 0.213333rem 0.32rem;
      border-radius: 0.213333rem;
      word-break: break-all;
      margin-bottom: 10px;
      background-color: #161a33;
    }
    .btns {
      width: 3.013333rem;
      height: 0.933333rem;
      line-height: 0.933333rem;
      margin: 0 auto;
      text-align: center;
      background: var(--ex-copy-font-bg-color);
      border-radius: 0.106667rem;
      font-size: 0.373333rem;
      font-weight: 400;
      color: var(--ex-copy-font-color);
    }
  }
  .num {
    .bottom {
      border: 1px solid rgb(208 218 213 / 10%);
      padding: 15px 10px;
      border-radius: 0.213333rem;

      background-color: #161a33;
      input {
        width: 100%;
        background-color: #161a33;
      }
      input::placeholder {
        color: var(--ex-font-color5);
        font-size: 14px;
      }
    }
  }
  .uploadImg {
    .van-uploader {
      width: 100%;
      :deep(.van-uploader__input-wrapper) {
        width: 100%;
      }
    }
    .bottom {
      border: 1px solid rgb(208 218 213 / 10%);
      padding: 35px 0;
      text-align: center;
      border-radius: 0.213333rem;
      background-color: #161a33;

      .img {
        font-size: 36px;
      }
    }
  }
}
.btn {
  padding: 0 15px 55px;
  p {
    text-align: center;
    padding: 0.373333rem 0;
    font-size: 0.426667rem;
    border-radius: 0.213333rem;
    background: var(--ex-primary-color);
    color: var(--ex-default-font-color);
  }
}
.tip-list {
  padding: 0 15px;
  .tip {
    margin-bottom: 15px;
  }
}
</style>
