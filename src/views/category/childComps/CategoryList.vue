<template>
  <div id="category-list">
    <div class="item">
      <a :href="goodsItem.link">
        <img :src="goodsItem.image" alt="" />
        <p>{{ goodsItem.title }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryList", //右侧具体商品
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
/* #category-list {
  display: flex;
} */

img {
  width: 80px;
}
p {
  text-align: center;
}
</style>