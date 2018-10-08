<!-- 登录页面 -->
<template>
  <div class="login">
    <div class="top"></div>
    <div class="login-box">
      <div class="left">
        <img src="../../assets/login/111.png"
             alt="">
      </div>
      <div class="right">
        <div class="form">
          <h1 class="title">数据统一调度平台 </h1>
          <el-alert style="width:380px;margin:0 auto;"
                    v-if="msg!=''"
                    :title="msg"
                    type="error"
                    show-icon
                    :closable="false">
          </el-alert>
          <div class="form_item">
            <label>
              <i class="user-icon"></i>
              <input class="username"
                     type="text"
                     placeholder="请输入用户名"
                     v-model="userName"></label>
          </div>
          <div class="form_item">
            <label>
              <i class="password-icon"></i>
              <input type="password"
                     placeholder="请输入密码"
                     v-model="password"></label>
          </div>
          <div class="form_item">
            <button type="submit"
                    :disabled="loading"
                    :class="{'is-loading':loading}"
                    @click="handleSubmit">
              <i class="fa fa-spinner fa-pulse fa-fw"
                 v-show="loading"></i>
              <span>登</span>
              <span>录</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script>
import { login } from '@/service/login';
import util from '@/util';
export default {
  components: {},
  name: '',
  data() {
    return {
      msg: '',
      userName: '',
      password: '',
      loading: false
    };
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {
    async handleSubmit() {
      let userName = this.userName;
      let password = this.password;
      if (!userName) {
        this.tipError('用户名不能为空！');
        return false;
      }
      if (!password) {
        this.tipError('密码不能为空！');
        return false;
      }
      this.loading = true;
      let res = await login(this.userName, this.password);
      this.loading = false;
      if (res) {
        if (res.token) {
          util.setInfo(res.token, 'access_token');
          this.$router.push({
            path: 'dashboard'
          })
        } else {
          this.tipError(res.msg || '服务器发生错误！请稍后重试');
        }
      }
    },
    tipError(msg) {
      if (msg.length > 50) {
        this.msg = msg.substring(0, 50);
      } else {
        this.msg = msg;
      }
      setTimeout(() => {
        this.msg = '';
      }, 4000);
    }
  }
};
</script>
<style lang='scss' scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(../../assets/login/background.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;

  .top {
    height: 23.7%;
  }
  .bottom {
    height: 13.9%;
  }
  .login-box {
    flex: 1;
    display: flex;
    align-items: center;
    padding-bottom: 90px;
    width: 90%;
    min-width: 1280px;
    margin: 0 auto;
    overflow: hidden;
    .left {
      box-sizing: border-box;
      float: left;
      width: 52%;
      height: 380px;
      img {
        float: right;
      }
    }
    .right {
      box-sizing: border-box;
      float: left;
      width: 48%;
      padding-left: 64px;
      .form {
        width: 500px;
        padding-bottom: 40px;
        margin: 0 auto;
        margin-bottom: 20px;
        border-radius: 6px;
        border: 1px solid rgba(66, 164, 245, 0.09);
        box-shadow: 5px 10px 20px rgba(66, 164, 245, 0.2);
        .title {
          text-align: center;
          font-family: Impact;
          font-size: 24px;
          color: #3b77db;
          letter-spacing: 7.2px;
          padding: 40px 0 20px 0;
        }
        .form_item {
          width: 248px;
          margin: 0 auto;
          margin-top: 30px;
          button {
            margin-top: 20px;
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            background: #fff;
            border: 0px;
            border-color: #dcdfe6;
            color: #606266;
            -webkit-appearance: none;
            box-sizing: border-box;
            outline: none;
            width: 240px;
            height: 32px;
            background: url(../../assets/login/btn.png) no-repeat;
            font-size: 12px;
            color: #ffffff;
            &.is-loading {
              position: relative;
              pointer-events: none;
              &:before {
                pointer-events: none;
                content: '';
                position: absolute;
                left: -1px;
                top: -1px;
                right: -1px;
                bottom: -1px;
                border-radius: inherit;
                background-color: hsla(0, 0%, 100%, 0.35);
              }
            }
            span {
              font-size: 12px;
              color: #ffffff;
              text-align: center;
            }
            span + span {
              margin-left: 60px;
            }
          }
          input::-webkit-input-placeholder {
            /* WebKit, Blink, Edge */
            font-size: 14px;
            color: #9b9b9b;
          }
          input:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            font-size: 14px;
            color: #9b9b9b;
          }
          input::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            font-size: 14px;
            color: #9b9b9b;
          }
          input::-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            font-size: 14px;
            color: #9b9b9b;
          }
          input[type='text'],
          input[type='password'] {
            font-size: 14px;
            color: #4a4a4a;
            height: 22px;
            width: 198px;
            margin-left: 20px;
            border: none;
            border-bottom: 1px solid #d4d4d4;
            outline: none;
            background: transparent;
          }
          .user-icon {
            width: 16px;
            height: 18px;
            vertical-align: middle;
            display: inline-block;
            background: url(../../assets/login/user.png) no-repeat;
          }
          .password-icon {
            width: 16px;
            height: 18px;
            vertical-align: middle;
            display: inline-block;
            background: url(../../assets/login/lock.png) no-repeat;
          }
        }
      }
    }
  }
}
</style>
