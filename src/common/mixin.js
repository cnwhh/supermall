import {
  debouce
} from "./utils";

import BackTop from "components/content/backTop/BackTop.vue";


export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    let newRefresh = debouce(this.$refs.scroll.refresh, 200);

    this.itemImageListener = () => {
      newRefresh();
    };
    // 刷新
    this.$bus.$on("itemImageLoad", this.itemImageListener);
    // this.$bus.$on("itemImageLoad", () => {
    //   newRefresh();
    // });
    // console.log('我是混入');
  },
}

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      // 组件scroll里面的scroll属性
      // 回到顶部
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },
  },
}
