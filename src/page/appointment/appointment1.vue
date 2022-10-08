<template>
	<div class="apponintmentOne">
		<div class="apponintmentOne-main">
			<fieldset>
				<legend>完善访客信息</legend>

				<el-row :gutter="24">
					<el-col :span="6">
						<span :class="disposesForm.visitor.visitor_name ? 'danger' : 'security'">访客姓名：</span>
						<input type="text" maxlength="15" v-model="registrationInformation.visitor.name" data-mode="cn" />
					</el-col>
					<el-col :span="6">
						<span :class="disposesForm.visitor.visitor_sex ? 'danger' : 'security'"> 访客性别：</span>
						<select name="" v-model="registrationInformation.visitor.sex">
							<option value="男">男</option>
							<option value="女">女</option>
							<option value="未知">未知</option>
						</select>
					</el-col>
					<el-col :span="6">
						<span :class="disposesForm.visitor.visitor_folk ? 'danger' : 'security'"> 访客民族：</span>
						<input type="text" maxlength="10" v-model="registrationInformation.visitor.folk" />
					</el-col>
					<el-col :span="6">
						<span :class="disposesForm.visitor.visitor_idNumber ? 'danger' : 'security'">证件号码：</span>
						<input type="text" maxlength="18" v-model="registrationInformation.visitor.idNumber" data-mode="num" />
					</el-col>
				</el-row>
				<el-row :gutter="24">
					<el-col :span="6">
						<span :class="disposesForm.visitor.visitor_phone ? 'danger' : 'security'">联系电话：</span>
						<input type="text" maxlength="11" v-model="registrationInformation.visitor.phone" data-mode="num" />
					</el-col>
					<el-col :span="6">
						<span :class="disposesForm.visitor.visitor_purpose ? 'danger' : 'security'">来访事由：</span>
						<select name="" v-model="registrationInformation.record.purpose">
							<option value="面试">面试</option>
							<option value="拜访">拜访</option>
							<option value="参观">参观</option>
						</select>
					</el-col>
					<el-col :span="6">
						<span :class="disposesForm.visitor.visitor_company ? 'danger' : 'security'">访客单位：</span>
						<input type="text" maxlength="50" v-model="registrationInformation.visitor.company" data-mode="cn" />
					</el-col>

					<el-col :span="6">
						<span :class="disposesForm.visitor.visitor_licensePlate ? 'danger' : 'security'">车牌号码：</span>
						<input type="text" maxlength="20" v-model="registrationInformation.record.licensePlate" data-mode="cn" />
					</el-col>
				</el-row>
				<el-row :gutter="24">
					<el-col :span="6">
						<span :class="disposesForm.visitor.visitor_carryItems ? 'danger' : 'security'">携带物品：</span>
						<input type="text" maxlength="50" v-model="registrationInformation.record.brings" data-mode="cn" />
					</el-col>
				</el-row>
			</fieldset>
			<fieldset>
				<legend>证件头像</legend>
				<el-row :gutter="24">
					<el-col :span="8">
						<div class="flex-center-center">
							<span>证件照</span>
							<img :src="'data:image/png;base64,' + registrationInformation.record.certificatePhoto" :style="registrationInformation.record.certificatePhoto == '' ? 'display:none;' : registrationInformation.record.certificatePhoto == undefined ? 'display:none;' : ''" alt="" />
						</div>
					</el-col>
					<el-col :span="8">
						<div class="flex-center-center">
							<span>证件头像照</span>
							<img :src="'data:image/png;base64,' + registrationInformation.record.certificateHeadPhoto" :style="registrationInformation.record.certificateHeadPhoto == '' ? 'display:none;' : registrationInformation.record.certificateHeadPhoto == undefined ? 'display:none;' : ''" alt="" />
						</div>
					</el-col>
				</el-row>
			</fieldset>
		</div>
		<div class="apponintmentOne_foot">
			<div @click="goBack()">
				<img src="../../assets/imgs/Rectangle 33.png" alt="" />
				<p>返回</p>
			</div>
			<div @click="onOK(registrationInformation)">
				<img src="../../assets/imgs/Rectangle 33.png" alt="" />
				<p>下一步</p>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
import webData from "../../utils/shuJu";

export default {
	data() {
		return {
			visitor: {
				name: "",
				sex: "",
				folk: "",
				idCard: "",
				phone: "",
				purpose: "",
				licensePlate: "",
				company: "",
				photoHead: "",
			},
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
		// this.registrationInformation = JSON.parse(JSON.stringify(this.$store.state.registrationInformation));
		// console.log(this.registrationInformation);
		//this.voicePrompt("请您完善登记信息，红色为必填项，蓝色为非必填项");
		this.verification();
	},
	methods: {
		goBack() {
			// 返回
			this.$router.push({ name: "appointment" });
		},
		verification() {
			this.registrationInformation = JSON.parse(JSON.stringify(webData.onsiteData));
			console.log(this.registrationInformation);
		},
		onOK(item) {
			if (this.disposesForm.visitor.visitor_name) {
				if (!item.visitor.name) {
					this.$message({ type: "warning", message: "请填写您的姓名!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_sex) {
				if (!item.visitor.sex) {
					this.$message({ type: "warning", message: "请填写您的性别!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_folk) {
				if (!item.visitor.folk) {
					this.$message({ type: "warning", message: "请填写您的民族!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_phone) {
				if (!item.visitor.phone) {
					this.$message({ type: "warning", message: "请填写您的手机号!" });
				} else {
					let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
					if (!myreg.test(item.visitor.phone)) {
						this.$message({ type: "warning", message: "请填写正确的手机号!" });
						return;
					}
				}
			}
			if (this.disposesForm.visitor.visitor_purpose) {
				if (!item.record.purpose) {
					this.$message({ type: "warning", message: "请填写您的来访事由!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_idNumber) {
				if (!item.visitor.idNumber) {
					this.$message({ type: "warning", message: "请填写您的证件号码!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_company) {
				if (!item.visitor.company) {
					this.$message({ type: "warning", message: "请填写访客单位!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_licensePlate) {
				if (!item.record.licensePlate) {
					this.$message({ type: "warning", message: "请填写您的车牌号码!" });
					return;
				}
			}
			this.$store.commit("newRegistrant", this.registrationInformation);
			this.$router.push("/appointment/appointmentTwo"); // 跳转选择被访人页面
		},
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
select {
	text-align: center;
}
.apponintmentOne {
	width: 100%;
	height: 100%;

	.apponintmentOne-head {
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

	.apponintmentOne-main {
		width: 100%;
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
		font-size: 19px;
		font-weight: bold;
		fieldset {
			height: 30%;
			padding: 10px;
			background-color: azure;
			legend {
				background: azure;
				color: #ff5301;
				padding: 6px;
			}
			.el-row {
				margin-bottom: 1rem;
			}
		}
		fieldset:nth-child(2) {
			height: 50%;
			.el-row {
				height: 100%;
				.el-col {
					height: 90%;
					display: flex;
					justify-content: center;
					div {
						position: relative;
						width: 100%;
						span {
							position: absolute;
							top: 0%;
							left: 0%;
						}
						img {
							width: 80%;
							object-fit: contain;
						}
					}
				}
				.el-col:nth-child(2) {
					border-left: 1px solid #ff5301;
					border-right: 1px solid #ff5301;

					img {
						width: 50%;
					}
				}
			}
		}
	}
	.apponintmentOne_foot {
		position: absolute;
		bottom: 10px;
		right: 0px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0px 130px;
		box-sizing: border-box;
		div:nth-child(1) {
			position: relative;
			p {
				position: absolute;
				top: 10%;
				// left: 20%;
				width: 100%;
				font-family: Source Han Sans CN;
				font-style: normal;
				font-weight: bold;
				font-size: 36px;
				line-height: 54px;
				text-align: center;
				color: #ffffff;
			}
		}
		div:nth-child(2) {
			position: relative;
			p {
				position: absolute;
				top: 10%;
				// left: 20%;
				width: 100%;
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
