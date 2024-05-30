<template>
  <div class="simulation">
    <div class="top">
      <div class="tradeType">{{ _t18('simulated_trade') }}</div>
      <div class="quit" @click="handleQuit">{{ _t18('quit') }}</div>
    </div>
  </div>
</template>

<script setup>
import { switchTypeApi } from '@/api/quote'
import { showConfirmDialog, showLoadingToast, showToast } from 'vant'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
function handleQuit() {
  showConfirmDialog({
    message: t('confirm_quit_mock'),
    className: 'mock-dialog'
  }).then(async () => {
    showLoadingToast({})
    await switchTypeApi(1)
    showToast(t('quit_mock'))
    location.reload()
  })
}
</script>
<style lang="less" scoped>
.top {
  height: 1.386667rem;
  background: var(--ex-default-bgcolor);
  border-radius: 0.133333rem;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  .tradeType {
    font-weight: 500;
    font-size: 0.426667rem;
    font-family: Arial, sans-serif;
  }
  .quit {
    margin-left: 0.16rem;
    padding: 0.053333rem 0.16rem;
    background: var(--ex-primary-color);
    border-radius: 0.293333rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.32rem;
    color: var(--ex-default-reverse-font-color);
  }
}
</style>

<style lang="less">
.mock-dialog {
  width: 380px;
  top: 45%;
}

.van-button--default.van-button {
  background: #613af1;
}

.van-dialog__confirm,
.van-dialog__cancel {
  flex: 1;
  height: var(--van-dialog-button-height);
  margin: 0;
  border: 0;
  border-radius: 0;
}

.van-dialog__cancel {
  color: #323233;
}
</style>
