<template>
  <div class="search-suggestion">
    <van-cell-group>
      <van-cell
        v-for="(suggestion, index) in searchSuggestion"
        :key="index"
        :title="suggestion"
        icon="search"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";

export default {
  name: "SearchSuggetion",
  data() {
    return {
      searchSuggestion: [],
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  computed: {},
  watch: {
    searchText: {
      async handler() {
        const { data } = await getSearchSuggestions(this.searchText);
        this.searchSuggestion = data.data.options;
        // console.log(data);
      },
      immediate: true, //该回调会在侦听开始时立即调用
    },
  },
  components: {},
};
</script>

<style>
</style>