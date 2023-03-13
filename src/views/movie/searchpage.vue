<!--
* @FileDescription: movie search result
* @Author: Chuheng Xiang
* @Student number: 2750443X
-->

<template>
    <div>
      <a-layout>
        <a-layout-header class="header" style="height: 60px">
          <usernav></usernav>
        </a-layout-header>

        <a-layout-content class="detail-layout" style="background: black; padding: 0 200px">
          <a-layout style="padding: 24px 0; background: black; min-height: 560px; padding-left: 120px">
            <span class="search-name">Search : {{searchName}}</span>

            <a-list item-layout="horizontal" size="large" :data-source="listData">
              <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">

                <a-layout-content class="search-content">
                  <a-row :gutter="16">
                    <a-col :span="8">
                      <p style="fontSize: 14px; marginBottom: 16px;fontWeight: 500">
                        {{ item.movie_name }}
                      </p>
                      <a-card hoverable style="width: 200px" @click="clickMovie(item)">
                        <img
                          slot="cover"
                          alt="example"
                          :src="require(`../../assets/img/${item.movie_name}.jpg`)"
                        />
                      </a-card>
                    </a-col>

                    <a-col :span="14">
                      <a-layout-content style="min-height: 250px">
                        <span></span><br><br>
                        <span> {{item.movie_intro}} </span>
                      </a-layout-content>

                      <a-layout-content style="margin-top: 40px">
<!--                        <span>RATE</span><br><br>-->
                        <!--                    <a-rate v-model="value" />-->
                      </a-layout-content>
                    </a-col>
                  </a-row>
                </a-layout-content>
              </a-list-item>
              <a-divider v-show="index>1"></a-divider>
            </a-list>
          </a-layout>
        </a-layout-content>

        <a-layout-footer class="search-footer">
            <userfooter></userfooter>
        </a-layout-footer>
      </a-layout>



  </div>
</template>
<script>
  // 导入组件
  import userfooter from "../../components/userfooter";
  import usernav from "../../components/usernav";
  import {searchMovie} from "../../api/axiosMovie";
  export default {
    name: 'searchpage',
    data() {
      return {
        movieName:'',
        data: [],
        searchName:'',
        listData:[],
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
      serach(movieName){
        searchMovie(movieName,'contain').then(res => {
          if (res) {
            setTimeout(()=>{
              console.log('search res: ', res)
              this.listData = res.data
            },500)
          }
        })
      },
      clickMovie(movie){
        // console.log(movie.id)
        this.$router.push({
          name: 'detail',
          params: {
            movieId: movie.id,
          }
        });
      },
    },

    created() {
      this.searchName = this.$route.params.searchName
      this.serach(this.searchName)
    },
    beforeUpdate() {},
    beforeMount() {

    }
  }
</script>

<style scoped>
  .search-name{
    color: white;
    font-size: 25px;
    font-weight: bold;
  }
  .search-content{
    font-family: Helvetica Neue;
    color: white;
  }
  .search-footer{
    background: black;
    color: white;
    font-family: Verdana;
    text-align: center;
  }
</style>

