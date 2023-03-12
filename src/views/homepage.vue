<!--
* @FileDescription: home page
* @Author: Chuheng Xiang
* @Student number: 2750443X
* @LastEditors: Chuheng Xiang
-->

<template>
    <div>
      <a-layout>
        <a-layout-header class="header" style="height: 60px">
          <usernav></usernav>
        </a-layout-header>

        <a-layout-content style="padding: 0 150px;">
          <el-carousel :interval="4000" type="card" height="350px">
            <el-carousel-item>
              <img style="width: 600px" src="../assets/img/start_wars.jpg">
            </el-carousel-item>
            <el-carousel-item>
              <img style="width: 600px" src="../assets/img/the_rings.jpg">
            </el-carousel-item>
            <el-carousel-item>
              <img style="width: 600px" src="../assets/img/harry_potter.jpg">
            </el-carousel-item>
          </el-carousel>

<!--          <a-carousel arrows>-->
<!--            <div-->
<!--              slot="prevArrow"-->
<!--              slot-scope="props"-->
<!--              class="custom-slick-arrow"-->
<!--              style="left: 10px;zIndex: 1"-->
<!--            >-->
<!--              <a-icon type="left-circle" />-->
<!--            </div>-->
<!--            <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">-->
<!--              <a-icon type="right-circle" />-->
<!--            </div>-->
<!--            <div>-->
<!--              <img style="width: 600px" src="../assets/img/start_wars.jpg">-->
<!--            </div>-->
<!--          </a-carousel>-->

          <a-layout style="padding: 24px 0; background: #fff; min-height: 560px">
            <a-layout-content>
<!--              <span class="home-intro">| MOVIE </span>-->
              <a-divider class="home-intro">MOVIE</a-divider>
              <sortpage></sortpage>
            </a-layout-content>
          </a-layout>
        </a-layout-content>
        <a-layout-footer class="home-footer">
          <el-link type="primary">Help</el-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-link type="primary">Conditions of Use</el-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-link type="primary">Privacy Notice</el-link>
          <br><br>
          <p>movie-review-website</p>
        </a-layout-footer>

      </a-layout>
  </div>
</template>
<script>
  // 导入组件
  import usernav from "../components/usernav";
  import sortpage from "../components/sortpage";
  export default {
    name: 'homepage',
    data() {
      return {
        userInfo :[],
        userGet:{
          userId : 0
        },
        path:'',
      }
    },
    mounted() {
      this.path = this.$route.path;
    },
    watch:{
      $route(to,from){
        this.path = to.path
      }
    },
    components: {
      usernav,
      sortpage
    },
    methods: {
    },
    created() {
    },
    beforeUpdate() {},
    beforeMount() {
      // login success
      // this.$message({
      //   message: 'login success',
      //   type: 'success'
      // })
    }
  }
</script>

<style scoped>
/*.backImage{*/
  /*background-repeat: no-repeat;*/
  /*background-position: center right;*/
  /*!*background-size: 50%;*!*/

  /*width:100%;*/
  /*height:100%;*/
  /*position:fixed;*/
  /*background-size:100% 100%;*/
 /*}*/
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 360px;
  line-height: 260px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.home-intro{
  font-size: 30px;
  font-weight: bold;
}.home-footer{
  text-align: center;
 }

</style>

