<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
        >{{ item }}</cart-list-item
      >
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";

import { mapGetters } from "vuex";
import CartListItem from "./CartListItem.vue";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    // 针对返回后不能滚动的问题
    this.$refs.scroll.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 93px);
  overflow: hidden;
}

.content {
  height: 100%;
}
</style>