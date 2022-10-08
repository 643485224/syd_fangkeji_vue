<template>
	<div class="apponintmentTwo">
		<div class="apponintmentTwo-main">
			<fieldset>
				<legend>查询被访人</legend>
				<el-row :gutter="24">
					<el-col :span="6">
						<span>姓名：</span>
						<input type="text" style="width:70%;height:25px;" v-model="queryCriteria.name" data-mode="cn" />
					</el-col>
					<el-col :span="7">
						<span> 手机：</span>
						<input type="text" style="width:70%;height:25px;" v-model="queryCriteria.phone" data-mode="num" />
					</el-col>
					<el-col :span="6">
						<span> 工号：</span>
						<input type="text" style="width:70%;height:25px;" v-model="queryCriteria.jobNumber" data-mode="num" />
					</el-col>
					<el-col :span="5">
						<el-button type="primary" icon="el-icon-search" @click="queryStaff(queryCriteria)">搜索被访人</el-button>
					</el-col>
				</el-row>
			</fieldset>
			<fieldset>
				<legend>搜索结果</legend>
				<el-pagination class="offline3_pagination" @size-change="handleSizeChange($event, 0)" @current-change="handleCurrentChange($event, 0)" :current-page="currentPage" :page-size="pageAmount" layout="total, prev, pager, next ,jumper" :total="currentPageLength" data-mode="num"> </el-pagination>
				<el-table class="offline3_table" :data="peopleList" style="width: 100%;border-radius: 10px;" height="90%" :row-class-name="tableRowClassName" v-loading="staffBoolean">
					<el-table-column prop="code" label="工号" align="center" width="180"> </el-table-column>
					<el-table-column prop="name" label="姓名" align="center" width="180"> </el-table-column>
					<el-table-column prop="sex" label="性别" align="center" width="150">
						<template slot-scope="scope">{{ scope.row.sex === 1 ? "男" : scope.row.sex === 2 ? "女" : "未知" }}</template>
					</el-table-column>
					<el-table-column prop="phone" label="联系方式" align="center" width="220"> </el-table-column>
					<el-table-column prop="company" label="公司" align="center" width="220"> </el-table-column>
					<el-table-column prop="deptName" label="部门" align="center" width="230"> </el-table-column>
					<el-table-column prop="location" label="位置" align="center" width="230"> </el-table-column>
					<el-table-column fixed="right" label="操作" align="center" width="200">
						<template slot-scope="scope">
							<!-- <el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click="selectStaff(scope.row, scope.$index)" icon="el-icon-check" circle></el-button> -->
							<el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click="handle(scope.row, scope.$index)">选择被访人</el-button>
						</template>
					</el-table-column>
				</el-table>
			</fieldset>
		</div>
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
// import Native from "../../API/native-api.js";
import webData from "../../utils/shuJu";
import APP from "../../webapi/modules/webapi.js";
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
			pageAmount: 5,
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
	computed: {
		...mapState(["httpform"]), //结构 vuex里的值
	},
	created() {
		//this.voicePrompt("请您选择被访人");
	},
	methods: {
		_goBack() {
			// 返回
			this.$router.push({ name: "appointmentOne" });
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
		handle(row) {
			console.log(row);
			// this.registrationInformation.record.staffID = row.id;
			// this.registrationInformation.staff.name = row.name;
			// this.registrationInformation.staff.company = row.company;
			// this.registrationInformation.staff.position = row.location;
			// this.registrationInformation.staff.department = row.department;
			// this.registrationInformation.staff.mobilePhone = row.phone;
			// this.registrationInformation.staff.officePhone = row.phone;
			// this.registrationInformation.staff.sex = row.sex;
			webData.onsiteData.record.staffID = row.id;
			webData.onsiteData.staff.name = row.name;
			webData.onsiteData.staff.jobNumber = row.code;
			webData.onsiteData.staff.company = row.company;
			webData.onsiteData.staff.department = row.deptName;
			webData.onsiteData.staff.position = row.location;
			webData.onsiteData.staff.mobilePhone = row.phone;
			webData.onsiteData.staff.sex = row.sex;
			this.$store.commit("newRegistrant", this.registrationInformation);
			this.$router.push("/appointment/appointmentThree");// 跳转确认登记信息页面
		},
		async queryStaff(data) {
			this.staffBoolean = true;

			APP.getInterviewee(this.httpform, data).then((resp) => {
				console.log(resp);
				if (resp.data.code == 200) {
					this.peopleList = resp.data.info.personList;
					this.currentPageLength = this.peopleList.length; //数据总长
					this.newPeopleList = this.peopleList;  //新数据
					this.getTableData();
					this.$message({ type: "success", message: "获取员工数据成功" });
				} else {
					this.$message({ type: "info", message: "获取员工数据失败" });
					return;
				}
			});
			this.staffBoolean = false;
		},
	},
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/input.scss";

.apponintmentTwo {
	width: 100%;
	height: 100%;

	.apponintmentTwo-head {
		width: 100%;
		height: 7%;
		background-color: white;
		ul {
			display: flex;
			justify-content: space-between;
			align-items: center; /*垂直居中*/
			width: 100%;
			height: 100%;
			font-size: 2rem;
			color: blue;
			li {
				height: 54px;
				text-align: justify;
				line-height: 54px;
			}
			li:nth-child(1) {
				width: 10%;
				text-align: center;
			}
			li:nth-child(2) {
				width: 60%;
				p {
					font-weight: bold;
				}
			}
			li:nth-child(3) {
				width: 30%;
				p {
					font-size: 18px;
					font-weight: bold;
				}
			}
		}
	}
	.apponintmentTwo-main {
		width: 100%;
		height: 95%;
		padding: 10px;
		box-sizing: border-box;
		font-size: 19px;
		font-weight: bold;
		fieldset:nth-child(1) {
			position: relative;
			height: 15%;
			padding: 25px;
			background-color: #fff;
			border: 0;
			border-radius: 10px;
			font-size: 22px;
			box-sizing: border-box;

			legend {
				color: #ff5301;
			}
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
		fieldset:nth-child(2) {
			min-width: 100%;
			max-width: 100%;
			height: 89%;
			margin-top: 1rem;
			padding: 10px;
			background-color: #e4e7ed;

			border: 0;
			border-radius: 10px;
			font-size: 22px;
			box-sizing: border-box;
			legend {
				// background: azure;
				color: #ff5301;
				padding: 6px;
			}
			// .el-pagination {
			// 	float: right;
			// }
			// .el-table {
			// 	font-size: 30px;
			// 	line-height: 60px;
			// 	color: black;
			// 	.cell {
			// 		line-height: 60px;
			// 	}
			// 	.el-button {
			// 		font-size: 20px;
			// 	}
			// }
		}
	}
	.apponintmentTwo-foot {
		position: absolute;
		bottom: 10px;
		right: 10px;
		display: flex;
		justify-content: space-between;
		div:nth-child(1) {
			position: relative;
			p {
				position: absolute;
				top: 6px;
				left: 60px;
				font-family: Source Han Sans CN;
				font-style: normal;
				font-weight: bold;
				font-size: 36px;
				line-height: 54px;
				text-align: center;
				color: #ffffff;
			}
		}
	}
}
</style>
