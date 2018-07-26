<!-- nav bar -->
<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
  <breadcrumb class="breadcrumb-container"></breadcrumb>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    Hamburger,
    Breadcrumb
  },
  name: '',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  created() {},
  mounted() {},
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
    padding: 0 10px;
  }
}
</style>
