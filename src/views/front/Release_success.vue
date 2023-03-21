<template>
	<div style="padding-top: 120px;">
		<div style="margin: 0 auto;width: 1200px;padding-top: 12px;display: flex;justify-content: center;">
			<el-result icon="success" title="发布成功" subTitle="等待管理员审核~">
				<template slot="extra">
					<el-button type="primary" size="medium" @click="back_release">继续发布其它宝贝</el-button>
				</template>
			</el-result>
		</div>
	
	</div>

</template>

<script>
	export default {
		methods: {
			back_release(){
				this.$router.push("/release")
			}
		},
	}
</script>

<style>

</style>
