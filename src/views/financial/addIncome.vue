<template>
  <HeaderBar :currentName="_t18('value_added _income')" />
  <div v-if="listArray.length > 0 && !isShow" class="funList">
    <ItemFund v-for="item in listArray" :key="item.id" :itemObj="item" />
  </div>
  <Nodata v-if="listArray.length === 0 && isShow" />
</template>
<script setup>
import { onMounted, ref } from 'vue'

import { getFinancial } from '@/api/financial/index'
import HeaderBar from '@/components/HeaderBar/index.vue'
import { _t18 } from '@/utils/public'

import ItemFund from './components/itemFund.vue'

const listArray = ref([])
const isShow = ref(false)
const getInit = async () => {
  try {
    let data = {
      classify: '2'
    }
    const res = await getFinancial(data)
    if (res.code === 200) {
      listArray.value = res.rows
      listArray.value.length === 0 ? (isShow.value = true) : (isShow.value = false)
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getInit()
})
</script>
<style lang="scss" scoped>
.funList {
  padding: 20px 15px 0px;
}
</style>
