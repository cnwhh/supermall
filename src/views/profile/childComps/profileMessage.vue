<template>
  <div id="profile-message">
    <div class="message-list">
      <span class="img"
        ><img src="~assets/img/profile/email.svg" alt=""
      /></span>
      <span class="message-font">我的消息</span>
    </div>
    <div class="message-list">
      <span class="img"
        ><img src="~assets/img/profile/integral.svg" alt=""
      /></span>
      <span class="message-font">积分商城</span>
    </div>
    <div class="message-list">
      <span class="img"
        ><img src="~assets/img/profile/member.svg" alt=""
      /></span>
      <span class="message-font">会员卡</span>
    </div>
    <div class="message-list">
      <span class="img"><img src="~assets/img/profile/car.svg" alt="" /></span>
      <span class="message-font">我的购物车</span>
    </div>
    <div class="message-list">
      <span class="img"><img src="~assets/img/profile/shop.svg" alt="" /></span>
      <span class="message-font">下载购物APP</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileMessage",
};
</script>

<style scoped>
.profile-message {
  background-color: #fff;
  padding-bottom: 20px;
}
.message-list {
  display: flex;

  width: 100%;
  height: 45px;
}
.img {
  display: inline-block;
  padding: 10px;

  width: 15%;
  text-align: center;
  line-height: 40px;
}
.message-font {
  border-bottom: 1px solid #f1f1f1;

  width: 85%;
  font-size: 18px;
  line-height: 50px;
}
</style>