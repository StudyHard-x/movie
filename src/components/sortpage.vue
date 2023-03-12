<!--
* @FileDescription: all movie pictures shows in this page
* @Author: Chuheng Xiang
* @Student number: 2750443X
* @LastEditors: Chuheng Xiang
-->

<template>
    <div>
<!--              list test-->
          <a-list :grid="{ gutter: 16, column: 6 }" style="padding-left: 10px;" :data-source="movieList">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-card hoverable style="width: 180px; min-height: 400px" @click="clickMovie(item)" >
                <img
                  width="180px"
                  height="260px"
                  slot="cover"
                  alt="example"
                  :src="require(`../assets/img/${item.movie_name}.jpg`)"
                />
                <a-card-meta>
                  <template slot="description">
                    <p style="font-weight: bold; min-height: 60px">{{item.movie_name}}</p>
                    <el-rate
                      v-model="item.avg_rating"
                      disabled
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>
                  </template>
                </a-card-meta>
              </a-card>
            </a-list-item>
          </a-list>


  </div>
</template>
<script>
  import {getAllMovie} from "../api/axiosMovie";

  export default {
    name:"sortpage",

    data() {
      return {
        sortName:'',
        movieList:[],
        params:'',
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

    },
    methods: {
      getMovieList(param){
        if(param == 'NEWEST'){
          this.params = 'release_time'
        }else {
          this.params = 'ratings'
        }
        getAllMovie(this.params, 'params').then(res=>{
          if (res) {
            console.log(res)
            this.movieList = res.data
            // console.log('movielist: ', this.movieList)
          } else {
            this.$message({
              type: 'info',
              message: "fail"
            })
          }
        })
      },
      //movie start
      clickMovie(movie){
        console.log(movie.id)
        this.$router.push({
          name: 'detail',
          params: {
            movieId: movie.id,
          }
        });
      },
      sortChange(value){
        console.log(value)
        this.$router.push({
          name: 'movies',
          params: {
            sortName: value,
          }
        })
        this.$router.go(0)
      },

      // end

    },
    created() {
      this.sortName = this.$route.params.sortName
      // console.log('sortName is', this.sortName)
      this.getMovieList(this.sortName)
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
</style>

