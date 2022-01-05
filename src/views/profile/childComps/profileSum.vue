<template>
  <div id="profile-sum">
    <div class="sum">
      <div class="my-sum">
        <span class="font">0.00</span>元
        <p>我的余额</p>
      </div>
      <div class="my-discounts">
        <span class="font">0</span>个
        <p>我的优惠</p>
      </div>
      <div class="my-integray">
        <span class="font">0</span>分
        <p>我的积分</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileSum",
};
</script>

<style scoped>
.sum {
  display: flex;
  justify-content: space-around;
  padding: 13px 0;

  height: 95px;
  background-color: #fff;
}
div[class^="my"] {
  display: inline-block;
  width: 33%;
  height: 70px;

  text-align: center;
  line-height: 33px;
  font-size: 16px;
}
.my-sum,
.my-discounts {
  border-right: 1px solid #ccc;
}
.font {
  font-size: 25px;
  font-weight: 700;
  color: #f26f6d;
}
</style>