<template>
  <div>
    <van-popup
      v-model:show="props.show"
      :round="props.round"
      :position="props.direction"
      :style="{ height: props.height, width: props.width }"
      @click-overlay="handelClose"
    >
      <div v-if="props.showHeader" class="popupHeader">
        <slot name="titleCustomize"></slot>
        <svg-load v-if="props.close" class="closeSvg" name="guanbi" @click="handelClose" />
      </div>
      <div v-if="empty" class="popupContent">
        <slot name="contentCustomize"></slot>
      </div>
      <!-- 没有padding -->
      <slot v-if="!empty" name="emptyContentCustomize"></slot>
    </van-popup>
  </div>
</template>
<script setup>
let props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  // 默认展示header  默认true
  showHeader: {
    type: Boolean,
    default: true
  },
  // 默认圆角
  round: {
    type: Boolean,
    default: true
  },
  close: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    default: 'center'
  },
  height: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: ''
  },
  empty: {
    type: Boolean,
    default: true
  }
})
let emit = defineEmits(['handelClose'])
const handelClose = () => {
  emit('handelClose', false)
}
</script>
<style lang="scss" scoped>
.popupHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  width: 100%;
  background: #161a33;
  border-bottom: 1px solid var(--ex-border-color);
  .closeSvg {
    width: 24px;
    height: 24px;
  }
}

.popupContent {
  padding: 20px 15px;
  box-sizing: border-box;
  background: #161a33;
}
:deep(.van-popup--bottom) {
  max-width: var(--ex-max-width);
  margin: auto;
  left: 0;
  right: 0;
}
:deep(.van-popup) {
  max-width: var(--ex-max-width);
  background: var(--ex-default-background-color);
}
:deep(.van-popup--left) {
  left: auto;
}
</style>
