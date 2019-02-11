<template>
  <el-container>
    <el-header>
      <h1>英语</h1>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <ul :key="index" v-for="(menu, index) in childMenus">
          <li @click="goto(menu)">{{ menu.menuName}}</li>
          <template v-if="menu.children && menu.children.length > 0">
            <template v-for="childMenu in menu.children">
              &nbsp;&nbsp;&nbsp;&nbsp;<a :key="childMenu.menuId" @click="goto(childMenu)">{{ childMenu.menuName }}</a><br  :key="childMenu.menuId+'a'"/>
            </template>
          </template>
        </ul>
        <el-button type='success' @click='addYinYuFanYi' :loading='loading'>添加：翻译练习</el-button>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import MenuHelper from '@/common/menuHelper.js'
export default {
  mounted () {
    this.initMenus()
  },
  data () {
    return {
      loading: false,
      childMenus: Array
    }
  },
  methods: {
    goto (menuData) {
      this.$router.push({ path: menuData.routePath, query: { menuName: menuData.menuName } })
    },
    initMenus () {
      let curMenuId = this.$route.meta.menuId
      let menus = this.$store.state.menus
      let menuHeler = new MenuHelper(menus)
      let menuData = menuHeler.buildElementMenus((menu) => { return menu.menuId === curMenuId })
      if (menuData && menuData.length === 1) {
        this.childMenus = menuData[0].children
      } else {
        this.childMenus = null
      }
    },
    addYinYuFanYi () {
      this.loading = true
      this.axios.post('/menu/AddYinYuFanYi')
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

<style scoped>
.el-container {
  height: 600px;
}
.el-header {
  background-color: burlywood;
}
.el-aside {
  background-color: moccasin;
}
</style>
