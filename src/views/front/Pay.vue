<template>
	<div style="padding-top: 60px;">
		<div style="height: 50px;background-color: #f2f2f2;width: 100vw;">
			<div style="height: 100%;display: flex;align-items: center;margin: 0 auto;width: 1360px;">
				<el-page-header style="" @back="goBack" content="支付界面">
				</el-page-header>
			</div>
		</div>
		<div style="height: 1px; background: #ddd;width: 1200px;margin: 0 auto;margin-top: 50px;" />
		
		<div style="margin: 0 auto;width: 1200px;padding-top: 12px;display: flex;justify-content: center;">
			<el-result icon="success" title="支付成功" subTitle="再逛逛其它宝贝~">
				<template slot="extra">
					<el-button type="primary" size="medium" @click="back_shop">去购物</el-button>
				</template>
			</el-result>
		</div>
		
		<div style="margin: 0 auto;width: 1200px;margin-top: 14px;height: 1px; background: #ddd;margin: 0 auto;" />
		
	</div>

</template>

<script>
	export default {
		data() {
			return {
				gid: this.$route.query.gid,
			}
		},
		methods: {
			goBack() {
				this.$router.push({
					path: '/goods_details',
					query: {
						gid: this.gid
					}
				});
			},
			back_shop(){
				this.$router.push("/shop")
			}
		},
	}
</script>

<style scoped>

</style>
