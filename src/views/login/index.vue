<template>
  <!-- <div class="login-container">登录页面</div> -->
  <van-nav-bar
    class="app-nav-bar"
    title="注册/登录"
    left-arrow
    @click-left="$router.back"
  />
  <van-form
    @submit="onLogin"
    :show-error="false"
    :show-error-message="false"
    @failed="onFailed"
    :validate-first="true"
    ref="loginForm"
  >
    <van-field
      v-model="user.mobile"
      icon-prefix="icon"
      left-icon="shouji"
      placeholder="请输入手机号"
      name="mobile"
      :rules="formRules.mobile"
    />
    <van-field
      v-model="user.code"
      clearable
      center
      icon-prefix="icon"
      left-icon="yanzhengma"
      placeholder="请输入验证码"
      name="code"
      :rules="formRules.code"
    >
      <template #button>
        <van-button
          size="small"
          type="round"
          class="nav-button"
          :disabled="true"
          v-if="isCount"
        >
          <van-count-down
            :time="time"
            format="ss s"
            @finish="(isCount = false), (isSendLoading = false)"
          />
        </van-button>
        <van-button
          size="small"
          type="round"
          class="nav-button"
          @click="onSendSms"
          v-else
          :loading="isSendLoading"
        >
          发送验证码
        </van-button>
      </template>
    </van-field>
    <div class="search-button-wrap">
      <van-button
        type="primary"
        block
        class="search-button"
        native-type="submit"
      >
        登录
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { login, sendSms } from "@/api/user";
import { Toast } from "Vant";

export default {
  name: "loginIndex",
  data() {
    return {
      isSendLoading: false,
      isCount: false,
      time: 60 * 1000,
      user: {
        mobile: "", //手机号
        code: "", //验证码
      },
      formRules: {
        mobile: [
          { required: true, message: "请填写手机号" },
          { pattern: /^1[1|3|7|8|9]\d{9}$/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
    };
  },
  methods: {
    async onLogin() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const { data } = await login(this.user);
        //处理响应结果
        Toast.success("登录成功");
        this.$store.commit("setUser", data.data);
        //跳转
        this.$router.back();
      } catch (err) {
        Toast.fail("登录失败，手机号或验证码错误");
        console.log(err);
        console.log(登陆失败);
      }
    },
    onFailed(error) {
      if (error.errors[0]) {
        Toast({
          message: error.errors[0].message,
          position: "top",
        });
      }
    },
    async onSendSms() {
      this.isSendLoading = true;
      //校验手机号
      try {
        await this.$refs["loginForm"].validate("mobile");
        //验证通过，发送验证码
        const res = await sendSms(this.user.mobile);
        this.isCount = true;
        //处理响应结果
        // console.log(res);
      } catch (err) {
        let message = "";
        if (err && err.response && err.response.status === 429) {
          message = "发送过于频繁，请一分钟后再试";
        } else if (err.name === "mobile") {
          message = err.message;
        } else {
          message = "发送失败，请稍后重试";
        }

        Toast({
          message,
          position: "top",
        });
      }
      this.isSendLoading = false;

      //请求发送验证码->显示倒计时->倒计时结束隐藏倒计时显示发送按钮
    },
  },
};
</script>

<style>
body {
  background-color: #f5f7f9;
}
.search-button-wrap {
  padding: 26px 16px;
}
.search-button {
  font: 15px;
  border-radius: 10px;
  background-color: #6db4fb;
  border: none;
}
.nav-button {
  width: 76px;
  height: 23px;
  font-size: 11px;
  background-color: #ededed;
  border: none;
  color: #666666;
}
</style>