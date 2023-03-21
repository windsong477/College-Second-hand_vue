<template>
	<div style="display: flex;">
		<div style="width: 30%;height: 70%;">
			<el-card>
				<el-descriptions class="margin-top" title="个人信息" :column="1" size="medium " border>
					<template slot="extra">
						<el-button type="primary" @click="update=!update" style="background-color: #409EFF;">
							<div v-if="update==true">
								关闭
								<i class="el-icon-caret-left"></i>
							</div>
							<div v-else>
								编辑
								<i class="el-icon-caret-right"></i>
							</div>
						</el-button>
					</template>
					<el-descriptions-item>
						<template slot="label">
							<i class="el-icon-picture-outline-round"></i>
							用户头像
						</template>
						<template>
							<div v-if="!user.aavatar">
								<el-avatar>{{user.ausername}}</el-avatar>
							</div>
							<div v-else>
								<el-avatar>
									<el-image :src="user.aavatar" :preview-src-list="[user.aavatar]">
									</el-image>
								</el-avatar>
							</div>
						</template>
					</el-descriptions-item>
					<el-descriptions-item>
						<template slot="label">
							<i class="el-icon-user"></i>
							用户名
						</template>
						{{user.ausername}}
					</el-descriptions-item>

					<el-descriptions-item>
						<template slot="label">
							<i class="el-icon-mobile-phone"></i>
							电话
						</template>
						{{user.aphone}}
					</el-descriptions-item>
				</el-descriptions>
			</el-card>
		</div>
		<div style="width: 40%; margin-left: 2%;">
			<transition name="el-fade-in-linear">
				<el-card v-if="update==true">
					<el-tabs v-model="activeName">
						<el-tab-pane label="修改资料" name="first">
							<el-form label-width="80px" size="mini" :model="form" ref="form">
								<el-upload class="avatar-uploader" :action="''" :auto-upload="false"
									:show-file-list="false" :on-change="handleAvatarChangeIcon">
									<img v-if="imageUrl" :src="imageUrl" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<el-form-item label="用户名" prop="ausername" :rules="[
													  			  { required: true, message: '用户名不能为空'}
													  			  ]">
									<el-input v-model="form.ausername" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="电话" prop="aphone">
									<el-input v-model="form.aphone" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="save('form')">提 交</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="修改密码" name="second">
							<el-form label-width="80px" size="mini" status-icon :rules="rules" :model="form_password"
								ref="form_password">
								<el-form-item label="原密码" prop="apassword">
									<el-input type="password" v-model="form_password.apassword" autocomplete="off">
									</el-input>
								</el-form-item>
								<el-form-item label="新密码" prop="anewpassword">
									<el-input type="password" v-model="form_password.anewpassword" autocomplete="off">
									</el-input>
								</el-form-item>
								<el-form-item label="确认密码" prop="checkPass">
									<el-input type="password" v-model="form_password.checkPass" autocomplete="off">
									</el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="submitForm('form_password')">提交</el-button>
									<el-button @click="resetForm('form_password')">重置</el-button>
								</el-form-item>
							</el-form>
							<span style="color: #F56C6C;font-size: 12px;">*修改密码后将退出重新登录！</span>
						</el-tab-pane>
					</el-tabs>

				</el-card>
			</transition>

		</div>

	</div>

</template>

<script>
	import request from '../utils/request.js'
	import {
		serverIp
	} from "/public/config.js";
	export function uploadImg(params, token) {
		return request.post('http://' + serverIp + ':9090/file/upload', params, {
			headers: {
				'Content-Type': 'multipart/form-data',
				'token': token
			}
		})
	}

	export default {
		name: "Person",
		data() {
			var validateP = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.form_password.checkPass !== '') {
						this.$refs.form_password.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form_password.anewpassword) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				form_password: {
					apassword: '',
					anewpassword: '',
					checkPass: '',
				},
				rules: {
					apassword: [{
						validator: validateP,
						trigger: 'blur'
					}],
					anewpassword: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
				},
				token: "",
				activeName: 'first',
				update: false,
				form: {},
				imageUrl: '',
				file: {},
				user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
			}
		},
		mounted() {
			this.token = JSON.parse(localStorage.getItem("user")).token
		},
		computed: {
			config() {
				return {
					token: this.token
				};
			},
		},
		created() {
			this.load()
		},
		methods: {
			load() {
				if (!this.user.token) {
					this.$message.error("当前无法获取用户信息!")
					return
				}
				this.request.get("/admin/getOneAdmin?Aid=" + this.user.aid).then(res => {
					this.form = JSON.parse(JSON.stringify(res))
					this.user = res
					this.imageUrl = this.form.aavatar
					console.log(res);
				})

			},
			save(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if(JSON.stringify(this.file)=='{}')
						{
							this.request.put("/admin/updateAdmin", this.form).then(res => {
								if (res.code === '200') {
							
									this.$message.success("保存成功")
							
									//从form表单中直接取值给res，再存进缓存，更新当前缓存
									res.data = this.form
									console.log(res);
									// 更新浏览器存储的用户信息
									res.data.token = JSON.parse(localStorage.getItem("user"))
										.token
									localStorage.setItem("user", JSON.stringify(res.data))
									this.user = JSON.parse(localStorage.getItem(
										"user")) //重新赋值一次，让user值更新
									// 触发父级更新User的方法
									this.$emit("refreshUser")
								} else {
									this.$message.error("保存失败")
								}
							})
						}
						else
						{
							let formData = new FormData() //上传图片
							formData.append('file', this.file.raw)
							uploadImg(formData, this.token).then(res => {
								if (res.code == '200') {
									this.form.aavatar = res.msg
									this.request.put("/admin/updateAdmin", this.form).then(res => {
										if (res.code === '200') {
							
											this.$message.success("保存成功")
							
											//从form表单中直接取值给res，再存进缓存，更新当前缓存
											res.data = this.form
											console.log(res);
											// 更新浏览器存储的用户信息
											res.data.token = JSON.parse(localStorage.getItem("user"))
												.token
											localStorage.setItem("user", JSON.stringify(res.data))
											this.user = JSON.parse(localStorage.getItem(
												"user")) //重新赋值一次，让user值更新
											// 触发父级更新User的方法
											this.$emit("refreshUser")
										} else {
											this.$message.error("保存失败")
										}
									})
								} else {
									this.$message.error("头像上传失败")
								}
							})
						}

					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.request.put("/admin/updatePassword?Aid=" + this.user.aid + "&Apassword=" + this
							.form_password
							.apassword + "&Anewpassword=" + this.form_password.anewpassword).then(res => {
							if (res.code == '200') {
								this.$message.success("密码修改成功")

								const loading = this.$loading({
									lock: true,
									text: '正在退出',
									spinner: 'el-icon-loading',
									background: 'rgba(0, 0, 0, 0.7)'
								});
								setTimeout(() => {
									this.$router.push('/login')
									this.$message.success("退出成功")
									localStorage.removeItem("user") //清空缓存
									loading.close();
								}, 1000);
							} else {
								this.$message.error(res.msg)
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleAvatarChangeIcon(file) { //选中文件触发的change事件
				const isJPG = file.raw.type === "image/png" || file.raw.type == "image/jpg" || file.raw.type ==
					"image/jpeg";
				const isLt2M = file.raw.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error("上传头像图片只能是 JPG/PNG/JPEG 格式");
			 } else if (!isLt2M) {
					this.$message.error("上传头像图片大小不能超过 2MB");
				}

				if (isJPG && isLt2M) {
					this.imageUrl = URL.createObjectURL(file.raw); //赋值图片的url，用于图片回显功能
					this.file = file
				}
			}
		}
	}
</script>

<style>
	.avatar-uploader {
		text-align: center;
		padding-bottom: 10px;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 138px;
		height: 138px;
		line-height: 138px;
		text-align: center;
	}

	.avatar {
		width: 138px;
		height: 138px;
		display: block;
	}
</style>
