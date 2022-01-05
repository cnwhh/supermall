<template>
  <div id="category-right">
    <category-list
      class="category-list"
      v-for="(item, index) in goods"
      :goods-item="item"
      :key="index"
    ></category-list>
  </div>
</template>

<script>
import CategoryList from "./CategoryList.vue";

export default {
  name: "CategoryRight", //右侧滚动页面
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    CategoryList,
  },
};
</script>

<style scoped>
#category-right {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.category-list {
  width: 33%;

  padding: 5px 0;
}
</style>