<template>
  <div id="category">
    <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
    <scroll class="content">
      <vertical-tab
        class="vertical-tab"
        @tabClick="verticalTabClick"
        :titles="titless"
      ></vertical-tab>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import VerticalTab from "components/content/verticalTab/VerticalTab.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import { getCategory } from "network/category";

export default {
  name: "Category",
  components: {
    NavBar,
    VerticalTab,
    Scroll,
  },
  data() {
    return {
      titlesss: [],
      categroy: [], //分类
    };
  },
  computed: {
    // 将请求到的数据遍历，提取其中的title
    titless() {
      for (let i of this.categroy) {
        this.titlesss.push(i.title);
      }
      return this.titlesss;
    },
  },

  created() {
    // 1、请求多个数据
    this.getCategory();

    // 2、请求商品数据
    // this.getHomeGoods("pop");
    // this.getHomeGoods("new");
    // this.getHomeGoods("sell");
  },
  methods: {
    // 竖向导航栏的点击事件
    verticalTabClick(index) {
      console.log(index);
    },

    // 网络请求相关方法

    getCategory() {
      getCategory().then((res) => {
        this.categroy = res.data.category.list;
        console.log(res);
        // console.log(this.categroy);
      });
    },
  },
};
</script>

<style scoped>
#category {
  /* position: relative; */
  height: 100vh;
}

.category-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  overflow: hidden;
  height: calc(100% - 93px);
}
</style>