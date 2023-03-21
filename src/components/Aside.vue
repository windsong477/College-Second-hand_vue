<template>
	<!-- <a>background-color="rgb(48, 65, 86)"</a> -->
  <el-menu  style="min-height: 100%; overflow-x: hidden"
           background-color="rgb(42, 42, 42)"
           text-color="#fff"
           active-text-color="#409eff"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
		   :default-active="$route.path"
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; right: 5px">
      <b style="color: white" v-show="logoTextShow">高校二手交易后台</b>
    </div>
    <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">主页</span>
    </el-menu-item>
    <el-submenu index="1" >
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item index="/admin">
        <i class="el-icon-s-custom"></i>
        <span slot="title">管理员用户</span>
      </el-menu-item>
	  <el-menu-item index="/student">
	    <i class="el-icon-user"></i>
	    <span slot="title">学生用户</span>
	  </el-menu-item>
    </el-submenu>
	<el-submenu index="2" >
	  <template slot="title">
	    <i class="el-icon-s-order"></i>
	    <span slot="title">订单管理</span>
	  </template>
	  <el-menu-item index="/goods">
	    <i class="el-icon-shopping-bag-1"></i>
	    <span slot="title">商品审核</span>
	  </el-menu-item>
	  <el-menu-item index="/order">
	    <i class="el-icon-document-copy"></i>
	    <span slot="title">订单表</span>
	  </el-menu-item>
	</el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean,
  },
  watch: {
      $route() {
        let i = this.$route.path;
        setTimeout(() => { //路由跳转
          this.$refs.menu = i
        }, 100)
      }
    }
}
</script>

<style scoped>
.el-menu-item.is-active {
  background-color: rgb(38, 52, 69) !important;
}
.el-menu-item:hover {
  background-color: rgb(38, 52, 69) !important;
}

.el-submenu__title:hover {
  background-color: rgb(38, 52, 69) !important;
}
/*解决收缩菜单文字不消失问题*/
.el-menu--collapse span {
  visibility: hidden;
}
</style>