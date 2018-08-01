<!-- 点击展开或者最小化菜单 -->
<template>
  <div>
    <div class="hamburger-wrap"  @click="toggleClick">
      <i class="fa fa-bars hamburger"
         aria-hidden="true"
         :class="{'is-active':isActive}"></i>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>
<style lang='scss' scoped>
.hamburger-wrap {
  width: 50px;
  height: 50px;
  display: flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  cursor: pointer;
   &:hover {
      background: rgb(230, 247, 255);
    }
}
.hamburger-wrap .hamburger {
  font-size: 24px;
  transform: rotate(90deg);
  transition: 0.38s;
  transform-origin: 50% 50%;
}

.hamburger-wrap .hamburger.is-active {
  transform: rotate(0deg);
}
</style>
