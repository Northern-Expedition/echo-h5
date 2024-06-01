<!-- 复制 -->
<template>
  <div class="copy" :style="{ justifyContent: contentFix }" @click="toCopy">
    <slot name="copyMsg"></slot>
    <svg-load v-if="noFlag" name="copy" class="img" :style="{ fontSize: fontSize }" />
  </div>
</template>

<script setup>
import { defineExpose } from 'vue'
import Copy from 'vue-clipboard3'

import { useToast } from '@/hook/useToast'
import { _t18 } from '@/utils/public'

const { _toast } = useToast()

const props = defineProps({
  data: {
    type: [String, Number],
    default: ''
  },
  contentFix: {
    type: String,
    default: 'space-between'
  },
  fontSize: {
    type: String,
    default: '14px'
  },
  noFlag: {
    type: Boolean,
    default: true
  }
})
const { toClipboard } = Copy()
const toCopy = async () => {
  try {
    await toClipboard(`${props.data}`)
    _toast('copy_success')
  } catch (e) {
    _toast('copy_error')
  }
}
defineExpose({
  toCopy
})
</script>

<style lang="scss" scoped>
.copy {
  padding: 5px 0;
  display: flex;
  // padding-right: 10px;
  .img {
    margin-left: 10px;
    // font-size: 14px;
  }
}
</style>
