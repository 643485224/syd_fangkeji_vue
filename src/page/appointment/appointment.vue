<template>
	<div class="checkout">
		<div class="checkout-main">
			<ul>
				<li>
					<!-- <p class="checkout-title">使用<span style="color:red;">身份证</span>或<span
							style="color:red;">二维码</span>获取预约信息</p> -->
				</li>
				<li class="checkout-content">
					<img src="../../assets/imgs/签离.gif" alt="" />
					<div class="invite">
						<div class="invite-enter">
							<p class="invite-label">请输入邀请码：</p>
							<div class="invite-input">
								<!-- autofocus -->
								<el-input placeholder="请输入邀请码" v-model="inviteCode" clearable @input="codeSplice"
									readonly onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)));">
									<template slot="prepend">
										邀请码
									</template>
									<template slot="append">
										<Debounce :time="2000">
											<div class="invite-btn" @click="inviteEnter">确认</div>
										</Debounce>
									</template>
								</el-input>
							</div>
						</div>
						<keyboard-num :inviteCode="inviteCode" @codeChange="codeChange"></keyboard-num>
					</div>
				</li>
				<li>

				</li>
			</ul>
			<div class="tips-wrapper">
				<img src="../../assets/imgs/bottom.png" alt="" srcset="">
				<div class="tips-content">
					<p class="tips-title">帮助信息</p>
					<p class="tips-text">1.如果您收到了预约（邀请）成功后的二维码，可以直接使用二维码扫码功能进行下一步操作。</p>
					<p class="tips-text">2.如果您不能扫描二维码，可以通过右侧键盘输入数字邀请码进行下一步操作。</p>
					<p class="tips-text">3.如果您携带了二代身份证，可以通过直接读取身份证进行下一步操作。</p>
				</div>

			</div>
			<div class="back-btn flex-end" @click="_goBack()">
				<p class="flex-center-center">返回</p>
			</div>
		</div>
		<el-dialog title="选择预约记录" :visible.sync="showDialog" :close-on-click-modal="false">
			<fieldset class=" fieldset">
				<!-- <legend>预约记录</legend> -->
				<el-pagination class="table_pagination" @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="appointmentStaffCurrentPage"
					:page-size="appointmentStaffPageAmount" layout="total, prev, pager, next,jumper"
					:total="appointmentStaffListLength" data-mode="num"> </el-pagination>
				<div class="table-wrapper">
					<el-table class="select_record_table" :data="appointmentStaffList" height="100%" :size="'medium'"
						:header-cell-style="{ fontSize: '22px' }" :cell-style="{ fontSize: '22px' }">
						<el-table-column prop="v_name" label="姓名" align="center" width="150" min-width="8%">
						</el-table-column>
						<el-table-column prop="v_phone" label="电话" align="center" width="250" min-width="8%">
						</el-table-column>
						<el-table-column prop="v_certificateNumber" label="身份证号码" align="center" min-width="20%">
						</el-table-column>
						<el-table-column prop="v_dw" label="公司" align="center" min-width="20%"> </el-table-column>
						<el-table-column prop="v_time" label="预约来访时间" align="center" min-width="20%"> </el-table-column>
						<el-table-column fixed="right" label="操作" align="center" width="180">
							<template slot-scope="scope">
								<el-button v-if="!scope.row.isEgdit" type="primary" size="small"
									@click="appointment(scope.row, scope.$index)">选择预约记录</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>

			</fieldset>
		</el-dialog>

	</div>
</template>
<script>
import Native from "../../API/native-api.js";
import APP from "../../webapi/modules/webapi.js";
import webData from "../../utils/shuJu";
import { mapState } from "vuex";
import keyboardNum from "../../components/keyboard/keyboard-num";

export default {
	components: {
		keyboardNum
	},
	data() {
		return {
			reservationCode: "",
			respVal: {},
			staffListBoolen: true,
			appointmentStaffList: [],
			newAppointmentStaffList: [],
			appointmentStaffCurrentPage: 1,
			appointmentStaffPageAmount: 5,
			appointmentStaffListLength: 0,
			showDialog: false,
			inviteCode: ''
		};
	},
	created() {
		webData.onsiteData = JSON.parse(JSON.stringify(webData.reduction)); //回到证件登记清空值
		console.log(webData.onsiteData, "清空后的webData.onsiteData");

		window.callbackQrcode = (data) => {
			console.log("二维码", data);
			if (data == "" && data.length == 0) {
				return;
			}
			this.qrCode(data, null);
			// this.$router.push({ name: "appointmentOne", params: { key: 0, value: data } });
		};
		this.regularTime = setInterval(() => {
			this.$store.commit("certif", 5);
			this.regular();
		}, 2000);
	},
	methods: {
		codeSplice() {
			if (this.inviteCode.length > 6) this.inviteCode = this.inviteCode.slice(0, 6)
		},
		inviteEnter() {
			let inviteCode = this.inviteCode.trim()
			if (inviteCode.length < 6) {
				this.$message({ type: "warning", message: "邀请码长度不足" });
				return
			}
			this.qrCode(inviteCode)
		},
		codeChange(code) {
			this.inviteCode = code;
		},
		_goBack() {
			// 返回
			this.$router.push({ name: "visit-mode" });
		},

		qrCode(data, cardNum) {
			console.log(data, cardNum);
			if (!this.heartBoolen) {
				this.$message({ type: "info", message: "是否连接平台！" });
				return;
			}

			APP.getVisitor(data, cardNum)
				.then((resp) => {
					console.log(resp);
					if (resp.data.code !== 200) {
						this.$message({ type: "info", message: "获取预约来访失败", duration: 3000 });
						return;
					}
					// this.appointmentStaffList = resp.data.info.visitorList;
					this.newAppointmentStaffList = resp.data.info.visitorList;
					this.appointmentStaffListLength = this.newAppointmentStaffList.length;
					this.$message({ type: "success", message: "获取预约来访成功", duration: 3000 });
					if (this.newAppointmentStaffList?.length > 1) {
						this.showDialog = true;
						this.getTableData();
						return
					}
					this.appointment(this.newAppointmentStaffList[0], 0)

				})
				.catch((err) => {
					console.log(err, "请求失败");
				});
		},
		//定时读取二代身份证
		regular() {
			this.respVal = {};
			Native.readIdCard()
				.then((resp) => {
					if (!resp.success) {
						return;
					}
					this.inviteCode = ''
					webData.onsiteData.record.certificateHeadPhoto = resp.body.photo;
					console.log(resp, "读取二代身份证");
					this.qrCode(null, resp.body.code);
				})
				.catch((err) => {
					console.log(err, "请求失败");
				});
		},
		//预约
		appointment(row, index) {
			console.log(row, index);
			webData.onsiteData.visitor.name = row.v_name;
			webData.onsiteData.visitor.sex = row.v_sex == 1 ? "男" : row.v_sex == 2 ? "女" : "未知";
			webData.onsiteData.visitor.folk = row.v_nation;
			webData.onsiteData.visitor.idNumber = row.v_certificateNumber;
			webData.onsiteData.visitor.address = row.v_address;
			webData.onsiteData.record.purpose = row.v_reason;
			webData.onsiteData.visitor.phone = row.v_phone;
			// 	webData.onsiteData.visitor.phone = row.v_personSum;//来访人数
			webData.onsiteData.visitor.company = row.v_dw;
			webData.onsiteData.record.licensePlate = row.v_plateNumber;
			webData.onsiteData.record.brings = row.v_belonging;
			webData.onsiteData.record.staffID = row.isv_id;
			webData.onsiteData.staff.jobNumber = row.isv_code;
			webData.onsiteData.visitor.idCard = webData.onsiteData.visitor.idNumber;
			webData.onsiteData.staff.department = row.isv_deptName;
			webData.onsiteData.staff.name = row.isv_name;
			webData.onsiteData.record.timeIn = row.v_time;
			webData.onsiteData.record.timeOut = row.v_lvTime;
			webData.onsiteData.record.certificatePhoto = row.v_certificatePic;
			if (this.inviteCode) {
				webData.onsiteData.record.certificateHeadPhoto = row.v_certificateHead;
			}
			this.$router.push({ name: "appointmentThree" }); // 读取预约信息后进入抓拍人脸页面
		},
		handleSizeChange(val) {
			this.appointmentStaffPageAmount = val;
			this.getTableData();
		},
		handleCurrentChange(page) {
			this.appointmentStaffCurrentPage = page;
			this.getTableData();
		},
		getTableData() {
			this.appointmentStaffList = this.newAppointmentStaffList.slice((this.appointmentStaffCurrentPage - 1) * this.appointmentStaffPageAmount, this.appointmentStaffCurrentPage * this.appointmentStaffPageAmount);
		},
	},
	beforeDestroy() {
		clearInterval(this.regularTime);
		this.regularTime = null;
		this.inviteCode = "";
	},
	computed: {
		...mapState(["heartBoolen"]),
	},
};
</script>
<style lang="scss" scoped>
.checkout {
	width: 100%;
	height: 100%;
	font-family: Source Han Sans CN;
	font-style: normal;

	.checkout-main {
		height: 100%;

		.checkout-title {
			font-size: 50px;
			text-align: center;
			font-weight: 900;
		}

		ul {
			margin: 1em auto;
			height: 50vh;

			.order_show {
				height: 60%;
			}

			.order_hide {
				height: 60%;
				display: none;
			}
		}
	}
}




.fieldset {
	position: relative;
	padding: 25px;
	border: 0;
	box-sizing: border-box;

	legend {
		color: #ff5301;
	}
}

.table_pagination {
	margin-bottom: 10px;
}

.table-wrapper {
	position: relative;
	height: 60vh;

	.select_record_table {
		position: absolute;
		width: calc(100% - 50px);
		font-size: 22px;
		font-weight: bold;
	}
}

.checkout-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.invite-enter {
	.invite-label {
		padding: 10px 6px;
		color: #0b94e7;
		font-weight: 600;
		font-size: 28px;
	}

	.invite-input {
		padding: 0 6px;
		margin-bottom: 20px;
		font-size: 1em;

		.el-input {
			font-size: 28px;
		}

		::v-deep .el-input__inner {
			height: 60px !important;
			line-height: 60px !important;
		}
	}


	.invite-btn {
		width: 8rem;
		height: 60px;
		line-height: 60px;
		margin: 0 -20px;
		text-align: center;
		letter-spacing: 6px;
		vertical-align: bottom;
		color: #fff !important;
		background-color: #0b94e7 !important;
		border-radius: 0 4px 4px 0;
	}

}


.tips-wrapper {
	position: relative;
	width: 58vw;
	// height: 28vh;
	// padding: 20px;
	padding: 0 20px;
	margin: 0 auto;
	font-family: Source Han Sans CN;
	font-style: normal;
	color: #2888de;

	// background-image: url('../../assets/imgs/bottom.png');
	// background-size: 100% 100%;
	img {
		width: 100%;
	}

	.tips-content {
		position: absolute;
		top: 0;
		left: 18%;
		text-align: left;
		padding: 50px 40px 10px;

		.tips-title {
			line-height: 60px;
			// text-align: center;
			font-weight: 900;
			font-size: 40px;

		}

		.tips-text {
			font-weight: bold;
			font-size: 30px;
			line-height: 45px;
		}
	}
}



.back-btn {
	position: absolute;
	bottom: 6em;
	right: 2em;
	width: 12em;
	height: 5em;
	text-align: center;
	color: #fff;
	background-image: url('../../assets/imgs/Rectangle 33.png');
	background-size: 100% 100%;

	p {
		position: absolute;
		top: 8%;
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
</style>
