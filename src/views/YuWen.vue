<template>
  <div>
    <h1>语文</h1>
    <el-button type='primary' @click='addLiShi' :loading='loading'>添加科目：历史</el-button>
    <h3>添加后再刷新就会在左侧菜单里看到历史了</h3>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    addLiShi () {
      this.loading = true
      this.axios.post('/menu/addLiShi')
        .then((resp) => {
          this.loading = false
          alert('设置成功')
        })
        .catch(error => {
          this.loading = false
          alert(error.message)
        })
    }
  }
}
</script>
