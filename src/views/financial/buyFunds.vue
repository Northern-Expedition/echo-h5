<template>
  <div class="columnFlex">
    <div v-if="!isSuccess">
      <div class="popup-box">
        <div class="head">
          <div class="head-left">
            <img class="itemImg" src="@/assets/financial/coin-JyvGAUty.png" alt="" />
            <div class="fw-bold">{{ headerObj.title }}</div>
          </div>
          <div class="head-right">
            <van-icon name="close" size="16" @click="handleShowCenter" />
          </div>
        </div>
        <div class="buy-conter">
          <input
            v-model="limit"
            type="number"
            :placeholder="_t18('exchange.input')"
            class="quota"
          />

          <div class="proDetail">
            <div class="detail">
              <div class="item">
                <div>{{ _t18(`product-details`) }}</div>
                <div class="itemName">{{ proDetail.title }}</div>
              </div>
              <div class="item">
                <div>{{ _t18(`project_progress`) }}</div>
                <div class="itemName ff-num">{{ proDetail.process }}%</div>
              </div>
              <div class="item">
                <div>{{ _t18(`total_project`) }}</div>
                <div class="itemName">{{ proDetail.totalInvestAmount }} {{ proDetail.coin }}</div>
              </div>
              <div class="item">
                <div>{{ _t18(`balance`) }}</div>
                <div class="itemName">{{ proDetail.remainAmount }} {{ proDetail.coin }}</div>
              </div>
              <div class="item">
                <div>{{ _t18(`limit_number`) }}</div>
                <div class="itemName fw-num">{{ Number(proDetail.timeLimit) }}</div>
              </div>
              <div class="item">
                <div>{{ _t18(`average_daily_income`) }}</div>
                <div class="itemName ff-num hightColor">{{ proDetail.avgRate }}%</div>
              </div>
            </div>
          </div>
          <div class="buyBtn" @click="payNow">支付</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { showToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { financialDetail, financialSubmit } from '@/api/financial/index'
import { DIFF_ISFREEZE } from '@/config/index'
import { useFreeze } from '@/hook/useFreeze'
import { useToast } from '@/hook/useToast'
import { _t18 } from '@/utils/public'

const { _isFreeze } = useFreeze()
const { _toast } = useToast()
const emit = defineEmits(['handleShowCenter'])
const Route = useRoute()
const { push } = useRouter()
// 起投金额 限投金额 锁仓天数
const headerObj = ref({
  leftName: _t18(`starting-amount`),
  centerName: _t18(`Investment_Limit`),
  rightName: _t18(`Lock-up_days`)
})
const limit = ref('') // 额度
const dayNum = ref('') // 额度
const coninName = ref('')
const proDetail = ref({}) // 产品详情
const isSuccess = ref(false) // 判断成功
const backwardNum = ref(-1) //
const minNum = ref(0) // 最小输入
const maxNum = ref(0) // 最大输入
const payNowForm = () => {
  // 请先同意理财协议
  if (Number(limit.value) < minNum.value) {
    // 最少可购买
    return _toast('Can_buy_down_to')
  }

  if (Number(limit.value) > maxNum.value) {
    // 最多可购买
    return _toast('Can_buy_up_to')
  }

  let regNum = /^\d+(\.\d{1,4})?$/
  // 最多输入小数点后4位
  if (!regNum.test(limit.value)) {
    return _toast('entet4_point')
  }
  submit()
}
const handleShowCenter = () => {
  emit('handleShowCenter')
}
// 支付
const payNow = () => {
  if (DIFF_ISFREEZE.includes(__config._APP_ENV)) {
    if (_isFreeze(DIFF_ISFREEZE)) {
      payNowForm()
    }
  } else {
    payNowForm()
  }
}
/**立即购买 */
const submit = async () => {
  const res = await financialSubmit(Route.params.id, limit.value, dayNum.value)
  if (res.code === 200) {
    push('/myInvestment')
  } else {
    push('/myInvestment')
    showToast(res.msg)
  }
}
/** 获取详情 */
const getDetail = async () => {
  try {
    const res = await financialDetail(Route.params.id)
    if (res.code === 200) {
      const { title, icon, avgRate, days, limitMin, limitMax, coin } = res.data
      minNum.value = limitMin
      maxNum.value = limitMax
      coninName.value = coin.toUpperCase() // 弹窗使用
      dayNum.value = days
      headerObj.value = {
        title,
        icon,
        leftNum: limitMin + ' ' + coin.toUpperCase(),
        centerNum: limitMax + ' ' + coin.toUpperCase(),
        rightNum: days,
        ...headerObj.value
      }
      /**产品详情 */
      const { process, totalInvestAmount, remainAmount, timeLimit } = res.data
      proDetail.value = {
        title,
        process,
        totalInvestAmount,
        remainAmount,
        timeLimit,
        avgRate,
        coin: coin.toUpperCase()
      }
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getDetail()
})
</script>
<style lang="scss" scoped>
.popup-box {
  width: 9.146667rem;
  padding: 0.56rem 0.453333rem;
  background: var(--ex-financial-card-bg-color);
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.64rem;
    &-left {
      font-size: 0.4rem;
      color: var(--ex-default-font-color);
      display: flex;
      .itemImg {
        width: 0.693333rem;
        height: 0.506667rem;
        object-fit: cover;
        margin-right: 0.266667rem;
      }
    }
  }
  .buy-conter {
    .quota {
      width: 100%;
      margin-top: 0.266667rem;
      padding: 0.373333rem;
      border-radius: 0.213333rem;
      border: 0.026667rem solid rgba(0, 0, 0, 0);
      font-size: 14px;
      background-color: rgba(0, 0, 0, 0);
      border: 1px solid rgb(208 218 213 / 10%);
      .van-field__control {
        font-size: 14px;
      }
      &:hover {
        border: 0.026667rem solid var(--ex-input-focus-color);
        outline: none;
      }
    }
    .proDetail {
      .detail {
        padding: 0.533333rem 0.026667rem 0;
        .item {
          padding-bottom: 0.533333rem;
          color: var(--ex-passive-font-color);
          font-size: 0.32rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .itemName {
            color: var(--ex-default-font-color);
          }
          .heightColor {
            color: var(--ex-font-color3);
          }
        }
      }
    }
    .buyBtn {
      height: 1.173333rem;
      background: var(--ex-primary-color);
      border-radius: 0.213333rem;
      font-size: 0.4rem;
      color: var(--ex-font-color);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
