<!-- sidebar -->
<template>
    <el-menu 
    mode="vertical" 
    unique-opened 
    :default-active="$route.path" 
    :collapse="isCollapse" 
    background-color="#304156" 
    text-color="#fff" 
    active-text-color="#409EFF"
    >
        <menu-item :routes="permission_routers"></menu-item>
    </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import MenuItem from './Menuitem'
export default {
  components: {
    MenuItem
  },
  name: '',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      console.log(!this.sidebar.opened)
      return !this.sidebar.opened
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang='scss' scoped>

</style>
