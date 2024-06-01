<script setup>
const props = defineProps({
  imgUrl: { type: String, default: '' },
  text: { type: String, default: '' },
  message: { type: String, default: '' },
  color: { type: String, default: '#838B9C' }
})
</script>

<template>
  <div class="content">
    <image-load :filePath="props.imgUrl" name="defi" class="imgLoad" />
    <div class="text">{{ props.text }}</div>
    <div class="message">{{ props.message }}</div>
    <slot name="btn"></slot>
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding: 0.8rem 0.4rem 0;
  color: var(--ex-default-font-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  .imgLoad {
    width: 3.466667rem;
    height: 4.453333rem;
    margin-bottom: 0.266667rem;
  }
  .text {
    font-size: 0.48rem;
    color: var(--ex-text-color);
  }
  .message {
    font-size: 0.373333rem;
    color: #a7afb7;
    margin-top: 0.266667rem;
  }
}
</style>
