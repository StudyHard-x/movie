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
                  <a-layout-content style="min-height: 380px; max-height: 383px">
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
                    <el-rate
                      v-model="ratings"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>

<!--                    <a-rate :value="ratings">-->
                  </a-layout-content>
                </a-col>
              </a-row>
            </a-layout-content>

            <a-layout-content style="margin-top: 40px; padding-right: 40px">
              <a-icon type="heart" />
              <span class="comment-title">Comment</span>
<!--              未登录时无法留言-->
              <a-comment v-show="userId==0">
                <a-avatar
                  slot="avatar"
                  icon="user"
                />
                <div slot="content">
                  <a-form-item>
<!--                    <a-textarea :rows="4" :value="value" @change="handleChange" />-->
                    <a-textarea :rows="4" />
                  </a-form-item>
                  <a-form-item>
                    <a-button html-type="submit" disabled>
                      Login to leave Comment
                    </a-button>
                  </a-form-item>
                </div>
              </a-comment>
<!--              登录之后进行留言-->
              <a-comment v-show="userId!=0">
                <a-avatar
                  slot="avatar"
                  icon="user"
                />
                <div slot="content">
                  <a-form :model="commentForm">
                    <a-form-item>
                      <a-textarea :rows="4" v-model:value="commentForm.comments"
                                  placeholder="Leave your comments"/>
                    </a-form-item>
                    <a-form-item>
                      <a-button html-type="submit"
                                 type="info" @click="open">
                        leave Comment
                      </a-button>
                    </a-form-item>
                  </a-form>

                </div>
<!--                comments-->
<!--                :-->
<!--                "bad story"-->
<!--                ratings-->
<!--                :-->
<!--                10-->
<!--                reviewTime-->
<!--                :-->
<!--                "2023-03-01 11:33:39"-->
              </a-comment>

              <a-list
                class="comment-list"
                :header="`${data.length} comments`"
                item-layout="horizontal"
                :data-source="data">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-comment :author="item.username" >
                    <a-avatar
                      slot="avatar"
                      icon="user"
                    />
<!--              <a-comment :author="item.author" :avatar="item.avatar">-->

                    <!--                    <template slot="actions">-->
<!--                      <span v-for="action in item.actions">{{ action }}</span>-->
<!--                    </template>-->
<!--                    <p>RATE</p>-->
<!--                    <a-rate v-model="item.ratings" />-->
                    <el-rate
                      v-model="item.ratings"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>

                    <p slot="content">
                      {{ item.comments }}
                    </p>
                    <a-tooltip slot="datetime">
                      <span>{{ item.reviewTime }}</span>
                    </a-tooltip>
                  </a-comment>
                </a-list-item>
              </a-list>
            </a-layout-content>

          </a-layout>
        </a-layout-content>

        <a-layout-footer class="detail-footer">
          <userfooter></userfooter>
        </a-layout-footer>
      </a-layout>

      <el-dialog title="rate" :visible.sync="dialogFormVisible">
        <el-form :model="commentForm">
          <el-form-item>
            <el-rate v-model="value1"></el-rate>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">cancel</el-button>
          <el-button type="primary" @click="leaveComment">submit</el-button>
        </div>
      </el-dialog>


  </div>
</template>
<script>
  // 导入组件
  import userfooter from "../../components/userfooter";
  import usernav from "../../components/usernav";
  import {addComment, getComment, getMovie} from "../../api/axiosMovie";
  import { Message } from "element-ui";
  export default {

    name: 'homepage',
    data() {
      return {
        value1:null,
        dialogFormVisible: false,
        ratings: 0,
        userId:0,
        movieList:{

        },
        commentForm:{
          movie_id: 0,
          comments: '',
          ratings: 0,
        },
        commentList:[],
        data: [
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
      userfooter,
      usernav
    },
    methods: {
      open() {
        this.dialogFormVisible = true
      },

      movieDetail(id){
        getMovie(id,'id')
          .then(res => {
            if (res) {
              setTimeout(()=>{
                this.movieList = res.data
                // this.movieComment(id)
              },1000)
              // console.log('movielist: ', this.movieList)
            } else {
              this.$message({
                type: 'info',
                message: "fail"
              })
            }
          })
      },
      movieComment(id){
        getComment(id,'id').then(res=>{
          if(res){
            // console.log(res.data.avgRatings)
            this.ratings = res.data.avgRatings
            this.data = res.data.pageData.data
          }
          // console.log(this.data)
          }
        )
      },
      leaveComment(){
        this.dialogFormVisible = false
        // console.log(this.value1)
        this.commentForm.movie_id = this.movieId
        this.commentForm.ratings = this.value1
        console.log(this.commentForm)
        addComment(this.commentForm).then(res => {
          if (res) {
            setTimeout(()=>{
              this.movieComment(this.movieId)
              Message({
                type: 'info',
                message: "leave message success"
              })
            },1000)
            this.commentForm={brand_right:0}
            // console.log('movielist: ', this.movieList)
          }
          else {
            Message({
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
        // this.userGet.userId = JSON.parse(localStorage.getItem("userdata")).id
        // console.log("user info test: ", this.userGet)
        // getUserInfo(this.userGet)
        //   .then(res => {
        //     console.log("user info: ",res)
        //     if (res) {
        //       localStorage.setItem('userdata', JSON.stringify(res))
        //       this.userInfo = JSON.parse(localStorage.getItem("userdata"))
        //       // this.$message({
        //         // type: 'success',
        //         // message: "ok"
        //       // })
        //     } else {
        //       this.$message({
        //         type: 'info',
        //         message: "get user info"
        //       })
        //     }
        //   })
        //   .catch(err => {
        //     this.$message.error('get user message fail')
        //   })
      },

      closeDialog() {
        this.chargeFormVisible = false
      }
    },
    created() {

      this.movieId = this.$route.params.movieId
      this.movieDetail(this.movieId)
      this.movieComment(this.movieId)
      if (this.userId = JSON.parse(localStorage.getItem('userData')).id){
        console.log('this.userId 1 : ',this.userId)
      }
      else {
        console.log('this.userId 2 : ',this.userId)
      }
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
/*  a-textarea{*/
/*    background: black !important;*/
/*  }*/
/*/deep/.ant-comment-inner{*/
/*    background: transparent !important;*/
/*  }*/
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
.detail-layout{

}
.detail-footer{
  /*background: black;*/
  color: black;
  font-family: Verdana;
  text-align: center;
}
</style>

