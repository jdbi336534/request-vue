<!-- 全屏显示组件 -->
<template>
    <div :title="isFullscreen?'退出全屏':'全屏显示'">
        <!-- 进入全屏 -->
        <svg v-if="!isFullscreen"
             class="icon screenfull-svg"
             @click="click"
             viewBox="0 0 1024 1024"
             version="1.1"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M560.222793 381.509017 738.680231 203.323778 599.320253 63.962777l357.480764 0 0 357.482811L817.440016 282.08254 639.254777 460.542025 560.222793 381.509017zM560.222793 640.113843l178.458461 178.185238L599.320253 957.661106l357.480764 0 0-357.481787L817.440016 739.541343 639.254777 561.082882 560.222793 640.113843zM459.678866 640.113843 281.221428 818.299081l139.362025 139.362025L63.100642 957.661106l0-357.481787 139.362025 139.362025 178.185238-178.458461L459.678866 640.113843zM459.678866 381.509017 281.221428 203.323778 420.583452 63.962777 63.100642 63.962777l0 357.482811 139.362025-139.362025L380.647905 460.542025 459.678866 381.509017zM459.678866 381.509017" />
        </svg>
        <!-- 退出全屏 -->
        <svg v-if="isFullscreen"
             class="icon screenfull-svg"
             @click="click"
             viewBox="0 0 1024 1024"
             version="1.1"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M786.752 877.248 933.504 1024 1024 933.504 877.248 786.752 1024 640 640 640 640 1024zM0 384 384 384 384 0 237.248 146.752 92 1.376 1.504 91.872 146.752 237.248zM0 933.504 90.496 1024 237.248 877.248 384 1024 384 640 0 640 146.752 786.752zM640 384 1024 384 877.248 237.248 1022.752 91.872 932.256 1.376 786.752 146.752 640 0z" />
        </svg>
    </div>
</template>
<script>
import screenfull from 'screenfull'
export default {
    components: {},
    name: 'screenfull',
    props: {
        width: {
            type: Number,
            default: 22
        },
        height: {
            type: Number,
            default: 22
        },
        fill: {
            type: String,
            default: '#48576a'
        }
    },
    data() {
        return {
            isFullscreen: false
        };
    },
    computed: {},
    created() { },
    mounted() {
        this.change();
    },
    methods: {
        click() {
            if (!screenfull.enabled) {
                this.$message({
                    message: 'you browser can not work',
                    type: 'warning'
                })
                return false
            }
            screenfull.toggle()
        },
        change() {
            screenfull.on('change', () => {
                this.isFullscreen = screenfull.isFullscreen;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.screenfull-svg {
  cursor: pointer;
  width: 20px;
  height: 20px;
  font-size: 20px;
  & > path {
    fill: #5a5e66;
  }
}
</style>
