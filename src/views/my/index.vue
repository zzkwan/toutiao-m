<template>
  <div class="my-container">
    <!-- <div class="user-info">
      <div class="base-info"></div>
      <div class="data-info"></div>
    </div> -->
    <van-cell-group v-if="user" class="my-info">
      <van-cell center class="base-info" :border="false">
        <template #icon>
          <van-image class="avatar" round fit="cover" src="banner.png" />
          <!-- currentUser.photo -->
        </template>
        <template #title>
          <div class="name">currentUser.name</div>
        </template>
        <van-button size="small" round class="update-btn">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <!-- <van-grid-item text="头条" class="data-info-item">
          <template #icon>12</template>
        </van-grid-item>
        <van-grid-item text="关注" class="data-info-item">
          <template #icon>12</template>
        </van-grid-item>
        <van-grid-item text="粉丝" class="data-info-item">
          <template #icon>12</template>
        </van-grid-item>
        <van-grid-item text="获赞" class="data-info-item">
          <template #icon>12</template>
        </van-grid-item> -->
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="text-wrap">
              <!-- currentUser.art_count -->
              <div class="count">1</div>
              <div class="text">头条</div>
            </div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="text-wrap">
              <!-- currentUser.follow_count -->
              <div class="count">1</div>
              <div class="text">关注</div>
            </div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="text-wrap">
              <!-- currentUser.fans_count -->
              <div class="count">1</div>
              <div class="text">粉丝</div>
            </div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="text-wrap">
              <!-- currentUser.like_count -->
              <div class="count">1</div>
              <div class="text">获赞</div>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div v-else class="not-login">
      <div @click="$router.push('/login')">
        <img class="mobile" src="./头像.png" alt="" />
      </div>
      <div class="text">登录/注册</div>
    </div>

    <van-grid :column-num="2" class="nav-search">
      <van-grid-item icon="star-o" text="收藏" class="nav-search-item" />
      <van-grid-item icon="clock-o" text="历史" class="nav-search-item" />
    </van-grid>
    <van-cell title="消息通知" is-link url="/vant/mobile.html" />
    <van-cell title="小锴同学" is-link to="index" />
    <van-button
      type="default"
      block
      class="logout"
      v-if="user"
      @click="onLogout"
    >
      退出登录
    </van-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getCurrentUser } from "@/api/user";
export default {
  name: "my-index",
  data() {
    currentUser: {
    }
  },
  methods: {
    ...mapMutations(["setUser"]),
    async loadCurrentUser() {
      const { data } = await getCurrentUser();
      console.log(data);
      this.currentUser = data.data;
    },
    onLogout() {
      //提示确认退出
      this.$dialog
        .confirm({
          title: "退出提示",
          message: "确认退出吗",
        })
        .then(() => {
          // on confirm
          // this.$store.commit("setUser", null);
          this.setUser(null);
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.loadCurrentUser();
    // getCurrentUser();
  },
};
</script>

<style lang="less">
body {
  background-color: #f5f7f9;
}
.my-container {
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;

    .base-info {
      box-sizing: border-box;
      background-color: unset;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        color: #fff;
        font-size: 15px;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666;
      }
    }
    .data-info {
      .van-grid-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    .van-grid-item__content {
      background-color: unset;
    }
  }
  .not-login {
    height: 180px;
    background: url("banner.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
  .nav-search {
    margin-bottom: 5px;
    .nav-search-item {
      height: 70px;
      .van-icon {
        font-size: 22px;
      }
      .van-icon-star-o {
        color: #ed6465;
      }
      .van-icon-clock-o {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .logout {
    margin-top: 5px;
    color: #d86262;
  }
}
</style>