<!--
* @FileDescription: Movie Page Parent Component
* @Author: Chuheng Xiang
* @Student number: 2750443X
* @LastEditors: Chuheng Xiang
-->
<template>
    <div class="backImage">

      <a-layout id="movies-page-layout">
        <a-layout-header class="header" style="height: 60px">
          <usernav></usernav>
        </a-layout-header>
        <a-layout-content style="padding: 0 150px">
          <a-layout style="padding: 24px 0; background: #fff; min-height: 560px">
            <a-layout-content :style="{ padding: '0 24px', minHeight: '50px', width:'450px', paddingBottom:'60px' }">
              <span class="sort-name">{{'Sort by: ', sortName}} {{sortName}} </span>
              <br>
              <a-select
                showSearch
                optionFilterProp="children"
                style="width: 200px" placeholder="Sort" @change="sortChange">
                <a-select-option v-for="i in sortMovieList" :key="i">
                  {{i}}
                </a-select-option>
              </a-select>
            </a-layout-content>
            <a-layout-content>
              <!--              list test-->

              <sortpage></sortpage>
            </a-layout-content>

          </a-layout>


        </a-layout-content>

        <a-layout-footer style="text-align: center;">
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
  import {getUserInfo} from "../api/userMG";
  import {getMovie} from "../api/axiosMovie"
  import sortpage from "../components/sortpage";
  import usernav from "../components/usernav";
  export default {
    name: 'movies',
    data() {
      return {
        sortName:'',
        sortMovieList:[
          'NEWEST',
          // 'MOST POPULAR',
          'RATE(HIGHEST)'
        ],
        path:'',
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
      sortpage,
      usernav
    },
    methods: {
      //movie start
      sortChange(value){
        this.$router.push({
          name: 'sortchange',
          params: {
            sortName: value,
          }
        })
      },
    },
    created() {
      this.sortName = this.$route.params.sortName
      // console.log('sortName is(movie page): ', this.sortName)
    },
    beforeUpdate() {},
    beforeMount() {
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
/*  !*background-repeat: no-repeat;*!*/
/*  background-position: center right;*/
/*  !*background-size: 50%;*!*/

/*  width:100%;*/
/*  height:100%;*/
/*  position:fixed;*/
/*  background-size:100% 100%;*/
/* }*/
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
  .sort-name{
    font-weight: bold;
    font-size: 20px;
  }
</style>

