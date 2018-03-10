<!-- 测试代码 -->
<template>
    <div>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
        </ul>
    </div>
</template>
<script>
import { login, queryActivities } from '@/services/test';
export default {
    components: {},
    name: 'Test',
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {
        this.getData();
    },
    methods: {
        async loginSystem(userName, password) {
            let res = await login({ userName, password });
            console.log(res);
        },
        async getData() {
            let res = await queryActivities();
            console.log('getData:', res);
        }
    }
};
</script>
<style scoped>

</style>
