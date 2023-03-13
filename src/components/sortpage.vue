<!--
* @FileDescription: all movie pictures shows in this page
* @Author: Chuheng Xiang
* @Student number: 2750443X
* @LastEditors: Chuheng Xiang
-->

<template>
    <div>
<!--              list test-->
          <a-list :grid="{ gutter: 16, column: 6 }" v-show="nowPage =='all' || nowPage == 'genre'" style="padding-left: 10px;" :data-source="movieList">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-card hoverable :bordered="false" style="width: 180px; min-height: 400px; background: #181818" @click="clickMovie(item)" >
                <img
                  width="180px"
                  height="260px"
                  slot="cover"
                  alt="example"
                  :src="require(`../assets/img/${item.movie_name}.jpg`)"
                />
                <a-card-meta>
                  <template slot="description" class="card-temp">
                    <p class="card-temp-font">{{item.movie_name}}</p>
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

      <div v-for="(value, key) in movieGenreList" v-show="nowPage =='homepage'">
        <span class="genre-key">{{key}}</span>
        <span class="find-more" v-if="key!='Recommendation'" @click="findMoreByGenre(key)"> find more >> </span>
        <a-list :grid="{ gutter: 16, column: 6 }" style="padding-left: 10px;" :data-source="movieGenreList[key]">
          <a-list-item slot="renderItem" slot-scope="item,index" v-if="index<6">
            <a-card hoverable :bordered="false" style="width: 180px; min-height: 400px; background: #181818" @click="clickMovie(item)" >
              <img
                width="180px"
                height="260px"
                slot="cover"
                alt="example"
                :src="require(`../assets/img/${item.movie_name}.jpg`)"
              />
              <a-card-meta>
                <template slot="description" class="card-temp">
                  <p class="card-temp-font">{{item.movie_name}}</p>
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

  </div>
</template>
<script>
  import {getAllMovie} from "../api/axiosMovie";

  export default {
    name:"sortpage",

    data() {
      return {
        genreFormMovies:'',
        sortName:'',
        movieList:[],
        params:'',
        path:'',
        movieGenreList: {
          Recommendation: [],
          adventure: [],
          action:[],
          documentary:[],
          fantasy:[],
        },
        nowPage:'',
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
      getMovieList(param,genre){
        console.log('params: ',genre)
        if(genre!=null){
          if (param == 'NEWEST') {
            this.params = 'release'
          }
          if (param == 'RATE(HIGHEST)') {
            this.params = 'ratings'
          }else {
            this.params = ''
          }
          getAllMovie(genre+this.params, 'params').then(res=>{
            if (res) {
              setTimeout(()=>{
                // console.log(res)
                this.nowPage = res.data[0].page
                // console.log(this.nowPage == 'genre')
                this.movieList = res.data
                // console.log(this.movieList)
              },500)
              // console.log('movielist: ', this.movieList)
            } else {
              this.$message({
                type: 'info',
                message: "fail"
              })
            }
          })
        }
        else {
          if (param == 'NEWEST') {
            this.params = 'release'
          }
          if (param == 'RATE(HIGHEST)') {
            this.params = 'ratings'
          }
          getAllMovie(this.params, 'params').then(res => {
            if (res) {
              setTimeout(() => {
                this.nowPage = res.data[0].page
                console.log(this.nowPage)
                this.movieList = res.data
                // console.log('path: ',this.path=='/movies')
                if(this.path=='/movies'){
                  this.nowPage = 'all'
                  console.log(this.nowPage)
                }
                if (this.nowPage != 'all') {
                  for (let i = 0; i < res.data.length; i++) {
                    for (let j = 0; j < 6; j++) {
                      this.movieGenreList.Recommendation.push(res.data[j])
                    }
                    if (res.data[i].genre == 'adventure') {
                      this.movieGenreList.adventure.push(res.data[i]);
                      // console.log(this.movieGenreList.adventure)
                    }
                    if (res.data[i].genre == 'action') {
                      this.movieGenreList.action.push(res.data[i]);
                    }
                    if (res.data[i].genre == 'documentary') {
                      this.movieGenreList.documentary.push(res.data[i]);
                    }
                    if (res.data[i].genre == 'fantasy') {
                      this.movieGenreList.fantasy.push(res.data[i]);
                    }
                  }
                }
              }, 500)

              // console.log('movielist: ', this.movieList)
            } else {
              this.$message({
                type: 'info',
                message: "fail"
              })
            }
          })
        }
      },
      findMoreByGenre(genre){
        // console.log(genre)
        this.$router.push({
          name: 'movies',
          params:{
            genre: genre
          }
        })
      },

      //movie start
      clickMovie(movie){
        // console.log(movie.id)
        this.$router.push({
          name: 'detail',
          params: {
            movieId: movie.id,
          }
        });
      },

      // end

    },
    created() {
      this.sortName = this.$route.params.sortName
      this.genreFormMovies = this.$route.params.genre
      // console.log('sortName is', this.genreFormMovies)
      this.getMovieList(this.sortName, this.genreFormMovies)
    },
    beforeUpdate() {},
    beforeMount() {
    }
  }
</script>

<style scoped>
  .genre-key{
    padding-left: 10px;
    /*color: #dcaf28;*/
    font-family: Arial Black;
    color: white;
    font-size: 28px;
    font-weight: bold;
  }
  .find-more{
    padding-top: 10px;
    padding-right: 10px;
    float: right;
    font-family: Arial Black;
    color: white;
    font-size: 18px;
  }
  .card-temp{
    text-align: center;
  }
  .card-temp-font{
    color: white;
    /*font-weight: bold;*/
    min-height: 60px
  }
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

