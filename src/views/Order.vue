<template>
	<div>
		<el-card>
			<div slot="header" class="clearfix">
				<div style="margin: 10px 0">
					<el-input style="width: 200px" placeholder="请输入订单号" suffix-icon="el-icon-search" v-model="oid">
					</el-input>
					<el-button class="ml-5" type="primary" @click="load"><i class="el-icon-search"></i> 搜索</el-button>
					<el-button type="warning" @click="reset"><i class="el-icon-refresh-left"></i> 重置</el-button>
				</div>
				<div style="margin: 10px 0">
					<el-popconfirm confirm-button-text='确定' cancel-button-text='我再想想' icon="el-icon-info"
						icon-color="red" title="您确定批量删除这些数据吗？" @confirm="delBatch">
						<el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i>
						</el-button>
					</el-popconfirm>
				</div>
			</div>
			<el-table :data="tableData" border stripe :header-cell-class-name="headerBg"
				@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column type="expand">
					<template slot-scope="scope">
						<el-form label-position="right" inline class="demo-table-expand">
							<el-form-item label="商品名 :">
								<span>{{scope.row.gname}}</span>
							</el-form-item>
							<el-form-item label="商品图片 :">
								<span>
									<el-image v-if="scope.row.gphoto" style="width: 100px; height: 100px" :src="scope.row.gphoto"
										:preview-src-list="[scope.row.gphoto]">
									</el-image>
									<img v-else src="../assets/none.jpg" style="width: 100px; height: 100px">
								</span>
							</el-form-item>
							<el-form-item label="商品描述 :">
								<span>{{scope.row.gdescribe}}</span>
							</el-form-item>
							<el-form-item label="发布人 :">
								<span>
									<el-tag type="warning" disable-transitions>
										{{scope.row.sellusername}}
									</el-tag>
								</span>
							</el-form-item>
							<el-form-item label="买家 :">
								<span>{{scope.row.susername}}</span>
							</el-form-item>
							<el-form-item label="成交价格 :">
								<span>￥{{scope.row.oprice}}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="oid" sortable label="订单号" width="120"></el-table-column>
				<el-table-column prop="susername" label="买家"></el-table-column>
				<el-table-column prop="sellusername" label="发布人">
					<template slot-scope="scope">
						<el-tag type="warning" disable-transitions>
							{{scope.row.sellusername}}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="gname" label="商品名"></el-table-column>
				<el-table-column prop="gphoto" label="商品图片">
					<template slot-scope="scope">
						<el-image v-if="scope.row.gphoto" style="width: 50px; height: 50px" :src="scope.row.gphoto"
							:preview-src-list="[scope.row.gphoto]">
						</el-image>
						<img v-else src="../assets/none.jpg" style="width: 50px; height: 50px">
					</template>
				</el-table-column>
				<el-table-column prop="oprice" label="成交价格"></el-table-column>
				<el-table-column prop="otime" label="创建时间"></el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button type="success" @click="handleEdit(scope.row)">查看 <i class="el-icon-zoom-in"></i>
						</el-button>
						<el-button type="danger" @click="del(scope.row.oid)">删除 <i class="el-icon-delete"></i>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="padding: 10px 0">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="pageNum" background :page-sizes="[2, 5, 10, 20]" :page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
			<!-- 编辑 -->
			<el-dialog :modal-append-to-body='false' :visible.sync="dialogFormVisible_edit" width="30%">
				<span slot="title">
					<i class="el-icon-zoom-in"></i>
					<span>&ensp;查看订单信息</span>
				</span>
				<el-form label-width="80px" size="small" :model="form" ref="form">
					<el-form-item label="买家" prop="susername">
						<el-input v-model="form.susername" autocomplete="off" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="发布人" prop="sellusername">
						<el-input v-model="form.sellusername" autocomplete="off" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="商品名" prop="gname">
						<el-input v-model="form.gname" autocomplete="off" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="商品描述" prop="gdescribe">
						<el-input type="textarea" v-model="form.gdescribe" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="成交价格" prop="oprice">
						<el-input v-model="form.oprice" autocomplete="off" :disabled="true"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible_edit = false">取 消</el-button>
					<!-- <el-button type="primary" @click="save_edit('form')">确定</el-button> -->
					<el-button type="primary" @click="dialogFormVisible_edit = false">确定</el-button>
				</div>
			</el-dialog>
		</el-card>
	</div>

</template>

<script>
	import request from "@/utils/request";

	export default {
		name: 'Home',
		data() {
			return {
				tableData: [],
				total: 0,
				pageNum: 1,
				pageSize: 10,
				oid: "",
				form: {},
				dialogFormVisible_add: false,
				dialogFormVisible_edit: false,
				multipleSelection: [],
				collapseBtnClass: 'el-icon-s-fold',
				isCollapse: false,
				sideWidth: 200,
				logoTextShow: true,
				headerBg: 'headerBg'
			}
		},
		created() {
			// 请求分页查询数据
			this.load()
		},
		methods: {
			collapse() { // 点击收缩按钮触发
				this.isCollapse = !this.isCollapse
				if (this.isCollapse) { // 收缩
					this.sideWidth = 64
					this.collapseBtnClass = 'el-icon-s-unfold'
					this.logoTextShow = false
				} else { // 展开
					this.sideWidth = 200
					this.collapseBtnClass = 'el-icon-s-fold'
					this.logoTextShow = true
				}
			},
			load() {
				this.request.get("/order/getOrderPage", {
					params: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						Oid: this.oid
					}
				}).then(res => {
					console.log(res)
					this.tableData = res.data
					this.total = res.total
				})
			},
			save_edit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.form);
						this.request.put("/order/updateOrder", this.form).then(res => {
							console.log(res);
							if (res.code == '200') {
								this.$message.success("审核成功")
								this.dialogFormVisible_edit = false
								this.load()
							} else {
								this.$message.error(res.msg)
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});


			},
			handleEdit(row) {
				this.form = JSON.parse(JSON.stringify(row))
				this.dialogFormVisible_edit = true
			},
			del(id) {
				this.$confirm('您确定删除此信息吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.request.delete("/order/deleteOrder/" + id).then(res => {
						if (res) {
							this.$message.success("删除成功")
							this.load()
						} else {
							this.$message.error("删除失败")
						}
					})

				}).catch(() => {

				});

			},
			handleSelectionChange(val) {
				this.multipleSelection = val
			},
			delBatch() {
				let Oids = this.multipleSelection.map(v => v.oid) // [{}, {}, {}] => [1,2,3]
				if (Oids.length != 0) {
					this.request.post("/order/deleteOrder/batch", Oids).then(res => {
						if (res) {
							this.$message.success("批量删除成功")
							this.load()
						} else {
							this.$message.error("批量删除失败")
						}
					})
				}

			},
			reset() {
				this.oid = ""
				this.load()
			},
			handleSizeChange(pageSize) {
				console.log(pageSize)
				this.pageSize = pageSize
				this.load()
			},
			handleCurrentChange(pageNum) {
				console.log(pageNum)
				this.pageNum = pageNum
				this.load()
			}
		}
	}
</script>

<style>
	.headerBg {
		background: #eee !important;
	}

	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		width: 50%;
	}
</style>
