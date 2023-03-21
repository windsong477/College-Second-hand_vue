<template>
	<div style="padding-top: 60px;">
		<div style="height: 50px;background-color: #f2f2f2;">
			<div style="height: 100%;display: flex;align-items: center;margin: 0 auto;width: 1360px;">
				<el-page-header style="" @back="goBack" content="商品详情">
				</el-page-header>
				<div style="padding-left: 50%;font-size: 14px;">
					<el-tag type="danger" style=""><i class="el-icon-s-shop"></i>发布人</el-tag>
					<span style="padding-left: 10px;">{{goods_list.sellusername}}</span>
				</div>
				<div style="padding-left: 16%;font-size: 16px;">
					<span v-if="sid==goods_list.sid" style="cursor: pointer;">
						<i class="el-icon-sell"></i><span style="padding-left: 10px;">我的商品</span>
					</span>
					<span v-else>
						<span v-show="!college_status" style="cursor: pointer;" @click="add_college()"><i
								class="el-icon-star-off"></i>收藏商品</span>
						<span v-show="college_status" style="cursor: pointer;color: #ff6700;"
							@click="delete_college()"><i class="el-icon-star-on"></i>已收藏</span>
					</span>

				</div>

			</div>
		</div>

		<div style="margin: 0 auto;width: 1200px;padding-top: 12px;display: flex;">
			<el-image :src="goods_list.gphoto" :preview-src-list="[goods_list.gphoto]"
				style="width: 400px;height:400px;border-radius: 7px;">
				<div slot="error">
					<img src="../../assets/none.jpg" style="width: 100%;height:400px;border-radius: 7px;" />
				</div>
			</el-image>
			<el-descriptions style="width: 800px;margin-left: 8%;" size="medium" class="margin-top"
				:title="goods_list.gname" :column="1">
				<el-descriptions-item label="价格" labelStyle="line-height: 3;"
					contentStyle="color:#ff6700;font-size: 20px;line-height: 2;">￥{{goods_list.gsellprice}}
				</el-descriptions-item>
				<el-descriptions-item label="商品描述" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					{{goods_list.gdescribe}}
				</el-descriptions-item>
				<el-descriptions-item label="原价格" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					￥{{goods_list.gbuyprice}}</el-descriptions-item>
				<el-descriptions-item label="上架时间" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					{{goods_list.gtime}}
				</el-descriptions-item>
				<el-descriptions-item label="修改时间" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					{{goods_list.gupdate_time}}
				</el-descriptions-item>
				<el-descriptions-item label="商品状态" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					<span v-if="goods_list.gstatus==0">
						<el-tag type="info" effect="plain" disable-transitions>
							审核中
						</el-tag>
					</span>
					<span v-else-if="goods_list.gstatus==1">

						<el-tag type="primary" effect="plain" disable-transitions>
							上架中
						</el-tag>
					</span>
					<span v-else-if="goods_list.gstatus==2">
						<el-tag type="success" disable-transitions>
							交易完成
						</el-tag>
					</span>
					<span v-else>
						<el-tag type="info" plain disable-transitions>
							已下架
						</el-tag>
					</span>
				</el-descriptions-item>

			</el-descriptions>
		</div>
		<div style="margin: 0 auto;width: 1200px;margin-top: 14px;">
			<el-button :disabled="goods_list.gstatus==1?false:true" style="width: 200px;height: 50px;float: right;"
				type="danger" @click="onSubmit">
				<span v-if="goods_list.gstatus==0">商品未审核</span>
				<span v-else-if="goods_list.gstatus==1" style="text-decoration: none"
					v-loading.fullscreen.lock="fullscreenLoading">
					立即购买
				</span>
				<span v-else-if="goods_list.gstatus==2">商品已售出</span>
				<span v-else>商品已下架</span>
			</el-button>
			<div style="float: right;line-height: 46px;padding-right: 46px;">
				<span>总计</span>
				<span style="color:#ff6700;font-size: 20px;">￥{{goods_list.gsellprice}}</span>
			</div>
			<div style="height: 1px; background: #ddd;margin: 0 auto;" />
		</div>



		<div style="margin: 0 auto;width: 1200px;margin-top: 14px;">

			<div style="padding-top: 110px;padding-bottom: 30px;">
				<div style="padding-bottom: 20px;">
					<span>
						<span style="font-size: 20px;">留言</span>
						<span style="color: #949494;padding-left: 5px;">{{total}}</span>
						
					</span>
				</div>
				<el-form :model="dataForm" status-icon :rules="rules" ref="dataForm">
					<el-form-item prop="comment">
						<el-input size="medium" v-model="dataForm.comment" type="textarea" style="width: 80%" :rows="4" maxlength="255"
							show-word-limit placeholder="请输入内容">
						</el-input>
					</el-form-item>
					<div style="width: 80%;text-align: right;margin-top: 10px">
						<el-button @click="commentBack">取消</el-button>
						<el-button type="success" @click="comment">留言</el-button>
					</div>
				</el-form>
				
				
				<el-row :gutter="10" v-for="(item,index) in dataList" :key="index" style="padding-top: 20px">
					<el-col :span="1">
						<el-avatar  v-if="item.savatar==null" style="height: 40px;border-radius:50%;">
							{{item.susername}}</el-avatar>
						<el-avatar  v-else :src="item.savatar" style="height: 40px;border-radius:50%;"></el-avatar>
					</el-col>
					<el-col :span="4" style="line-height: 20px;height: 100%;">
						<el-col :span="22">
							<i class="el-icon-s-shop" v-if="item.sid==goods_list.sid" style="color: #f56c6c;"></i>
						{{item.susername}}
						</el-col>
						<el-col :span="22" style="color: #5e5e5e;">{{item.ltime}}</el-col>
					</el-col>
					<div class="list-bottom" v-if="item.sid==sid||sid==goods_list.sid">
						<!-- :underline='false' 去除下划线 -->
						<el-link type="danger" :underline='false' @click="del(index,item)">删除</el-link>
					</div>
					<el-col :span="24" style="font-size: 17px;line-height: 22px;padding-top: 8px">
					    {{item.lmessage}}
					</el-col>
					
							  
				</el-row>
				<div style="text-align: center;padding-right: 200px;padding-top: 50px;">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
						 :page-sizes="[2, 5, 10, 20]" :page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</div>
		</div>
		
		<transition v-if="isLoading" name="fade">
			<div  class="loading"></div>
		</transition>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				isLoading: true,
				sid: localStorage.getItem("student_user") ? JSON.parse(localStorage.getItem("student_user")).sid : '',
				gid: this.$route.query.gid,
				goods_list: [],
				college_status: false,
				fullscreenLoading: false,
				dataForm: {
					comment: ''
				},
				dataList: [],
				total: 0,
				pageNum: 1,
				pageSize: 10,
				rules: {
					comment: [{
							required: true,
							message: '评论不能为空',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 255,
							message: '长度在 1 到 255 个字符',
							trigger: 'blur'
						}
					]
				}

			}
		},
		created() {
			window.scrollTo(0,0);
			this.load()
			this.leave_load()
			this.find_college_status()
		},
		methods: {
			find_college_status() {
				this.request.get("/collection/getMyCollection", {
					params: {
						Sid: this.sid,
						Gid: this.gid
					}
				}).then(res => {
					this.college_status = res
				})
			},
			add_college() {
				if (this.sid != '') {
					this.request.post("/collection/insertCollection?Sid=" + this.sid + "&Gid=" + this.gid).then(res => {
						if (res.code == '200') {
							this.$message.success("收藏成功")
							this.college_status = true
						} else {
							this.$message.error(res.msg)
						}
					})

				} else {
					this.$message.error("您当前未登录!")
				}

			},
			delete_college() {
				if (this.sid != '') {
					this.request.delete("/collection/deleteCollection/" + this.sid + "&" + this.gid).then(res => {
						if (res) {
							this.$message("取消收藏")
							this.college_status = false
						} else {
							this.$message.error(res.msg)
						}
					})

				} else {
					this.$message.error("您当前未登录!")
				}
			},
			load() {
				this.request.get("/goods/getOneGoods", {
					params: {
						Gid: this.gid
					}
				}).then(res => {
					this.goods_list = res
					
					this.isLoading = false
				})
				
				
			},
			leave_load() {
				this.request.get("/leave/getLeavePage", {
					params: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						Gid: this.gid
					}
				}).then(res => {

					this.dataList = res.data
					this.total = res.total
				})
			},
			onSubmit() {
				const loading = this.$loading({
					lock: true,
					text: '请稍等',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				setTimeout(() => {
					if (this.sid != '') {
						if (this.sid != this.goods_list.sid) {
							this.$router.push({
								path: '/submit_order',
								query: {
									gid: this.gid
								}
							});
						} else {
							this.$message.error("不可购买自己发布的商品哦~")
						}



					} else {
						this.$message.error("您当前未登录!")
					}

					loading.close();
				}, 1000);
			},
			goBack() {
				this.$router.go(-1); //返回上一页

			},
			//评论框取消取消
			commentBack() {
				this.$refs['dataForm'].resetFields()
			},
			//评论
			comment() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						if (this.sid != '') {
							this.request.post("/leave/insertLeave?Sid="+this.sid+"&Gid="+this.gid+"&Lmessage="+this.dataForm.comment).then(res => {
								if (res.code == '200') {
									console.log(res);
									this.$message.success("留言成功")
									this.dialogFormVisible_add = false
									this.commentBack()
									this.leave_load()
								} else {
									this.$message.error(res.msg)
								}
							})
						}
						else {
							this.$message.error("您当前未登录!")
						}
						
					}else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			del(index, item) { //删除事件
				this.$confirm(`确定要删除${item.susername}的留言吗?`, '删除提示', {
					confirmButtonText: '删除',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (this.sid != '') {

						this.request.delete("/leave/deleteLeave/" + item.lid + "&" + item.sid).then(res => {
							if (res) {
								this.$message({
									message: '删除成功',
									type: 'success'
								});
								this.leave_load()
							} else {
								this.$message.error(res.msg)
							}
						})
					
					} else {
						this.$message.error("您当前未登录!")
					}
					
				}).catch(() => {});
			},
			handleSizeChange(pageSize) {
				this.pageSize = pageSize
				this.leave_load()
				
			},
			handleCurrentChange(pageNum) {
				this.pageNum = pageNum
				this.leave_load()
			}

		},
	}
</script>

<style>
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
