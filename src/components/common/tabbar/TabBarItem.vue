<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- <img src="..\..\assets\img\tabbar\home.png" alt="" />
    <div>首页</div> -->
  </div>
</template>

<script>
// import TabBar from "./TabBar.vue";
export default {
  name: "TabBarItem",
  props: {
    path: String,
    // 设置属性
    activeColor: {
      type: String,
      default: "blue",
    },
  },
  // 动态判定isActive的值
  computed: {
    isActive() {
      // 如果当前活跃的path在this.path中就会返回true，否则返回-1
      return this.$route.path.indexOf(this.path) !== -1;
    },
    // 如果处于活跃状态，就给它一个color
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  methods: {
    itemClick() {
      // if (this.$route.p ath === this.path) return;
      // this.$router.replace(this.path).catch((err) => err);
      this.$router.replace(this.path).catch((err) => err);
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 去掉图片最下面多出的三个像素 */
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>