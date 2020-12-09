<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isReflashLoading"
      @refresh="onRefresh"
      :success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="vanlist"
      >
        <article-item
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article, index) in articles"
          :key="index"
          :title="article.title"
        >
        </van-cell> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import { Toast } from "vant";
import ArticleItem from "@/components/article-item";

export default {
  name: "articleList",
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  components: {
    ArticleItem,
  },
  data() {
    return {
      reflashSuccessText: null,
      isReflashLoading: false,
      articles: [],
      onLoading: false,
      loading: false,
      finished: false,
      timestamp: null,
    };
  },
  methods: {
    async onRefresh() {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1, //是否包含置顶，1置顶，0不包含
      });
      const { results } = data.data;
      this.articles.unshift(...results);

      this.isReflashLoading = false;

      this.reflashSuccessText = `更新了${results.length}条数据`;
      Toast(this.reflashSuccessText);
    },
    async onLoad() {
      if (!this.onLoading) {
        this.onLoading = true;
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1, //是否包含置顶，1置顶，0不包含
        });

        const { results } = data.data;
        this.articles.push(...results);
        this.loading = false;

        if (results.length) {
          // 更新获取下一页数据的页码
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 没有数据了，把加载状态设置结束，不再触发加载更多
          this.finished = true;
        }

        this.onLoading = false;
      }
    },
  },
};
</script>

<style lang="less">
.article-list {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
</style>