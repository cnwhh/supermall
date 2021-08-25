<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        @click.native="checkClick"
        :is-checked="isSelectAll"
      />
      <span>全选</span>
    </div>

    <div class="price">合计:{{ totalPrice }}</div>

    <div class="calculate" @click="calcClick">去结算:{{ checkLength }}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";

import { mapGetters } from "vuex";

export default {
  components: { CheckButton },
  name: "CarBottomBar",
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //全部选中
        this.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        //部分或者全部不选中
        this.cartList.forEach((item) => {
          item.checked = true;
        });
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    },
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"]),

    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            // 如果checked为true就过滤出来
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;

      // 1、使用filter
      // return !this.cartList.filter((item) => !item.checked).length;

      // 2、使用find
      // 查找到不选中的，就不选中
      // return !this.cartList.find((item) => !item.checked);

      // 3、普通遍历
      for (let item of this.cartList) {
        if (!item.checked) {
          return false;
        }
      }

      return true;
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;

  background-color: #eee;
  bottom: 40px;

  font-size: 14px;
}

.check-content {
  display: flex;
  /* 居中对齐弹性盒的各项 <div> 元素 */
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  /* line-height会继承，所以要改成自己的 */
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 90px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>