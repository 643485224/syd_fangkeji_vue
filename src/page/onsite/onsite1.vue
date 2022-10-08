<template>
		<div class="onSiteOne">
		<div class="onSiteOne-main">
			<ul>
				<li>
					<p>请选择证件类型</p>
				</li>
				<li>
					<div>
						<p>
							请将二代证放入读卡区自动识别
						</p>
					</div>
					<div>
						<img :src="photoGif" alt="" />
					</div>
				</li>
				<li>
					<!-- <div @click="onOcrClick(4)">
						<img :src="photoOne" alt="" />
						<p class="p-top">二代证读取</p>
						<p class="p-bottom">IdCard card reading</p>
					</div> -->
					<div @click="onOcrClick(0)">
						<img :src="photoTwo" alt="" />
						<p class="p-top">一代证扫描</p>
						<p class="p-bottom">First-generation Scanning</p>
					</div>
					<div @click="onOcrClick(1)">
						<img :src="photoThree" alt="" />
						<p class="p-top">驾驶证扫描</p>
						<p class="p-bottom">Driving License Scanning</p>
					</div>
					<div @click="onOcrClick(2)">
						<img :src="photoFour" alt="" />
						<p class="p-top">护照扫描</p>
						<p class="p-bottom">Passport Scanning</p>
					</div>
					<!-- <div @click="onOcrClick(-1)">
						<img :src="photoFive" alt="" />
						<p class="p-top">其它扫描</p>
						<p class="p-bottom">Other scanning</p>
					</div> -->
					<!-- v-if="disposesForm.miscellaneous.miscellaneous_unlicensed" -->
					<div @click="onOcrClick(-2)">
						<img :src="photoSix" alt="" />
						<p class="p-top">无证登记</p>
						<p class="p-bottom">Without a license registration</p>
					</div>
				</li>
			</ul>
			<div class="offlineTwo-foot">
				<div @click="goBack()" class="footer-btn">
					<p class="btn-text">返回</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import photoOne from "../../assets/imgs/second_generation.png";
import photoTwo from "../../assets/imgs/generation_scanning.png";
import photoThree from "../../assets/imgs/drive_scanning.png";
import photoFour from "../../assets/imgs/passport_scanning.png";
import photoFive from "../../assets/imgs/other_scanning.png";
import photoSix from "../../assets/imgs/undocumented_registration.png";
import { mapState } from "vuex";
import webData from "../../utils/shuJu";
import Native from "../../API/native-api.js";
export default {
	data() {
		return {
			photoGif: require("../../assets/imgs/SEDZ.gif"),
			photoOne,
			photoTwo,
			photoThree,
			photoFour,
			photoFive,
			photoSix,
			respVal: {},
			regularTime: null,
			regularBoolen: false,
			regularNum: null,
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
		//this.voicePrompt("请选择证件类型");
		// webData.onsiteData = webData.reduction; //回到证件登记清空值
		webData.onsiteData = JSON.parse(JSON.stringify(webData.reduction)); //回到证件登记清空值
		console.log(webData.onsiteData, "清空后的");
		this.regularTime = setInterval(() => {
			this.regularErDai(5);
		}, 1000);
		this.speak();
	},
	mounted() {},
	methods: {
		//定时读取二代身份证
		regularErDai(type) {
			// this.respVal = {};
			Native.readIdCard()//读取身份证信息
				.then(async (resp) => {
					if (!resp.success) {
						return;
					}
					console.log("读取身份证信息", resp);
					let nowTime = new Date().getTime();
					let time = new Date(resp.body.valid.slice(11, 21)).getTime();
					if (nowTime > time) {
						this.$message.error({ message: "证件已过期", duration: 3000 });
					}
					this.respVal = resp.body; //证件信息
					let idCard = this.respVal.code
					// let respValue = await Native.isCheckOut(idCard)//查询是否存在未签离接口
					// if (respValue.success == true) {
					// 	this.$message({ type: "info", message: "访客已存在，请先签离" });
					// 	return
					// }
					this.$store.commit("certif", 4);
					if (this.httpform.onlineMode) {
						this.$router.push({ name: "onsiteTwo", params: { key: type, value: resp.body } });
					} else {
						this.block();
						this.$router.push({ name: "offlineTwo", params: { key: type, value: resp.body } });
					}
				})
				.catch((err) => {
					console.log(err, "读卡失败");
					if (this.httpform.onlineMode) {
						this.$router.push({ name: "onsiteOne" });
					} else {
						this.$router.push({ name: "offlineOne" });
					}
				});
		},
		goBack() {
			// 返回
			this.$router.push({ name: "visit-mode" });
		},
		//扫描证件 0--一代身份证 ，1--驾照（预留），2--护照（自动判国际护照），-1--其他证件， 4--二代身份证
		async onOcrClick(key) {
			// this.newList.record.certificateType = key == 0 ? "一代身份证" : key == 1 ? "驾照" : key == 2 ? "护照" : key == 4 ? "二代身份证" : key == -1 ? "其他证件" : key == -2 ? "无证登记" : "";
			// this.$store.commit("newRegistrant", this.newList);
			if (key == -2) {
				// this.$router.push("/onsiteHome/onsiteTwo");
				this.$router.push({ name: "onsiteTwo", params: { value: "无证" } }); //跳转完善访客信息页面
				return;
			}
			this.$router.push({ name: "cartoon", params: { key: key } }); //跳转获取证件信息页面
		},
		speak() {
			Native.speakStop();
			Native.speak("请您选择对应的登记方式");
		},
	},
	computed: {
		...mapState(["disposesForm","httpform"]),
	},
		beforeDestroy() {
		//Native.speakStop();
		clearInterval(this.regularTime);
		this.regularTime = null;
	},
};
</script>
<style lang="scss" scoped>
@mixin onSiteOne {
	.onSiteOne {
		width: 100%;
		height: 100%;

		.onSiteOne-head {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.onSiteOne-div1 {
				position: relative;
				width: 70%;

				p {
					position: absolute;
					top: 15%;
					left: 13%;
					font-size: 36px;
					color: #ffffff;
					font-family: Source Han Sans CN;
					font-weight: bold;
				}
			}

			.onSiteOne-div2 {
				width: 20%;
			}
		}

		.onSiteOne-main {
			width: 100%;
			height: 100%;

			// text-align: center;
			ul {
				width: 100%;
				height: 100%;
				margin: auto;

				li:nth-child(1) {
					display: flex;
					align-items: center;
					text-align: center;
					height: 15%;
					color: #fff;
					justify-content: space-around;

					p {
						font-family: Source Han Sans CN;
						font-style: normal;
						font-weight: 900;
						font-size: 48px;
						line-height: 72px;
						text-align: center;
						color: #2888de;
					}
				}

				li:nth-child(2) {
					height: 20%;
					color: #fff;

					padding: 0px 50px;

					div {
						position: relative;
						text-align: center;

						p {

							font-family: Source Han Sans CN;
							font-style: normal;
							font-weight: bold;
							font-size: 20px;
							color: #ff3d00;
							text-align: center;
						}

						img {
							height: 200px;
							width: 300px;
						}
					}
				}

				li:nth-child(3) {
					height: 50%;
					width: 100%;
					color: #fff;
					display: flex;
					text-align: center;
					// justify-content: space-around;
					flex-wrap: nowrap;
					align-items: center;
					padding: 0px 50px;

					div {
						width: 22%;
						position: relative;

						p {
							position: absolute;
							bottom: 24%;
							width: 100%;
							font-family: Source Han Sans CN;
							font-style: normal;
							font-weight: bold;
							font-size: 36px;
							color: #ffffff;
							text-align: center;
						}

						img {
							width: 100%;
							height: 150px;
						}

						.p-bottom {
							bottom: 11%;
							font-size: 18px;
						}
					}
				}

				li:nth-child(4) {
					width: 90%;
					height: 10%;
					display: flex;
					text-align: center;
					align-items: center;
					justify-content: flex-end;

					div {
						height: 114.21px;
						position: relative;

						p {
							position: absolute;
							top: 6%;
							left: 30%;
							font-family: Source Han Sans CN;
							font-style: normal;
							font-weight: bold;
							font-size: 36px;
							line-height: 65px;
							text-align: center;
							color: #ffffff;
						}

						img {
							width: 100%;
							height: 110.21px;
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
				justify-content: flex-end;
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
}

@media screen and (min-width: 0px) {
	@include onSiteOne;
}

/* 屏幕最大等于1024 */
@media screen and (min-width: 1024px) and (max-width: 1024px) {
	@include onSiteOne;
}

/* 屏幕最大等于1920 */
@media screen and (min-width: 1920px) and (max-width: 1920px) {
	@include onSiteOne;

	.onSiteOne {
		.onSiteOne-main {
			ul {
				width: 100%;
				height: 100%;
				margin: auto;

				li:nth-child(1) {
					display: flex;
					align-items: center;
					text-align: center;
					height: 15%;
					color: #fff;
					justify-content: space-around;

					p {
						font-family: Source Han Sans CN;
						font-style: normal;
						font-weight: 900;
						font-size: 48px;
						line-height: 72px;
						text-align: center;
						color: #2888de;
					}
				}

				li:nth-child(2) {
					height: 20%;
					color: #fff;

					padding: 0px 50px;

					div {
						position: relative;
						text-align: center;

						p {

							font-family: Source Han Sans CN;
							font-style: normal;
							font-weight: bold;
							font-size: 20px;
							color: #ff3d00;
							text-align: center;
						}

						img {
							height: 250px;
							width: 450px;
						}
					}
				}

				li:nth-child(3) {
					height: 50%;
					width: 100%;
					color: #fff;
					display: flex;
					text-align: center;
					// justify-content: space-around;
					flex-wrap: nowrap;
					align-items: center;
					justify-content: center;
					padding: 0px 0px;

					div {
						width: 22%;
						position: relative;

						p {
							position: absolute;
							bottom: 24%;
							width: 100%;
							font-family: Source Han Sans CN;
							font-style: normal;
							font-weight: bold;
							font-size: 36px;
							color: #ffffff;
							text-align: center;
						}

						img {
							width: 100%;
							height: 250px;
						}

						.p-bottom {
							bottom: 11%;
							font-size: 18px;
						}
					}
				}

				li:nth-child(4) {
					width: 90%;
					height: 10%;
					display: flex;
					text-align: center;
					align-items: center;
					justify-content: flex-end;

					div {
						height: 114.21px;
						position: relative;

						p {
							position: absolute;
							top: 10%;
							left: 30%;
							font-family: Source Han Sans CN;
							font-style: normal;
							font-weight: bold;
							font-size: 36px;
							line-height: 65px;
							text-align: center;
							color: #ffffff;
						}

						img {
							width: 100%;
							height: 110.21px;
						}
					}
				}
			}

			.offlineTwo-foot {
				position: absolute;
				bottom: 140px;
				right: 0px;
				width: 100%;
				display: flex;
				justify-content: flex-end;
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
}
</style>
