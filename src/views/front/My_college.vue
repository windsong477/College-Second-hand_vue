<template>
	<div style="margin-top: 100px;">
		<el-result v-if="student_user.length==0" icon="warning" title="当前未登录" subTitle="点击下面按钮进行登录">
			<template slot="extra">
				<el-button type="primary" size="medium" @click="s_login">去登录</el-button>
			</template>
		</el-result>
		<div v-else style="margin: 0 auto;width: 1000px;">
			<div style="display: flex;align-items: center;justify-content: center;padding-top: 40px;">
				<el-input style="width: 600px;" clearable size="medium" placeholder="请输入商品名" v-model="gname"
					class="input-with-select">
					<el-button slot="append" icon="el-icon-search" @click="load"></el-button>
				</el-input>
			</div>
			<el-row style="margin: 0 auto;padding-top: 50px;padding-bottom: 80px;" :gutter="12">
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
								<img src="../../assets/none.jpg" style="height: 208px;width: 208px;" />
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
				student_user:localStorage.getItem("student_user") ? JSON.parse(localStorage.getItem("student_user")) : [],
			    goods_list: [],
			    total: 0,
			    gname: "",
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
			s_login() {
				this.$router.push("/s_login")
			},
			load() {
				this.request.get("/collection/getCollection?Sid="+this.student_user.sid+"&Gname="+this.gname).then(res => {

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
