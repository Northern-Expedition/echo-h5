<template>
  <div class="search">
    <svg-load name="sousuo-h" class="searchLeft" />
    <div class="right">
      <input
        v-model.trim="searchName"
        type="text"
        placeholder="搜索币种"
        class="searchInput"
        @input="searchBtn"
      />
      <div @click="_back()">取消</div>
    </div>
  </div>
  <CurrencyData />
</template>
<script setup>
import { ref } from 'vue'

import { debounceRef } from '@/utils/public'

import CurrencyData from '../components/currencyData.vue'

const searchName = debounceRef('')
const searchBtn = () => {
  if (searchName.value !== '') {
    console.log(searchName.value, '0110')
  }
}
// const cancelBtn = () => {}
</script>
<style lang="scss" scoped>
.search {
  height: 50px;
  border-bottom: 0.5px solid var(--ex-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  .searchLeft {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: var(--ex-default-font-color);
    align-items: center;
    .searchInput {
      flex: 1;
      color: var(--ex-default-font-color);
    }
    input::-webkit-input-placeholder {
      color: var(--ex-font-color5);
    }
    input::-moz-input-placeholder {
      color: var(--ex-font-color5);
    }
    input::-ms-input-placeholder {
      color: var(--ex-font-color5);
    }
  }
}
</style>
