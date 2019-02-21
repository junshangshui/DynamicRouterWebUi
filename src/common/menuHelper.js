const _import = require('@/router/_import_' + process.env.NODE_ENV)
const leftMenuMaxDeep = 3 // 左侧显示的菜单的最大深度（这里值为3，即下面的“英语语法”和"英语口语"这样的深度大于3的不显示在主页的左侧菜单栏）

class Menu {
  constructor (menuId, menuName, parentId, iconClass, routePath) {
    this.menuId = menuId
    this.menuName = menuName
    this.parentId = parentId
    this.iconClass = iconClass
    this.routePath = routePath
    this.children = []
  }
}

export default class MenuHelper {
  constructor (menus) {
    this.menus = menus
  }

  // 构建element菜单所用的数据结构
  buildElementMenus (delegate) {
    var elementMenus = []
    let parentMenus = this.menus.filter(menu => delegate(menu)) // 先筛选出一级菜单，什么是一级菜单则交给外部委拖方法设置，例如menuHeler.buildElementMenus((menu) => { return !menu.parentId })
    for (let menuInfo of parentMenus) {
      let menu = new Menu(menuInfo.menuId, menuInfo.menuName, menuInfo.parentId, menuInfo.iconClass, menuInfo.routePath)
      elementMenus.push(menu)

      this.recursiveBuildElementMenus(elementMenus, menu, menuInfo, 1)
    }
    return elementMenus
  }

  // 递归构建element菜单
  recursiveBuildElementMenus (elementMenus, parentElementMenu, parentMenuInfo, menuDeep) {
    menuDeep++
    let childMenusInfos = this.menus.filter(menu => menu.parentId === parentMenuInfo.menuId)
    if (!childMenusInfos) {
      return
    }
    for (let menuInfo of childMenusInfos) {
      let menu = new Menu(menuInfo.menuId, menuInfo.menuName, menuInfo.parentId, menuInfo.iconClass, menuInfo.routePath)
      parentElementMenu.children.push(menu)

      if (menuDeep < leftMenuMaxDeep) {
        this.recursiveBuildElementMenus(elementMenus, menu, menuInfo, menuDeep)
      }
    }
  }

  // 构建vue route所用的数据结构
  buildRoutes () {
    var routes = []
    let mainRoute = {
      path: '',
      component: _import('components/Main'),
      meta: { requireAuth: true, menuId: null },
      children: []
    }
    routes.push(mainRoute)

    let parentRouteDatas = this.menus.filter(menu => menu.routePath && !menu.routeParentPath)
    for (let routeData of parentRouteDatas) {
      try {
        let route = {
          path: routeData.routePath,
          component: _import(routeData.vueCompPath),
          meta: { requireAuth: routeData.requireAuth, menuId: routeData.menuId },
          children: []
        }
        mainRoute.children.push(route)
        this.recursiveBuildRoutes(route, routeData)
      } catch (e) {
        console.log(e)
      }
    }

    routes.push({
      path: '/Login',
      component: _import('components/Login'),
      meta: { requireAuth: false, menuId: null },
      children: null
    })

    // if (routes) {
    //   this.resolveRoutes(routes)
    // }

    return routes
  }

  // 递归构建vue route
  recursiveBuildRoutes (parentRoute, parentMenuData) {
    let childRouteDatas = this.menus.filter(menu => menu.routePath && menu.routeParentPath === parentMenuData.routePath)
    if (!childRouteDatas) {
      return
    }
    for (let routeData of childRouteDatas) {
      try {
        let route = {
          path: routeData.routePath,
          component: _import(routeData.vueCompPath),
          meta: { requireAuth: routeData.requireAuth, menuId: routeData.menuId },
          children: []
        }
        parentRoute.children.push(route)
        this.recursiveBuildRoutes(route, routeData)
      } catch (e) {
        console.log(e)
      }
    }
  }

  // 解析路由
  // resolveRoutes (routeDatas) {
  //   for (let index in routeDatas) {
  //     let data = routeDatas[index]
  //     if (data.children && data.children.length > 0) {
  //       data.component = _import(data.component)
  //       this.resolveRoutes(data.children) // 递归解析子路由
  //     } else {
  //       data.component = _import(data.component)
  //     }
  //   }
  // }
}
