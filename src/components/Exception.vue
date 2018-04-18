<!-- exception -->
<template>
    <div class="exception">
        <div class="imgBlock">
            <div class="imgEle" :style="`background-image:url(${type[code].img})`">
                <!-- <img :src="type[code].img" :alt="type[code].title" style=""> -->
            </div>
        </div>
        <div class="content">
            <h1>{{type[code].title}}</h1>
            <div class="desc">{{type[code].desc}}</div>
            <div class="actions">
                <a href="#/">
                    <el-button type="primary">
                        <span>返回首页</span>
                    </el-button>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        code: {
            type: Number,
            default: 404
        }
    },
    name: 'Exception',
    data() {
        return {
            type: {
                403: {
                    img: require('../assets/img/403.svg'),
                    title: '403',
                    desc: '抱歉，你无权访问该页面'
                },
                404: {
                    img: require('../assets/img/404.svg'),
                    title: '404',
                    desc: '抱歉，你访问的页面不存在'
                },
                500: {
                    img: require('../assets/img/500.svg'),
                    title: '500',
                    desc: '抱歉，服务器出错了'
                }
            }
        };
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {}
};
</script>
<style lang='scss' scoped>
.exception {
    min-height: 500px;
    height: 100%;
    display: flex;
    align-items: center;
    .imgBlock {
        flex: 0 0 62.5%;
        width: 62.5%;
        padding-right: 152px;
        zoom: 1;
        &:after,
        &:before {
            content: ' ';
            display: table;
        }
        &:after {
            clear: both;
            visibility: hidden;
            font-size: 0;
            height: 0;
        }
        .imgEle {
            height: 360px;
            width: 100%;
            max-width: 430px;
            float: right;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            background-size: contain;
        }
    }
    .content {
        flex: auto;
        text-align: left;
        h1 {
            color: #434e59;
            font-size: 72px;
            font-weight: 600;
            line-height: 72px;
            margin-bottom: 24px;
            margin-top: 0;
        }
        .desc {
            color: rgba(0, 0, 0, 0.45);
            font-size: 20px;
            line-height: 28px;
            margin-bottom: 16px;
        }
    }
}
</style>
