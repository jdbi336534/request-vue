<!-- appmain -->
<template>
    <section class="app-main">
        <div class="app-main-wrap">
            <transition name="fade"
                        mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
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
    created() { },
    mounted() { },
    methods: {}
};
</script>
