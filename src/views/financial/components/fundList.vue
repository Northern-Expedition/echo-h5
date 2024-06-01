<template>
  <div v-if="listArray.length > 0 && !isShow" class="funList">
    <ItemFund v-for="item in listArray" :key="item.id" :itemObj="item" />
  </div>
  <Nodata v-if="listArray.length === 0 && isShow" />
</template>
<script setup>
import { onMounted, ref } from 'vue'

import { getFinancial } from '@/api/financial/index'

import ItemFund from './itemFund.vue'

const listArray = ref([])
const isShow = ref(false)
const getInit = async () => {
  try {
    let data = {
      classify: ''
    }
    const res = await getFinancial(data)
    if (res.code === 200) {
      listArray.value = res.rows
      listArray.value.length === 0 ? (isShow.value = true) : (isShow.value = false)
    }
  } catch (error) {
    console.log(45)
  }
}
onMounted(() => {
  getInit()
})
</script>
<style lang="scss" scoped>
.funList {
  padding: 0.533333rem 0.4rem 1.76rem;
}
</style>
