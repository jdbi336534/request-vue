<!-- Layout -->
<template>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
        <side-bar class="sidebar-container"></side-bar>
        <div class="main-container">
            <nav-bar />
            <app-main />
        </div>
    </div>
</template>
<script>
import AppMain from '@/views/layout/components/AppMain'
import NavBar from '@/views/layout/components/Navbar'
import SideBar from '@/views/layout/components/Sidebar'
export default {
  components: {
    AppMain,
    NavBar,
    SideBar
  },
  name: 'layout',
  data() {
    return {}
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang='scss' scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
