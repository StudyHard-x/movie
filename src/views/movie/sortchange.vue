<!--
* @FileDescription: when sort page update, route to this page first.
* @Author: Chuheng Xiang
* @Student number: 2750443X
-->

<template>
  <div>


  </div>
</template>
<script>

  // 导入组件

  export default {
    name: 'sortchange',
    data() {
      return {
        sortName:'',


      }
    },
    mounted() {
      this.path = this.$route.path;
      console.log(this.$route.path)
    },
    watch:{
      $route(to,from){
        this.path = to.path
      }
    },
    components: {
    },
    methods: {

    },
    created() {
      console.log("this page is sort change")
      const val = this.$route.params.sortName
      this.$router.push({
        name: 'movies',
        params: {
          sortName: val,
        }
      })
    },
    beforeUpdate() {},
    beforeMount() {

    }
  }
</script>

<style scoped>

</style>
