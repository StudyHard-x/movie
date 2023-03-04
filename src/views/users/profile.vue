<!--
* @FileDescription: user profile
* @Author: Chuheng Xiang
* @Student number: 2750443X
-->
<template>
    <div>
      <a-layout>
        <a-layout-header class="header" style="height: 130px">
          <usernav></usernav>
        </a-layout-header>

        <a-layout-content class="detail-layout" style="padding: 0 200px">
          <a-layout style="background: #fff; min-height: 560px; padding: 24px 40px 24px 40px;">

            <a-layout-content>
              <a-descriptions title="User Info" bordered>
                <a-descriptions-item label="User Name">{{data.username}}</a-descriptions-item>
                <a-descriptions-item label="Gender">Prepaid</a-descriptions-item>
                <a-descriptions-item label="Age">{{data.age}}</a-descriptions-item>
                <a-descriptions-item label="Email" :span="3">{{data.email}}</a-descriptions-item>
              </a-descriptions>
            </a-layout-content>
          </a-layout>
        </a-layout-content>

        <a-layout-footer style="text-align: center;">
          Movies
        </a-layout-footer>
      </a-layout>


  </div>
</template>
<script>
  // 导入组件
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

