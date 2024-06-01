<template>
  <div class="itemRow">
    <div class="header">
      <div class="left">
        <image-load :filePath="currentImg" class="headerImg" />
        <div v-if="bottomList.length > 0" class="leftBottom">
          <div v-for="(item, index) in bottomList" :key="index" class="item">{{ item.name }}</div>
        </div>
      </div>
      <div class="right">
        <div v-for="(item, index) in rightList" :key="index" class="item">
          <div>{{ item.leftName }}</div>
          <div class="itemR">{{ item.rightName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  currentImg: {
    type: String,
    default: () => ''
  },
  // 右侧list
  rightList: {
    type: Array,
    default: () => []
  },
  // 最下测list
  bottomList: {
    type: Array,
    default: () => []
  }
})
</script>
<style lang="scss" scoped>
.itemRow {
  padding: 10px;
  background-color: #fafafa;
  .header {
    display: flex;
    .left {
      .headerImg {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 3px;
      }
      .leftBottom {
        background-color: var(--ex-default-background-color);
        padding: 10px;
        .item {
          margin-bottom: 10px;
          font-size: 12px;
          font-weight: bold;
          color: var(--ex-font-color6);
        }
        .item:last-child {
          margin-bottom: 0;
        }
      }
    }

    .right {
      flex: 1;
      margin-left: 10px;
      font-size: 12px;
      font-weight: 400;
      color: var(--ex-passive-font-color);
      .item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 17px;
        .itemR {
          font-weight: bold;
          color: var(--ex-font-color6);
        }
      }
      .item:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
