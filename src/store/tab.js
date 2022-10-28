import Cookies from "js-cookie"
export default {
  state:{
    isCollapse: false,  // 用于控制菜单的展开还是收起
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home"
      }
    ], // 面包屑数据
    menu:[]
  },
  mutations:{
    // 修改菜单展开收起的方法
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    // 修改面包屑数据
    selectMenu(state, val) {
      // 判断添加的数据是否为首页
      if(val.name !== 'home') {
        // 如果不是首页 再判断传进来的数据是否存在
        const index = state.tabList.findIndex(item => item.name === val.name)
        // 如果不存在
        if(index === -1) {
          state.tabList.push(val)
        }
      }
    },
    // 删除指定的Tag数据
    closeTag(state, item) {
      // 就是先将push进来的数据进行编号  然后删除对应的编号就行
      const index = state.tabList.findIndex(val => val.name === item.name)
      state.tabList.splice(index, 1)
    },
    // 设置menu的数据
    setMenu(state, val) {
      state.menu = val
      Cookies.set('menu', JSON.stringify(val)) // Cookies中的数据需要是字符串
    },
    // 动态注册路由
    addMenu(state, router) {
      // 判断缓存中是否有数据
      if(!Cookies.get('menu')) return
      const menu = JSON.parse(Cookies.get('menu'))
      state.menu = menu
      // 组装动态路由的数据
      const menuArray = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`../views/${item.url}`)  // 此处有疑问 
            return item
          })
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      });
      console.log(menuArray, 'menuArray');
      // 路由的动态添加
      menuArray.forEach(item => {
        router.addRoute('Main', item)
      })
    }
  }
}