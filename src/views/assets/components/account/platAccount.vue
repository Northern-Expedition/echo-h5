<template>
  <div>
    <Amount
      :amount="showNum ? amountSum : _hide(amountSum)"
      :type="type"
      :showicon="showNum ? 'yanjin-k' : 'yanjin-g'"
      @handle-yanjin="handleYanjin"
      @handle-shuaxin="handleShuaxin"
    />
    <!-- 平台 -->
    <Detail :assetDetails="assetDetails" :showNum="showNum" />
  </div>
</template>

<script setup>
import { _hide } from '@/utils/public.js'

import Amount from './amount.vue'
import Detail from './amountDetail.vue'

const props = defineProps({
  assetDetails: {
    type: Object
  },
  amountSum: {
    type: String
  },
  showNum: {
    type: Boolean
  },
  type: {
    type: String
  }
})
// 点击小眼睛
const emit = defineEmits(['handleYanjin', 'handleShuaxin'])
const handleYanjin = () => {
  emit('handleYanjin')
}
const handleShuaxin = () => {
  emit('handleShuaxin')
}
</script>

<style lang="scss" scoped></style>
