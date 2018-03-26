<!-- 测试代码 -->
<template>
  <div id="main"></div>
</template>
<script>
export default {
    components: {},
    name: 'Test',
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        init() {
            // 初始化场景
            let scene = new THREE.Scene();
            // 初始化相机
            let FOV = 60;
            let FAR = 10000;
            let NEAR = 0.1;
            let CLIENT_WIDTH = this.$el.clientWidth;
            let CLIENT_HEIGHT = this.$el.clientHeight;
            let ASPECT = SCENE_WIDTH / SCENE_HEIGHT;
            let cameraX = 0;
            let cameraY = 3;
            let cameraZ = 6.7;
            let camera = new THREE.PerspectiveCamera(
                this.FOV,
                this.ASPECT,
                this.NEAR,
                this.FAR
            );
            camera.position.set(
                this.cameraX *
                    1.3 *
                    Math.sin(THREE.Math.degToRad(this.speed + 0.01)),
                this.cameraY,
                this.cameraZ *
                    1.3 *
                    Math.cos(THREE.Math.degToRad(this.speed + 0.01))
            );
            camera.lookAt(scene.position);
            scene.add(camera);
        }
    }
};
</script>
<style scoped>
#main {
    height: 100%;
    width: 100%;
}
</style>
