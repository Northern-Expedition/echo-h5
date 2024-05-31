<template>
  <div class="cardBox">
    <!--申购标题-->
    <div class="cardTitle">
      <div class="fw-bold title">{{ data.showSymbol }}</div>
      <div class="right" v-if="data.status == '1' || null">{{ _t18('Preparation') }}</div>
      <div class="right btn" v-else-if="data.status == '2'" @click="toBuy">
        {{ _t18('Subscription_ren') }}
      </div>
      <div class="right" v-else-if="data.status == '3'">{{ _t18('In_over') }}</div>
    </div>

    <!--申购详情-->
    <div class="cardInfo">
      <div class="top">
        <div class="left">
          {{ _t18('Lock-up_period') }}：
          <div class="ff-num value">
            {{ _timeFormat(data.params.beginTime) || '' }} ~
            {{ _timeFormat(data.params.endTime) || '' }}
          </div>
        </div>
      </div>
      <div class="center">
        <van-progress
          :percentage="percentage"
          color="linear-gradient(to right, #7ad6b4, #613af1)"
        />
      </div>
      <div class="bottom">
        <div class="left">
          <span class="ff-num white">{{ data.raisedAmount || 0 }} {{ data.showSymbol }}</span> /
          {{ data.raisingAmount || 0 }}
          {{ data.showSymbol }}
        </div>
        <div class="right">
          {{ _t18('Remaining') }} <span class="white">{{ 100 - percentage }}%</span>
        </div>
      </div>
    </div>

    <!--订阅按钮-->
    <div class="subscribe-button" v-if="data.status == 1">
      <van-button
        round
        class="button-subscribe-button"
        @click="btn_subscription(data)"
        color="#613af1"
        :disabled="disableBtn == 1"
      >
        {{ disableBtn == 1 ? _t18('subscribed') : _t18('subscription') }}
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { _t18, _toView } from '@/utils/public'
import { _div, _sub, _add, _mul, _toFixed } from '@/utils/decimal.js'
import { _timeFormat } from '@/utils/public'
import { useRouter } from 'vue-router'
import { subscribeCoins } from '@/api/subscription/index.js'
import { useUserStore } from '@/store/user'
import { Dialog, showDialog, showToast, Toast } from 'vant'
import { onMounted } from 'vue'
import { useToast } from '@/hook/useToast'
const { _toast } = useToast()
const disableBtn = ref(0)
// 申购订阅
const btn_subscription = (model) => {
  // 用户信息
  const useStore = useUserStore()
  const userInfo = useStore.userInfo

  const params = {
    userId: userInfo.user.userId, //用户
    ownId: model.id, //订阅币种ID
    ownCoin: model.showSymbol, //币种名称
    price: model.price //初始单价
  }

  subscribeCoins(params).then((res) => {
    disableBtn.value = 1
    showDialog({
      message: res.msg
    })
  })
}

const props = defineProps({
  data: {
    type: Object
  }
})
onMounted(() => {
  disableBtn.value = props.data.params.sub_status
})
const percentage = computed(() => {
  return _toFixed(_mul(_div(props.data.raisedAmount, props.data.raisingAmount), 100), 2)
})
const toBuy = () => {
  if (props.data.params?.sub_status == '2' || props.data.params?.sub_status == '3') {
    _toView(`/subscription/info?id=${props.data.id}`)
  } else {
    // 未订阅不可申购
    _toast('cannot_subscribe')
  }
}
</script>

<style lang="scss" scoped>
* {
  font-size: 12px;
  // color: #333;
  color: var(--ex-home-list-ftcolor2);
}
.center {
  margin: 0.266667rem 0 0.426667rem;
}
.cardBox {
  // box-shadow: 0px 1px 10px 1px rgba(5, 5, 5, .2);
  box-shadow: 0px 1px 10px 1px var(--ex-shadow-back-color);
  border-radius: 5px;
  margin: 0.533333rem 0.4rem 0.586667rem;
  background: var(--ex-financial-card-bg-color);
  padding: 0.533333rem 0.373333rem;

  //订阅按钮
  .subscribe-button {
    text-align: center;
    padding-bottom: 0.7rem;

    .button-subscribe-button {
      display: block;
      margin: 0 auto;
      font-size: 0.2rem;
      font-weight: bold;
      color: #ffffff;
      height: 0.9rem;
      padding: 0 2.5rem 0 2.5rem;
    }
  }

  .cardTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 0.426667rem;
      color: white;
    }

    .right {
      padding: 5px 20px;
      border-radius: 15px;
      background: #30354d;
      font-size: 0.32rem;
      color: var(--ex-home-list-ftcolor2);
    }

    .right.btn {
      border: 1px solid #613af1;
      color: #613af1;
    }
  }

  .cardInfo {
    .top {
      padding: 0.4rem 0 0.266667rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        // color: #a1a1a1;
        color: var(--ex-home-list-ftcolor2);
      }

      .value {
        margin-top: 0.266667rem;
        color: var(--ex-primary-color);
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.4rem 0px 0;

      .left {
        // color: #a1a1a1;
        color: var(--ex-home-list-ftcolor2);
      }

      .right {
        // color: #a1a1a1;
        color: var(--ex-home-list-ftcolor2);
      }
    }
  }
}

.white {
  color: white;
}
</style>
