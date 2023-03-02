<!--
* @FileDescription: movie search result
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
          <a-layout style="padding: 24px 0; background: #fff; min-height: 560px; padding-left: 120px">

            <a-layout-content>
              <a-row :gutter="16">
                <a-col :span="12">
                  <p class="detail-title-font">
                    {{movieList.movie_name}}
                  </p>
                  <a-card hoverable style="width: 400px">
                    <!--                      :src="'../../assets/img/${movieList.movie_name}.jpg'"-->
                    <img :src="require(`../../assets/img/${movieList.movie_name}.jpg`)"
                      slot="cover"
                      alt="example"
                    />
                  </a-card>
                </a-col>

                <a-col :span="10">
                  <a-layout-content style="min-height: 300px">
                    <span style="font-weight: bold">MOVIE INFO</span><br><br>
                    <span>{{movieList.movie_intro}}</span>
                  </a-layout-content>
                  <a-layout-content style="min-height: 10px">
                    <span style="font-weight: bold">PRODUCER</span><br><br>
                    <span>{{movieList.producer}}</span>
                    <br><br>
                  </a-layout-content>
                  <a-layout-content style="min-height: 10px">
                    <span style="font-weight: bold">RELEASE TIME</span><br><br>
                    <span>{{movieList.release_time}}</span>
                  </a-layout-content>

                  <a-layout-content style="margin-top: 40px">
                    <span style="font-weight: bold">RATE</span><br><br>
                    <a-rate v-model="value" />
                  </a-layout-content>
                </a-col>
              </a-row>
            </a-layout-content>

            <a-layout-content style="margin-top: 40px; padding-right: 40px">
              <a-icon type="heart" />
              <span class="comment-title">Comment</span>
<!--              未登录时无法留言-->
              <a-comment>
                <a-avatar
                  slot="avatar"
                  icon="user"
                />
                <div slot="content">
                  <a-form-item>
                    <a-textarea :rows="4" :value="value" @change="handleChange" />
                  </a-form-item>
                  <a-form-item>
                    <a-button html-type="submit" disabled>
                      Login to leave Comment
                    </a-button>
                  </a-form-item>
                </div>
              </a-comment>
<!--              登录之后进行留言-->
              <a-comment>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
                <div slot="content">
                  <a-form-item>
                    <a-textarea :rows="4" :value="value" @change="handleChange" />
                  </a-form-item>
                  <a-form-item>
                    <a-button html-type="submit" :loading="submitting" type="info" @click="handleSubmit">
                      leave Comment
                    </a-button>
                  </a-form-item>
                </div>
              </a-comment>
              <a-list
                class="comment-list"
                :header="`${data.length} comments`"
                item-layout="horizontal"
                :data-source="data">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-comment :author="item.author" :avatar="item.avatar">
                    <template slot="actions">
                      <span v-for="action in item.actions">{{ action }}</span>
                    </template>
                    <p slot="content">
                      {{ item.content }}
                    </p>
                    <a-tooltip slot="datetime">
                      <span>{{ item.datetime }}</span>
                    </a-tooltip>
                  </a-comment>
                </a-list-item>
              </a-list>
            </a-layout-content>

          </a-layout>
        </a-layout-content>



        <a-layout-footer style="text-align: center;">
          Movies
        </a-layout-footer>
      </a-layout>
<!--        <el-header class="index-header">-->
<!--          <usernav></usernav>-->
<!--          1111111111111111111111111-->
<!--          22222222-->
<!--        </el-header>-->


  </div>
</template>
<script>
  // 导入组件
  import usernav from "../../components/usernav";
  import {getMovie} from "../../api/axiosMovie";
  export default {
    name: 'homepage',
    data() {
      return {
        movieList:{

        },
        data: [
          {
            actions: ['Reply to'],
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content:
              'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            datetime: 2019
          },
          {
            actions: ['Reply to'],
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content:
              'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            datetime: 2022
          },
        ],
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
      movieDetail(id){
        getMovie(id,'id')
          .then(res => {
            if (res) {
              // console.log(res)
              this.movieList = res.data
              console.log('movielist: ', this.movieList)
            } else {
              this.$message({
                type: 'info',
                message: "fail"
              })
            }
          })
      },
      //movie start
      // cllickMovie(){
      //   console.log('2222222222')
      //   getMovie()
      //     .then(res => {
      //       if (res) {
      //         console.log("hello")
      //         // this.getInfo()
      //         console.log(res)
      //         this.$message({
      //           type: 'success',
      //           message:  h('p', null, [
      //             h('span', null, 'charge '),
      //             h('i', { style: 'color: teal' }, ),
      //             h('span', null, ' ￡ success '),
      //           ])
      //         })
      //       } else {
      //         this.$message({
      //           type: 'info',
      //           message: "fail"
      //         })
      //       }
      //     })
      // },

      // end


      clickCharge(){
        this.chargeFormVisible = true
      },

      getInfo(){
        this.userGet.userId = JSON.parse(localStorage.getItem("userdata")).id
        console.log("user info test: ", this.userGet)
        getUserInfo(this.userGet)
          .then(res => {
            console.log("user info: ",res)
            if (res) {
              localStorage.setItem('userdata', JSON.stringify(res))
              this.userInfo = JSON.parse(localStorage.getItem("userdata"))
              // this.$message({
                // type: 'success',
                // message: "ok"
              // })
            } else {
              this.$message({
                type: 'info',
                message: "get user info"
              })
            }
          })
          .catch(err => {
            this.$message.error('get user message fail')
          })
      },

      closeDialog() {
        this.chargeFormVisible = false
      }
    },
    created() {

      this.movieId = this.$route.params.movieId
      this.movieDetail(this.movieId)
      // this.userInfo = JSON.parse(localStorage.getItem("userdata"))
      // console.log(this.userInfo)
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

