<template>
	<div>
		<div style="position: fixed;width: 100vw; min-width: 1400px;">
				<el-menu style="border-bottom:none;width: 1400px;margin: 0 auto;background-color: rgb(255 255 255 / 0);" default-active="'/shop'" 
					class="el-menu-demo" mode="horizontal" background-color="#5aa9ad"
					text-color="#ffffff" active-text-color="#ffffff" router>
					<el-menu-item style="background-color: #5aa9ad;" index="/shop">
						<img src="../assets/logo.png" alt="" style="width: 20px;" />
						高校二手物品交易商城
					</el-menu-item>
				</el-menu>
		</div>
		<div class="wrapper">
			<transition v-show="!register_flag" name="el-fade-in-in">
				<div v-if="!register_flag"
					style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px;box-sizing: content-box;">
					<div style="margin: 20px 0; text-align: center; font-size: 20px;"><b>高校二手交易后台管理系统</b></div>
					<el-form :model="auser" :rules="rules" ref="auserForm" @keyup.enter.native="login">
						<el-form-item prop="ausername">
							<el-input placeholder="请输入用户名" size="medium" style="margin: 10px 0" prefix-icon="el-icon-user"
								v-model="auser.ausername" clearable=""></el-input>
						</el-form-item>
						<el-form-item prop="apassword">
							<el-input placeholder="请输入密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock"
								show-password v-model="auser.apassword"></el-input>
						</el-form-item>
						<el-form-item style="text-align: center">
							<el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click="login">
								<span v-if="!loading">登 录</span>
								<span v-else>登 录 中...</span>
							</el-button>
							<div>
								<el-button @click="register_flag=!register_flag" type="text" size="small" autocomplete="off"
									style="margin-top: 5px;">注册</el-button>
							</div>
						</el-form-item>
					</el-form>
				</div>
				<div v-else
					style="margin: 200px auto; width: 350px; height: 300px; padding: 20px; border-radius: 10px;box-sizing: content-box;color: #ffffff;font-size: 22px;">
					欢迎进入高校二手交易后台管理系统~<br /><br /><br />
					　　　／　　　 ／ | <br />
					　　 Γ￣￣￣￣ |　| <br />
					　　 |[]::　　　 |　| <br />
					　　 |＿＿_＿＿|　|<br />
					　　 |[]::　　　 |　| <br />
					　　 |＿＿_＿＿|　| <br />
					ｶﾞﾗｯ |＿＿_＿＿|　| <br />
					.彡／(´･ω･)　／|　| <br />
					　Γ￣￣￣￣ |　|／ <br />
					　Ｌ＿＿＿＿|／<br />
				</div>
			</transition>
		
		
			<transition name="el-zoom-in-center">
				<div v-show="register_flag"
					style="margin: 200px auto; background-color: #fff; width: 350px; height: 340px; padding: 20px; border-radius: 10px;box-sizing: content-box;">
					<div style="margin: 20px 0; text-align: center; font-size: 20px;"><b>注 册</b></div>
					<el-form :model="regist" :rules="rules2" ref="registForm" @keyup.enter.native="regist_sub">
						<el-form-item prop="ausername">
							<el-input placeholder="请输入用户名" size="medium" style="margin: 5px 0" prefix-icon="el-icon-user"
								v-model="regist.ausername"></el-input>
						</el-form-item>
						<el-form-item prop="apassword">
							<el-input placeholder="请输入密码" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock"
								show-password v-model="regist.apassword"></el-input>
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
							<div>
								<el-button @click="register_flag=!register_flag" type="text" size="small" autocomplete="off"
									style="margin-top: 5px;">返回</el-button>
							</div>
						</el-form-item>
					</el-form>
				</div>
			</transition>
		
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
				register_flag: false,
				auser: {},
				rules: {
					ausername: [{
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
					apassword: [{
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
					ausername: [{
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
					apassword: [{
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
		methods: {
			login() {
				this.$refs['auserForm'].validate((valid) => {
					if (valid) { // 表单校验合法
					
					    this.loading = true;
						setTimeout(() => {
							this.loading = false;
						}, 4500);
						
						this.request.get("/admin/login", {
							params: {
								Ausername: this.auser.ausername,
								Apassword: this.auser.apassword,
							}
						}).then(res => {
							if (res.code == '200') {
								setTimeout(() => {
									localStorage.setItem("user", JSON.stringify(res
										.data)) // 存储用户信息到浏览器
									this.$router.push("/home")
									this.$notify({
									          title: '成功',
									          message: '登录成功',
									          type: 'success'
									        });
									
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
						if(this.regist.apassword!=this.regist.confirmPassword)
						{
							this.register_loading = false;
							this.$message.error("两次输入的密码不一致!")
						}
						else
						{
							this.request.post("/admin/registerAdmin?Ausername="+this.regist.ausername+"&Apassword="+this.regist.apassword).then(res => {
								if (res.code == '200') {
									this.$notify({
									          title: '成功',
									          message: res.msg,
									          type: 'success'
									        });
									this.$message.success("正在前往登录界面...")
									setTimeout(() => {
										//跳转登录界面
										this.register_flag=!this.register_flag
										
										//清空注册的form表单数据
										this.regist=""
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
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-image: url("../assets/login-background.png");
		background-size: cover;
		overflow: hidden;
	}
</style>
