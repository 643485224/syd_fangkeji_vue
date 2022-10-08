<template>
	<!-- <el-dialog title="" :visible.sync="detaiVisible" width="90%"> -->

	<div class="onsiteThree">
		<ul class="onsiteThree-main">
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
							<!-- <el-button type="primary" icon="el-icon-orange" v-if="disposesForm.miscellaneous.miscellaneous_temporary" @click="temporary(queryCriteria)">临时通行按钮</el-button> -->
						</el-col>
						<!-- <el-col :span="6" v-if="disposesForm.miscellaneous.miscellaneous_temporary">
						<el-button type="primary" icon="el-icon-orange" @click="temporary(queryCriteria)">临时通行按钮</el-button>
					</el-col> -->
					</el-row>
				</fieldset>
			</li>
			<li>
				<fieldset>
					<legend>搜索结果</legend>
					<el-pagination class="offline3_pagination" @size-change="handleSizeChange($event, 0)" @current-change="handleCurrentChange($event, 0)" :current-page="currentPage" :page-size="pageAmount" layout="total, prev, pager, next ,jumper" :total="currentPageLength" data-mode="num"> </el-pagination>
					<el-table class="offline3_table" :data="peopleList" height="100%" :row-class-name="tableRowClassName" v-loading="staffBoolean">
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
			</li>
		</ul>
		<div class="call_black flex-end">
			<div @click="_goBack()">
				<img src="../../assets/imgs/Rectangle 33.png" alt="" />
				<p class="flex-center-center">返回</p>
			</div>
			<div id="routerOnsite" style="">
				<P id="onsiteFouru">确认</P>
			</div>
		</div>
	</div>
	<!-- </el-dialog> -->
</template>
<script>
import { mapState } from "vuex";
// import Native from "../../API/native-api.js";
import APP from "../../webapi/modules/webapi.js";
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
			pageAmount: 8,
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
		...mapState(["httpform", "disposesForm"]),
	},
	created() {
		//this.voicePrompt("请您选择被访人");
		// this.registrationInformation = JSON.parse(JSON.stringify(this.$store.state.registrationInformation));
	},
	methods: {
		_goBack() {
			// 返回
			this.$router.push({ name: "onsiteTwo" });
            // this.$emit('okcood',false)
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
			webData.onsiteData.record.staffID = row.id;
			webData.onsiteData.staff.name = row.name;
			webData.onsiteData.staff.jobNumber = row.code;
			webData.onsiteData.staff.company = row.company;
			webData.onsiteData.staff.department = row.deptName;
			webData.onsiteData.staff.position = row.location;
			webData.onsiteData.staff.mobilePhone = row.phone;
			webData.onsiteData.staff.sex = row.sex;

			this.$router.push("/onsiteHome/onsiteFour"); //跳转确认访客信息页面
		},
		async queryStaff() {
			// 搜索被访人
			this.staffBoolean = true;
			//#region  测试使用-被访人
			// let resp = {
			// 	sessionId: 1,
			// 	sequence: 2,
			// 	result: true,
			// 	data: {
			// 		code: 200,
			// 		info: {
			// 			personList: [
			// 				{
			// 					id: 1,
			// 					name: "唐田",
			// 					phone: "",
			// 					sex: 1,
			// 					company: "贵阳市警备区",
			// 					deptName: "战备建设处",
			// 					deptId: 5201001,
			// 					code: "52010004",
			// 					location: "A11",
			// 				},
			// 			],
			// 		},
			// 	},
			// };
			//#endregion

			APP.getInterviewee(this.httpform, this.queryCriteria)
				.then((resp) => {
					console.log(resp);
					this.staffBoolean = false;
					if (resp.data.code !== 200) {
						this.$message({ type: "info", message: "获取员工数据失败" });
						return;
					}
					this.peopleList = resp.data.info.personList;
					this.currentPageLength = this.peopleList.length; //数据总长
					this.newPeopleList = this.peopleList;
					this.getTableData();
					this.$message({ type: "success", message: "获取员工数据成功" });
				})
				.catch((err) => {
					this.staffBoolean = false;
					console.log(err, "获取被访者失败");
				});
		},
	},
};
</script>
<script>
// export default {
//     name:"dialogComponent",
//     data(){
//         return{
//             tanchuangVim:false
//         }
//     },
//     methods:{
//         init(data){
//             this.tanchuangVim=true;
//             console.log(data);
//         }
//     }
// }
// var onsiteFouru=document.getElementById('onsiteFouru');
// onsiteFouru.onclick=function(){
//    this.$router.push("/onsiteHome/onsiteThree");
// }
</script>

<style lang="scss" scoped>
@import "../../assets/css/input.scss";

.onsiteThree {
	width: 100%;
	height: 100%;

	.onsiteThree-main {
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
			background-color: #e4e7ed;

			fieldset {
				height: 91%;
				padding: 10px;

				legend {
					padding-left: 15px;
				}
			}
		}
	}
}

//    export default{
//        name:"dialogCompoent",
//        data(){
//            return{
//                detaiVisible:false
//            }
//        },
//        methods:{
//            init(data){
//                this.detaiVisible=true;
//            }
//        }
//    }
</style>
