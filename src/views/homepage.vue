<template>
    <div>
      <a-layout>
        <a-layout-header class="header" style="height: 130px">
          <usernav></usernav>
        </a-layout-header>
<!--        轮播图-->
        <a-layout-content style="padding: 0 150px;">

          <el-carousel :interval="4000" type="card" height="400px">
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
          Movies
        </a-layout-footer>

      </a-layout>

<!--    <el-container class="index-con">-->
<!--  &lt;!&ndash;    <el-aside :class="showclass">&ndash;&gt;-->
<!--  &lt;!&ndash;      <leftnav></leftnav>&ndash;&gt;-->
<!--  &lt;!&ndash;    </el-aside>&ndash;&gt;-->
<!--      <el-container>-->
<!--&lt;!&ndash;          <usernav></usernav>&ndash;&gt;-->
<!--        <el-main>-->
<!--          <el-card v-show="(path ==='/users/userHome')" class="home-container">-->
<!--            <div class="userInfoClass">-->
<!--              <h4>username: {{this.userInfo.username}}</h4>-->
<!--              <h4>balance: {{this.userInfo.charge}}</h4>-->
<!--              <el-button  style="color: #6f7180; font-size: 15px"  v-on:click="clickCharge">charge money</el-button>-->
<!--              <el-dialog :title="title" :visible.sync="chargeFormVisible" width="30%" @click="closeDialog">-->
<!--                <el-form label-width="120px" :model="chargeForm" ref="editForm">-->
<!--                  <el-form-item label="charge" prop="fee">-->
<!--                    <el-input size="small" v-model="chargeForm.fee" auto-complete="off" placeholder="please enter money"></el-input>-->
<!--                  </el-form-item>-->
<!--                </el-form>-->
<!--                <el-button type="primary"@click="chargeMoney">charge money</el-button>-->
<!--              </el-dialog>-->
<!--            </div>-->
<!--          </el-card>-->

<!--          <router-view></router-view>-->
<!--        </el-main>-->
<!--      </el-container>-->
<!--    </el-container>-->
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
        chargeFormVisible : false,
        userInfo :[],
        userGet:{
          userId : 0
        },
        // chargeForm:{
        //   id : 0,
        //   fee : 0,
        // },
        balance: 0,
        showclass: 'asideshow',
        showtype: false,
        path:'',
        // title : "charge",
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
      clickCharge(){
        this.chargeFormVisible = true
      },
      closeDialog() {
        this.chargeFormVisible = false
      }
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
.userInfoClass{
  color: #909399;
  font-size: 25px;
  text-align: center;
  margin: 30px auto;
  align: center;
}
/*.backImage{*/
  /*background-repeat: no-repeat;*/
  /*background-position: center right;*/
  /*!*background-size: 50%;*!*/

  /*width:100%;*/
  /*height:100%;*/
  /*position:fixed;*/
  /*background-size:100% 100%;*/
 /*}*/
.home-container{
  border-radius: 10px;
  margin: 100px auto;
  width: 300px;
  /*height: 400px;*/
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  /*box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);*/
}
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

