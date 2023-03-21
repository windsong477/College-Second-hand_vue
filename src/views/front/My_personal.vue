<template>
	<div style="margin-top: 100px;">
		<el-result v-if="student_user.length==0" icon="warning" title="当前未登录" subTitle="点击下面按钮进行登录">
			<template slot="extra">
				<el-button type="primary" size="medium" @click="s_login">去登录</el-button>
			</template>
		</el-result>
		<div v-else style="margin: 0 auto;width: 900px;">
			<div>
				<el-card :body-style="{ padding: '20px' }">
					<el-button type="primary"  @click="update=!update" style="background-color: #409EFF;margin-left: 786px;">
						<div v-if="update==true">
							关闭
							<i class="el-icon-caret-left"></i>
						</div>
						<div v-else>
							编辑
							<i class="el-icon-caret-right"></i>
						</div>
					</el-button>
						
					<el-descriptions v-if="update==false" class="margin-top" title="个人信息" :column="1" size="medium "
						border>
						<el-descriptions-item>
							<template slot="label">
								<i class="el-icon-picture-outline-round"></i>
								用户头像
							</template>
							<template>
								<div v-if="!student_user.savatar">
									<el-avatar>{{student_user.susername}}</el-avatar>
								</div>
								<div v-else>
									<el-avatar>
										<el-image :src="student_user.savatar"
											:preview-src-list="[student_user.savatar]">
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
							{{student_user.susername}}
						</el-descriptions-item>
						<el-descriptions-item>
							<template slot="label">
								<i class="el-icon-guide"></i>
								年级
							</template>
							{{student_user.sgrade}}
						</el-descriptions-item>
						<el-descriptions-item>
							<template slot="label">
								<i class="el-icon-office-building"></i>
								学院班级
							</template>
							{{student_user.sschool}}/{{student_user.scollege}}/{{student_user.sclass}}
						</el-descriptions-item>
						<el-descriptions-item>
							<template slot="label">
								<i class="el-icon-tickets"></i>
								专业
							</template>
							{{student_user.smajor}}
						</el-descriptions-item>
						<el-descriptions-item>
							<template slot="label">
								<i class="el-icon-male"></i>
								性别
							</template>
							<div v-if="student_user.ssex=='F'">
								<el-tag type="success" disable-transitions>
									女生
								</el-tag>
							</div>
							<div v-else-if="student_user.ssex=='M'">
								<el-tag type="primary" disable-transitions>
									男生
								</el-tag>
							</div>
							<div v-else>
								<el-tag type="info" effect="plain" disable-transitions>
									外星人
								</el-tag>
							</div>
						</el-descriptions-item>
						<el-descriptions-item>
							<template slot="label">
								<i class="el-icon-wallet"></i>
								QQ号
							</template>
							{{student_user.sqq}}
						</el-descriptions-item>
						<el-descriptions-item>
							<template slot="label">
								<i class="el-icon-chat-line-round"></i>
								微信号
							</template>
							{{student_user.swx}}
						</el-descriptions-item>
						<el-descriptions-item>
							<template slot="label">
								<i class="el-icon-mobile-phone"></i>
								电话
							</template>
							{{student_user.sphone}}
						</el-descriptions-item>
						<el-descriptions-item>
							<template slot="label">
								<i class="el-icon-map-location"></i>
								住址
							</template>
							{{student_user.sadress}}
						</el-descriptions-item>
					</el-descriptions>
					<div v-if="update==true">
						<transition name="el-fade-in-linear">
							<el-tabs v-model="activeName">
								<el-tab-pane label="修改资料" name="first">
									<el-form label-width="80px" size="mini" :model="form" ref="form">
										<el-upload class="avataruploader2" :action="''" :auto-upload="false"
											:show-file-list="false" :on-change="handleAvatarChangeIcon">
											<img v-if="imageUrl" :src="imageUrl" class="avatar2">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
										<el-form-item label="用户名" prop="susername" :rules="[
																  			  { required: true, message: '用户名不能为空'}
																  			  ]">
											<el-input v-model="form.susername" autocomplete="off"></el-input>
										</el-form-item>
										<el-form-item label="性别" prop="ssex">
											<el-radio v-model="form.ssex" label="M">男</el-radio>
											<el-radio v-model="form.ssex" label="F">女</el-radio>
											<el-radio v-model="form.ssex" label="A">外星人</el-radio>
										</el-form-item>
										<el-form-item label="学校" prop="sschool">
											<el-input v-model="form.sschool" autocomplete="off"></el-input>
										</el-form-item>
										<el-form-item label="学院" prop="scollege">
											<el-input v-model="form.scollege" autocomplete="off"></el-input>
										</el-form-item>
										<el-form-item label="年级">
											<el-select v-model="form.sgrade" placeholder="请选择年级">
												<el-option label="大一" value="大一"></el-option>
												<el-option label="大二" value="大二"></el-option>
												<el-option label="大三" value="大三"></el-option>
												<el-option label="大四" value="大四"></el-option>
												<el-option label="研一" value="研一"></el-option>
												<el-option label="研二" value="研二"></el-option>
												<el-option label="研三" value="研三"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="班级" prop="sclass">
											<el-input v-model="form.sclass" autocomplete="off"></el-input>
										</el-form-item>
										<el-form-item label="专业" prop="smajor">
											<el-input v-model="form.smajor" autocomplete="off"></el-input>
										</el-form-item>
										<el-form-item label="学号" prop="sno">
											<el-input v-model="form.sno" autocomplete="off"></el-input>
										</el-form-item>
										<el-form-item label="QQ号" prop="sqq">
											<el-input v-model="form.sqq" autocomplete="off"></el-input>
										</el-form-item>
										<el-form-item label="微信" prop="swx">
											<el-input v-model="form.swx" autocomplete="off"></el-input>
										</el-form-item>
										<el-form-item label="电话" prop="sphone">
											<el-input v-model="form.sphone" autocomplete="off"></el-input>
										</el-form-item>
										<el-form-item label="地址" prop="sadress">
											<el-input type="textarea" v-model="form.sadress"></el-input>
										</el-form-item>
										<el-form-item>
											<el-button type="primary" @click="save('form')">提 交</el-button>
										</el-form-item>
									</el-form>
								</el-tab-pane>
								<el-tab-pane label="修改密码" name="second">
									<el-form label-width="80px" size="mini" status-icon :rules="rules"
										:model="form_password" ref="form_password">
										<el-form-item label="原密码" prop="spassword">
											<el-input type="password" v-model="form_password.spassword"
												autocomplete="off">
											</el-input>
										</el-form-item>
										<el-form-item label="新密码" prop="snewpassword">
											<el-input type="password" v-model="form_password.snewpassword"
												autocomplete="off">
											</el-input>
										</el-form-item>
										<el-form-item label="确认密码" prop="checkPass">
											<el-input type="password" v-model="form_password.checkPass"
												autocomplete="off">
											</el-input>
										</el-form-item>
										<el-form-item>
											<el-button type="primary" @click="submitForm('form_password')">提交
											</el-button>
											<el-button @click="resetForm('form_password')">重置</el-button>
										</el-form-item>
									</el-form>
									<span style="color: #F56C6C;font-size: 12px;">*修改密码后将退出重新登录！</span>
								</el-tab-pane>
							</el-tabs>

						</transition>

					</div>
				</el-card>
			</div>

		</div>
		<transition v-if="isLoading" name="fade">
			<div  class="loading"></div>
		</transition>
	</div>
</template>

<script>
	import request from '/src/utils/request.js'
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
				} else if (value !== this.form_password.snewpassword) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				isLoading: true,
				form_password: {
					spassword: '',
					snewpassword: '',
					checkPass: '',
				},
				rules: {
					spassword: [{
						validator: validateP,
						trigger: 'blur'
					}],
					snewpassword: [{
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
				student_user: localStorage.getItem("student_user") ? JSON.parse(localStorage.getItem("student_user")) : [],
			}
		},
		mounted() {
			this.token = JSON.parse(localStorage.getItem("student_user")).token
		},
		computed: {
			config() {
				return {
					token: this.token
				};
			},
		},
		created() {
			if(this.student_user.length!=0)
			{
				this.load()
			}
			else
			{
				this.isLoading = false
			}
			
		},
		methods: {
			load() {
				this.request.get("/student/getOneStudent", {
					params: {
						Sid: this.student_user.sid
					}
				}).then(res => {
					this.form = JSON.parse(JSON.stringify(res))
					this.student_user = res
					this.imageUrl = this.form.savatar
					
					this.isLoading = false
				})

			},
			save(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (JSON.stringify(this.file) == '{}') {
							this.request.put("/student/updateStudent", this.form).then(res => {
								if (res.code === '200') {

									this.$message.success("保存成功")

									//从form表单中直接取值给res，再存进缓存，更新当前缓存
									res.data = this.form
									console.log(res);
									// 更新浏览器存储的用户信息
									res.data.token = JSON.parse(localStorage.getItem("student_user"))
										.token
									localStorage.setItem("student_user", JSON.stringify(res.data))
									this.student_user = JSON.parse(localStorage.getItem(
										"student_user")) //重新赋值一次，让user值更新
									// 触发父级更新User的方法
									this.$emit("refreshUser")
								} else {
									this.$message.error("保存失败")
								}
							})
						} else {
							let formData = new FormData() //上传图片
							formData.append('file', this.file.raw)
							uploadImg(formData, this.token).then(res => {
								if (res.code == '200') {
									this.form.savatar = res.msg
									this.request.put("/student/updateStudent", this.form).then(res => {
										if (res.code === '200') {

											this.$message.success("保存成功")

											//从form表单中直接取值给res，再存进缓存，更新当前缓存
											res.data = this.form
											console.log(res);
											// 更新浏览器存储的用户信息
											res.data.token = JSON.parse(localStorage.getItem(
													"student_user"))
												.token
											localStorage.setItem("student_user", JSON.stringify(res
												.data))
											this.student_user = JSON.parse(localStorage.getItem(
												"student_user")) //重新赋值一次，让user值更新
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
						this.request.put("/student/updatePassword?Sid=" + this.student_user.sid + "&Spassword=" +
							this
							.form_password
							.spassword + "&Snewpassword=" + this.form_password.snewpassword).then(res => {
							if (res.code == '200') {
								this.$message.success("密码修改成功")

								const loading = this.$loading({
									lock: true,
									text: '正在退出',
									spinner: 'el-icon-loading',
									background: 'rgba(0, 0, 0, 0.7)'
								});
								setTimeout(() => {
									this.$router.push('/s_login')
									this.$message.success("退出成功")
									localStorage.removeItem("student_user") //清空缓存
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
			},
			s_login() {
				this.$router.push("/s_login")
			}
		},
	}
</script>

<style>
	.avataruploader2 {
		text-align: center;
		padding-bottom: 10px;
	}

	.el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;

		display: inline-block;
		text-align: center;
		outline: 0;
	}

	.el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 160px;
		height: 160px;
		line-height: 160px;
		text-align: center;
	}

	.avatar2 {
		width: 160px;
		height: 160px;
		display: block;
	}
	
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	
	.loading {
	  position: fixed;
	  left: 0;
	  top: 0;
	  background: url('../../assets/loading (2).gif') center center no-repeat #fff;
	  width: 100vw;
	  height: 100vh;
	
	}
</style>
