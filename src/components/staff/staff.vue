<template>
	<div class="offlineThree">
		<ul class="offlineThree-main">
			<li>
				<fieldset>
					<legend>查询被访人</legend>
					<el-row :gutter="24">
						<el-col :span="6">
							<span :class="disposesForm.staff.staff_name ? 'danger' : 'security'">姓名：</span>
							<input type="text" v-model="queryCriteria.name" data-mode="cn" />
						</el-col>
						<el-col :span="6">
							<span :class="disposesForm.staff.staff_mobilePhone ? 'danger' : 'security'"> 手机：</span>
							<input type="text" v-model="queryCriteria.phone" data-mode="num" />
						</el-col>
						<el-col :span="6" v-if="!disposesForm.miscellaneous.miscellaneous_temporary">
							<span> 工号：</span>
							<input type="text" v-model="queryCriteria.jobNumber" data-mode="num" />
						</el-col>
						<el-col :span="6">
							<el-button type="primary" icon="el-icon-search" @click="queryStaff">搜索被访人</el-button>
							<el-button type="primary" icon="el-icon-orange"
								v-if="disposesForm.miscellaneous.miscellaneous_temporary"
								@click="temporary(queryCriteria)">临时通行按钮</el-button>
						</el-col>
						<el-col :span="6" v-if="disposesForm.miscellaneous.miscellaneous_temporary"> </el-col>
					</el-row>
					<p>注:脱机模式请先导入被访人信息表</p>
				</fieldset>
			</li>

			<li>
				<fieldset>
					<legend>搜索结果</legend>
					<el-pagination class="offline3_pagination" @size-change="handleSizeChange"
						@current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageAmount"
						layout=" total, prev, pager, next,jumper " :total="currentPageLength" data-mode="num">
					</el-pagination>
					<div class="table-wrapper">
						<el-table class="offline3_table" :data="peopleList" height="100%" white-space:nowrap
						:row-class-name="tableRowClassName" v-loading="staffBoolean">
						<el-table-column label="姓名" min-width="8%" prop="name"> </el-table-column>
						<el-table-column label="性别" min-width="8%" prop="sex"> </el-table-column>
						<el-table-column label="工号" min-width="8%" prop="jobNumber"> </el-table-column>
						<el-table-column label="办公电话" min-width="15%" prop="officePhone"> </el-table-column>
						<el-table-column label="移动电话" min-width="15%" prop="mobilePhone"> </el-table-column>
						<el-table-column label="公司" min-width="20%" prop="company"> </el-table-column>
						<el-table-column label="部门" min-width="13%" prop="department"> </el-table-column>
						<el-table-column label="位置" min-width="13%" prop="position"> </el-table-column>
						<el-table-column fixed="right" label="选择被访人" align="center" width="180">
							<template slot-scope="scope">
								<el-button v-if="!scope.row.isEgdit" icon="el-icon-check" type="primary" size="small"
									@click="handle(scope.row, scope.$index)">选择被访人</el-button>
							</template>
						</el-table-column>
					</el-table>
					</div>
					
				</fieldset>
			</li>
		</ul>
	</div>
</template>
<script>
import { mapState } from "vuex";
import Native from "../../API/native-api.js";
import webData from "../../utils/shuJu";
export default {
	data() {
		return {
			queryCriteria: {
				name: "",
				phone: "",
				jobNumber: "",
			},
			staffBoolean: false, //被访人信息表分页参数
			peopleList: [],
			newPeopleList: [],
			currentPageLength: 0,
			pageAmount: 10,
			currentPage: 1,
			staff: {},
			registrationInformation: {
				visitor: {
					name: "", //姓名
					sex: "", //性别
					folk: "", //民族
					birth: "", //拼接年月日
					address: "", //家庭住址
					email: "",
					idCard: "", //身份证证件号码
					passport: "", //护照证件号码
					driverLicense: "", //驾照证件号码
					phone: "", //联系电话
					company: "", //访客单位
					sexNumber: "", //性别数字 男1  女2
					idNumber: "",
				},
				staff: {
					jobNumber: "",
					name: "", //姓名
					sex: "", //性别
					email: "",
					officePhone: "", //办公电话
					mobilePhone: "", //移动电话
					company: "", //被访公司
					department: "", //被访部门科室
					position: "", //被访办公地点
				},
				record: {
					timeIn: new Date().toLocaleString(),
					timeOut: "",
					deviceID: "", //设备ID
					staffID: "",
					licensePlate: "", //车牌号码
					brings: "", //携带物品
					purpose: "拜访", //来访事由
					certificateType: "", //证件类型
					certificatePhoto: "", //证件照
					certificateHeadPhoto: "", //证件头像
					visitorPhoto: "", //捕抓照
					visitorHeadPhoto: "", //捕抓照头像
				},
			},
		};
	},
	created() {
		// console.log(webData.offlineData, "webData.offlineData"); //
		// console.log(this.$route.params.data, "上个页面的值22");
		// this.registrationInformation = this.$route.params.data;
		// console.log(webData.offlineData, "offline3的内容");
		this.speak();
	},
	methods: {
		speak() {
			Native.speakStop();
			Native.speak("请您选择对应的被访人员");
		},
		_goBack() {
			this.$router.push({ name: "offlineTwo" });
		},
		tableRowClassName({ rowIndex }) {
			if (rowIndex % 2 == 0) {
				return "warning-row";
			} else if (rowIndex % 2 == 1) {
				return "success-row";
			}
		},
		handleSizeChange(val) {
			this.pageAmount = val;
			this.getTableData();
		},
		handleCurrentChange(page) {
			this.currentPage = page;
			this.getTableData();
		},
		getTableData() {
			this.peopleList = this.newPeopleList.slice((this.currentPage - 1) * this.pageAmount, this.currentPage * this.pageAmount);
		},
		handle(row, index) {
			console.log(row, index);

			webData.offlineData.record.staffID = row.id;
			webData.offlineData.staff.company = row.company;
			webData.offlineData.staff.jobNumber = row.jobNumber;
			webData.offlineData.staff.department = row.department;
			webData.offlineData.staff.email = row.email;
			webData.offlineData.staff.mobilePhone = row.mobilePhone;
			webData.offlineData.staff.name = row.name;
			webData.offlineData.staff.officePhone = row.officePhone;
			webData.offlineData.staff.position = row.position;
			webData.offlineData.staff.sex = row.sex;
			this.$emit("dialogClose")
		},
		async queryStaff() {
			this.staffBoolean = true;
			let res = await Native.getStaffs(this.queryCriteria.jobNumber, this.queryCriteria.name, "", this.queryCriteria.phone, "", "");
			console.log(res);
			if (res.success) {
				this.peopleList = res.body.list;
				this.currentPageLength = this.peopleList.length;
				this.newPeopleList = this.peopleList;
				this.staffBoolean = false;
				if (this.currentPageLength == 0) {
					this.$message({ type: "warning", message: "查无此人" });
				} else {
					this.$message({ type: "success", message: `查询成功，为您查到${this.currentPageLength}条数据` });
					this.getTableData();
				}
			} else {
				this.$message({ type: "info", message: "查询失败" });
			}
			this.staffBoolean = false;
		},
		temporary(item) {
			if (!item.name) {
				this.$message({ type: "warning", message: "请填写姓名" });
				return;
			}
			if (!item.phone) {
				this.$message({ type: "warning", message: "请填写手机号" });
				return;
			} else {
				let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(item.phone)) {
					this.$message({ type: "warning", message: "请填写正确的手机号!" });
					return;
				}
			}
			// this.registrationInformation.staff.name = item.name;
			// this.registrationInformation.staff.mobilePhone = item.phone;
			webData.offlineData.staff.name = item.name;
			webData.offlineData.staff.mobilePhone = item.phone;

			this.$store.commit("newRegistrant", this.registrationInformation);
			this.$router.push({ name: "offlineFour", query: { data: this.registrationInformation } });
		},
	},
	destroyed() {
		//Native.speakStop();
	},
	computed: {
		...mapState(["disposesForm"]),
	},
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/input.scss";

.danger {
	color: #ff0000;
}

.security {
	color: #4f4ff5;
}

.offlineThree {
	width: 100%;
	height: 100%;

	.offlineThree-main {
		width: 100%;
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
		font-size: 19px;
		font-weight: bold;

		li {
			font-size: 22px;
			background-color: #fff;
			border-radius: 10px;

			fieldset {
				border: 0;
				box-sizing: border-box;

				legend {
					color: #ff5301;
				}
			}
		}

		li:nth-child(1) {
			height: 15%;
			margin-bottom: 1rem;

			fieldset {
				position: relative;
				padding: 25px;

				p {
					position: absolute;
					bottom: 0px;
					right: 10px;
					font-size: 18px;
					color: red;
				}

				.el-row {
					.el-col:nth-child(3) {
						.el-button {
							::v-deep i {
								font-size: 25px;
							}

							::v-deep span {
								font-size: 25px;
							}
						}
					}

					.el-col:nth-child(4) {
						.el-button {
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

		li:nth-child(2) {
			height: 84%;
			// background-color: #e4e7ed;

			fieldset {
				height: 91%;
				padding: 10px;

				legend {
					padding-left: 15px;
				}
			}
		}

		.offline3_pagination {
			margin-left: 10px;
		}
		.table-wrapper {
			position: relative;
			height: 100%;
		}
		.offline3_table {
			position: absolute;
			width: 100% !important;
			font-size: 20px;

		}

		.el-table__body {
			width: 100%;
		}
	}
}
</style>
