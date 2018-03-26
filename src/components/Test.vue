<!-- 测试代码 -->
<template>
  <div id="screen"></div>
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
  mounted() {
    // this.$nextTick(() => {
      this.init();
    // });
  },
  methods: {
    init() {
      // 初始化场景
      let scene = new THREE.Scene();
      // 初始化相机
      let FOV = 60;
      let FAR = 10000;
      let NEAR = 0.1;
      let speed = 0;
      let SCENE_WIDTH = this.$el.clientWidth;
      // let SCENE_WIDTH = document.getElementById('screen').offsetWidth;
      let SCENE_HEIGHT = this.$el.clientHeight;
      // let SCENE_HEIGHT = document.getElementById('screen').offsetHeight;
      let ASPECT = SCENE_WIDTH / SCENE_HEIGHT;
      let cameraX = 0;
      let cameraY = 3;
      let cameraZ = 6.7;
      let camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
      camera.position.set(
        cameraX * 1.3 * Math.sin(THREE.Math.degToRad(speed + 0.01)),
        cameraY,
        cameraZ * 1.3 * Math.cos(THREE.Math.degToRad(speed + 0.01))
      );
      camera.lookAt(scene.position);
      scene.add(camera);
      // 初始化背景
      let renderer = new THREE.WebGLRenderer();
      renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);
      renderer.setClearColor('#0A0F21', 1.0);
      renderer.setPixelRatio(window.devicePixelRatio * 2);
      // 初始化灯光
      let pointLight = new THREE.PointLight(0xffffff);
      pointLight.position.set(0, 20, 20);
      scene.add(pointLight);
      // 初始化星星背景
      let uniforms = {
        color: {
          value: new THREE.Color(0xffffff)
        },
        texture: {
          value: new THREE.TextureLoader().load('static/spark1.png')
        }
      };
      let shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
      });
      let particles = 2000;
      let radius = 360;
      let geometry = new THREE.BufferGeometry();
      let positions = new Float32Array(particles * 3);
      let colors = new Float32Array(particles * 3);
      let sizes = new Float32Array(particles);
      let color = new THREE.Color();
      for (let i = 0, i3 = 0; i < particles; i++, i3 += 3) {
        positions[i3 + 0] = (Math.random() * 2 - 1) * radius;
        positions[i3 + 1] = (Math.random() * 2 - 1) * radius;
        positions[i3 + 2] = (Math.random() * 2 - 1) * radius;
        color.setHSL(0.5, 0.8, 1); // 0.5 1.0 .0.5 蓝色
        colors[i3 + 0] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        sizes[i] = 5;
      }
      geometry.addAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.addAttribute(
        'customColor',
        new THREE.BufferAttribute(colors, 3)
      );
      geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
      let particleSystem = new THREE.Points(geometry, shaderMaterial);
      scene.add(particleSystem);
      // 初始化中心球
      let glowMat = new THREE.ShaderMaterial({
        uniforms: {
          c: {
            type: 'f',
            value: 1.0
          },
          p: {
            type: 'f',
            value: 1.75
          },
          glowColor: {
            type: 'c',
            value: new THREE.Color(0x00c7ff)
          },
          viewVector: {
            type: 'v3',
            value: camera.position
          }
        },
        vertexShader: document.getElementById('glowMatVertexShader').textContent,
        fragmentShader: document.getElementById('glowMatFragmentShader').textContent,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      let ballGeo = new THREE.SphereGeometry(1.12, 32, 32);
      let ball = new THREE.Mesh(ballGeo, glowMat);
      ball.position.set(0, 0.8, 0);
      scene.add(ball);
      // 初始化轨道线
      let total = 10;
      let length = Math.ceil(Math.log(total + 2) / Math.log(2) - 1);
      if (length < 5) {
        length = 5;
      }
      for (let i = 1; i < length + 1; i++) {
        let track = new THREE.Points(new THREE.TorusGeometry(2 + 1 * i, 0.002, 2, 200), new THREE.PointsMaterial({
          color: '#03E2F7',
          side: 0.08,
          size: 0.015
        }));
        if (!(i % 2)) {
          track = new THREE.Mesh(new THREE.TorusGeometry(2 + 1 * i, 0.004, 2, 100), new THREE.MeshBasicMaterial({
            color: '#03E2F7',
            side: THREE.DoubleSide
          }));

          let track1 = new THREE.Mesh(new THREE.TorusGeometry(1.7 + 1 * i, 0.004, 2, 100), new THREE.MeshBasicMaterial({
            color: '#BFBF00',
            side: THREE.DoubleSide,
          }));
          track1.position.y = 1;
          track1.rotation.x = -Math.PI / 2;
          scene.add(track1);
        }
        track.position.y = 1;
        track.rotation.x = -Math.PI / 2;
        scene.add(track);
      }
      // 将场景加入页面
      renderer.render(scene, camera);
      document.getElementById('screen').appendChild(renderer.domElement);
    }
  }
};
</script>
<style scoped>
#screen {
  height: 100%;
  width: 100%;
  overflow:hidden;
}
</style>
