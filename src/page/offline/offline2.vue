<template>
	<div class="offlineTwo">
		<div class="offlineTwo-main">
			<ul>
				<li>
					<fieldset>
						<legend>完善访客信息</legend>

						<el-row :gutter="24">
							<el-col :span="6">
								<span :class="disposesForm.visitor.visitor_name ? 'danger' : 'security'">访客姓名：</span>
								<input type="text" maxlength="15" v-model="registrationInformation.visitor.name"
									data-mode="cn" />
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
								<span
									:class="disposesForm.visitor.visitor_idNumber ? 'danger' : 'security'">证件号码：</span>
								<input type="text" maxlength="18" v-model="registrationInformation.visitor.idNumber"
									data-mode="num" />
							</el-col>
						</el-row>
						<el-row :gutter="24">
							<el-col :span="6">
								<span :class="disposesForm.visitor.visitor_phone ? 'danger' : 'security'">联系电话：</span>
								<input type="text" maxlength="11" v-model="registrationInformation.visitor.phone"
									data-mode="num" />
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
								<input type="text" maxlength="50" v-model="registrationInformation.visitor.company"
									data-mode="cn" />
							</el-col>

							<el-col :span="6">
								<span
									:class="disposesForm.visitor.visitor_licensePlate ? 'danger' : 'security'">车牌号码：</span>
								<input type="text" maxlength="20" v-model="registrationInformation.record.licensePlate"
									data-mode="cn" />
							</el-col>
						</el-row>
						<el-row :gutter="24">
							<el-col :span="6">
								<span
									:class="disposesForm.visitor.visitor_carryItems ? 'danger' : 'security'">携带物品：</span>
								<input type="text" maxlength="50" v-model="registrationInformation.record.brings"
									data-mode="cn" />
							</el-col>
						</el-row>
					</fieldset>
				</li>
				<li class="image-li">
					<fieldset class="image-info">
						<legend>证件头像</legend>
						<el-row :gutter="24">
							<el-col :span="8">
								<div class="flex-center-center">
									<span>证件照</span>
									<img :src="'data:image/png;base64,' + registrationInformation.record.certificatePhoto"
										:style="registrationInformation.record.certificatePhoto == '' ? 'display:none;' : registrationInformation.record.certificatePhoto == undefined ? 'display:none;' : ''"
										alt="" />
								</div>
							</el-col>
							<el-col :span="8">
								<div class="flex-center-center">
									<span>证件头像照</span>
									<img :src="'data:image/png;base64,' + registrationInformation.record.certificateHeadPhoto"
										:style="registrationInformation.record.certificateHeadPhoto == '' ? 'display:none;' : registrationInformation.record.certificateHeadPhoto == undefined ? 'display:none;' : ''"
										alt="" />
								</div>
							</el-col>
						</el-row>
					</fieldset>
				</li>
			</ul>
		</div>
		<div class="offlineTwo-foot">
			<div @click="goBack()" class="footer-btn">
				<!-- <img class="btn-img" src="../../assets/imgs/Rectangle 33.png" alt="" /> -->
				<p class="btn-text">返回</p>
			</div>
			<div class="footer-btn">
				<div @click="onOK(registrationInformation)">
					<!-- <img class="btn-img" src="../../assets/imgs/Rectangle 33.png" alt="" /> -->
					<p class="btn-text">选择被访人</p>
				</div>
			</div>
		</div>
		<el-dialog title="选择被访人"   :visible.sync="dialogFormVisible">
			<div class="staff-dialog">
				<dialogComponent @dialogClose="dialogClose()"></dialogComponent>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import { mapState } from "vuex";
// import simulate from "../../utils/prototype";
// import { validate } from "../../utils/index";
import webData from "../../utils/shuJu";
import Native from "../../API/native-api.js";
import dialogComponent from "../../components/staff/staff";

export default {
	components: {
		dialogComponent,
	},
	data() {
		return {
			registrationInformation: {
				visitor: {
					name: null, //姓名
					sex: "未知", //性别
					folk: null, //民族
					birth: null, //拼接年月日
					address: null, //家庭住址
					email: null,
					idCard: null, //身份证证件号码
					passport: null, //护照证件号码
					driverLicense: null, //驾照证件号码
					phone: null, //联系电话
					company: null, //访客单位
					sexNumber: null, //性别数字 男1  女2
					idNumber: null,
				},
				staff: {
					jobNumber: null,
					name: null, //姓名
					sex: null, //性别
					email: null,
					officePhone: null, //办公电话
					mobilePhone: null, //移动电话
					company: null, //被访公司
					department: null, //被访部门科室
					position: null, //被访办公地点
				},
				record: {
					timeIn: new Date().toLocaleString(),
					timeOut: null,
					deviceID: null, //设备ID
					staffID: null,
					licensePlate: null, //车牌号码
					brings: null, //携带物品
					purpose: "拜访", //来访事由
					certificateType: null, //证件类型
					certificatePhoto: null, //证件照
					certificateHeadPhoto: null, //证件头像
					visitorPhoto: null, //捕抓照
					visitorHeadPhoto: null, //捕抓照头像
				},
			},
			dialogFormVisible: false,
		};
	},
	computed: {
		// staff:() => webData.offlineData.staff,
		// record:() => webData.offlineData.record
	},
	mounted() {
		if (this.$route.params.value == undefined) {
			this.registrationInformation.visitor.name = webData.offlineData.visitor.name;
			this.registrationInformation.record.brings = webData.offlineData.record.brings;
			this.registrationInformation.record.licensePlate = webData.offlineData.record.licensePlate;
			this.registrationInformation.record.purpose = webData.offlineData.record.purpose;
			this.registrationInformation.visitor.address = webData.offlineData.visitor.address;
			this.registrationInformation.visitor.company = webData.offlineData.visitor.company;
			this.registrationInformation.visitor.folk = webData.offlineData.visitor.folk;
			this.registrationInformation.visitor.idNumber = webData.offlineData.visitor.idNumber;
			this.registrationInformation.visitor.phone = webData.offlineData.visitor.phone;
			this.registrationInformation.visitor.sex = webData.offlineData.visitor.sex;

			this.registrationInformation.record.certificatePhoto = webData.offlineData.record.certificatePhoto;
			this.registrationInformation.record.certificateHeadPhoto = webData.offlineData.record.certificateHeadPhoto;
		}
	},
	created() {
		this.speak();
		//0-身份证；1-驾驶证；2-护照;5-刷身份跳转
		this.onPageVal(this.$route.params.key, this.$route.params.value);
		console.log(webData.offlineData, "offline2的内容");
	},
	methods: {
		speak() {
			Native.speakStop();
			Native.speak("请您完善登记信息，红色为必填项，蓝色为非必填项。");
		},
		onPageVal(type, data) {
			console.log(type, data);
			if (type == 0) {
				console.log("一代");
				this.registrationInformation.visitor.name = data.Name;
				this.registrationInformation.visitor.sex = data.Sex;
				this.registrationInformation.visitor.folk = data.Folk;
				this.registrationInformation.visitor.idNumber = data.CardNo;
				this.registrationInformation.visitor.idCard = this.registrationInformation.visitor.idNumber;
				this.registrationInformation.visitor.birth = data.Birthday;
				this.registrationInformation.visitor.address = data.Address;
				this.registrationInformation.record.certificateHeadPhoto = data.OcrHead;
				this.registrationInformation.record.certificatePhoto = webData.offlineData.record.certificatePhoto;

				webData.offlineData.visitor.idCard = this.registrationInformation.visitor.idNumber;
				webData.offlineData.record.certificateType = "一代身份证";
			} else if (type == 1) {
				console.log("驾驶证");
				this.registrationInformation.visitor.name = data.Name;
				this.registrationInformation.visitor.sex = data.Sex;
				this.registrationInformation.visitor.idNumber = data.CardNo;
				this.registrationInformation.visitor.driverLicense = this.registrationInformation.visitor.idNumber;
				this.registrationInformation.visitor.birth = data.Birthday;
				this.registrationInformation.visitor.address = data.Address;
				this.registrationInformation.record.certificateHeadPhoto = data.OcrHead;
				this.registrationInformation.record.certificatePhoto = webData.offlineData.record.certificatePhoto;

				webData.offlineData.visitor.driverLicense = this.registrationInformation.visitor.idNumber;
				webData.offlineData.record.certificateType = "驾驶证";
			} else if (type == 2) {
				console.log("护照");
				this.registrationInformation.visitor.name = data.NameCh;
				this.registrationInformation.visitor.sex = data.SexCH;
				this.registrationInformation.visitor.folk = data.Nation;
				this.registrationInformation.visitor.idNumber = data.CardNo;
				this.registrationInformation.visitor.passport = this.registrationInformation.visitor.idNumber;
				this.registrationInformation.visitor.birth = data.Birthday;
				this.registrationInformation.visitor.address = data.AddressCH;
				this.registrationInformation.record.certificateHeadPhoto = data.OcrHead;
				this.registrationInformation.record.certificatePhoto = webData.offlineData.record.certificatePhoto;

				webData.offlineData.visitor.passport = this.registrationInformation.visitor.idNumber;
				webData.offlineData.record.certificateType = "护照";
			} else if (type == -1) {
				console.log("其他证件");
				this.registrationInformation.record.certificatePhoto = webData.offlineData.record.certificatePhoto;

				webData.offlineData.record.certificateType = "其他证件";
			} else if (type == 5) {
				console.log("二代身份证");

				this.registrationInformation.visitor.name = data.name;
				this.registrationInformation.visitor.sex = data.sex;
				this.registrationInformation.visitor.sexNumber = data.sexNumber;
				this.registrationInformation.visitor.folk = data.folk;
				this.registrationInformation.visitor.birth = data.birthYear + "年" + data.birthMonth + "月" + data.birthDay + "日";
				this.registrationInformation.visitor.address = data.address;
				this.registrationInformation.visitor.idNumber = data.code;
				this.registrationInformation.visitor.idCard = this.registrationInformation.visitor.idNumber;
				this.registrationInformation.record.certificateHeadPhoto = data.photo;
				this.registrationInformation.record.certificatePhoto = webData.offlineData.record.certificatePhoto;

				webData.offlineData.visitor.idCard = this.registrationInformation.visitor.idNumber;
				webData.offlineData.record.certificateType = "二代身份证";
			}
		},
		showDialog() {
			this.dialogFormVisible = true;
		},
		onOK(item) {
			if (this.disposesForm.visitor.visitor_name) {
				if (!item.visitor.name) {
					this.$message({ type: "warning", message: "请填写您的姓名!" });
					return;
				} else if (item.visitor.name.length > 10) {
					this.$message({ type: "warning", message: "姓名最大长度为10!" });
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
				} else if (item.visitor.name.folk > 10) {
					this.$message({ type: "warning", message: "民族最大长度为10!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_phone) {
				if (!item.visitor.phone) {
					this.$message({ type: "warning", message: "请填写您的手机号!" });
				} else if (item.visitor.phone.length > 11) {
					this.$message({ type: "warning", message: "手机号最大长度为11!" });
					return;
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
				} else {
					let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					if (!reg.test(item.visitor.idNumber)) {
						this.$message({ type: "warning", message: "请填写正确的证件号码!" });
						return;
					}
				}
			}
			if (this.disposesForm.visitor.visitor_company) {
				if (!item.visitor.company) {
					this.$message({ type: "warning", message: "请填写访客单位!" });
					return;
				} else if (item.visitor.name.length > 50) {
					this.$message({ type: "warning", message: "访客单位最大长度为50!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_licensePlate) {
				if (!item.record.licensePlate) {
					this.$message({ type: "warning", message: "请填写您的车牌号码!" });
					return;
				} else if (item.visitor.name.length > 10) {
					this.$message({ type: "warning", message: "车牌号码最大长度为10!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_carryItems) {
				if (!item.record.brings) {
					this.$message({ type: "warning", message: "请填写您的携带物品!" });
					return;
				} else if (item.record.brings.length > 50) {
					this.$message({ type: "warning", message: "携带物品最大长度为50!" });
					return;
				}
			}
			console.log(item);
			webData.offlineData.visitor.name = item.visitor.name;
			webData.offlineData.record.brings = item.record.brings;
			webData.offlineData.record.licensePlate = item.record.licensePlate;
			webData.offlineData.record.purpose = item.record.purpose;
			webData.offlineData.visitor.address = item.visitor.address;
			webData.offlineData.visitor.company = item.visitor.company;
			webData.offlineData.visitor.folk = item.visitor.folk;
			webData.offlineData.visitor.idNumber = item.visitor.idNumber;
			webData.offlineData.visitor.phone = item.visitor.phone;
			webData.offlineData.visitor.sex = item.visitor.sex;
			webData.offlineData.record.certificateHeadPhoto = item.record.certificateHeadPhoto;
			// webData.offlineData.record.certificateHeadPhoto = item.record.certificateHeadPhoto;
			this.showDialog()
			// this.$router.push({ name: "dialogComponent" });
		},
		goBack() {
			this.$router.push({ name: "offlineOne" });
		},
		dialogClose() {
			this.registrationInformation.record = webData.offlineData.record
			this.registrationInformation.staff = webData.offlineData.staff
			this.$router.push({ name: "offlineFour" });

		}
	},
	destroyed() { },
	computed: {
		...mapState(["disposesForm"]),
	},
	watch: {},
};
</script>
<style >
	.staff-dialog {
		height:70vh;

	}
</style>
<style lang="scss" scoped>
.danger {
	color: #ff0000;
}

.security {
	color: #4f4ff5;
}

@mixin offlineTwo {
	.offlineTwo {
		width: 100%;
		height: 100%;

		.offlineTwo-main {
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
				border: 0px;

				legend {
					background: azure;
					color: #ff5301;
					padding: 6px;
				}

				.el-row {
					margin-bottom: 1rem;
				}
			}

			.staff-info {
				span {
					display: inline-block;
					width: 95px;
					text-align: justify;
					text-justify: distribute-all-lines;
					text-align-last: justify;
				}
			}

			.image-info {
				height: 50%;
				border: 0px;

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

		.offlineTwo-foot {
			position: absolute;
			bottom: 38px;
			right: 0px;
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 0px 130px;
			box-sizing: border-box;

			.footer-btn {
				width: 230px;
				background: url('../../assets/imgs/Rectangle 33.png');
				background-size: 100% 100%;
				height: 80px;

				.btn-img {
					width: 230px;
					text-align: center;
					vertical-align: middle;
				}

				.btn-text {
					// position: absolute;
					// top: 10%;
					// left: 20%;
					width: 100%;
					font-family: Source Han Sans CN;
					font-style: normal;
					font-weight: bold;
					font-size: 36px;
					line-height: 70px;
					text-align: center;
					color: #ffffff;
				}
			}

		}
	}
}

@media screen and (min-width: 0px) {
	@include offlineTwo;
}

/* 屏幕最大等于1024 */
@media screen and (min-width: 1024px) and (max-width: 1024px) {
	@import "../../assets/css/input.scss";

	select {
		width: 120px;
		height: 25px;
		font-size: 14px;
	}

	input {
		width: 135px;
		height: 10px;
		font-size: 14px;
	}

	@include offlineTwo;

	.offlineTwo {
		.offlineTwo-main {
			ul {
				height: 100%;
				padding: 10px;
				box-sizing: border-box;

				li {
					padding: 20px;
					border-radius: 25px;
					box-sizing: border-box;
					margin-bottom: 1%;
					background: rgba(255, 255, 255, 0.7);

					fieldset:nth-child(1) {
						border-radius: 10px;
						// background: #fff;
						border: 0px;
						font-size: 14px;

						legend {
							background: none;
							// font-size: px;
						}
					}
				}

				.image-li {
					height: 55%;

					fieldset {
						height: 96%;
						border-radius: 10px;
						// background: #fff;
						border: 0px;
						font-size: 14px;

						legend {
							background: none;
							// font-size: px;
						}

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
			}
		}
	}
}

/* 屏幕最大等于1920 */
@media screen and (min-width: 1920px) and (max-width: 1920px) {
	@import "../../assets/css/input.scss";
	@include offlineTwo;

	.offlineTwo {
		.offlineTwo-main {
			ul {
				height: 100%;
				padding: 10px;
				box-sizing: border-box;

				li {
					padding: 20px;
					border-radius: 25px;
					box-sizing: border-box;
					margin-bottom: 1%;
					background: rgba(255, 255, 255, 0.7);

					fieldset:nth-child(1) {
						border-radius: 10px;
						// background: #fff;
						border: 0px;
						font-size: 22px;

						legend {
							background: none;
							// font-size: px;
						}
					}
				}

				.image-li {
					height: 55%;

					fieldset {
						height: 96%;
						border-radius: 10px;
						// background: #fff;
						border: 0px;
						font-size: 22px;

						legend {
							background: none;
							// font-size: px;
						}

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
			}
		}
	}
}
</style>
