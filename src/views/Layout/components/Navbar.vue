<!-- nav bar -->
<template>
  <el-menu class="navbar"
           mode="horizontal">
    <hamburger class="hamburger-container"
               :toggleClick="toggleSideBar"
               :isActive="sidebar.opened"></hamburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <!-- 全屏显示 -->
      <screenfull class="screenfull right-menu-item"></screenfull>
      <!-- 使用文档 -->
      <el-tooltip class="right-menu-item doc"
                  effect="dark"
                  content="使用文档"
                  placement="bottom">
        <div class="right-menu-item doc">
          <i class="fa fa-question-circle-o"
             aria-hidden="true"></i>
        </div>
      </el-tooltip>

      <!-- 系统消息 -->
      <bell class="right-menu-item" />
      <!-- 用户下拉框 -->
      <el-dropdown class="avatar-container right-menu-item"
                   @command="handleCommand">
        <div class="avatar-wrapper">
          {{userInfo.nickname}}
          <i class="el-icon-arrow-down el-icon--right"></i>
          <!-- <i class="el-icon-caret-bottom"></i> -->
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item command="first">
              首页
            </el-dropdown-item>
          </router-link>
          <a target='_blank'
             href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item command="second">
              项目地址
            </el-dropdown-item>
          </a>
          <el-dropdown-item command="logout"
                            divided>
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import Bell from '@/components/Bell'
import Screenfull from '@/components/Screenfull'
import util from '@/util'
import { getCurrentUserInfo } from '@/service/system/users'
export default {
  components: {
    Hamburger,
    Breadcrumb,
    Screenfull,
    Bell
  },
  name: 'Navbar',
  data() {
    return {
      userInfo: {
        realName: ''
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  created() {
    this.getUserInfo();
  },
  mounted() { },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    handleCommand(command) {
      if (command === 'logout') {
        util.removeStorage('access_token');
        this.$router.push({
          path: '/login'
        });
      }
    },
    async getUserInfo() {
      let res = await getCurrentUserInfo();
      if (res) {
        util.setInfo(JSON.stringify(res));
        let info = util.getInfo();
        if (info) {
          this.userInfo = JSON.parse(info);
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  .hamburger-container {
    height: 50px;
    float: left;
    display: flex;
    vertical-align: middle;
    align-items: center;
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    padding-right: 10px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      padding: 0 12px;
      cursor: pointer;
      color: rgb(96, 98, 102);
    }
    .doc {
      font-size: 18px;
      &:hover {
        background: rgb(230, 247, 255);
      }
    }
    .avatar-container {
      &:hover {
        background: rgb(230, 247, 255);
      }
    }
    .screenfull {
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>
