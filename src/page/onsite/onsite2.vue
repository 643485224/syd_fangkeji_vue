/* eslint-disable no-undef */
/* eslint-disable vue/no-parsing-error */
<template>
	<div class="onsiteTwo">
		<div class="onsiteTwo-main">
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
									id="phoneNumber" data-mode="num" />
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
		<div class="onsiteTwo-foot">
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
				<onSiteSlectStaff @dialogClose="dialogClose()"></onSiteSlectStaff>
			</div>
		</el-dialog>
	</div>
</template>
<script>
// import { component } from 'vue/types/umd';
import { mapState } from "vuex";
import webData from "../../utils/shuJu";
import onSiteSlectStaff  from "../../components/staff/onsite-staff";



export default {

	data() {
		return {
			registrationInformation: {
				visitor: {
					name: "", //姓名
					sex: "未知", //性别
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
			dialogFormVisible: false,

		};
	},
	components: {
		onSiteSlectStaff,
	},
	created() {
		// this.registrationInformation = JSON.parse(JSON.stringify(this.$store.state.registrationInformation));
		//this.voicePrompt("请您完善登记信息，红色为必填项，蓝色为非必填项");
		// this.visitor = JSON.parse(JSON.stringify(this.$store.state.newVisitor));
		console.log("上个页面传过来的值", this.$route.params.value);
		//0-身份证；1-驾驶证；2-护照;5-刷身份跳转
		this.onPageVal(this.$route.params.key, this.$route.params.value);
	},
	mounted() {
		if (this.$route.params.value == undefined) {
			this.registrationInformation.visitor.name = webData.onsiteData.visitor.name;
			this.registrationInformation.record.brings = webData.onsiteData.record.brings;
			this.registrationInformation.record.licensePlate = webData.onsiteData.record.licensePlate;
			this.registrationInformation.record.purpose = webData.onsiteData.record.purpose;
			this.registrationInformation.visitor.address = webData.onsiteData.visitor.address;
			this.registrationInformation.visitor.company = webData.onsiteData.visitor.company;
			this.registrationInformation.visitor.folk = webData.onsiteData.visitor.folk;
			this.registrationInformation.visitor.idNumber = webData.onsiteData.visitor.idNumber;
			this.registrationInformation.visitor.phone = webData.onsiteData.visitor.phone;
			this.registrationInformation.visitor.sex = webData.onsiteData.visitor.sex;
			this.registrationInformation.record.certificateHeadPhoto = webData.onsiteData.record.certificateHeadPhoto;
			this.registrationInformation.record.certificatePhoto = webData.onsiteData.record.certificatePhoto;
		}
	},
	methods: {
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

				this.registrationInformation.record.certificatePhoto = webData.onsiteData.record.certificatePhoto;
				webData.onsiteData.visitor.idCard = this.registrationInformation.visitor.idNumber;
			} else if (type == 1) {
				console.log("驾驶证");
				this.registrationInformation.visitor.name = data.Name;
				this.registrationInformation.visitor.sex = data.Sex;
				this.registrationInformation.visitor.idNumber = data.CardNo;
				this.registrationInformation.visitor.driverLicense = this.registrationInformation.visitor.idNumber;
				this.registrationInformation.visitor.birth = data.Birthday;
				this.registrationInformation.visitor.address = data.Address;
				this.registrationInformation.record.certificatePhoto = webData.onsiteData.record.certificatePhoto;
				this.registrationInformation.record.certificateHeadPhoto = data.OcrHead;

				webData.onsiteData.visitor.driverLicense = this.registrationInformation.visitor.idNumber;
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

				this.registrationInformation.record.certificatePhoto = webData.onsiteData.record.certificatePhoto;
				webData.onsiteData.visitor.passport = this.registrationInformation.visitor.idNumber;
			} else if (type == -1) {
				console.log("其他证件");
				// this.registrationInformation.record.certificateHeadPhoto = data.scannerImage;

				this.registrationInformation.record.certificatePhoto = webData.onsiteData.record.certificatePhoto;
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

				this.registrationInformation.record.certificatePhoto = webData.onsiteData.record.certificatePhoto;
				webData.onsiteData.visitor.idCard = this.registrationInformation.visitor.idNumber;
			}
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

			// this.$store.commit("newRegistrant", item);

			// this.$store.commit("onsiteFour",item);
			console.log(item);
			console.log(webData.onsiteData);
			webData.onsiteData.visitor.name = item.visitor.name;
			webData.onsiteData.record.brings = item.record.brings;
			webData.onsiteData.record.licensePlate = item.record.licensePlate;
			webData.onsiteData.record.purpose = item.record.purpose;
			webData.onsiteData.visitor.address = item.visitor.address;
			webData.onsiteData.visitor.company = item.visitor.company;
			webData.onsiteData.visitor.folk = item.visitor.folk;
			webData.onsiteData.visitor.idNumber = item.visitor.idNumber;
			webData.onsiteData.visitor.phone = item.visitor.phone;
			webData.onsiteData.visitor.sex = item.visitor.sex;
			webData.onsiteData.record.certificateHeadPhoto = item.record.certificateHeadPhoto;

			this.showDialog()
		},
		showDialog() {
			this.dialogFormVisible = true;
		},
		goBack() {
			this.$router.push({ name: "onsiteOne" });
		},
		dialogClose() {
			this.registrationInformation.record = webData.offlineData.record
			this.registrationInformation.staff = webData.offlineData.staff
			this.$router.push({ name: "offlineFour" });

		},
	},
	computed: {
		...mapState(["disposesForm"]),
	},
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

@mixin onsiteTwo {
	.onsiteTwo {
		width: 100%;
		height: 100%;

		.onsiteTwo-main {
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

		.onsiteTwo-foot {
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
	@include onsiteTwo;
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

	@include onsiteTwo;

	.onsiteTwo {
		.onsiteTwo-main {
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
	@include onsiteTwo;

	.onsiteTwo {
		.onsiteTwo-main {
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



