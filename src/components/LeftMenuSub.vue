<template>
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
      </el-submenu> -->
    <el-submenu :index="menuData.menuId">
      <template slot="title">
        <i :class="menuData.iconClass"></i>
        <span>{{ menuData.menuName }}</span>
      </template>
      <template v-for="childMenu in menuData.children">
        <template v-if="childMenu.children && childMenu.children.length>0">
          <left-menu-sub :key="childMenu.menuId" :menu-data="childMenu"></left-menu-sub>
        </template>
        <template v-else>
          <el-menu-item :key="childMenu.menuId" :index="childMenu.menuId" @click="goto(childMenu)">
            <i :class="childMenu.iconClass"></i>
            <span slot="title">{{ childMenu.menuName }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-submenu>
</template>
<script>
export default {
  components: {
    LeftMenuSub: () => import('@/components/LeftMenuSub.vue')
  },
  props: {
    menuData: Object
  },
  methods: {
    goto (menuData) {
      this.$router.push({ path: menuData.routePath })
    }
  }
}
</script>
