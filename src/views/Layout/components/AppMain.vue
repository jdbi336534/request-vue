<!-- appmain -->
<template>
    <section class="app-main" style="min-height: calc(100% - 50px);">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </section>
</template>
<script>
export default {
    components: {},
    name: 'AppMain',
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {}
};
</script>
