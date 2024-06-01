<!-- defi挖矿 新版本 -->
<script setup>
import { showToast } from 'vant'
import { useRouter } from 'vue-router'

import { DIFF_ISFREEZE } from '@/config/index'
import { useFreeze } from '@/hook/useFreeze'
import { useToast } from '@/hook/useToast'
import { approve } from '@/plugin/chain/index'
import { useUserStore } from '@/store/user'
import { priceFormat } from '@/utils/decimal.js'
import { _t18, _toView } from '@/utils/public'

const { _isFreeze } = useFreeze()

const { _toast } = useToast()

const router = useRouter()
const props = defineProps({
  incomeInfo: {
    type: Object,
    default: () => {}
  },
  outcomeInfo: {
    type: Object,
    default: () => {}
  }
})
const userStore = useUserStore()
/**
 * 是否授权
 */
const isApprove = computed(() => userStore.userInfo.approve == 1)
/**
 * 授权
 */
/* const toApprove = async () => {
  console.log('toApprove', res)
  const res = await approve().catch((err) => {
    // showToast('用户取消授权')
    _toast('defi_cancel')
  })
  console.log('toApprove', res)
  await userStore.getUserInfo()
} */
const toApproveForm = async () => {
  const res = await approve().catch((err) => {
    // showToast('用户取消授权')
    _toast('defi_cancel')
  })
  console.log('toApprove', res)
  if (!res) {
    //授权失败
    // _toast('Please_access_wallet')
    _toast('Authorization_failed')
    // router.push('/no-wallet')
  }
  await userStore.getUserInfo()
}
const toApprove = () => {
  if (DIFF_ISFREEZE.includes(__config._APP_ENV)) {
    if (_isFreeze(DIFF_ISFREEZE)) {
      toApproveForm()
    }
  } else {
    toApproveForm()
  }
}
</script>
<template>
  <div class="mining_box">
    <div v-if="isApprove" class="mining_content">
      <!-- 已授权 -->
      <van-grid :border="false" :column-num="2" style="padding-left: 10px">
        <van-grid-item class="item" style="flex-basis: 50%; padding-right: 10px">
          <div class="line"></div>
          <div class="fw-num">
            {{ priceFormat(userStore.userInfo.appAddressInfo?.usdt || 0, 2) }} USDT
          </div>
          <div class="til">{{ _t18('pledge_hosting') }}</div>
          <image-load filePath="totalOutput.png" name="defi" class="img img-icon" />
        </van-grid-item>
        <van-grid-item class="item" style="flex-basis: 50%; padding-right: 10px">
          <div class="line"></div>
          <div class="fw-num">{{ priceFormat(props.incomeInfo.totalProfit) }} ETH</div>
          <div class="til">{{ _t18('pledge_hosting') }}</div>
          <image-load filePath="userBenefits.png" name="defi" class="img img-icon" />
        </van-grid-item>
        <van-grid-item class="item" style="flex-basis: 50%; padding-right: 10px">
          <div class="line"></div>
          <div class="fw-num">{{ priceFormat(props.incomeInfo.singleRate) }}</div>
          <div class="til">{{ _t18('defi_single benefit') }}</div>
          <image-load filePath="participant.png" name="defi" class="img img-icon" />
        </van-grid-item>
        <van-grid-item class="item" style="flex-basis: 50%; padding-right: 10px">
          <div class="line"></div>
          <div class="fw-num">{{ priceFormat(props.incomeInfo.dayRate) }}</div>
          <div class="til">{{ _t18('defi_every_day_income') }}</div>
          <image-load filePath="validNode.png" name="defi" class="img img-icon" />
        </van-grid-item>
      </van-grid>

      <div class="mining_btn" @click="_toView('/defiDetail')">
        <image-load filePath="fly.png" name="defi" class="img fly" />
        {{ _t18('defi_earnings Details') }}
      </div>
    </div>
    <div class="mining_content">
      <van-grid :border="false" :column-num="2" style="padding-left: 10px">
        <van-grid-item class="item" style="flex-basis: 50%; padding-right: 10px">
          <div class="line"></div>
          <div class="fw-num">{{ priceFormat(outcomeInfo?.totalOutput) || 0 }} ETH</div>
          <div class="til">{{ _t18('defi_total_output') }}</div>
          <image-load filePath="totalOutput.png" name="defi" class="img img-icon" />
        </van-grid-item>
        <van-grid-item class="item" style="flex-basis: 50%; padding-right: 10px">
          <div class="line"></div>
          <div class="fw-num">{{ priceFormat(outcomeInfo?.userBenefits) || 0 }} U</div>
          <div class="til">{{ _t18('defi_user_benefit') }}</div>
          <image-load filePath="userBenefits.png" name="defi" class="img img-icon" />
        </van-grid-item>
        <van-grid-item class="item" style="flex-basis: 50%; padding-right: 10px">
          <div class="line"></div>
          <div class="fw-num">{{ outcomeInfo?.participant || 0 }}</div>
          <div class="til">{{ _t18('defi_participant') }}</div>
          <image-load filePath="participant.png" name="defi" class="img img-icon" />
        </van-grid-item>
        <van-grid-item class="item" style="flex-basis: 50%; padding-right: 10px">
          <div class="line"></div>
          <div class="fw-num">{{ outcomeInfo?.validNode || 0 }}</div>
          <div class="til">{{ _t18('defi_valid_node') }}</div>
          <image-load filePath="validNode.png" name="defi" class="img img-icon" />
        </van-grid-item>
      </van-grid>
      <div class="mining_btn" @click="toApprove">
        <image-load filePath="fly.png" name="defi" class="img fly" />{{ _t18('defi_takePart_in') }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mining_box {
  margin-top: 20px;
  padding: 10px 15px 0 !important;

  .mining_header {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    .eth {
      font-size: 35px;
      margin-right: 10px;
    }
    strong {
      font-size: 20px;
      color: var(--ex-default-font-color);
    }
  }
  .mining_content {
    .item {
      align-items: flex-start;
      border-radius: 0.266667rem;
      position: relative;
      .line {
        width: 0.48rem;
        height: 0.053333rem;
        background: var(--ex-financial-num-bg-color);
      }
      .fw-num {
        font-size: 0.426667rem;
        color: var(--ex-default-font-color);
        margin: 0.533333rem 0 0.053333rem;
        word-break: break-all;
        width: 2.133333rem;
      }
      .til {
        word-wrap: break-word;
        color: var(--ex-eth-label-color);
        font-size: 0.346667rem;
      }
      .img-icon {
        width: 1.173333rem;
        height: 1.173333rem;
        position: absolute;
        right: 0.48rem;
        top: 0.48rem;
      }
    }
    :deep(.van-grid-item__content) {
      border: 0.026667rem solid rgba(136, 133, 251, 0.19);
      border-radius: 0.266667rem;
      align-items: flex-start;
      padding-left: 0.266667rem;
    }
    .mining_btn {
      margin-top: 0.533333rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--ex-eth-button-color);
      padding: 0.4rem;
      border-radius: 0.213333rem;
      font-size: 0.426667rem;
      color: var(--ex-font-color);
      text-align: center;
      cursor: pointer;
      .fly {
        width: 0.426667rem;
        margin-right: 0.373333rem;
        margin-bottom: 0.08rem;
      }
    }
  }
}
</style>
