<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  // 不能写在created里面
  mounted() {
    // 1、创建BS从roll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 有probeType属性才能监听到滚动,如果什么时候都监听会影响性能
      // 有click属性才能点击里面的div
      // probeType: 3,
      click: true,
      // 不加mouseWheel和observeDOM滑动不了
      mouseWheel: true,
      observeDOM: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    // 2、监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }

    // 3、监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // 要在首页里面监听，所以要发送出去事件
        this.$emit("pullingUp");
      });
    }
    // console.log(this.scroll);
    // 根据重新加载出来的子组件，重新计算高度
  },
  methods: {
    // finishPullUp() {
    //   this.scroll.finishPullUp();
    // },
    refresh() {
      // 先判断有没有值。有值再执行。refresh（）
      this.scroll && this.scroll.refresh();
      //console.log("---");
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style>
</style>