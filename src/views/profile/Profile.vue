<template>
  <div id="profile">
    <nav-bar class="profile-nav"><div slot="center">我的档案</div></nav-bar>
    <profile-login class="profile-login"> </profile-login>
    <profile-sum></profile-sum>
    <profile-message class="profile-message"></profile-message>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import ProfileLogin from "./childComps/profileLogin.vue";
import ProfileSum from "./childComps/profileSum.vue";
import ProfileMessage from "./childComps/profileMessage.vue";

export default {
  name: "Profile",
  components: {
    NavBar,
    ProfileLogin,
    ProfileSum,
    ProfileMessage,
  },
};
</script>

<style scoped>
#profile {
  height: 100vh;
  background-color: #f1f1f1;
}
.profile-nav,
.profile-login {
  background-color: var(--color-tint);
  color: #fff;
}
.profile-message {
  margin-top: 20px;
}
</style>