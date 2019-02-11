<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="lightgray"
      text-color="blueviolet"
      active-text-color="#ffd04b">
      <template v-for="menu in menus">
        <template v-if="menu.children && menu.children.length>0">
          <left-menu-sub :key="menu.menuId" :menu-data="menu"></left-menu-sub>
        </template>
        <template v-else>
          <el-menu-item :key="menu.menuId" :index="menu.menuId" @click="goto(menu)">
            <i :class="menu.iconClass"></i>
            <span slot="title">{{ menu.menuName }}</span>
          </el-menu-item>
        </template>
      </template>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>学习管理</span>
        </template>
        <el-submenu index="1-1">
          <template slot="title">文科</template>
            <el-menu-item index="1-1-1">
              <router-link to="YuWen">语文</router-link>
            </el-menu-item>
            <el-menu-item index="1-1-2">
              <router-link to="YingYu">英语</router-link>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="1-2">
          <template slot="title">理科</template>
            <el-menu-item index="1-2-1">
              <router-link to="ShuXue">数学</router-link>
            </el-menu-item>
            <el-menu-item index="1-2-2">
              <router-link to="Wuli">物理</router-link>
            </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <router-link to="RoleManage">角色管理</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <router-link to="UserManage">用户管理</router-link>
      </el-menu-item> -->
    </el-menu>
</template>
<script>
import LeftMenuSub from '@/components/LeftMenuSub'
export default {
  props: {
    menus: Array
  },
  components: {
    LeftMenuSub
  },
  methods: {
    goto (menuData) {
      this.$router.push({ path: menuData.routePath })
    }
  }
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
span {
  color: blueviolet;
}
</style>
