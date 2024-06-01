<template>
  <div>
    <!-- 申购详情 -->
    <HeaderBar :currentName="_t18(`host.detail`)" />
    <!-- 币种介绍 -->
    <CoinInfo :data="formData" />
    <!-- 产品详情 -->
    <div v-if="formData?.id" class="infoItem">
      <ProductInfo :data="formData" />
    </div>
    <!-- 产品规则 -->
    <div class="infoItem">
      <RuleInfo :purchaseLimit="formData.purchaseLimit" />
    </div>
    <!-- 提交申购 -->
    <div class="infoItem btnBox" @click="toApply()">
      <ButtonBar :btnValue="_t18(`to_subscribe`)" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

import { getOwnCoinDetail } from '@/api/subscription/index'
import ButtonBar from '@/components/common/ButtonBar/index.vue'
import HeaderBar from '@/components/HeaderBar/index.vue'
import { _t18, _toView } from '@/utils/public'

import CoinInfo from './components/CoinInfo.vue'
import ProductInfo from './components/ProductInfo.vue'
import RuleInfo from './components/RuleInfo.vue'

const route = useRoute()
/**
 * 详情数据
 */
const formData = reactive({})
/**
 * id
 */
const id = ref('')

/**
 * 获取数据详情
 */
const getDetail = async () => {
  if (id.value) {
    const res = await getOwnCoinDetail(id.value)
    if (res.code == 200) {
      Object.assign(formData, res.data)
    }
  }
}

/**
 * 去申购
 */
const toApply = () => {
  _toView(`/subscription/apply?id=${formData.id}`)
}

onMounted(() => {
  id.value = route.query.id
  getDetail()
})
</script>

<style lang="scss" scoped>
* {
  font-size: 14px;
  color: #333;
}

.infoItem {
  border-top: 1px solid var(--ex-border-color);
  padding: 20px 15px;
}
.btnBox {
  padding-top: 50px;
}
</style>
