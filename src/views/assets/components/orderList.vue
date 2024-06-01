<template>
  <div class="item" @click="toDetail(dataValue)">
    <div class="title">
      <div class="left">
        <div>
          <image-load filePath="deposit.png" name="deposit" class="img" />
          <span style="margin-left: 10px">{{
            $route.fullPath.includes('withdraw') ? _t18('asset_withdraw') : _t18('asset_recharge')
          }}</span>
        </div>

        <div>
          <!-- 状态 审核中 成功 失败 -->
          <p v-if="dataValue.status == 0" class="right status0">{{ _t18('recharge_waiting') }}</p>
          <p v-if="dataValue.status == 1" class="right status1">
            {{ _t18('recharge_tab_success') }}
          </p>
          <p v-if="dataValue.status == 2" class="right status2">{{ _t18('recharge_tab_error') }}</p>
        </div>
      </div>
    </div>
    <div class="message">
      <div>
        <p class="left">{{ _t18('recharge_coin') }}</p>
        <p style="color: #8885fb">{{ dataValue.type }}</p>
      </div>
      <div>
        <!-- 金额 -->
        <p class="left">
          {{
            ['paxpay', 'aams'].includes(_getConfig('_APP_ENV'))
              ? _t18('withdraw_money')
              : _t18('recharge_amount')
          }}
        </p>
        <p class="right fontBold fw-num">{{ priceFormat(dataValue.amount) }}</p>
      </div>

      <div v-if="['paxpay'].includes(_getConfig('_APP_ENV'))">
        <!-- 实际到账金额 -->
        <p class="left">{{ _t18('Actual_amount_received') }}</p>
        <p class="right ff-num">{{ dataValue.realAmount }}</p>
      </div>
      <div v-if="['paxpay'].includes(_getConfig('_APP_ENV'))">
        <!-- 手续费 -->
        <p class="left">{{ _t18('Deduction_fee') }}</p>
        <p class="right ff-num">{{ dataValue.fee }}</p>
      </div>

      <div>
        <!-- 时间 -->
        <p class="left">{{ _t18('recharge_time') }}</p>
        <p class="right ff-num">{{ _timeFormat(dataValue.params?.createTime) }}</p>
      </div>
      <div v-if="dataValue.rechargeRemark">
        <!-- 备注 -->
        <p class="left">{{ _t18('kind_tips') }}</p>
        <p class="right ff-num">{{ dataValue.rechargeRemark }}</p>
      </div>
      <div v-if="dataValue.withDrawRemark">
        <!-- 备注 -->
        <p class="left">{{ _t18('kind_tips') }}</p>
        <p class="right ff-num">{{ dataValue.withDrawRemark }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { priceFormat } from '@/utils/decimal'
import { _t18, _toView, filterCoin2 } from '@/utils/public'

const router = useRouter()
const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})
const dataValue = computed(() => {
  return props.data
})
const toDetail = (data) => {
  // 充值0 提现1
  // console.log(router.currentRoute.value.name=='RechargOrder')
  // if (data.type == '0') {
  if (router.currentRoute.value.name == 'RechargOrder') {
    router.push({
      path: '/recharge-detail',
      // query: { data:encodeURI(JSON.stringify(data)) }
      query: { id: data.id }
    })
  } else if (router.currentRoute.value.name == 'WithdrawOrder') {
    router.push({
      path: '/withdraw-detail',
      query: { id: data.id }
    })
  }
}
</script>

<style lang="scss" scoped>
* {
  font-size: 14px;
  color: var(--ex-default-font-color);
}
.item {
  background: #161a33 !important;
  border-radius: 0.266667rem;
  padding: 0.373333rem 0.373333rem 0.426667rem;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.4rem;
    margin-bottom: 15px;
    border-bottom: 1px solid #34393e;
    .left {
      width: 100%;
      justify-content: space-between;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
      .img {
        width: 0.746667rem;
        height: 0.746667rem;
      }
      .status0 {
        color: #fd8700;
      }
      .status1 {
        color: #10f4b1;
      }
      .status2 {
        color: #ff6058;
      }
    }
  }
  .message {
    & > div {
      padding: 7px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        color: var(--ex-passive-font-color);
      }
      .fontBold {
        color: var(--ex-font-color10);
      }
    }
  }
}
</style>
