<!--
* @FileDescription: admin review page
* @Author: Chuheng Xiang
* @Student number: 2750443X
* @LastEditors: Chuheng Xiang
-->
<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>management</el-breadcrumb-item>
      <el-breadcrumb-item>review management</el-breadcrumb-item>
    </el-breadcrumb>

<!--    comment list-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="loading" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="username" label="User Name" width="180">
      </el-table-column>
      <el-table-column sortable prop="movie_name" label="Movie Name" width="180">
      </el-table-column>
      <el-table-column sortable prop="comment" label="Review" width="280">
      </el-table-column>
      <el-table-column sortable prop="time" label="Time" width="180">
      </el-table-column>
      <el-table-column align="center" label="operation" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelet(scope.$index, scope.row)">delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
import {allComment, deleteComment} from "../../api/axiosMovie";
import {Message} from 'element-ui'
export default {
  data() {
    return {
      loading: false,
      // delete
      deletedata: {
        id: 0,
      },
      // data in list
      listData: [],
      // page
    }
  },
  components: {
    Pagination
  },
  created() {
    this.getdata()
  },
  methods: {
    // delete one comment
    handleDelet(index, params){
      console.log('hello+', this.deletedata.id)
      this.deletedata.id = params.id
      console.log(this.deletedata)
      deleteComment(this.deletedata).
      then(res=>{
        if (res){
          setTimeout(()=>{
            Message({
              type:'success',
              message:'delete review success'
            })
          },500)
          this.getdata()
        }
        }
      )
    },
    // get all comment
    getdata() {
        allComment()
        .then(res => {
           if (res) {
             setTimeout(()=>{
               this.listData = res.data.data
             },1000)
              // console.log("all reviews: ", res)
            }
           else {
              this.$message({
                type: 'info',
                message: res.msg
              })
            }
        })
    },
  },
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>


