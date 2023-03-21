<template>
	<div style="margin-top: 100px;">
		<el-result v-if="student_user.length==0" icon="warning" title="当前未登录" subTitle="点击下面按钮进行登录">
			<template slot="extra">
				<el-button type="primary" size="medium" @click="s_login">去登录</el-button>
			</template>
		</el-result>
		<div v-else style="margin: 0 auto;width: 900px;">
			<div style="display: flex;align-items: center;justify-content: center;padding-top: 40px;">
				<el-input style="width: 600px;" clearable size="medium" placeholder="请输入商品名" v-model="gname"
					class="input-with-select">
					<el-select v-model="status" slot="prepend" placeholder="请选择">
						  <el-option label="全部" value=""></el-option>
					      <el-option label="审核中" value="0"></el-option>
					      <el-option label="上架中" value="1"></el-option>
					      <el-option label="交易完成" value="2"></el-option>
						  <el-option label="已下架" value="3"></el-option>
					    </el-select>
					<el-button slot="append" icon="el-icon-search" @click="load"></el-button>
				</el-input>
			</div>

			<el-row style="margin: 0 auto;padding-top: 50px;padding-bottom: 80px;">
				<div style="padding-left: 30px;padding-bottom: 20px;">
					<span v-if="total==0">
						<el-empty :image-size="200"></el-empty>
					</span>
					<span v-else style="color: #949494;">共发现 {{total}} 个商品</span>
				</div>
				<el-card :body-style="{ padding: '11px' }"  v-for="goods_list in goods_list" :key="goods_list.gid" shadow="hover" style="cursor: pointer;margin-bottom: 30px;border-radius: 15px;"
					@click.native="goods_details(goods_list.gid)">
					<div style="display: flex;">
						<el-image v-if="goods_list.gphoto" :src="goods_list.gphoto" style="width: 17%;border-radius: 7px;">
							<div slot="error">
								<img src="../../assets/none.jpg" style="width: 17%;" />
							</div>
						</el-image>

							<img v-else src="../../assets/none.jpg" style="width: 17%;">

						<div style="padding: 14px;width: 60%;display: flex;flex-direction: column;">
							<span style="font-weight: 600;">{{goods_list.gname}}</span>
							<span style="margin-top: 10px;">{{goods_list.gdescribe | ellipsis}}</span>
						</div>
						<div style="padding: 14px;width: 23%;">
							
							<div style="display: flex;flex-direction: column;">
								<span style="text-align: end;">
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
								</span>
								<el-button type="text"  style="text-align: right;margin-top: 64px;">
									<span style="color: #4d4d4d;font-size: 17px;">
										售价：
									</span>
									<span style="color: #ff6700;font-size: 18px;">
										{{goods_list.gsellprice}}元
									</span>
						
								</el-button>
							</div>
						</div>
					</div>
					
				</el-card>
			</el-row>
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
				student_user: localStorage.getItem("student_user") ? JSON.parse(localStorage.getItem("student_user")) : [],
				goods_list: [],
				gname: "",
				total: 0,
				status:""
			}
		},
		filters: {
		    // 当标题字数超出时，超出部分显示’...‘。此处限制超出90位即触发隐藏效果
		    ellipsis (value) {
		        if (!value) return ''
		        if (value.length > 90) {
		            return value.slice(0, 90) + '...'
		        }
		        return value
		    }
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
			s_login() {
				this.$router.push("/s_login")
			},
			load() {	
				this.request.get("/goods/getSidGoods?Sid="+this.student_user.sid+"&Gstatus="+this.status+"&Gname="+this.gname).then(res => {
					this.goods_list = res.data
					this.total = res.total
					
					this.isLoading = false
				})
			},
			goods_details(id) {
				this.$router.push({
					path: '/my_goods_details',
					query: {
						gid: id
					}
				});
			},
		},
	}
</script>

<style>
	.el-card__body,
	.el-main {
		padding: 11px;
	}
	.el-select .el-input {
	    width: 103px;
	  }
	  .input-with-select .el-input-group__prepend {
	    background-color: #fff;
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
