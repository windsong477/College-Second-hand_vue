<template>
	<div>
		<el-card>
			<div slot="header" class="clearfix">
				<div style="margin: 10px 0">
					<el-input style="width: 200px" placeholder="请输入商品名" suffix-icon="el-icon-search" v-model="gname">
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
				<el-table-column prop="gid" sortable label="ID"></el-table-column>
				<el-table-column prop="gphoto" label="图片" width="122">
					<template slot-scope="scope">
							<el-image v-if="scope.row.gphoto" style="width: 100px; height: 100px" :src="scope.row.gphoto" :preview-src-list="[scope.row.gphoto]">
							</el-image>
							<img v-else src="../assets/none.jpg" style="width: 100px; height: 100px">
					</template>
				</el-table-column>
				<el-table-column prop="gname" label="商品名"></el-table-column>
				<el-table-column prop="sellusername" sortable label="发布人"></el-table-column>
				<el-table-column prop="gbuyprice" sortable label="买入价格"></el-table-column>
				<el-table-column prop="gsellprice" sortable label="卖出价格"></el-table-column>
				<el-table-column prop="gdescribe" label="商品描述"></el-table-column>
				<el-table-column prop="gaudit" label="审核状态" width="80">
					<template slot-scope="scope">
						<div v-if="scope.row.gaudit == '0'">
							<el-tag type="info" effect="plain" disable-transitions>
								未审核
							</el-tag>
						</div>
						<div v-else>
							<el-tag type="success" disable-transitions>
								已审核
							</el-tag>
						</div>

					</template>
				</el-table-column>
				<el-table-column prop="gstatus" label="物品状态" width="80">
					<template slot-scope="scope">
						<div v-if="scope.row.gstatus == '0'">
							<el-tag type="info" effect="plain" disable-transitions>
								审核中
							</el-tag>
						</div>
						<div v-else-if="scope.row.gstatus == '1'">
							<el-tag type="primary" effect="plain" disable-transitions>
								上架中
							</el-tag>
						</div>
						<div v-else-if="scope.row.gstatus == '2'">
							<el-tag type="success" disable-transitions>
								交易完成
							</el-tag>
						</div>
						<div v-else>
							<el-tag type="info" plain disable-transitions>
								已下架
							</el-tag>
						</div>

					</template>
				</el-table-column>
				<el-table-column prop="gtime" label="创建时间"></el-table-column>
				<el-table-column prop="gupdate_time" label="更新时间"></el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button type="success" @click="handleEdit(scope.row)">审核 <i class="el-icon-view"></i>
						</el-button>
						<el-button type="danger" @click="del(scope.row.gid)">删除 <i class="el-icon-delete"></i>
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
					<i class="el-icon-edit"></i>
					<span>&ensp;审核商品信息</span>
				</span>
				<el-form label-width="80px" size="small" :model="form" ref="form">
					<el-form-item label="商品名" prop="gname" :rules="[
										  			  { required: true, message: '商品名不能为空'}
										  			  ]">
						<el-input v-model="form.gname" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="买入价格" prop="gbuyprice">
						<el-input v-model="form.gbuyprice" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="卖出价格" prop="gsellprice">
						<el-input v-model="form.gsellprice" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="商品描述" prop="gdescribe">
						<el-input type="textarea" v-model="form.gdescribe"></el-input>
					</el-form-item>
					<el-divider></el-divider>
					<el-form-item label="审核状态" prop="gaudit">
						<el-switch v-model="form.gaudit" active-value="1" inactive-value="0"  active-color="#13ce66" inactive-color="#ccc"></el-switch>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible_edit = false">取 消</el-button>
					<el-button type="primary" @click="save_edit('form')">确 定</el-button>
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
				gname: "",
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
				this.request.get("/goods/getAdminGoodsPage", {
					params: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						Gname: this.gname
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
						if(this.form.gstatus=='0'||this.form.gstatus=='1')
						{
							this.request.put("/goods/updateGoods", this.form).then(res => {
								console.log(res);
								if (res.code == '200') {
									this.$message.success("审核成功")
									this.dialogFormVisible_edit = false
									this.load()
								} else {
									this.$message.error(res.msg)
								}
							})
						}
						else if(this.form.gstatus=='2')
						{
							this.$message.error("该商品已经交易完成，无法更改状态")
						}
						else if(this.form.gstatus=='3')
						{
							this.$message.error("该商品已经下架，无法更改状态")
						}
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});


			},
			handleEdit(row) {
				this.form = JSON.parse(JSON.stringify(row))
				console.log(this.form);
				this.dialogFormVisible_edit = true
			},
			del(id) {
				this.$confirm('您确定删除此信息吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.request.delete("/goods/deleteGoods/" + id).then(res => {
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
				console.log(val)
				this.multipleSelection = val
			},
			delBatch() {
				let ids = this.multipleSelection.map(v => v.gid) // [{}, {}, {}] => [1,2,3]

				if (ids.length != 0) {
					this.request.post("/goods/deleteGoods/batch", ids).then(res => {
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
				this.gname = ""
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
</style>
