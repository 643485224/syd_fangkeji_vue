<template>
	<div class="offlineFive">
		<div class="offlineFive-div2" v-if="disposesForm.miscellaneous.miscellaneous_printer">
			<div>
				<img :src="defaultPhoto" alt="" />
				<p>{{ messText }}</p>
			</div>
		</div>
		<div class="offlineFive-div2" v-else>
			<div v-if="successBoolen">
				<img :src="successPhoto" alt="" />
				<p>登记完成</p>
				<p>请取走凭条，谢谢您的配合！</p>
			</div>
			<div v-else>
				<img :src="errorPhoto" alt="" />
				<p>登记失败</p>
				<p>请重新登记，谢谢您的配合！</p>
			</div>
		</div>

		<div @click="goHome()" class="offline5_home">
			<img src="../../assets/imgs/Rectangle 33.png" alt="" />
			<p>返回首页 ({{ timerNum }})</p>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
import Native from "../../API/native-api.js";
import AES from "@/utils/secure";
import { Base64 } from "js-base64";
import APP from "../../webapi/modules/webapi.js";
import webData from "../../utils/shuJu";

export default {
	data() {
		return {
			newRecord: {},
			timer: null,
			successBoolen: true,
			timerNum: 5,
			successPhoto: require("../../assets/imgs/success1.png"),
			errorPhoto: require("../../assets/imgs/error1.png"),
			printPhoto: require("../../assets/imgs/print.gif"),
			defaultPhoto: null,
			messText: "正在打印访客凭条 。。。",
			newList: {
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
		// this.submit.visitor = JSON.parse(JSON.stringify(this.newVisitor));
		// this.submit.staff = JSON.parse(JSON.stringify(this.newStaff));
		// this.submit.record = JSON.parse(JSON.stringify(this.newRecord));
		if (this.disposesForm.miscellaneous.miscellaneous_printer) {
			this.defaultPhoto = this.printPhoto;
		}
		console.log(webData.onsiteData, "appointment4的内容");
		console.log("appointment", this.$route.params.value);
		this.register(webData.onsiteData);
	},
	methods: {
		async register(item) {
			this.timer = setInterval(() => {
				if (this.timerNum == 0) {
					clearInterval(this.timer);
					this.timer = null;
					this.$router.push("/onsiteHome");
				} else {
					this.timerNum--;
				}
			}, 1000);
			let info = {};
			let time = new Date()
				.toISOString()
				.slice(0, 19)
				.replace(/\./g, ":");
			info.v_name = item.visitor.name;
			info.v_nation = item.visitor.folk;
			info.v_phone = item.visitor.phone;
			info.v_dw = item.visitor.company;
			info.v_sex = item.visitor.sex == "男" ? "1" : item.visitor.sex == "女" ? "2" : "0";
			info.v_certificateNumber = Base64.encode(AES.encrypt(item.visitor.idNumber + this.httpform.enckey));
			info.v_certificateType = item.record.certificateType;
			info.v_certificateUnit = "";
			info.v_address = item.visitor.address;
			info.v_reason = item.record.purpose;
			info.v_personSum = 1;
			info.v_plateNumber = item.record.licensePlate;
			info.v_belonging = item.record.brings;
			info.status = 0;
			info.isv_id = item.record.jobNumber;
			info.isv_code = item.staff.code;
			info.isv_dept = item.staff.deptName;
			info.isv_name = item.staff.name;
			info.v_box = "";
			info.v_duration = "";
			info.v_time = item.record.timeIn;
			info.r_v_time = time.substring(0, 10) + " " + new Date().toTimeString().substring(0, 8);
			info.v_lvTime = "";
			info.r_v_lvTime = "";
			info.v_capturePic = item.record.visitorHeadPhoto;
			info.v_certificatePic = item.record.certificatePhoto;
			info.v_certificateHead = item.record.certificateHeadPhoto;
			console.log("证件头像", info.v_certificateHead);

			APP.updateVisitor(this.httpform, info).then(async (resp) => {
				console.log("更新流程", resp);
				if (resp.data.code == 200) {
					// this.$message({ type: "success", message: "登记成功" });
					let passCode = resp.data.info.code;
					item.record.staffID = null;
					let res = await Native.print(JSON.stringify(item.visitor), JSON.stringify(item.staff), JSON.stringify(item.record), passCode);
					console.log("打印", res);
					if (res.success) {
						console.log("打印成功");
						this.appointmenBoolean = false;
					} else {
						this.$message({ type: "warning", message: "打印失败" + res.msg });
						this.appointmenBoolean = false;
						return;
					}
					this.empty(2);
				} else {
					this.$message({ type: "warning", message: "登记失败", duration: 5000 });
				}
			});
		},
	},
	computed: {
		...mapState(["newVisitor", "newStaff", "disposesForm", "registrationInformation", "httpform"]),
	},
	beforeDestroy() {
		clearInterval(this.timer);
		this.timer = null;
	},
};
</script>
<style lang="scss" scoped>
@mixin offlineFive {
	.offlineFive {
		width: 100%;
		height: 100%;
		font-family: Source Han Sans CN;
		font-style: normal;
		font-weight: 900;
		color: #ff3d00;
		text-align: center;
		.offlineFive-div1 {
			height: 10%;
			display: flex;
			justify-content: flex-end;
			margin-right: 10%;
			div {
				width: 8%;
				height: 100%;
				border: 1px solid black;
				line-height: 68px;
				box-sizing: border-box;
				border-radius: 55px;
				font-size: 35px;
			}
		}
		.offlineFive-div2 {
			height: 30%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.offlineFive-div3 {
			height: 60%;
			p {
				font-size: 54px;
				line-height: 93px;
			}
			p:nth-child(2) {
				font-size: 40px;
			}
		}
	}
}

@media screen and (min-width: 0px) {
	@include offlineFive;
}

/* 屏幕最大等于1024 */
@media screen and (min-width: 1024px) and (max-width: 1024px) {
	@include offlineFive;
}

/* 屏幕最大等于1920 */
@media screen and (min-width: 1920px) and (max-width: 1920px) {
	@include offlineFive;
	.offlineFive {
		position: relative;
		.offlineFive-div2 {
			height: 100%;
			div {
				p {
					font-size: 25px;
				}
			}
		}
		.offline5_home {
			position: absolute;
			right: 10%;
			bottom: 5%;
			img {
				width: 300px;
			}
			p {
				position: absolute;
				top: 0%;
				width: 100%;
				height: 85%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 25px;
				color: #fff;
				font-weight: 600;
			}
		}
	}
}
</style>
