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
      const val = this.$route.params.sortName
      const genre = this.$route.params.genre
      // console.log('sort change: ',val)
      this.$router.push({
        name: 'movies',
        params: {
          sortName: val,
          genre: genre,
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
