<!--
* @FileDescription: top nav of home and movie page
* @Author: Chuheng Xiang
* @Student number: 2750443X
* @LastEditors: Chuheng Xiang
-->

<template>
  <div>

    <div class="nav-class">
<!--      <a-menu v-model="current" mode="horizontal" theme="dark"-->
<!--      :defaultSelectedKeys="[$route.path]">-->
      <a-menu  mode="horizontal" theme="dark">
        <a-menu-item> <a-input-search placeholder="Search movies" style="width: 200px" @search="onSearch" /></a-menu-item>
        <a-menu-item key="home"> <router-link :to="{path:'/home'}"> <a-icon type="home" />
          <span class="nav-span">Home</span></router-link>
        </a-menu-item>
        <a-menu-item key="movies">
          <router-link :to="{path:'/movies'}">
            <a-icon type="appstore" />
            <span class="nav-span">Movies</span>
          </router-link>
        </a-menu-item>

        <a-menu-item class="user_info"  v-show="userId==0" >
          <router-link to="/login">
          Login
          </router-link>
        </a-menu-item>

        <a-menu-item class="user_info" v-show="userId!=0">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <a-avatar shape="square" icon="user" />
              {{userName}}
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay" @click="onClick">
              <a-menu-item key="1">
                <router-link to="users/profile">
                  Profile
                </router-link>
              </a-menu-item>
              <a-menu-item @click="logoutHandle">
                Logout
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-menu-item>
      </a-menu>
    </div>
  </div>
</template>

<script>
  import {loginout} from "../api/userMG";
  import { Message } from 'element-ui'

  export default {
    data(){
      return {
        // current: ['home'],
        ruleForm: {
          userId : 0,
        },
        userId : 0,
        userName: '',
        user:{}
      }
    },
    name: "usernav",
    created() {
      this.user = JSON.parse(localStorage.getItem('userData'))
      this.userId = this.user.id
      console.log('this user is: ', this.userId)
      this.userName = this.user.username
    },
    methods: {
      //SEARCH MOVIE
      onSearch(val){
        console.log(val)
        this.$router.push({
          name: 'searchpage',
          params: {
            searchName: val,
          }
        })
      },
      //drop down click
      onClick({ key }) {
        console.log(`Click on item ${key}`);
      },

      logoutHandle(){
        // this.$confirm('log out?', 'message', {
        //   confirmButtonText: 'confirm',
        //   cancelButtonText: 'cancel',
        //   type: 'warning'
        // })
        //   .then(() => {
            // this.ruleForm.userId = JSON.parse(localStorage.getItem("userdata")).id
            const token = localStorage.getItem("logintoken")
            console.log(token)
            loginout(token,'token').then(res => {
              if (res) {
                console.log("log out successful")
                //If the request is successful, let him jump to the route for 2 seconds
                setTimeout(() => {
                  console.log("test user logout222: ", localStorage.getItem("userData"))
                  localStorage.removeItem("userData")
                  localStorage.removeItem('logintoken')
                  localStorage.removeItem('userRole')
                  console.log("test user logout333: ", localStorage.getItem("userData"))
                  this.$store.commit('logout', 'false')
                  this.$router.push({ path: '/' })
                  this.$router.go(0)
                  Message({
                    type: 'success',
                    message: 'logout success!'
                  })
                }, 1000)
              } else {
                Message.error(res.msg)
                this.logining = false
                return false
              }
            })
          .catch(() => {
            Message({
              type: 'info',
              message: 'logout cancel'
            })
          })
      }
    }
  }
</script>

<style scoped>
  .user_info{
    float: right;
  }
  .nav-span{
    color: white;
    font-size: 20px;
    font-weight: bold;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
