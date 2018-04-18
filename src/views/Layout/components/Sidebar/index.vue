<!-- sidebar -->
<template>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    components: {},
    name: '',
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['sidebar']),
        isCollapse() {
            return !this.sidebar.opened;
        }
    },
    created() {},
    mounted() {},
    methods: {}
};
</script>
<style lang='scss' scoped>

</style>
