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
    <scroll class="right">
      <category-right
        :goods="categroyGoods[this.currentType].list"
      ></category-right>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import VerticalTab from "components/content/verticalTab/VerticalTab.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import CategoryRight from "./childComps/CategoryRight.vue";

import {
  getCategory,
  getSubcategory,
  getSubCategoryDetail,
  activeIndex,
} from "network/category";

export default {
  name: "Category",
  components: {
    NavBar,
    VerticalTab,
    Scroll,
    CategoryRight,
  },
  data() {
    return {
      titlesss: [],
      categroy: [], //分类
      categroyGoods: {
        //请求到的数据模型
        3627: { list: [] },
      },
      currentType: 3627, //当前类型 默认类型
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
    //最好才create里面只调用方法，不要写方法的实现（具体逻辑）
    // 1、请求多个数据 调用下面methods里面的函数（重名）
    this.getCategory();
    // 2、请求具体的商品分类页 用当前模块的maitKey
    this.getSubcategory(3627);
    this.getSubcategory(582);
    this.getSubcategory(596);
    this.getSubcategory(595);
    this.getSubcategory(598);
    this.getSubcategory(597);
    this.getSubcategory(599);
    this.getSubcategory(5253);
    this.getSubcategory(600);
    this.getSubcategory(609);
    this.getSubcategory(609);
    this.getSubcategory(594);
    this.getSubcategory(830);
    this.getSubcategory(602);
    this.getSubcategory(606);
    this.getSubcategory(603);
    this.getSubcategory(605);

    // this.titlesss.forEach((element) => {
    //   this.getSubcategory(element);
    // });
  },
  methods: {
    // 竖向导航栏的点击事件
    verticalTabClick(index) {
      this.currentType = this.categroy[index].maitKey; //获取当前点击的模块的maitKey
      this.getSubcategory(this.currentType); //点击后，再重新请求本标签的数据

      //console.log(this.currentType);
    },

    // 网络请求相关方法

    getCategory() {
      getCategory().then((res) => {
        this.categroy = res.data.category.list;
        //console.log(this.categroy);
        //console.log(res);
      });
    },

    // 请求分类页的详情
    //右边分类
    getSubcategory(maitKey) {
      getSubcategory(maitKey).then((res) => {
        this.subCategoryList = res.data.list;
        //如果categroyGoods对象里面没有categroyGoods[maitKey]这个属性，就添加上
        //以便插入数据到数组
        if (!this.categroyGoods[maitKey]) {
          this.categroyGoods[maitKey] = { list: [] };
        }
        this.categroyGoods[maitKey].list.push(...this.subCategoryList);
        //console.log(this.categroyGoods[maitKey].list);
        //console.log(res);
      });
    },

    // getSubCategoryDetail(type) {
    //   getSubCategoryDetail(miniWallkey, type).then((res) => {
    //     this.goods[type] = res;
    //   });
    // },
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
  width: 100px;
  overflow: hidden;
  height: calc(100% - 93px);
  display: inline-block;
}
.right {
  display: inline-block;
  overflow: hidden;
  width: calc(100% - 100px);
  height: calc(100% - 93px);
}
</style>