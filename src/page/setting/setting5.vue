<template>
	<div class="setting-five">
		<el-form :model="addPeople" ref="addPeople" label-width="120px">
			<el-row :gutter="21" type="flex" justify="space-around">
				<el-col :span="7">
					<el-form-item label="工   号:" prop="jobNumber">
						<el-input v-model="addPeople.jobNumber" clearable placeholder="请输入工号" :validate-event="false"
							data-mode="num"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="姓   名:" prop="name">
						<el-input v-model="addPeople.name" clearable placeholder="请输入姓名" :validate-event="false"
							data-mode="cn" @click.native="handleHandInput"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="性     别:" prop="sex">
						<el-select v-model="addPeople.sex" clearable placeholder="请选择性别" :validate-event="false"
							style="width:100%;">
							<el-option value="男">男</el-option>
							<el-option value="女">女</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="21" type="flex" justify="space-around">
				<el-col :span="7">
					<el-form-item label="移动电话:" prop="mobilePhone">
						<el-input v-model.number="addPeople.mobilePhone" clearable placeholder="请输入移动电话"
							:validate-event="false" data-mode="num"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="办公电话:">
						<el-input v-model="addPeople.officePhone" clearable placeholder="请输入办公电话" data-mode="num">
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="邮     箱:">
						<el-input v-model="addPeople.email" clearable placeholder="请输入邮箱" data-mode="num biaodian">
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="21" type="flex" justify="space-around">
				<el-col :span="7">
					<el-form-item label="公    司:">
						<el-input v-model="addPeople.company" clearable placeholder="请输入公司名称" data-mode="cn"
							@click.native="handleHandInput"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="部门科室:" prop="departMent">
						<el-input v-model="addPeople.departMent" clearable placeholder="请输入部门名称" :validate-event="false"
							data-mode="cn" @click.native="handleHandInput"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="房     号:">
						<el-input v-model="addPeople.position" clearable placeholder="请输入房号" data-mode="num"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" justify="space-around" :gutter="48" style="text-align:center;">
				<el-col :span="8">
					<el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
				</el-col>
				<el-col :span="8">
					<el-button type="primary" icon="el-icon-circle-plus-outline" @click="add">添加</el-button>
				</el-col>
				<el-col :span="8">
					<el-button type="primary" icon="el-icon-delete" :disabled="deletedState" @click="deleteItem">删除
					</el-button>
				</el-col>
				<el-col :span="8">
					<el-button type="primary" icon="el-icon-top" @click="exportStaffsTemplate">导出模板</el-button>
				</el-col>
				<el-col :span="8">
					<el-button type="primary" icon="el-icon-top" @click="importStaffs">导入</el-button>
				</el-col>
				<el-col :span="8">
					<el-button type="primary" icon="el-icon-bottom" @click="exportStaffs">导出</el-button>
				</el-col>
			</el-row>
		</el-form>
		<div class="activeName">
			<el-pagination class="offline3_pagination" @size-change="handleSizeChange"
				@current-change="handleCurrentChange" :current-page="currentPage" :page-size="8" :page-sizes="[1, 6, 9]"
				layout="total, prev, pager, next,jumper" :total="currentPageLength"> </el-pagination>
			<el-table class="offline3_table" :data="peopleList" height="94%" ref="tableList"
				:row-class-name="tableRowClassName" @selection-change="checkSelect" v-loading="peopleListBoolean">
				<el-table-column type="selection" width="55" fixed> </el-table-column>
				<el-table-column label="序号" type="index" width="70"> </el-table-column>
				<el-table-column prop="jobNumber" label="工号" align="center" width="100"> </el-table-column>
				<el-table-column prop="name" label="姓名" align="center" width="150"> </el-table-column>
				<el-table-column prop="sex" label="性别" align="center" width="120"> </el-table-column>
				<el-table-column prop="officePhone" label="移动电话" align="center" width="170"> </el-table-column>
				<el-table-column prop="mobilePhone" label="办公电话" align="center" width="170"> </el-table-column>
				<el-table-column prop="email" label="邮箱" align="center" width="220"> </el-table-column>
				<el-table-column prop="company" label="公司" align="center" width="200"> </el-table-column>
				<el-table-column prop="departMent" label="部门科室" align="center" width="150"> </el-table-column>
				<el-table-column prop="position" label="房号" align="center" width="150"> </el-table-column>
				<el-table-column fixed="right" label="操作" align="center" width="150">
					<template slot-scope="scope">
						<el-button v-if="!scope.row.isEgdit" type="primary" size="small"
							@click="edit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog :title="writing" :visible.sync="editStatus" :close-on-click-modal="false" :show-close="false">
			<el-form :model="editPeopleBefore" ref="editPeopleBefore" label-width="120px">
				<el-row type="flex" justify="space-around">
					<el-col :span="7">
						<el-form-item label="工       号:" prop="jobNumber">
							<el-input v-model="editPeopleBefore.jobNumber" clearable placeholder="请输入工号"
								:validate-event="false" :disabled="jobNumberState"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="姓       名:" prop="name">
							<el-input v-model="editPeopleBefore.name" clearable placeholder="请输入姓名"
								:validate-event="false" @input="addressChange" @click="handleHandInput"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="性       别:" prop="sex">
							<el-select v-model="editPeopleBefore.sex" clearable placeholder="请选择性别"
								:validate-event="false" @input="addressChange">
								<el-option value="男">男</el-option>
								<el-option value="女">女</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row type="flex" justify="space-around">
					<el-col :span="7">
						<el-form-item label="移动电话:" prop="mobilePhone">
							<el-input v-model.number="editPeopleBefore.mobilePhone" clearable placeholder="请输入移动电话"
								:validate-event="false" @input="addressChange"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="办公电话:">
							<el-input v-model="editPeopleBefore.officePhone" clearable placeholder="请输入办公电话"
								@input="addressChange"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="邮       箱:">
							<el-input v-model="editPeopleBefore.email" clearable placeholder="请输入邮箱"
								@input="addressChange"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row type="flex" justify="space-around">
					<el-col :span="7">
						<el-form-item label="公       司:">
							<el-input v-model="editPeopleBefore.company" clearable placeholder="请输入公司名称"
								@input="addressChange" @click="handleHandInput"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="部门科室:" prop="departMent">
							<el-input v-model="editPeopleBefore.departMent" clearable placeholder="请输入部门名称"
								:validate-event="false" @input="addressChange" @click="handleHandInput"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="房       号:">
							<el-input v-model="editPeopleBefore.position" clearable placeholder="请输入房号"
								@input="addressChange"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="abolish">取 消</el-button>
				<el-button type="primary" v-if="this.writing == '编辑员工信息'" @click="editSuccess" :disabled="editState">确 定
				</el-button>
			</div>
		</el-dialog>
		<div class="call_black flex-end">
			<div @click="_goBack()">
				<img src="../../assets/imgs/Rectangle 33.png" alt="" />
				<p class="flex-center-center">返回</p>
			</div>
		</div>
	</div>
</template>

<script>
import Native from "../../API/native-api.js";
import { mapState } from "vuex";

export default {
	data() {
		return {
			activeName: "first",
			peopleListBoolean: null, //系统员工管理
			peopleList: [],
			newPeopleList: [],
			currentPageLength: 0,
			pageAmount: 8,
			currentPage: 1,
			writing: "", //弹框标题
			deletedState: true, //删除按钮状态
			deletedList: [], //将选中的删除对象放到新的数组里
			editState: true, //监听编辑信息是否修改了
			jobNumberState: true, //工号input状态
			//添加员工信息
			addPeople: {
				jobNumber: "",
				name: "",
				sex: "",
				mobilePhone: "",
				officePhone: "",
				email: "",
				company: "",
				departMent: "",
				position: "",
			},
			//编辑员工信息
			editPeopleBefore: {
				jobNumber: "",
				name: "",
				sex: "",
				mobilePhone: "",
				officePhone: "",
				email: "",
				company: "",
				departMent: "",
				position: "",
			},
			editString: "",
			newEditString: "",
			rulseInfo: true,
		};
	},
	created() { },
	methods: {
		tableRowClassName({ rowIndex }) {
			if (rowIndex % 2 == 0) {
				return "warning-row";
			} else if (rowIndex % 2 == 1) {
				return "success-row";
			}
			return "";
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageAmount = val;
			this.getTableData();
		},
		handleCurrentChange(page) {
			console.log(`当前页: ${page}`);
			this.currentPage = page;
			this.getTableData();
		},
		getTableData() {
			this.peopleList = this.newPeopleList.slice((this.currentPage - 1) * this.pageAmount, this.currentPage * this.pageAmount);
		},
		//添加
		async add(person) {
			// addPeople: {
			// 	jobNumber: "",
			// 	name: "",
			// 	sex: "",
			// 	mobilePhone: "",
			// 	officePhone: "",
			// 	email: "",
			// 	company: "",
			// 	departMent: "",
			// 	position: "",
			// },

			this.rulseInfo = false;
			console.log(this.rulseInfo);
			console.log(person);
			let newPeople = new Object();

			newPeople = this.addPeople;
			console.log(newPeople, "添加");
			let info = await Native.addStaff(JSON.stringify(newPeople));
			if (info.success) {
				let res = await Native.getStaffs(this.addPeople.jobNumber, this.addPeople.name, this.addPeople.sex, this.addPeople.mobilePhone, this.addPeople.departMent, "");
				console.log(res);
				if (res.success) {
					this.peopleListBoolean = false;
				} else {
					this.$message({ message: "获取员工数据失败", type: "info" });
					console.log(res.msg);
				}
				if (this.addPeople.name == "" || this.addPeople.sex == "") {
					this.$message({ message: "姓名和性别为必填项", type: "info" });
					this.addPeople.jobNumber = "";
					this.addPeople.name = "";
					this.addPeople.sex = "";
					this.addPeople.mobilePhone = "";
					this.addPeople.officePhone = "";
					this.addPeople.email = "";
					this.addPeople.company = "";
					this.addPeople.departMent = "";
					this.addPeople.position = "";
				} else {
					this.newPeopleList = res.body.list;
					this.currentPageLength = this.newPeopleList.length; //数据总长
					this.peopleList = this.newPeopleList;
					this.$message({ message: "员工信息添加成功", type: "success" });
					this.addPeople.jobNumber = "";
					this.addPeople.name = "";
					this.addPeople.sex = "";
					this.addPeople.mobilePhone = "";
					this.addPeople.officePhone = "";
					this.addPeople.email = "";
					this.addPeople.company = "";
					this.addPeople.departMent = "";
					this.addPeople.position = "";
					return;
				}
			} else {
				this.$message.error(info.code, info.msg);
				return;
			}
		},
		//查询
		async query() {
			this.rulseInfo = true;
			console.log(this.rulseInfo);
			let res = await Native.getStaffs(this.addPeople.jobNumber, this.addPeople.name, this.addPeople.sex, this.addPeople.mobilePhone, this.addPeople.departMent, "");
			console.log(res);
			this.peopleListBoolean = true;
			if (res.success) {
				this.peopleListBoolean = false;
				this.newPeopleList = res.body.list;
				this.currentPageLength = this.newPeopleList.length; //数据总长
				this.peopleList = this.newPeopleList;
				console.log(this.peopleList);
				// this.getTableData();
				this.$message({ message: `信息查询成功!为您查到${this.currentPageLength}条数据`, type: "success" });
			} else {
				this.peopleListBoolean = false;
				this.$message({ message: "信息查询失败", type: "info" });
				return;
			}
		},
		checkSelect(data, index) {
			console.log(`选中项数据 `, data, index);
			let selection = this.$refs.tableList.selection;
			if (selection.length == 0) {
				this.deletedState = true;
			} else {
				this.deletedState = false;
				this.deletedList = data; //删除数据
			}
		},
		//删除员工信息
		async deleteItem() {
			this.$confirm("是否删除员工信息?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
			})
				.then(async () => {
					for (let index = 0; index < this.deletedList.length; index++) {
						let jobNumber = this.deletedList[index].jobNumber;
						let res = await Native.deleteStaff(jobNumber); //传工号
						if (res.success) {
							// this.$message({ type: "success", message: "删除成功!" });
							this.query();
							return;
						} else {
							this.$message({ type: "info", message: "删除异常!" });
						}
					}
				})
				.catch(() => {
					this.$message({ type: "info", message: "已取消删除" });
				});
		},
		//编辑数据
		edit(index, row) {
			this.$store.commit("cancel");
			this.$store.commit("preserve");
			this.writing = "编辑员工信息";
			this.jobNumberState = true;
			this.editState = true;
			this.editString = JSON.stringify(row);
			this.editPeopleBefore = row;
		},
		//判断数据是否修改
		addressChange() {
			this.newEditString = JSON.stringify(this.editPeopleBefore);
			if (this.newEditString == this.editString) {
				this.editState = true;
			} else {
				this.editState = false;
			}
		},
		//编辑成功
		async editSuccess() {
			let res = await Native.updateStaff(this.newEditString);
			// res = JSON.parse(res);
			console.log(res);
			if (res.success) {
				this.$message({ type: "success", message: "编辑成功!" });
				this.query();
			} else {
				this.$message({ type: "info", message: "编辑异常!" });
			}
			this.$store.commit("cancel");
		},
		//取消编辑
		abolish() {
			this.$store.commit("cancel");
		},
		async exportStaffsTemplate() {
			let loading = this.$loading({
				lock: true,
				customClass: "create-isLoading",
				text: "导出数据中……",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)",
			});
			let resp = await Native.exportStaffsTemplate();
			console.log(resp);
			if (resp.success) {
				this.$message({ type: "success", message: "导出模板成功！" });
			} else {
				this.$message({ type: "info", message: resp.msg });
			}
			loading.close();
		},
		async importStaffs() {
			let loading = this.$loading({
				lock: true,
				customClass: "create-isLoading",
				text: "导入数据中……",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)",
			});
			let resp = await Native.importStaffs();
			console.log(resp);
			if (resp.success) {
				let res = await Native.getStaffs(this.addPeople.jobNumber, this.addPeople.name, this.addPeople.sex, this.addPeople.mobilePhone, this.addPeople.departMent, "");
				console.log("getStaffs", res);
				this.newPeopleList = res.body.list;
				this.currentPageLength = this.newPeopleList.length; //数据总长
				this.peopleList = this.newPeopleList;
				this.$message({ type: "success", message: "导入数据成功！" });
			} else {
				this.$message({ type: "info", message: resp.msg });
			}
			loading.close();
		},
		async exportStaffs() {
			let loading = this.$loading({
				lock: true,
				customClass: "create-isLoading",
				text: "导出数据中……",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)",
			});
			let resp = await Native.exportStaffs();
			console.log(resp);
			if (resp.success) {
				this.$message({ type: "success", message: "导出数据成功！" });
			} else {
				this.$message({ type: "info", message: resp.msg });
			}
			loading.close();
		},
		async handleHandInput() {
			// let urlBoolen = true;
			// let url = "C:\\Program Files\\SogouInput\\Components\\HandInput\\1.1.0.328\\handinput";
			let resp = await Native.handleHandInput(this.touchKeypadList.urlBoolen, this.touchKeypadList.url);
			console.log("手写键盘--", resp);
		},
		_goBack() {
			this.$router.push({ name: "setting" });
		},
	},
	mounted() { },
	components: {},
	computed: {
		...mapState(["editStatus", "addStatus", "touchKeypadList"]),
	},
	watch: {},
};
</script>

<style lang="scss" scoped>
@mixin setting-five {
	.setting-five {
		width: 100%;
		height: 100%;
		padding: 10px;
		box-sizing: border-box;

		.el-form {
			height: 30%;
			font-size: 25px;
			// display: flex;
			// flex-wrap: wrap;
			// align-items: center;
			// justify-content: center;
		}

		.el-form-item__label {
			font-size: 20px;
		}

		.el-row {
			.el-col {
				.el-button {
					::v-deep i {
						font-size: 35px;
					}

					::v-deep span {
						font-size: 35px;
					}
				}
			}
		}

		.el-table {
			font-size: 20px;
			color: black;
		}
	}

	.el-dialog {
		width: 99%;
	}

	.el-pagination {
		// height: 7%;
		// white-space: nowrap;
		// padding: 2px 5px;
		// color: #303133;
		// font-weight: 700;
		// float: right;
		// margin-right: 20px;
		// margin-top: 0.4rem;
	}

	.activeName {
		height: 70%;
		border: 1px solid #4f4ff5;
		border-radius: 10px;
		padding: 5px;
		box-sizing: border-box;

		// .el-table {
		// 	border-radius: 10px;
		// }
		.offline3_pagination {
			float: right;
			margin-right: 290px;
		}
	}
}
::v-deep .el-checkbox__inner {
	width: 25px !important;
	height: 25px !important;
}
::v-deep .el-checkbox__inner::after {
	height: 13px;
	left: 8px;
	top: 2px;
	width: 6.5px;
}

::v-deep .el-table th>.cell {
	padding-left: 18px;
}

@media screen and (min-width: 0px) {
	@include setting-five;
}

/* 屏幕最大等于1024 */
@media screen and (min-width: 1024px) and (max-width: 1024px) {
	@include setting-five;
}

/* 屏幕最大等于1920 */
@media screen and (min-width: 1920px) and (max-width: 1920px) {
	@include setting-five;
}
</style>
