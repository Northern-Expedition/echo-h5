<template>
  <div class="bankItem">
    <ul class="bank-content">
      <li v-for="item in props.bankList" :key="item.id" @click="change(item)">
        <div class="top-content">
          <p class="bank-type">
            {{ item.bankName }}<span v-if="item.coin" class="scl">（{{ item.coin }}）</span>
          </p>
          <van-icon name="edit" size="20" @click="change(item)" />
        </div>
        <p class="name">{{ item.userName }}</p>
        <p class="bankNumber">{{ item.cardNumber }}</p>
        <p v-if="item.bankAddress" class="bank">{{ item.bankAddress }}</p>
        <p v-if="item.bankBranch" class="bank">{{ item.bankBranch }}</p>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

import { _t18 } from '@/utils/public'

const router = useRouter()

const props = defineProps({
  bankList: {
    type: Array,
    default: []
  }
})

const change = (item) => {
  router.push({
    path: '/edit-bank',
    query: { data: encodeURI(JSON.stringify(item)) }
  })
}
</script>
<style lang="scss" scoped>
.bank-content {
  margin-top: 13px;

  li {
    display: flex;
    flex-direction: column;
    padding: 0.72rem 0.4rem 0.586667rem;
    border-radius: 0.533333rem;
    margin-top: 0.533333rem;
    background: linear-gradient(40deg, #e567bf 0%, #b09bff 55%, #805eff 100%);

    &:nth-child(1) {
      margin-top: 7px;
    }

    .top-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 0.4rem;
      align-items: center;
      color: var(--ex-default-font-color);

      .bank-type {
        font-size: 16px;
        font-weight: bold;
        color: var(--ex-default-font-color);
        position: relative;

        .scl {
          color: var(--ex-font-color8);
          padding-left: 5px;
          font-size: 14px;
        }
      }
    }

    .name {
      color: var(--ex-default-font-color);
      font-size: 14px;
      padding-top: 10px;
    }

    .bankNumber {
      font-size: 20px;
      color: var(--ex-default-font-color);
      padding-top: 10px;
    }

    .bank {
      margin-top: 10px;
      font-size: 14px;
      color: var(--ex-default-font-color);
    }
  }

  .bianji {
    font-size: 14px;
  }
}
</style>
