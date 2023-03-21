<template>
	<div style="color: #666;font-size: 14px;">

		<el-card>
			<b>欢迎您！{{user.ausername}}</b>

			<el-divider />
			<br>
			努力学习中~<br>
			￣￣￣￣￣＼／￣￣￣￣<br>
			　　　　∧＿∧　　　　 <br>
			　　;;（´・ω・） 　 <br>
			　＿旦_(っ(,,■)＿＿ <br>
			　|l￣l||￣しﾞしﾞ￣|i<br>

		</el-card>
		<div style="height: 1px; background: #ddd; margin: 20px 0" />
		<el-row :gutter="10" style="margin-bottom: 40px">
			<el-col :span="6">
				<el-card style="color: #409EFF">
					<div><i class="el-icon-user-solid" /> 学生总数</div>
					<div style="padding: 10px 0; text-align: center; font-weight: bold">
						{{studentToal}}
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card style="color: #F56C6C">
					<div><i class="el-icon-money" /> 商品总量</div>
					<div style="padding: 10px 0; text-align: center; font-weight: bold">
						{{goodsToal}}
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card style="color: #67C23A">
					<div><i class="el-icon-bank-card" /> 订单数量</div>
					<div style="padding: 10px 0; text-align: center; font-weight: bold">
						{{orderToal}}
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card style="color: #E6A23C">
					<div><i class="el-icon-s-shop" /> 总成交额</div>
					<div style="padding: 10px 0; text-align: center; font-weight: bold">
						￥ {{opriceToal}}
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				<el-card>
					<div slot="header">
						数据图
					</div>
					<div id="pie" style="width: 500px; height: 450px;"></div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card style="margin-left: 10px;">
					<div slot="header">
						成交额
					</div>
					<div id="main" style="width: 500px; height: 450px;"></div>
				</el-card>
				
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import * as echarts from 'echarts'

	export default {
		name: "Home",
		data() {
			return {
				user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
				studentToal: 0,
				goodsToal: 0,
				orderToal: 0,
				opriceToal: 0.,
				adminToal: 0
			}
		},
		created() {
			this.load()
		},
		methods: {
			load() {
				this.request.get("/student/getStudentAllTotal").then(res => {
					this.studentToal = res
				})

				this.request.get("/goods/getGoodsAllTotal").then(res => {
					this.goodsToal = res
				})

				this.request.get("/order/getOrderAllTotal").then(res => {
					this.orderToal = res
				})

				this.request.get("/order/getOrderOpriceTotal").then(res => {
					this.opriceToal = res
				})

				this.request.get("/admin/getAdminAllTotal").then(res => {
					this.adminToal = res
				})
			}
		},
		mounted() { // 页面元素渲染之后再触发
			setTimeout(() => {
				var pieOption = {
					tooltip: {
						trigger: 'item'
					},
					legend: {
						top: '5%',
						left: 'center'
					},
					series: [{
						name: '高校二手交易',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '40',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
								value: this.studentToal,
								name: '学生总数'
							},
							{
								value: this.orderToal,
								name: '订单数量'
							},
							{
								value: this.adminToal,
								name: '管理员总数'
							},
							{
								value: this.goodsToal,
								name: '商品总量'
							}
						]
					}]
				};
				var mainOption = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
				 },
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: ['总成交额'],
						axisTick: {
							alignWithLabel: true
						}
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
						name: '￥',
						type: 'bar',
						barWidth: '40%',
						data: [this.opriceToal]
					}]
				};

				var chartDom = document.getElementById('pie');
				var myChart = echarts.init(chartDom);

				var mainDom = document.getElementById('main');
				var mainChart = echarts.init(mainDom);
				
				// 数据准备完毕之后再set
				myChart.setOption(pieOption);
				mainChart.setOption(mainOption);
			}, 200);


		},

	}
</script>

<style scoped>

</style>
