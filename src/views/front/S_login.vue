<template>
	<div>
		<div class="s_wrapper">
			<div
				style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px;box-sizing: content-box;">
				<el-tabs v-model="activeName">
					<el-tab-pane label="登录" name="login">
						<el-form :model="suser" :rules="rules" ref="suserForm" @keyup.enter.native="login">
							<el-form-item prop="susername">
								<el-input placeholder="请输入用户名" size="medium" style="margin: 10px 0"
									prefix-icon="el-icon-user" v-model="suser.susername" clearable=""></el-input>
							</el-form-item>
							<el-form-item prop="spassword">
								<el-input placeholder="请输入密码" size="medium" style="margin: 10px 0"
									prefix-icon="el-icon-lock" show-password v-model="suser.spassword"></el-input>
							</el-form-item>
							<el-form-item style="text-align: center">
								<el-button :loading="loading" size="medium" type="primary" style="width:100%;"
									@click="login">
									<span v-if="!loading">登 录</span>
									<span v-else>登 录 中...</span>
								</el-button>
							</el-form-item>
						</el-form>
						<div style="height: 1px; background: #ddd; margin: 20px 0" />
						<span style="color: #949494;">
							<el-tooltip class="item" effect="dark" content="联系管理员qq：1483584422" placement="right">
							      <el-link style="font-size: 4px;">忘记密码？</el-link>
							    </el-tooltip>
						</span>
					</el-tab-pane>
					<el-tab-pane label="注册" name="register">
						<el-form :model="regist" :rules="rules2" ref="registForm" @keyup.enter.native="regist_sub">
							<el-form-item prop="susername">
								<el-input placeholder="请输入用户名" size="medium" style="margin: 5px 0"
									prefix-icon="el-icon-user" v-model="regist.susername"></el-input>
							</el-form-item>
							<el-form-item prop="spassword">
								<el-input placeholder="请输入密码" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock"
									show-password v-model="regist.spassword"></el-input>
							</el-form-item>
							<el-form-item prop="confirmPassword">
								<el-input placeholder="请确认密码" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock"
									show-password v-model="regist.confirmPassword"></el-input>
							</el-form-item>
							<el-form-item style="text-align: center">
								<el-button :loading="register_loading" size="medium" type="warning" style="width:100%;"
									@click="regist_sub">
									<span v-if="!register_loading">注 册</span>
									<span v-else>注 册 中...</span>
								</el-button>
							</el-form-item>
						</el-form>
					</el-tab-pane>
				</el-tabs>
		
			</div>
		</div>
	</div>
	
</template>

<script>
	export default {
		name: "Login",
		data() {
			return {
				loading: false,
				register_loading:false,
				activeName: 'login',
				suser: {},
				rules: {
					susername: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 7,
							message: '长度在 1 到 7 个字符',
							trigger: 'blur'
						}
					],
					spassword: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '长度在 1 到 20 个字符',
							trigger: 'blur'
						}
					],
				},
				regist: {},
				rules2: {
					susername: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 7,
							message: '长度在 1 到 7 个字符',
							trigger: 'blur'
						}
					],
					spassword: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '长度在 1 到 20 个字符',
							trigger: 'blur'
						}
					],
					confirmPassword: [{
							required: true,
							message: '请再次输入密码',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '长度在 1 到 20 个字符',
							trigger: 'blur'
						}
					],
				},
			}
		},
		created() {
			localStorage.removeItem("student_user") //清空缓存
		},
		methods: {
			login() {
				this.$refs['suserForm'].validate((valid) => {
					if (valid) { // 表单校验合法

						this.loading = true;
						setTimeout(() => {
							this.loading = false;
						}, 4500);

						this.request.get("/student/login", {
							params: {
								Susername: this.suser.susername,
								Spassword: this.suser.spassword,
							}
						}).then(res => {
							if (res.code == '200') {
								setTimeout(() => {
									localStorage.setItem("student_user", JSON.stringify(res
										.data)) // 存储用户信息到浏览器
									this.$router.push("/shop")
									this.$notify({
										title: '成功',
										message: '登录成功',
										type: 'success'
									});
									// 触发父级更新User的方法
									this.$emit("refreshUser")
									
									//this.$message.success("登录成功")
								}, 1000);

							} else {
								setTimeout(() => {
									this.$message.error(res.msg)
									this.loading = false
								}, 800);
								this.register_loading = false;
							}
						})

					} else {
						return false;
					}
				});
			},
			regist_sub() {
				this.$refs['registForm'].validate((valid) => {
					if (valid) { // 表单校验合法
						this.register_loading = true;
						if (this.regist.spassword != this.regist.confirmPassword) {
							this.register_loading = false;
							this.$message.error("两次输入的密码不一致!")
						} else {
							this.request.post("/student/registerStudent?Susername=" + this.regist.susername +
								"&Spassword=" + this.regist.spassword).then(res => {
								if (res.code == '200') {
									this.$notify({
										title: '成功',
										message: res.msg,
										type: 'success'
									});
									this.$message.success("正在前往登录界面...")
									setTimeout(() => {
										//跳转登录界面
										this.activeName='login'

										//清空注册的form表单数据
										this.regist = ""
									}, 2000);
								} else {
									this.$message.error(res.msg)
								}
							})
							this.register_loading = false;
						}

					} else {
						return false;
					}
				});
			}
		}
	}
</script>

<style>
	.el-card__body, .el-main {
	    padding: 0px;
	}
	.s_wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-image: url('../../assets/s_login-background.png');
		background-size: cover;
		overflow: hidden;
	}
</style>
