<!-- appmain -->
<template>
    <section class="app-main">
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
