<template>
  <div style="line-height: 60px; display: flex;">
    <div style="flex: 1;">
      <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px" @click="collapse"></span>

      <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
        <!-- <el-breadcrumb-item :to="'/home'">首页</el-breadcrumb-item> -->
		<el-breadcrumb-item :to="'/home'">主页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown @command="handleCommand" style="cursor: pointer;text-align: right;">
		<div style="display: inline-block">
			<span style="position: relative; top: 10px; right: 5px">
				<el-avatar size="small" v-if="user.aavatar==null">{{user.ausername}}</el-avatar>
				<el-avatar size="small" v-else :src="user.aavatar"></el-avatar>
			</span>
		    <!-- <img :src="user.avatar_url" alt=""
		         style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px"> -->
		    <span>{{user.ausername}}</span><i class="el-icon-arrow-down el-icon--right"></i>
		</div>
      <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
        <el-dropdown-item command="personal" style="font-size: 14px; padding: 5px 0" icon="el-icon-postcard">个人信息</el-dropdown-item>
        <el-dropdown-item command="exit" style="font-size: 14px; padding: 5px 0" icon="el-icon-switch-button">
			<span style="text-decoration: none"  v-loading.fullscreen.lock="fullscreenLoading">退出</span>
		</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
	user: Object
  },
  data() {
  	return {
  		fullscreenLoading: false,
  	}
  },
  computed: {
      currentPathName () {
        return this.$store.state.currentPathName;　　//需要监听的数据
      }
    },
	methods: {
		collapse() {
		      // this.$parent.$parent.$parent.$parent.collapse()  // 通过4个 $parent 找到父组件，从而调用其折叠方法
		      this.$emit("asideCollapse")
		    },
		handleCommand(command){
			if(command=='exit')
			{
				const loading = this.$loading({
				    lock: true,
				    text: '请稍等',
				    spinner: 'el-icon-loading',
				    background: 'rgba(0, 0, 0, 0.7)'
				});
				setTimeout(() => {
					this.$router.push('/login')
					/* this.$notify({
					          title: '',
					          message: '退出成功',
					          type: 'success'
					        }); */
					this.$message.success("退出成功")
					localStorage.removeItem("user")   //清空缓存
				    loading.close();
				}, 1000);
			}
			if(command=='personal')
			{
				this.$router.push('/personal')
			}
		}
	},
}
</script>

<style scoped>

</style>