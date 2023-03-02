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
            <span class="search-name">Search Result: {{searchName}}</span>

            <a-list item-layout="horizontal" size="large" :data-source="listData">
              <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">

                <a-layout-content>
                  <a-row :gutter="16">
                    <a-col :span="8">
                      <p style="fontSize: 14px;color: rgba(0, 0, 0, 0.85); marginBottom: 16px;fontWeight: 500">
                        {{ item.title }}
                      </p>
                      <a-card hoverable style="width: 200px">
                        <img
                          slot="cover"
                          alt="example"
                          src="../../assets/img/rings.jpg"
                        />
                      </a-card>
                    </a-col>

                    <a-col :span="14">
                      <a-layout-content style="min-height: 250px">
                        <span>MOVIE INFO</span><br><br>
                        <span> {{item.content}} </span>
                      </a-layout-content>

                      <a-layout-content style="margin-top: 40px">
                        <span>RATE</span><br><br>
                        <!--                    <a-rate v-model="value" />-->
                      </a-layout-content>
                    </a-col>
                  </a-row>
                </a-layout-content>
              </a-list-item>

            </a-list>
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
  export default {
    name: 'searchpage',
    data() {
      return {
        movieName:'',
        data: [],
        searchName:'',
        listData:[
          { title: 'search result 1',
            content:
              "The sequel to the Golden Globe-nominated and AFI Award-winning \"The Lord of the Rings: The Fellowship of the Ring,\" \"The Two Towers\" follows the continuing quest of Frodo (Elijah Wood) and the Fellowship to destroy the One Ring. Frodo and Sam (Sean Astin) discover they are being followed by the mysterious Gollum. Aragorn (Viggo Mortensen), the Elf archer Legolas and Gimli the Dwarf encounter the besieged Rohan kingdom, whose once great King Theoden has fallen under Saruman's deadly spell."
          },{
          title: 'search result 2',
            content: "22232323e1"
          }
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

    },
    created() {
      this.searchName = this.$route.params.searchName
    },
    beforeUpdate() {},
    beforeMount() {

    }
  }
</script>

<style scoped>
  .search-name{
    font-size: 25px;
    font-weight: bold;
  }
</style>

