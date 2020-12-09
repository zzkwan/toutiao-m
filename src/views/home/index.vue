<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <template #title>
        <van-button
          icon="search"
          type="default"
          round
          size="small"
          class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab
        class="tab-item"
        :title="channel.name"
        :key="channel.id"
        v-for="channel in UserChannels"
      >
        <article-list :channel="channel" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import articleList from "./components/article-list";

export default {
  name: "home-index",
  created() {
    this.loadChannels();
  },
  data() {
    return {
      active: 0, //控制被激活的标签
      UserChannels: [],
    };
  },
  methods: {
    async loadChannels() {
      const { data } = await getUserChannels();
      this.UserChannels = data.data.channels;
    },
  },
  components: {
    articleList,
  },
};
</script>

<style lang="less">
.home-container {
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    background-color: #5babfb;
    border: none;
    color: #fff;
    width: 277px;
    height: 32px;
    .van-icon {
      font-size: 16px;
      color: #fff;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .channel-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    .van-tabs__line {
      bottom: 20px;
      width: 15px;
      height: 3px;
      background-color: #3296fa;
    }
  }
}
</style>>
