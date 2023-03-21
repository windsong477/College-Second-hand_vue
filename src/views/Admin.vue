<template>
	<div>
		<el-card>
			<div slot="header" class="clearfix">
				<div style="margin: 10px 0">
					<el-input style="width: 200px" placeholder="请输入用户名" suffix-icon="el-icon-search" v-model="ausername">
					</el-input>
					<el-button class="ml-5" type="primary" @click="load"><i class="el-icon-search"></i> 搜索</el-button>
					<el-button type="warning" @click="reset"><i class="el-icon-refresh-left"></i> 重置</el-button>
				</div>
				<div style="margin: 10px 0">
					<el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i>
					</el-button>
					<el-popconfirm class="ml-5" confirm-button-text='确定' cancel-button-text='我再想想' icon="el-icon-info"
						icon-color="red" title="您确定批量删除这些数据吗？" @confirm="delBatch">
						<el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i>
						</el-button>
					</el-popconfirm>
				</div>
			</div>
			<el-table :data="tableData" border stripe :header-cell-class-name="headerBg"
				@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="aid" sortable label="ID" width="120"></el-table-column>
				<el-table-column prop="aavatar" label="头像">
					<template slot-scope="scope">
						<div v-if="!scope.row.aavatar">
							<el-avatar>{{scope.row.ausername}}</el-avatar>
						</div>
						<div v-else>
							<el-avatar>
								<el-image :src="scope.row.aavatar" :preview-src-list="[scope.row.aavatar]">
								</el-image>
							</el-avatar>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="ausername" label="用户名"></el-table-column>
				<el-table-column prop="aphone" label="电话"></el-table-column>
				<el-table-column prop="atime" label="创建时间"></el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i>
						</el-button>
						<el-button type="danger" @click="del(scope.row.aid)">删除 <i class="el-icon-delete"></i>
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

			<!-- 添加 -->
			<el-dialog :modal-append-to-body='false' :visible.sync="dialogFormVisible_add" width="30%">
				<span slot="title">
					<i class="el-icon-edit"></i>
					<span>&ensp;添加管理员</span>
				</span>
				<el-form label-width="80px" size="small" :model="form" ref="form">
					<el-form-item label="用户名" prop="ausername" :rules="[
										  { required: true, message: '用户名不能为空'}
										  ]">
						<el-input v-model="form.ausername" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="电话" prop="aphone">
						<el-input v-model="form.aphone" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible_add = false">取 消</el-button>
					<el-button type="primary" @click="save_add('form')">确 定</el-button>
				</div>
			</el-dialog>

			<!-- 编辑 -->
			<el-dialog :modal-append-to-body='false' :visible.sync="dialogFormVisible_edit" width="30%">
				<span slot="title">
					<i class="el-icon-edit"></i>
					<span>&ensp;编辑管理员信息</span>
				</span>
				<el-form label-width="80px" size="small" :model="form" ref="form">
					<el-form-item label="用户名" prop="ausername" :rules="[
										  			  { required: true, message: '用户名不能为空'}
										  			  ]">
						<el-input v-model="form.ausername" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="电话" prop="aphone">
						<el-input v-model="form.aphone" autocomplete="off"></el-input>
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
				ausername: "",
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
				this.request.get("/admin/getAdminPage", {
					params: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						Ausername: this.ausername
					}
				}).then(res => {
					console.log(res)
					this.tableData = res.data
					this.total = res.total
				})
			},
			save_add(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.request.post("/admin/insertAdmin", this.form).then(res => {
							if (res.code == '200') {
								console.log(res);
								this.$message.success("保存成功")
								this.dialogFormVisible_add = false
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
			save_edit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.form);
						this.request.put("/admin/updateAdmin", this.form).then(res => {
							console.log(res);
							if (res.code == '200') {
								this.$message.success("修改成功")
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
			handleAdd() {
				this.dialogFormVisible_add = true
				this.form = {}
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
					this.request.delete("/admin/deleteAdmin/" + id).then(res => {
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
				let Aids = this.multipleSelection.map(v => v.aid) // [{}, {}, {}] => [1,2,3]
				if(Aids.length!=0)
				{
					this.request.post("/admin/deleteAdmin/batch", Aids).then(res => {
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
				this.ausername = ""
				this.load()
			},
			handleSizeChange(pageSize) {
				this.pageSize = pageSize
				this.load()
			},
			handleCurrentChange(pageNum) {
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
