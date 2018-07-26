<!-- Layout -->
<template>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <navbar />
            <app-main />
        </div>
    </div>
</template>
<script>
import AppMain from '@/views/layout/components/AppMain'
import Navbar from '@/views/layout/components/Navbar'
import Sidebar from '@/views/layout/components/Sidebar'
export default {
  components: {
    AppMain,
    Navbar,
    Sidebar
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
