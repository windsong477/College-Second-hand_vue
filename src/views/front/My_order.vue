<template>
	<div style="margin-top: 100px;">
		<el-result v-if="student_user.length==0" icon="warning" title="当前未登录" subTitle="点击下面按钮进行登录">
			<template slot="extra">
				<el-button type="primary" size="medium" @click="s_login">去登录</el-button>
			</template>
		</el-result>
		<div v-else style="margin: 0 auto;width: 1200px;">
			<el-tabs v-model="activeName" type="border-card">
			    <el-tab-pane label="我的购买" name="first">
					<div style="display: flex;align-items: center;justify-content: center;padding-top: 40px;">
						<el-input style="width: 600px;" clearable size="medium" placeholder="请输入订单号" v-model="oid"
							class="input-with-select">
							<el-button slot="append" icon="el-icon-search" @click="load1"></el-button>
						</el-input>
					</div>
					<el-row style="margin: 0 auto;padding-top: 50px;padding-bottom: 80px;">
						<div style="padding-left: 30px;padding-bottom: 20px;">
							<span v-if="total==0">
								<el-empty :image-size="200"></el-empty>
							</span>
							<span v-else style="color: #949494;">共发现 {{total}} 个订单</span>
						</div>
						<el-card v-for="order_list in order_list" :key="order_list.oid" shadow="hover"
							style="cursor: pointer;margin-bottom: 30px;border-radius: 15px;"
							@click.native="order_details(order_list.oid)">
							<div style="display: flex;">
								<el-image v-if="order_list.gphoto" :src="order_list.gphoto" style="width: 17%;border-radius: 7px;">
									<div slot="error">
										<img src="../../assets/none.jpg" style="width: 17%;" />
									</div>
								</el-image>
					
								<img v-else src="../../assets/none.jpg" style="width: 17%;">
					
								<div style="padding: 14px;width: 60%;display: flex;flex-direction: column;">
									<span style="font-weight: 600;">{{order_list.gname}}</span>
									<span style="margin-top: 16px;">订单号：{{order_list.oid}}</span>
									<span style="margin-top: 28px;">{{order_list.otime}}</span>
								</div>
								<div style="padding: 14px;width: 23%;">
					
									<div style="display: flex;flex-direction: column;">
										<span style="text-align: end;">
											<el-tag type="success" disable-transitions>
												交易完成
											</el-tag>
										</span>
										<el-button type="text" style="text-align: right;margin-top: 64px;">
											<span style="color: #4d4d4d;font-size: 17px;">
												成交价：
											</span>
											<span style="color: #ff6700;font-size: 18px;">
												{{order_list.oprice}}元
											</span>
					
										</el-button>
									</div>
								</div>
							</div>
						</el-card>
					</el-row>
				</el-tab-pane>
			    <el-tab-pane label="我的售出" name="second">
					<div style="display: flex;align-items: center;justify-content: center;padding-top: 40px;">
						<el-input style="width: 600px;" clearable size="medium" placeholder="请输入订单号" v-model="oid2"
							class="input-with-select">
							<el-button slot="append" icon="el-icon-search" @click="load2"></el-button>
						</el-input>
					</div>
					<el-row style="margin: 0 auto;padding-top: 50px;padding-bottom: 80px;">
						<div style="padding-left: 30px;padding-bottom: 20px;">
							<span v-if="total2==0">
								<el-empty :image-size="200"></el-empty>
							</span>
							<span v-else style="color: #949494;">共发现 {{total2}} 个订单</span>
						</div>
						<el-card v-for="order_list2 in order_list2" :key="order_list2.oid" shadow="hover"
							style="cursor: pointer;margin-bottom: 30px;border-radius: 15px;"
							@click.native="order_details2(order_list2.oid)">
							<div style="display: flex;">
								<el-image v-if="order_list2.gphoto" :src="order_list2.gphoto" style="width: 17%;border-radius: 7px;">
									<div slot="error">
										<img src="../../assets/none.jpg" style="width: 17%;" />
									</div>
								</el-image>
					
								<img v-else src="../../assets/none.jpg" style="width: 17%;">
					
								<div style="padding: 14px;width: 60%;display: flex;flex-direction: column;">
									<span style="font-weight: 600;">{{order_list2.gname}}</span>
									<span style="margin-top: 16px;">订单号：{{order_list2.oid}}</span>
									<span style="margin-top: 28px;">{{order_list2.otime}}</span>
								</div>
								<div style="padding: 14px;width: 23%;">
					
									<div style="display: flex;flex-direction: column;">
										<span style="text-align: end;">
											<el-tag type="success" disable-transitions>
												交易完成
											</el-tag>
										</span>
										<el-button type="text" style="text-align: right;margin-top: 64px;">
											<span style="color: #4d4d4d;font-size: 17px;">
												成交价：
											</span>
											<span style="color: #ff6700;font-size: 18px;">
												{{order_list2.oprice}}元
											</span>
					
										</el-button>
									</div>
								</div>
							</div>
						</el-card>
					</el-row>
				</el-tab-pane>
			  </el-tabs>

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
				order_list: [],
			    oid: "",
				total: 0,
				order_list2: [],
				oid2: "",
				total2: 0,
				status: "",
				activeName: 'first'
			}
		},
		created() {
			if(this.student_user.length!=0)
			{
				this.load1()
				this.load2()
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
			load1() {
				this.request.get("/order/getOneOrderBUY?BUYSid=" + this.student_user.sid + "&Oid=" + this.oid).then(
				res => {
					this.order_list = res.data
					this.total = res.total
					
					this.isLoading = false
				})
			},
			load2(){
				this.request.get("/order/getOneOrderSELL?SELLSid=" + this.student_user.sid + "&Oid=" + this.oid2).then(
				res => {
					this.order_list2 = res.data
					this.total2 = res.total
					
					this.isLoading = false
				})
			},
			order_details(id) {
				this.$router.push({
					path: '/my_buyorder_details',
					query: {
						Oid: id
					}
				});
			},
			order_details2(id) {
				this.$router.push({
					path: '/my_sellorder_details',
					query: {
						Oid: id
					}
				});
			},
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