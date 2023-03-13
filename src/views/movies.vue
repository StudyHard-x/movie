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
        <a-layout-content style="padding: 0 150px; background: black;">
          <a-layout style="padding: 24px 0; background: black; min-height: 560px">
            <a-layout-content :style="{ padding: '0 24px', minHeight: '50px', width:'450px', paddingBottom:'60px' }">
              <div v-if="genre!=null"><span class="sort-name" >Genre: {{genre}} </span></div>
              <span class="sort-name" v-show="sortName!=null">Sort by {{sortName}}</span>
              <br>
              <span class="sort-name">{{'Sort: ', sortName}} </span>
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

        <a-layout-footer class="movie-footer">
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
  import sortpage from "../components/sortpage";
  import usernav from "../components/usernav";
  export default {
    name: 'movies',
    data() {
      return {
        genre:'',
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
            genre: this.genre,
          }
        })
      },
    },
    created() {
      this.genre = this.$route.params.genre
      this.sortName = this.$route.params.sortName
      // console.log(this.genre != '')
      // console.log('sortName is(movie page): ', this.sortName)
    },
    beforeUpdate() {},
    beforeMount() {
    }
  }
</script>

<style scoped>
/*.backImage{*/
/*  !*background-repeat: no-repeat;*!*/
/*  background-position: center right;*/
/*  !*background-size: 50%;*!*/

/*  width:100%;*/
/*  height:100%;*/
/*  position:fixed;*/
/*  background-size:100% 100%;*/
/* }*/

  .sort-name{
    color: white;
    font-weight: bold;
    font-size: 20px;
  }
  .movie-footer{
    background: black;
    color: white;
    font-family: Verdana;
    text-align: center;
  }
</style>

