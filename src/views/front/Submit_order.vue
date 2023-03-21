<template>
	<div style="padding-top: 60px;">
		<div style="height: 50px;background-color: #f2f2f2;width: 100vw;">
			<div style="height: 100%;display: flex;align-items: center;margin: 0 auto;width: 1360px;">
				<el-page-header style="" @back="goBack" content="确认订单">
				</el-page-header>
			</div>
		</div>
		<span style="color: #ff6700;margin: 0 auto;width: 1200px;height: 50px;display: flex;align-items: center;justify-content: center;">
			当前支付订单
		</span>
		<div style="height: 1px; background: #ddd;width: 1200px;margin: 0 auto;" />
		<div style="margin: 0 auto;width: 1200px;padding-top: 12px;display: flex;">
			<el-descriptions style="width: 800px;margin-left: 8%;" size="medium" class="margin-top"
				title="订单详情" :column="1">	
				<el-descriptions-item label="商家" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					{{goods_list.sellusername}}</el-descriptions-item>
				<el-descriptions-item label="买家" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					{{suser.susername}}</el-descriptions-item>
				<el-descriptions-item label="电话" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					{{suser.sphone}}</el-descriptions-item>
				<el-descriptions-item label="学院班级" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					{{suser.sschool}}/{{suser.scollege}}/{{suser.sclass}}</el-descriptions-item>
				<el-descriptions-item label="年级" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					{{suser.sgrade}}</el-descriptions-item>
				<el-descriptions-item label="住址" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					{{suser.sadress}}</el-descriptions-item>	
			</el-descriptions>
			<el-descriptions style="width: 800px;margin-left: 8%;" size="medium" class="margin-top"
				title="商品详情" :column="1">
				<el-descriptions-item label="商品名" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					{{goods_list.gname}}</el-descriptions-item>
				<el-descriptions-item label="图片" labelStyle="line-height: 3;"
					contentStyle="color:#ff6700;font-size: 20px;line-height: 2;">
					<el-image :src="goods_list.gphoto" :preview-src-list="[goods_list.gphoto]"
						style="width: 60px;height:60px;margin-left: 2%;">
						<div slot="error">
							<img src="../../assets/none.jpg" style="width: 100%;height: 100%;" />
						</div>
					</el-image>
				</el-descriptions-item>
				<el-descriptions-item label="价格" labelStyle="line-height: 3;"
					contentStyle="color:#ff6700;font-size: 20px;line-height: 2;">￥{{goods_list.gsellprice}}
				</el-descriptions-item>
				<el-descriptions-item label="商品描述" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					{{goods_list.gdescribe}}</el-descriptions-item>
			 <el-descriptions-item label="原价格" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					￥{{goods_list.gbuyprice}}</el-descriptions-item>
				<el-descriptions-item label="上架时间" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					{{goods_list.gtime}}</el-descriptions-item>
				<el-descriptions-item label="修改时间" labelStyle="line-height: 4;" contentStyle="line-height: 4;">
					{{goods_list.gupdate_time}}</el-descriptions-item>
				
				
			</el-descriptions>		
		</div>
		<div style="margin: 0 auto;width: 1200px;margin-top: 14px;margin-bottom: 100px;">
			<el-button :loading="loading" :disabled="goods_list.gstatus==1?false:true" style="width: 200px;height: 50px;float: right;" type="danger" @click="onSubmit">
				<span v-if="goods_list.gstatus==0">商品未审核</span>
				<span v-else>
					<span v-if="!loading">确认支付</span>
					<span v-else>支 付 中...</span>
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
		
	</div>

</template>

<script>
	export default {
		data() {
			return {
				suser:localStorage.getItem("student_user") ? JSON.parse(localStorage.getItem("student_user")) : [],
				sid:localStorage.getItem("student_user") ? JSON.parse(localStorage.getItem("student_user")).sid : '',
				gid: this.$route.query.gid,
				goods_list: [],
				loading: false,
				gstatus:""
			}
		},
		created() {
			this.load()
		},
		methods: {
			load() {
				this.request.get("/goods/getOneGoods", {
					params: {
						Gid: this.gid
					}
				}).then(res => {

					this.goods_list = res
				})
			},
			onSubmit(){
				if(this.sid!='')
				{
					this.gstatus="2"
					this.loading = true;
					setTimeout(() => {
						this.loading = false;
					}, 4500);
					
					this.request.post("/order/insertOrder?BUYSid="+this.sid+"&SELLSid="+this.goods_list.sid+"&Gid="+this.gid+"&Oprice="+this.goods_list.gsellprice).then(res => {
						if (res.code == '200') {
							this.request.put("/goods/updateGoodsGstatus?Gid="+this.gid+"&Gstatus="+this.gstatus).then(res => {
								console.log(res);
								if (res.code == '200') {
									setTimeout(() => {
										this.$router.push({
											path: '/pay',
											query: {
												gid: this.gid
											}
										});
										this.$message.success("交易成功")
									}, 1000);
									
								} else {
									setTimeout(() => {
										this.$message.error(res.msg)
										this.loading = false
									}, 800);
								}
							})

	
						} else {
							setTimeout(() => {
								this.$message.error(res.msg)
								this.loading = false
							}, 800);
							
						}
					})
				}
				else
				{
					this.$message.error("您当前未登录!")
				}		
			},
			goBack() {
				this.$router.back()

			}
		},
	}
</script>

<style scoped>

</style>
