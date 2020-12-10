<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <template #title class="channel-title"> 我的频道 </template>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in editChannels"
        :icon="isEdit && index != 0 ? 'clear' : ''"
        :key="index"
        :text="channel.name"
        class="grid-item"
        :class="{ active: index == active }"
        @click="onUserChannelClick(channel, index)"
      />
    </van-grid>

    <van-cell center :border="false">
      <template #title class="channel-title"> 频道推荐 </template>
    </van-cell>
    <!-- <div>{{ UserChannels }}</div> -->
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";

export default {
  name: "ChannelEdit",
  data() {
    return {
      isEdit: false,
      editChannels: [],
      allChannels: [],
    };
  },
  created() {
    this.loadAllChannels();
    this.getChannels();
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.editChannels.find((userChannel) => {
          return userChannel.id === channel.id;
        });
      });
    },
    ...mapState(["user"]),
  },
  props: {
    userChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getChannels() {
      this.editChannels = this.userChannels;
    },
    async loadAllChannels() {
      const { data } = await getAllChannels();
      this.allChannels = data.data.channels;
    },
    async onAdd(channel) {
      this.editChannels.push(channel);
      // 数据持久化;
      if (this.user) {
        await addUserChannel({
          channels: [{ id: channel.id, seq: this.editChannels.length }],
        });
      } else {
        setItem("user-channels", this.editChannels);
      }
    },
    onUserChannelClick(channel, index) {
      if (this.isEdit && index != 0) {
        this.deleteChannel(channel, index);
      } else {
        this.switchChannel(index);
      }
    },
    async deleteChannel(channel, index) {
      if (index <= this.active) {
        this.$emit("update-active", this.active - 1);
      }
      this.editChannels.splice(index, 1);
      //数据持久化
      if (this.user) {
        //线上
        await deleteUserChannel(channel.id);
      } else {
        setItem("user-channels", this.editChannels);
      }
    },
    switchChannel(index) {
      this.$emit("update-active", index);
      this.$emit("close", index);
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333333;
  }
  .grid-item {
    position: relative;
    width: 80px;
    height: 43px;
    /deep/.van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222222;
        margin-top: 0;
      }
    }
    /deep/.van-icon-clear {
      position: absolute;
      top: -5px;
      right: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .active {
    /deep/.van-grid-item__text {
      color: red !important;
    }
  }
}
</style>