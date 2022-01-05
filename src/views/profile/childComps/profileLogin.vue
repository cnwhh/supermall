<template>
  <div id="profile-login">
    <!-- <img src="../../../assets/img/common/back.svg" alt="" /> -->
    <img src="~assets/img/profile/profile.svg" alt="" />
    <div class="message">
      <span>登录/注册</span>
      <p>暂无绑定手机号</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileLogin",
};
</script>

<style scoped>
#profile-login {
  height: 100px;
  padding: 0 15px;
}
img {
  margin-top: 15px;
  width: 80px;
}
.message {
  position: relative;
  display: inline-block;
  margin-top: 35px;
  padding-left: 10px;

  width: 260px;
  height: 50px;

  /* 文字和图片的对齐方式 */
  vertical-align: top;
}
.message::after {
  position: absolute;
  top: 10px;
  right: 5px;

  content: url(~assets/img/profile/right.svg);
}
span {
  display: inline-block;
  padding-bottom: 5px;

  font-size: 20px;
}
p {
  font-size: 15px;
}
</style>