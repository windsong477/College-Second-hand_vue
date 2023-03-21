<template>
		<el-container style="min-width: 1200px;overflow: hidden;display: flex;">
		
		    <el-aside :width="sideWidth + 'px'" style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
		      <Aside  :isCollapse="isCollapse" :logoTextShow="logoTextShow" style="padding-bottom: 20px" />
		    </el-aside>
		
		    <el-container>
		      <el-header style="border-bottom: 1px solid #ccc;">
		        <Header :collapseBtnClass="collapseBtnClass" @asideCollapse="collapse" :user="user" />
		      </el-header>
		
		      <el-main>
		<!--        表示当前页面的子路由会在 <router-view /> 里面展示-->
		        <router-view  @refreshUser="getUser" />
		      </el-main>
		
		    </el-container>
		  </el-container>
  
</template>

<script>

import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  name: 'Home',
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      user: {}
    }
  },
  components: {
    Aside,
    Header
  },
  created() {
    // 从后台获取最新的User数据
    this.getUser()
	localStorage.removeItem("student_user") //清空缓存
  },
  methods: {
    collapse() {  // 点击收缩按钮触发
	console.log(this.isCollapse);
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {  // 收缩
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else {   // 展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
	  
    },
    getUser() {
      let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""
	  if (user.ausername) {
		  this.request.get("/admin/getOneAdmin?Aid="+user.aid).then(res => {
		  	this.user=res
		  })
		  	  
        /* // 从后台获取User数据
        this.request.get("/user/getUser" ).then(res => {
          // 重新赋值后台的最新User数据
          this.user = res.data
        }) */
      }
    }
  }
}
</script>
<style>
	.el-main {
		padding-bottom: 80px;
	    height: 100vh;
	    overflow-y: scroll;
		overflow-x: scroll;
	  }
		/* .el-header {
			background-color: rgb(48, 65, 86) !important;
		} */
</style>
