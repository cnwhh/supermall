<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, key) in goods"
      :key="key"
      :goods-item="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";

export default {
  components: { GoodsListItem },
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scope>
.goods {
  display: flex;
  /* 根据宽度设置一行显示几个（包裹） */
  flex-wrap: wrap;
  /* 均等分 */
  justify-content: space-around;

  padding: 2px;
}
</style>