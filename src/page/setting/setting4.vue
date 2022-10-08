<template>
	<div id="query">
		<ul>
			<li>
				<fieldset class="quert-one">
					<legend>查询条件</legend>
					<el-form :model="queryCriteria" label-width="140px">
						<el-row :gutter="24">
							<el-col :span="8">
								<el-form-item label="来访人员:" prop="mobilePhone">
									<el-input placeholder="请输入来访人员姓名" v-model="queryCriteria.visitor.name" clearable
										data-mode="cn"> </el-input>
								</el-form-item>
								<!-- <span> </span>
								<el-input placeholder="请输入内容" v-model="queryCriteria.visitor.name" clearable style="width:70%;" data-mode="cn" @click.native="handleHandInput"> </el-input> -->
							</el-col>
							<el-col :span="8">
								<el-form-item label="被访人员:" prop="mobilePhone">
									<el-input placeholder="请输入被访人员姓名" v-model="queryCriteria.staff.name" clearable
										data-mode="cn"> </el-input>
								</el-form-item>
								<!-- <span>被访人员 </span>
								<el-input placeholder="请输入内容" v-model="queryCriteria.staff.name" clearable style="width:72%;" data-mode="cn" @click.native="handleHandInput"> </el-input> -->
							</el-col>
							<el-col :span="8" style="text-align:center;">
								<el-button type="primary" icon="el-icon-search" @click="parameter(queryCriteria, 1)">查询
								</el-button>
								<el-button type="primary" icon="el-icon-search" @click="advancedQuery(queryCriteria)">
									高级查询</el-button>
							</el-col>
						</el-row>
						<el-row :gutter="24">
							<el-col :span="8" style="text-align:center;">
								<el-button type="warning" icon="el-icon-edit" @click="operation(0)">签离搜索结果</el-button>
								<el-button type="warning" icon="el-icon-edit" @click="operation(1)">签离全部</el-button>
							</el-col>
							<el-col :span="8" style="text-align:center;">
								<el-button type="success" icon="el-icon-s-order" @click="operation(2)">导出搜索结果
								</el-button>
								<el-button type="success" icon="el-icon-s-order" @click="operation(3)">导出全部</el-button>
							</el-col>
							<el-col :span="8" style="text-align:center;">
								<el-button type="danger" icon="el-icon-delete" @click="queryDeleFuntion(4)">删除搜索结果
								</el-button>
								<el-button type="danger" icon="el-icon-delete" @click="queryDeleFuntion(5)">删除全部
								</el-button>
							</el-col>
						</el-row>
					</el-form>
				</fieldset>
			</li>
			<li>
				<fieldset class="quert-two">
					<legend>来访信息记录表</legend>
					<div class="query-3" v-if="tab == 1">
						<el-pagination class="offline3_pagination" @size-change="handleSizeChange"
							@current-change="handleCurrentChange" :current-page="currentPage" :page-size="8"
							layout="total,  prev, pager, next,jumper" :total="currentPageLength" data-mode="num">
						</el-pagination>
						<el-table class="offline3_table" :data="peopleList" style="width: 100%;border-radius: 10px;"
							height="90%" :row-class-name="tableRowClassName" v-loading="tableDataBoolean">
							<el-table-column label="序号" type="index" width="70"> </el-table-column>
							<el-table-column label="访客姓名" width="120" prop="visitor.name"> </el-table-column>
							<el-table-column label="被访人" width="180" prop="staff.name"> </el-table-column>
							<el-table-column label="来访时间" width="250" prop="record.timeIn"> </el-table-column>
							<el-table-column label="离访时间" width="250" prop="record.timeOut"> </el-table-column>
							<el-table-column label="证件号码" width="370" prop="visitor.idCard"> </el-table-column>
							<!-- <el-table-column label="二代身份证号码" width="370" prop="visitor.idCard"> </el-table-column>
							<el-table-column label="驾驶证号码" width="370" prop="visitor.driverLicense"> </el-table-column>
							<el-table-column label="护照号码" width="370" prop="visitor.passport"> </el-table-column> -->
							<el-table-column label="来访事由" width="200" prop="record.purpose"> </el-table-column>
							<el-table-column label="所去科室" width="200" prop="staff.department"> </el-table-column>
							<el-table-column label="性别" width="80" prop="visitor.sex"> </el-table-column>
							<!-- <el-table-column fixed="right" label="操作" align="center" width="100">
						<template slot-scope="scope">
							<el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click="selectStaff(scope.row, scope.$index)" icon="el-icon-check" circle></el-button>
						</template>
					</el-table-column> -->
						</el-table>
					</div>
				</fieldset>
			</li>
		</ul>

		<el-dialog title="高级查询" :visible.sync="dialogFormVisible">
			<el-form :model="queryCriteria" label-width="140px">
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="来访日期:" prop="mobilePhone">
							<el-date-picker style="width:80%;" v-model="timeInStart" type="daterange" align="right"
								unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
								:picker-options="pickerOptions"> </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="离访日期:" prop="mobilePhone">
							<el-date-picker style="width:80%;" v-model="timeOutStart" type="daterange" align="right"
								unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
								:picker-options="pickerOptions"> </el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
					<el-col :span="8">
						<el-form-item label="来访人员:" prop="mobilePhone">
							<el-input placeholder="请输入来访人员姓名" v-model="queryCriteria.visitor.name" clearable
								data-mode="cn"> </el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="证件号码:" prop="mobilePhone">
							<el-input placeholder="请输入证件号码" v-model="queryCriteria.visitor.idCard" clearable
								data-mode="num"> </el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="证件类型:" prop="mobilePhone">
							<el-select v-model="queryCriteria.record.certificateType" placeholder="请选择证件类型">
								<el-option v-for="item in options" :key="item.value" :label="item.label"
									:value="item.value"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
					<el-col :span="8">
						<el-form-item label="被访人员:" prop="mobilePhone">
							<el-input placeholder="请输入被访人员姓名" v-model="queryCriteria.staff.name" clearable
								data-mode="cn"> </el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="被访部门:" prop="mobilePhone">
							<el-input placeholder="请输入被访部门" v-model="queryCriteria.staff.department" clearable
								data-mode="cn"> </el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8" style="text-align:center;">
						<el-button type="primary" icon="el-icon-search" @click="parameter(queryCriteria, 2)">查询记录
						</el-button>
					</el-col>
				</el-row>
			</el-form>
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
import { mapState } from "vuex";
import Native from "../../API/native-api.js";
export default {
	name: "Query",
	data() {
		return {
			tab: 1,
			options: [
				{
					value: "二代身份证",
					label: "二代身份证",
				},
				{
					value: "驾驶照",
					label: "驾驶照",
				},
				{
					value: "护照",
					label: "护照",
				},
			],
			value: "",
			input: "",
			checked: true,
			pickerOptions: {
				shortcuts: [
					{
						text: "最近一周",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "最近一个月",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "最近三个月",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit("pick", [start, end]);
						},
					},
				],
			},
			peopleList: [],
			activeNames: ["1"],
			tableDataBoolean: true,
			newPeopleList: [], //分页新数组
			currentPageLength: 0, //数据总长度
			pageAmount: 8, //每页多少条数据
			currentPage: 1, //当前第几页
			queryCriteria: {
				visitor: {
					name: "",
					idCard: "",
				},
				staff: {
					name: "",
					department: "",
				},
				record: {
					timeIn: "",
					timeOut: "",
					certificateType: "",
				},
			},
			timeInStart: [],
			timeOutStart: [],
			dialogFormVisible: false,
			checkoutObject: {},
		};
	},
	created() {
		setTimeout(() => {
			this.getRecords();
		}, 100);
	},
	methods: {
		_goBack() {
			// this.$router.push({ name: "setting" });
			this.$router.go(-1);
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

		tableRowClassName({ rowIndex }) {
			if (rowIndex % 2 == 0) {
				return "warning-row";
			} else if (rowIndex % 2 == 1) {
				return "success-row";
			}
			return "";
		},
		getRecords() {
			this.tableDataBoolean = true;
			Native.getRecords("", "", "", "", "", "", "", "")
				.then((resp) => {
					console.log(resp);
					this.tableDataBoolean = false;
					if (!resp.success) {
						console.log("getRecords错误", resp.msg);
						this.$message({ type: "warning", message: "查询记录失败" });
						return;
					}
					this.peopleList = [];
					let RecordsLenght = resp.body.records.length;
					for (let index = 0; index < RecordsLenght; index++) {
						let bigRecords = {};
						bigRecords.record = resp.body.records[index];
						bigRecords.staff = resp.body.staffs[index];
						bigRecords.visitor = resp.body.visitors[index];
						this.peopleList.push(bigRecords);
					}
					this.currentPageLength = this.peopleList.length; //数据总长
					this.newPeopleList = this.peopleList;
				})
				.catch((err) => {
					console.log(err, "getRecords错误");
				});
		},
		async parameter(event, type) {
			if (type == 2) {
				this.dialogFormVisible = false;
			}
			this.tableDataBoolean = true;
			if (this.timeInStart && this.timeInStart.length > 0) {
				event.record.timeIn = "Range|" + new Date(this.timeInStart[0]).toLocaleDateString() + "|" + new Date(this.timeInStart[1]).toLocaleDateString();
			} else {
				event.record.timeIn = "";
			}
			if (this.timeOutStart && this.timeOutStart.length > 0) {
				event.record.timeOut = "Range|" + new Date(this.timeOutStart[0]).toLocaleDateString() + "|" + new Date(this.timeOutStart[1]).toLocaleDateString();
			} else {
				event.record.timeOut = "";
			}
			Native.getRecordsByFullCondition(JSON.stringify(event.visitor), JSON.stringify(event.staff), JSON.stringify(event.record))
				.then((resp) => {
					console.log("getRecordsByFullCondition", resp);
					this.tableDataBoolean = false;
					if (!resp.success) {
						this.$message({ type: "warning", message: "查询失败" });
						return;
					}
					if (resp.body.records.length == 0) {
						this.$message({ type: "warning", message: "查无此人" });
						return;
					}
					this.peopleList = [];
					let RecordsLenght = resp.body.records.length;
					for (let index = 0; index < RecordsLenght; index++) {
						let bigRecords = {};
						bigRecords.record = resp.body.records[index];
						bigRecords.staff = resp.body.staffs[index];
						bigRecords.visitor = resp.body.visitors[index];
						this.peopleList.push(bigRecords);
					}
					this.currentPageLength = this.peopleList.length; //数据总长
					this.newPeopleList = this.peopleList;
					this.$message({ type: "success", message: `查询成功!为您查到${this.currentPageLength}条数据` });
				})
				.catch((err) => {
					console.log(err, "查询失败");
				});
		},
		//选中员工
		selectStaff(row, index) {
			console.log(row, index);
		},
		async handleHandInput() {
			let resp = await Native.handleHandInput(this.touchKeypadList.urlBoolen, this.touchKeypadList.url);
			console.log("手写键盘--", resp);
		},
		advancedQuery() {
			this.dialogFormVisible = true;
		},
		// 4-删除搜索结果，5-删除全部
		async queryDeleFuntion(type) {
			this.$prompt("", "请输入管理员密码", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				inputPattern: /[0-9a-zA-Z]/,
				inputErrorMessage: "密码不正确",
				closeOnClickModal:false,
			}).then((data) => {
				if (data.value != this.password) {
					this.$message({ type: "warning", message: "密码不正确" });
					return;
				}
				this.operation(type)
			});
			if (document.getElementsByClassName("el-input__inner").length == 1) {
				$(".el-input__inner")[0].setAttribute("type", "password");
				document.getElementsByClassName("el-input__inner")[0].setAttribute("data-mode", "num");
			} else if (document.getElementsByClassName("el-input__inner").length == 2) {
				$(".el-input__inner")[1].setAttribute("type", "password");
				document.getElementsByClassName("el-input__inner")[1].setAttribute("data-mode", "num");
			} else if (document.getElementsByClassName("el-input__inner").length == 5) {
				$(".el-input__inner")[4].setAttribute("type", "password");
				document.getElementsByClassName("el-input__inner")[4].setAttribute("data-mode", "num");
			} else if (document.getElementsByClassName("el-input__inner").length == 6) {
				$(".el-input__inner")[5].setAttribute("type", "password");
				document.getElementsByClassName("el-input__inner")[5].setAttribute("data-mode", "num");
			} else if (document.getElementsByClassName("el-input__inner").length == 9) {
				$(".el-input__inner")[8].setAttribute("type", "password");
				document.getElementsByClassName("el-input__inner")[8].setAttribute("data-mode", "num");
			} else if (document.getElementsByClassName("el-input__inner").length == 19) {
				$(".el-input__inner")[18].setAttribute("type", "password");
				document.getElementsByClassName("el-input__inner")[18].setAttribute("data-mode", "num");
			}
		},
		//操作按钮  0-签离搜索结果，1-签离全部，2-导出搜索结果，3-导出全部，4-删除搜索结果，5-删除全部
		async operation(type) {
			console.log(this.peopleList);
			let res = await Native.getRecordsByFullCondition("", "", "");
			if (type == 1 && type == 3 && type == 5) {
				if (res.success) {
					this.peopleList = [];
					let RecordsLenght = res.body.records.length;
					for (let index = 0; index < RecordsLenght; index++) {
						let bigRecords = {};
						bigRecords.record = res.body.records[index];
						bigRecords.staff = res.body.staffs[index];
						bigRecords.visitor = res.body.visitors[index];
						this.peopleList.push(bigRecords);
					}
					this.currentPageLength = this.peopleList.length; //数据总长
					this.newPeopleList = this.peopleList;
				} else {
					this.$message({ type: "warning", message: "查询全部记录失败" });
				}
			}
			switch (type) {
				case 0:
				case 1: {
					for (let index = 0; index < this.peopleList.length; index++) {
						if (this.peopleList[index].record.timeOut == "") {
							this.checkoutObject.id = this.peopleList[index].record.id;
							this.checkoutObject.timeOut = new Date().toLocaleString();
							let resp = await Native.checkOut(JSON.stringify(this.checkoutObject));
							if (resp.success) {
								this.checkoutObject = {};
								this.getRecords();
							} else {
								console.log("我失败了", index);
							}
						}
					}
					this.$message({ type: "success", message: "签离成功" });
					break;
				}
				case 2:
				case 3: {
					let exportList = [];
					for (let i = 0; i < this.peopleList.length; i++) {
						exportList.push(this.peopleList[i].record.id);
					}
					let exportExcel = await Native.exportRecords(exportList);
					if (exportExcel.success) {
						this.$message({ type: "success", message: "导出成功" });
					} else {
						this.$message({ type: "info", message: "导出失败" });
					}
					break;
				}
				case 4:
				case 5: {
					let deletesList = [];
					for (let i = 0; i < this.peopleList.length; i++) {
						deletesList.push(this.peopleList[i].record.id);
					}
					let deletes = await Native.deleteRecords(this.deletesList);
					if (deletes.success) {
						this.$message({ type: "success", message: "删除成功" });
					} else {
						this.$message({ type: "info", message: "删除失败" });
					}
					this.peopleList = []
					break;
				}

				default:
					console.log("按钮失效，请联系开发人员!");
					break;
			}
		},
	},
	computed: {
		...mapState(["touchKeypadList","password"]),
	},
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/query.scss";

.el-input__inner {
	border-radius: 30px !important;
}

.el-button {
	width: 150px;
	padding: 12px !important;
	border-radius: 30px !important;
}

/* 设置表主体的高度 */
::v-deep td {
	height: 37px !important;
}

.el-dialog__body {
	padding: 9px 16px !important;
	font-size: 17px !important;
}

.el-dialog {
	font-size: 30px;

	.el-form {
		display: flex;
		flex-direction: column;
		height: 200px;

		.el-row {
			.el-col {
				.el-button {
					width: 200px;

					::v-deep i {
						font-size: 25px;
					}

					::v-deep span {
						font-size: 25px;
					}
				}
			}
		}
	}
}
</style>
