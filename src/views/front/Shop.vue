<template>

	<div style="margin-top: 100px;">
		<el-carousel :interval="4000" type="card" height="400px" style="margin: 0 auto;width: 1200px;">
			<el-carousel-item v-for="item in item" :key="item.id">
				<img :src="item.idView" style="width: 100%;height: 100%;">
			</el-carousel-item>
		</el-carousel>
		<div style="display: flex;align-items: center;justify-content: center;padding-top: 40px;">
			<el-input style="width: 600px;" clearable size="medium" placeholder="请输入商品名" v-model="gname"
				class="input-with-select">
				<el-button slot="append" icon="el-icon-search" @click="load"></el-button>
			</el-input>
		</div>

		<el-row style="margin: 0 auto;width: 1200px;padding-top: 50px;padding-bottom: 80px;" :gutter="12">
			<div style="padding-left: 30px;padding-bottom: 20px;">
				<span v-if="total==0">
					<el-empty :image-size="200"></el-empty>
				</span>
				<span v-else style="color: #949494;">共发现 {{total}} 个商品</span>
			</div>
			<el-col :span="4" v-for="goods_list in goods_list" :key="goods_list.gid"
				style="padding: 15px;min-width: 240px;margin-top: 20px;">
				<el-card :body-style="{ padding: '0px' }" shadow="hover" style="cursor: pointer;border-radius: 15px;" @click.native="goods_details(goods_list.gid)">
				
					<el-image :src="goods_list.gphoto" style="height: 208px;width: 208px;">
						<div slot="error">
							<img src="../../assets/none.jpg" style="width: 208px;height: 208px;" />
						</div>
					</el-image>
					<div style="padding: 14px;">
						<span>{{goods_list.gname | ellipsis}}</span>
						<div class="bottom clearfix">
							<span class="time">
								<i class="el-icon-s-shop"></i>
								{{goods_list.sellusername}}
							</span>
							<el-button type="text" class="button" style="text-align: right;">
								<span style="color: #ff6700;font-size: 18px;">
									{{goods_list.gsellprice}}元
								</span>

							</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<div style="text-align: center;padding-bottom: 20px;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
				background :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		
		<transition name="fade">
		    <loading v-if="isLoading"></loading>
		</transition>
	</div>
</template>

<script>
	import Loading from '/src/components/loading.vue'
	export default {
		components:{ 
			Loading  
		},
		data() {
			return {
				isLoading: true,
				goods_list: [],
				total: 0,
				pageNum: 1,
				pageSize: 20,
				gname: "",
				item: [ //轮播图
					{
						id: 0,
						idView: "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomiwatchcolor2p4b1/section-12.png"
					},
					{
						id: 1,
						idView: "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomibuds4prova5b03/2468.png?x-fds-process=image/resize,q_90,f_webp"
					},
					{
						id: 2,
						idView: "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomimaxfold27xrd4s/3816_1.png?1?x-fds-process=image/resize,q_100,f_webp"
					},
					{
						id: 3,
						idView: "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi-13kb7buy/5.png?x-fds-process=image/resize,q_90,f_webp"
					}

				],
			}
		},
		created() {
			this.load()
		},
		filters: {
		    // 当标题字数超出时，超出部分显示’...‘。此处限制超出10位即触发隐藏效果
		    ellipsis (value) {
		        if (!value) return ''
		        if (value.length > 10) {
		            return value.slice(0, 10) + '...'
		        }
		        return value
		    }
		},
		methods: {
			load() {
				this.request.get("/goods/getGoodsPage", {
					params: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						Gname: this.gname
					}
				}).then(res => {
					this.goods_list = res.data
					this.total = res.total
					
					this.isLoading = false
				})
			},
			goods_details(id) {
				this.$router.push({
					path: '/goods_details',
					query: {
						gid: id
					}
				});
				
				/* const routeData = this.$router.resolve({
					path: '/goods_details',
					query: {
						gid: id
					}
				})
				window.open(routeData.href, '_blank') */
			},
			handleSizeChange(pageSize) {
				this.pageSize = pageSize
				this.load()
			},
			handleCurrentChange(pageNum) {
				this.pageNum = pageNum
				this.load()
			}
		},
	}
</script>

<style>
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
	.el-col-4 {
	    width: 16.66667%;
	    height: 300px;
	}
	
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
</style>
