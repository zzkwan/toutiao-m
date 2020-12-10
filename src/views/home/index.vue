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
          to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model:active="active" class="channel-tabs">
      <van-tab
        class="tab-item"
        :title="channel.name"
        :key="channel.id"
        v-for="channel in UserChannels"
      >
        <article-list :channel="channel" />
      </van-tab>
      <template #nav-right>
        <div class="nav-right-back"></div>
        <div>
          <van-icon
            name="wap-nav"
            class="wap-nav-icon"
            @click="isChannelEditShow = true"
          />
        </div>
      </template>
    </van-tabs>
    <van-popup
      v-model:show="isChannelEditShow"
      position="bottom"
      class="channel-edit"
      closeable
      close-icon-position="top-left"
      get-container="body"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :userChannels="UserChannels"
        :active="active"
        @close="isChannelEditShow = false"
        @update-active="change"
      ></channel-edit>
      <!-- 无法修改active -->
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import articleList from "./components/article-list";
import ChannelEdit from "./components/channel-edit";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";

export default {
  name: "home-index",
  created() {
    this.loadChannels();
  },
  data() {
    return {
      isChannelEditShow: false, //控制编辑频道的显示
      active: 0, //控制被激活的标签
      UserChannels: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async loadChannels() {
      let channels = [];
      if (this.user) {
        const { data } = await getUserChannels();
        channels = data.data.channels;
      } else {
        const localChannels = getItem("user-channels");
        if (localChannels) {
          channels = localChannels;
        } else {
          const { data } = await getUserChannels();
          channels = data.data.channels;
        }
      }
      this.UserChannels = channels;
    },
    change(index) {
      console.log(index);
      this.active = index;
    },
  },
  components: {
    articleList,
    ChannelEdit,
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
  .nav-right-back {
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-icon {
    // &:before {
    //   content: "";
    //   display: inline-block;
    //   height: 43px;
    //   width: 1px;
    //   background: url("./line.png") no-repeat;
    //   background-size: cover;
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    // }

    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(#fff, 0.9);
  }
}
</style>>
