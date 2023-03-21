<template>
	<div>
		<el-card>
			<div slot="header" class="clearfix">
				<div style="margin: 10px 0">
					<el-input style="width: 200px" placeholder="请输入用户名" suffix-icon="el-icon-search"
						v-model="susername">
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
				<el-table-column prop="sid" sortable label="ID"></el-table-column>
				<el-table-column prop="savatar" label="头像" width="65">
					<template slot-scope="scope">
						<div v-if="!scope.row.savatar">
							<el-avatar>{{scope.row.susername}}</el-avatar>
						</div>
						<div v-else>
							<el-avatar>
								<el-image :src="scope.row.savatar" :preview-src-list="[scope.row.savatar]">
								</el-image>
							</el-avatar>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="susername" label="用户名"></el-table-column>
				<el-table-column prop="ssex" label="性别" width="80">
					<template slot-scope="scope">
						<div v-if="scope.row.ssex=='F'">
							<el-tag type="success" disable-transitions>
								女生
							</el-tag>
						</div>
						<div v-else-if="scope.row.ssex=='M'">
							<el-tag type="primary" disable-transitions>
								男生
							</el-tag>
						</div>
						<div v-else>
							<el-tag type="info" effect="plain" disable-transitions>
								外星人
							</el-tag>
						</div>

					</template>
				</el-table-column>
				<el-table-column prop="sschool" sortable label="学校"></el-table-column>
				<el-table-column prop="scollege" sortable label="院系"></el-table-column>
				<el-table-column prop="sgrade" sortable label="年级"></el-table-column>
				<el-table-column prop="sclass" sortable label="班级"></el-table-column>
				<el-table-column prop="smajor" sortable label="专业"></el-table-column>
				<el-table-column prop="sno" sortable label="学号"></el-table-column>
				<el-table-column prop="sqq" label="QQ号"></el-table-column>
				<el-table-column prop="swx" label="微信"></el-table-column>
				<el-table-column prop="sphone" label="电话"></el-table-column>
				<el-table-column prop="sadress" label="地址"></el-table-column>
				<el-table-column prop="stime" label="创建时间"></el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i>
						</el-button>
						<el-button type="danger" @click="del(scope.row.sid)">删除 <i class="el-icon-delete"></i>
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
					<span>&ensp;添加学生信息</span>
				</span>
				<el-form label-width="80px" size="small" :model="form" ref="form">
					<el-form-item label="用户名" prop="susername" :rules="[
										  { required: true, message: '用户名不能为空'}
										  ]">
						<el-input v-model="form.susername" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="ssex">
						<el-radio v-model="form.ssex" label="M">男</el-radio>
						<el-radio v-model="form.ssex" label="F">女</el-radio>
						<el-radio v-model="form.ssex" label="A">外星人</el-radio>
					</el-form-item>
					<el-form-item label="学校" prop="sschool">
						<el-input v-model="form.sschool" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="学院" prop="scollege">
						<el-input v-model="form.scollege" autocomplete="off"></el-input>
					</el-form-item>
					<!-- <el-form-item label="年级" prop="sgrade">
						<el-input v-model="form.sgrade" autocomplete="off"></el-input>
					</el-form-item> -->
					<el-form-item label="年级">
						<el-select v-model="form.sgrade" placeholder="请选择年级">
							<el-option label="大一" value="大一"></el-option>
							<el-option label="大二" value="大二"></el-option>
						 <el-option label="大三" value="大三"></el-option>
							<el-option label="大四" value="大四"></el-option>
						 <el-option label="研一" value="研一"></el-option>
							<el-option label="研二" value="研二"></el-option>
							<el-option label="研三" value="研三"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="班级" prop="sclass">
						<el-input v-model="form.sclass" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="专业" prop="smajor">
						<el-input v-model="form.smajor" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="学号" prop="sno">
						<el-input v-model="form.sno" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="QQ号" prop="sqq">
						<el-input v-model="form.sqq" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="微信" prop="swx">
						<el-input v-model="form.swx" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="电话" prop="sphone">
						<el-input v-model="form.sphone" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="地址" prop="sadress">
						<el-input type="textarea" v-model="form.sadress"></el-input>
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
					<span>&ensp;编辑用户信息</span>
				</span>
				<el-form label-width="80px" size="small" :model="form" ref="form">
					<el-form-item label="用户名" prop="susername" :rules="[
										  { required: true, message: '用户名不能为空'}
										  ]">
						<el-input v-model="form.susername" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="ssex">
						<el-radio v-model="form.ssex" label="M">男</el-radio>
						<el-radio v-model="form.ssex" label="F">女</el-radio>
						<el-radio v-model="form.ssex" label="A">外星人</el-radio>
					</el-form-item>
					<el-form-item label="学校" prop="sschool">
						<el-input v-model="form.sschool" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="学院" prop="scollege">
						<el-input v-model="form.scollege" autocomplete="off"></el-input>
					</el-form-item>
					<!-- <el-form-item label="年级" prop="sgrade">
						<el-input v-model="form.sgrade" autocomplete="off"></el-input>
					</el-form-item> -->
					<el-form-item label="年级">
						<el-select v-model="form.sgrade" placeholder="请选择年级">
							<el-option label="大一" value="大一"></el-option>
							<el-option label="大二" value="大二"></el-option>
							<el-option label="大三" value="大三"></el-option>
							<el-option label="大四" value="大四"></el-option>
							<el-option label="研一" value="研一"></el-option>
							<el-option label="研二" value="研二"></el-option>
							<el-option label="研三" value="研三"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="班级" prop="sclass">
						<el-input v-model="form.sclass" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="专业" prop="smajor">
						<el-input v-model="form.smajor" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="学号" prop="sno">
						<el-input v-model="form.sno" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="QQ号" prop="sqq">
						<el-input v-model="form.sqq" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="微信" prop="swx">
						<el-input v-model="form.swx" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="电话" prop="sphone">
						<el-input v-model="form.sphone" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="地址" prop="sadress">
						<el-input type="textarea" v-model="form.sadress"></el-input>
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
				susername: "",
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
				this.request.get("/student/getStudentPage", {
					params: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						Susername: this.susername
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
						this.request.post("/student/insertStudent", this.form).then(res => {
							if (res.code == '200') {
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
						this.request.put("/student/updateStudent", this.form).then(res => {
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
				console.log(this.form);
				this.dialogFormVisible_edit = true
			},
			del(id) {
				this.$confirm('您确定删除此信息吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.request.delete("/student/deleteStudent/" + id).then(res => {
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
				let Sids = this.multipleSelection.map(v => v.sid) // [{}, {}, {}] => [1,2,3]

				if (Sids.length != 0) {
					this.request.post("/student/deleteStudent/batch", Sids).then(res => {
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
				this.susername = ""
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
