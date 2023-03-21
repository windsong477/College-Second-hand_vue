<template>
	<div class="wrapper_404">
		<div style="display: flex;flex-direction: column;align-items: center;">
			<img src="../assets/404.png" alt="">
			<el-button type="primary" @click="login" style="width: 120px;height: 40px;">
				<span v-if="user||student_user">返回登录</span>
				<span v-else>返回首页</span>
			</el-button>
		</div>

	</div>
</template>

<script>
	export default {
		name: "NotFound",
		data() {
			return {
				user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
				student_user:localStorage.getItem("student_user") ? JSON.parse(localStorage.getItem("student_user")) : null,
			}
		},
		methods: {
			login() {
				if (this.user&&this.student_user==null) {
				    this.$router.push("/login")
				}
				else if(this.user==null&&this.student_user)
				{
					this.$router.push("/s_login")
				}
				else
				{
					this.$router.push("/shop")
				}
				
			}
		},
	}
</script>

<style>
	.wrapper_404 {
		overflow: hidden;
		height: 100vh;
		display: flex;
		justify-content: center;

	}

	.bgImg {
		background: url("../assets/404.png") no-repeat;
		background-size: 100% 100vh;
	}
</style>
