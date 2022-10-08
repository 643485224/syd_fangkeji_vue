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
			<p class="flex-center-center">返回首页 ({{ timerNum }})</p>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
import Native from "../../API/native-api.js";
import webData from "../../utils/shuJu";
export default {
	data() {
		return {
			timer: null,
			successBoolen: null,
			timerNum: 4,
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
			successPhoto: require("../../assets/imgs/success1.png"),
			errorPhoto: require("../../assets/imgs/error1.png"),
			printPhoto: require("../../assets/imgs/print.gif"),
			defaultPhoto: null,
			messText: "正在打印访客凭条 。。。",
		};
	},
	created() {
		if (this.disposesForm.miscellaneous.miscellaneous_printer) {
			this.defaultPhoto = this.printPhoto;
		}
		console.log(webData.offlineData, "offline5的内容");

		this.speak();
	},
	mounted() {
		setTimeout(() => {
			this.register(webData.offlineData);
		}, 1000);
	},
	methods: {
		speak() {
			Native.speakStop();
			Native.speak("正在打印您的登记信息，请稍候！");
		},
		register(item) {
			item.record.timeIn = new Date().toLocaleString();
			// const timeStamp = new Date().getTime(); //条形码时间戳
			Native.register(JSON.stringify(item.visitor), JSON.stringify(item.staff), JSON.stringify(item.record))
				.then((resp) => {
					console.log("脱机来访登记", resp);
					if (!resp.success) {
						this.successBoolen = false;
						if (this.disposesForm.miscellaneous.miscellaneous_printer) {
							this.defaultPhoto = this.errorPhoto;
							this.messText = "登记失败，请重新登记，谢谢您的配合！";
						}
						this.$message({ type: "warning", message: "登记失败", duration: 3000 });
						return;
					}
					this.timer = setInterval(() => {
						if (this.timerNum == 0) {
							clearInterval(this.timer);
							this.timer = null;
							this.$router.push({ name: "offlineHome" });
						} else {
							this.timerNum--;
						}
					}, 1000);
					if (this.disposesForm.miscellaneous.miscellaneous_printer) {
						item.record.id = resp.body.id;
						Native.print(JSON.stringify(item.visitor), JSON.stringify(item.staff), JSON.stringify(item.record), null)
							.then((res) => {
								console.log("打印", res);
								if (!res.success) {
									this.$message({ type: "warning", message: "打印失败", duration: 3000 });
								}
							})
							.catch((err) => {
								console.log(err);
							});
					}
					if (this.disposesForm.miscellaneous.miscellaneous_printer) {
						this.defaultPhoto = this.successPhoto;
						this.messText = "登记成功，请取走凭条，谢谢您的配合！";
					}
					this.$message({ type: "success", message: "登记成功,请取走凭条！", duration: 3000 });
				})
				.catch((err) => {
					console.log(err);
					this.timer = setInterval(() => {
						if (this.timerNum == 0) {
							clearInterval(this.timer);
							this.timer = null;
							this.$router.push({ name: "offlineHome" });
						} else {
							this.timerNum--;
						}
					}, 1000);
				});
		},
		goHome() {
			this.$router.push({ name: "offlineHome" });
		},
	},
	computed: {
		...mapState(["disposesForm", "registrationInformation"]),
	},
	destroyed() {
		//Native.speakStop();
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
				// display: flex;
				// justify-content: center;
				// align-items: center;
				font-size: 25px;
				color: #fff;
				font-weight: 600;
			}
		}
	}
}
</style>
