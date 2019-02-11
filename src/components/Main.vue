<template>
  <el-container>
    <el-header><h2>Vue+.Net Core+ElementUI+axios+JwtToken的动态路由demo</h2></el-header>
    <el-container>
      <el-aside width="200px">
        <left-menu :menus="menuDatas"></left-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import LeftMenu from '@/components/LeftMenu'
import MenuHelper from '@/common/menuHelper.js'

export default {
  components: {
    LeftMenu
  },
  data () {
    return {
      menuDatas: []
    }
  },
  mounted () {
    this.getMenus()
  },
  methods: {
    getMenus () {
      this.axios.get('/Menu/Menus')
        .then((response) => {
          if (response.data) {
            this.$store.commit('setMenus', response.data.menus)
            let menuHeler = new MenuHelper(response.data.menus)
            let routes = menuHeler.buildRoutes()
            this.$router.options.routes = null
            this.$router.addRoutes(routes) // 使用从后台服务端传来的动态路由

            let menuDatas = menuHeler.buildElementMenus((menu) => { return !menu.parentId })
            this.menuDatas = menuDatas
          }
        })
        .catch(error => {
          alert(error)
        })
    }
  }
}
</script>
<style scoped>
.el-container {
  height: 600px;
}
.el-header {
  background-color: cyan;
}
.el-aside {
  background-color: silver;
}
</style>
