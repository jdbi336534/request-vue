<!-- nav bar -->
<template>
  <el-menu class="navbar"
           mode="horizontal">
    <hamburger class="hamburger-container"
               :toggleClick="toggleSideBar"
               :isActive="sidebar.opened"></hamburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">

      <screenfull class="screenfull right-menu-item"></screenfull>

      <el-dropdown class="avatar-container right-menu-item"
                   trigger="click">
        <div class="avatar-wrapper">
          王晓文
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target='_blank'
             href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              项目地址
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
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
import Screenfull from '@/components/Screenfull'
export default {
  components: {
    Hamburger,
    Breadcrumb,
    Screenfull,
  },
  name: '',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  created() { },
  mounted() { },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>
<style lang='scss' scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 16px;
    display: flex;
    vertical-align: middle;
    align-items: center;
    &:hover {
      background: rgb(230, 247, 255);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
      line-height: 20px;
      vertical-align: middle;
    }
  }
}
</style>
