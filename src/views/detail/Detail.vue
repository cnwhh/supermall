<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav">
    </detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import { debouce } from "common/utils.js";
import { itemListenerMixin, backTopMixin } from "common/mixin.js";
import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },

  mixins: [itemListenerMixin, backTopMixin],

  data() {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
    };
  },
  created() {
    // 1、保存传入的iid
    this.iid = this.$route.params.iid;

    // 2、根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1、获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2、获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3、创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4、保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5、获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6、取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3、请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    // 4、给getThemeTopY赋值（对给this.getThemeTopY赋值的操作进行防抖）
    this.getThemeTopY = debouce(() => {
      this.themeTopYs = [];

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);

    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.themeTopYs = [];

    //     this.themeTopYs.push(0);
    //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   }, 200);
    // });
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      // 图片加载完后
      this.getThemeTopY();

      // let newRefresh = debouce(this.$refs.scroll.refresh, 100);

      // 刷新
      this.$refs.scroll.scroll.refresh();
    },
    titleClick(index) {
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      // 决定BackTop按钮是否显示
      this.isShowBackTop = -position.y > 1000;

      // 1、获取y值
      const positionY = -position.y;

      // 2、positionY和主题中值进行对比
      // [0, 2878, 3722, 4013，Number.MAX_VALUE ]

      // positionY 在 0 和 2878 之间,index = 0
      // positionY 在 =2878 和 3722 之间,index = 1
      // positionY 在 3722 和 4013 之间,index = 2
      // positionY 在 4013 和 非常大的值 之间,index = 3

      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      // 1、获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2、将商品添加到购物车里
      // this.$store.commit("addCart", product);
      // this.$store.dispatch("addCart", product);
      this.addCart(product).then((res) => {
        this.$toast.show(res, 2000);
      });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 999;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 55px;
  left: 0;
  right: 0;
}
</style>
