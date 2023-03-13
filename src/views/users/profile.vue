<!--
* @FileDescription: user profile
* @Author: Chuheng Xiang
* @Student number: 2750443X
-->
<template>
    <div>
      <a-layout>
        <a-layout-header class="header" style="height: 60px">
          <usernav></usernav>
        </a-layout-header>

        <a-layout-content class="detail-layout" style="padding: 0 200px">
          <a-layout style="background: #fff; min-height: 460px; padding: 24px 40px 24px 40px;">

            <a-layout-content>
              <a-descriptions title="User Info" bordered>
                <a-descriptions-item label="User Name">{{data.username}}</a-descriptions-item>
                <a-descriptions-item label="Gender" v-show="data.gender==1">female</a-descriptions-item>
                <a-descriptions-item label="Gender" v-show="data.gender==2">male</a-descriptions-item>
                <a-descriptions-item label="Age">{{data.age}}</a-descriptions-item>
                <a-descriptions-item label="Email" :span="3">{{data.email}}</a-descriptions-item>
              </a-descriptions>
            </a-layout-content>

            <a-layout-content class="profile-watchlist">
              Watchlist
              <a-divider style="color: white">watch list</a-divider>
              <div class="profile-watchlist-font">
                <img src="../../assets/img/watchlist.png">
                <br><br>
                <p>Your Watchlist is empty</p>
                <div class="profile-watchlist-font-line">
                  <p>Add movies and shows to your Watchlist to keep track of </p>
                  <p>  what you want to watch.</p>
                </div>
              </div>
            </a-layout-content>
          </a-layout>
        </a-layout-content>

        <a-layout-footer class="profile-footer">
<!--          <userfooter></userfooter>-->
          <userfooter></userfooter>
        </a-layout-footer>
      </a-layout>


  </div>
</template>
<script>
  // 导入组件
  import userfooter from "../../components/userfooter";
  import usernav from "../../components/usernav";
  import { Message } from "element-ui";
  export default {

    name: 'homepage',
    data() {
      return {
        data: [],
      }
    },

    mounted() {
      this.path = this.$route.path;
      // console.log(this.$route.path)
    },
    watch:{
      $route(to,from){
        this.path = to.path
      }
    },
    components: {
      userfooter,
      usernav
    },
    methods: {
    },
    created() {


      this.data = JSON.parse(localStorage.getItem("userData"))
      console.log(this.data)
    },
    beforeUpdate() {},
    beforeMount() {

    }
  }
</script>

<style scoped>
  .profile-footer{
    background: black;
    color: white;
    font-family: Verdana;
    text-align: center;
  }
  .profile-watchlist{
    padding-top: 40px;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.5;
    min-height: 350px;
  }
  .profile-watchlist-font{
    text-align: center;
  }
  .profile-watchlist-font-line{
    line-height: 1;
    font-weight: 500;
    font-size: 15px;
  }
.comment-title{
  font-weight: bold;
  font-size: 20px;
}
.detail-title-font{
    fontSize: 24px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    marginBottom: 16px;
    fontWeight: 500;
}
</style>

