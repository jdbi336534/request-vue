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
        return {};
    },
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar;
        }
    },
    created() {},
    mounted() {
    },
    methods: {}
};
</script>
<style lang='scss' scoped>
.app-wrapper {
    height: 100%;
    width: 100%;
    position: relative;
    .main-container {
        background: #f0f;
        min-height: 100%;
        transition: margin-left 0.28s;
        margin-left: 180px;
    }
    .sidebar-container {
        background: green;
        transition: width 0.28s;
        width: 180px;
        height: 100%;
        position: fixed;
        // font-size: 0px;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
    }
}
</style>
