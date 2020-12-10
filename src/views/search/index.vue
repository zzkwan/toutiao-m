<template>
  <div class="search-container">
    <!-- 搜索 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow"></search-result>

    <!-- 联想建议 -->
    <search-suggetion
      v-else-if="searchText"
      :search-text="searchText"
    ></search-suggetion>
    <!-- 历史记录 -->
    <search-history v-else></search-history>
  </div>
</template>

<script>
import SearchSuggetion from "./components/search-suggestion";
import SearchHistory from "./components/search-history";
import SearchResult from "./components/search-result";
export default {
  name: "SearchIndex",
  data() {
    return {
      searchText: "",
      isResultShow: false, //控制搜索结果的状态
    };
  },
  components: {
    SearchSuggetion,
    SearchHistory,
    SearchResult,
  },
  methods: {
    onSearch() {
      this.isResultShow = true;
    },
  },
};
</script>

<style lang="less" scoped>
</style>