<template>
	<div style="margin-top: 100px;">
		
		<el-result v-if="student_user.length==0" icon="warning" title="当前未登录" subTitle="点击下面按钮进行登录">
			<template slot="extra">
				<el-button type="primary" size="medium" @click="s_login">去登录</el-button>
			</template>
		</el-result>
		<div v-else style="margin: 0 auto;width: 900px;">
			<el-form label-width="80px" size="medium" :model="form" ref="form">
				
				
				<el-form-item label="商品名" prop="gname" :rules="[
									  			  { required: true, message: '商品名不能为空'}
									  			  ]">
					<el-input v-model="form.gname" autocomplete="off" placeholder="如:JAVA程序设计"></el-input>
				</el-form-item>
				<el-form-item label="原价格" prop="gbuyprice">
					<el-input v-model="form.gbuyprice" autocomplete="off" placeholder="如:50"></el-input>
				</el-form-item>
				<el-form-item label="售出价格" prop="gsellprice" :rules="[
									  			  { required: true, message: '价格不能为空'}
									  			  ]">
					<el-input v-model="form.gsellprice" autocomplete="off" placeholder="如:50"></el-input>
				</el-form-item>
				<el-form-item label="商品图">
					<el-upload class="avataruploader" :action="''" :auto-upload="false"  :show-file-list="false"
						:on-change="handleAvatarChangeIcon">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						<template #tip>
						            <div style="font-size: 12px;color: #F56C6C;">
						              *目前只支持上传1张商品图哦~
						            </div>
						          </template>

					</el-upload>
				</el-form-item>
				<el-form-item label="商品描述" prop="gdescribe">
					<el-input type="textarea" v-model="form.gdescribe"  maxlength="120" placeholder="如:XXXX" :autosize="{ minRows: 3, maxRows: 6 }" show-word-limit></el-input>
				</el-form-item>
					<el-button type="primary" @click="save('form')" style="width: 20%;height: 50px;border-radius: 25px;float: right;">
						<span style="text-decoration: none"
								v-loading.fullscreen.lock="fullscreenLoading">
								发 布
						</span>
					</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
	import request from '../../utils/request.js'
	import {
		serverIp
	} from "/public/config.js";
	export function uploadImg(params,token) {
	  return request.post('http://' + serverIp + ':9090/file/upload',params)
	}
	export default {
		data() {
			return {
				sid: localStorage.getItem("student_user") ? JSON.parse(localStorage.getItem("student_user")).sid : '',
				student_user:localStorage.getItem("student_user") ? JSON.parse(localStorage.getItem("student_user")) : [],
			    token: localStorage.getItem("student_user") ? JSON.parse(localStorage.getItem("student_user")).token :null,
				form:{},
				fullscreenLoading: false,
				imageUrl:'',
				file:{},
			}
		},
		methods: {
			s_login() {
				this.$router.push("/s_login")
			},
			save(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						const loading = this.$loading({
							lock: true,
							text: '请稍等',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});
						this.form.sid=this.sid
						this.form.sellusername=this.student_user.susername
						setTimeout(() => {
							if(JSON.stringify(this.file)=='{}') //如果没有更改图片的话
							{
								this.request.post("/goods/insertGoods", this.form).then(res => {
									if (res.code == '200') {
										this.$message.success("发布成功，等待审核")
										this.$router.push('/release_success')
								
									} else {
										this.$message.error(res.msg)
									}
								})
							}
							else
							{
								let formData=new FormData()  //上传图片
								formData.append('file',this.file.raw)
								uploadImg(formData,this.token).then(res=>{
								            if (res.code == '200') {
												this.form.gphoto=res.msg
												this.request.post("/goods/insertGoods", this.form).then(res => {
													if (res.code == '200') {
														
														this.$message.success("发布成功，等待审核")
														this.$router.push('/release_success')
												
													} else {
														this.$message.error(res.msg)
													}
												})
								            }
											else{
												this.$message.error("图片上传失败")
											}
								        })
							}		
							loading.close();
						}, 1000);	
						
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			handleAvatarChangeIcon(file) {//选中文件触发的change事件
			        console.log(file)
					const isJPG = file.raw.type === "image/png" || file.raw.type == "image/jpg" || file.raw.type == "image/jpeg";
					const isLt2M = file.raw.size / 1024 / 1024 < 2;
					if (!isJPG) {
						this.$message.error("上传商品图片只能是 JPG/PNG/JPEG 格式");
					} else if (!isLt2M) {
						this.$message.error("上传商品图片大小不能超过 2MB");
					}
					
					if(isJPG && isLt2M)
					{
						this.imageUrl = URL.createObjectURL(file.raw);//赋值图片的url，用于图片回显功能
						this.file=file
					}
					
			      },
		},
	}
</script>

<style>
.avataruploader {

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

	.avatar {
		width: 160px;
		height: 160px;
		display: block;
	}
</style>