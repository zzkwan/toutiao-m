<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div>
        <span>全部删除</span>
        <span>完成</span>
      </div>
    </van-cell>
    <van-cell title="搜索">
      <template #right-icon>
        <van-icon name="close" class="close-icon" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
};
</script>

<style>
</style>