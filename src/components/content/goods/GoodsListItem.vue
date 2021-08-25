<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <!-- 收藏 -->
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },

  methods: {
    imageLoad() {
      // 都发送同一个事件
      this.$bus.$emit("itemImageLoad");

      // 根据路由进行判断
      // if (this.$route.path.indexOf("/home")) {
      // 如果在 /home 里面就发送这个事件，如果不在 /home 里面就不要发送这个事件
      // this.$bus.$emit("homeitemImgLoad");
      // } else if (this.$router.path.indexOf("/detail")) {
      // this.$bus.$emit("detailitemImgLoad");
      // }
    },

    itemClick() {
      this.$router.push("/detail" + this.goodsItem.iid);
    },
  },
};
</script>

<style scoped>
/* scoped 属性是一个布尔属性。如果使用该属性，则样式仅仅应用到 style 元素的父元素及其子元素。 */

.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  /* 显示省略符号来代表被修剪的文本 */
  text-overflow: ellipsis;
  /* 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止 */
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>