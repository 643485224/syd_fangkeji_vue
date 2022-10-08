<template>
	<div class="cartoon">
		<div class="cartoon-main" v-if="$route.params.key == 4">
			<div>
				<p>
					请把身份证放入二代证阅读区
				</p>
			</div>
			<div>
				<img :src="photoOne" alt="" />
			</div>
		</div>
		<div class="cartoon-foot"
			v-if="$route.params.key == 0 || $route.params.key == 1 || $route.params.key == 2 || $route.params.key == -1">
			<div>
				<p>
					请把证件放入证件扫描区
				</p>
			</div>
			<div>
				<img :src="photoTwo" alt="" />
			</div>
			<div>
				<p>
					点击开始扫描按钮
				</p>
			</div>
			<div v-if="scanningBoolen" class="readCard">
				<img :src="photoThree" alt="" />

				<Debounce :time="5000">
					<p @click="onOcrClick($route.params.key)">
						<span>开始扫描</span>
					</p>
				</Debounce>
			</div>
			<div v-else class="readCard">
				<img :src="photoFour" alt="" />

				<p>
					<span style="color:#037ACC;">扫描中······</span>
				</p>
			</div>
		</div>
		<div class="cartoon_btn" @click="goBack" v-if="scanningBoolen">
			<img src="../../assets/imgs/Rectangle 33.png" alt="" />
			<p>返回</p>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
import Native from "../../API/native-api.js";
// import photoOne from "../../assets/imgs/SEDZ.gif";
import webData from "../../utils/shuJu";
import axios from "../../utils/http";
import webapi from "../../webapi/modules/webapi.js";

export default {
	data() {
		return {
			respVal: {},
			regularTime: null,
			regularBoolen: false,
			regularNum: null,
			scanningBoolen: true,
			photoOne: require("../../assets/imgs/SEDZ.gif"),
			photoTwo: require("../../assets/imgs/ZJSM.gif"),
			photoThree: require("../../assets/imgs/startScanning.png"),
			photoFour: require("../../assets/imgs/endScanning.png"),
			// textMessage: "开始扫描",
		};
	},
	created() {
		// this.newList = JSON.parse(JSON.stringify(this.$store.state.registrationInformation));
		// this.$store.commit("newRegistrant", this.newList);
		// this.httpform = JSON.parse(JSON.stringify(this.$store.state.httpform));
		//扫描证件 0--一代身份证 ，1--驾照（预留），2--护照（自动判国际护照），-1--其他证件， 4--二代身份证
		let key = this.$route.params.key;
		this.$store.commit("certif", key);
		console.log(key, "钥匙");
		if (key === 4) {
			this.regularTime = setInterval(() => {
				this.regular(5);
			}, 1000);
		}
	},
	mounted() { },
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		async onOcrClick(type) {
			this.scanningBoolen = false;
			console.log("执行了", this.scanningBoolen);
			// Native.speakStop();
			// Native.speak("正在扫描证件，请您耐心等待。谢谢配合！");
			switch (type) {
				case 0:
					{
						console.log("身份证");
											this.getOcr(4,type)

						// Native.idScanning(4)
						// 	.then((resp) => {
						// 		console.log("身份证--", resp);
						// 		if (!resp.success) {
						// 			this.scanningBoolen = true;
						// 			this.$message.error({ message: "OCR证件识别失败", duration: 3000 });
						// 			return;
						// 		}
						// 		if (this.httpform.onlineMode) {
						// 			webData.onsiteData.record.certificatePhoto = resp.body.scannerImage;
						// 		} else {
						// 			webData.offlineData.record.certificatePhoto = resp.body.scannerImage;
						// 		}
						// 		Native.ocr(type)
						// 			.then((resp) => {
						// 				console.log("身份证--", resp);
						// 				if (!resp.success) {
						// 					this.scanningBoolen = true;
						// 					this.$message.error({ message: "OCR证件识别失败", duration: 3000 });
						// 					return;
						// 				}
						// 				this.respVal = resp.body;
						// 				this.jumpPage(type);
						// 			})
						// 			.catch((err) => {
						// 				this.scanningBoolen = true;
						// 				console.log(err, "OCR识别失败");
						// 			});
						// 	})
						// 	.catch((err) => {
						// 		this.scanningBoolen = true;
						// 		console.log(err, "证件扫描失败");
						// 	});
					}
					break;
				case 1:
					this.getOcr(2,type)
					// return
					// {
					// 	Native.idScanning(2)
					// 		.then(async (resp) => {
					// 			console.log("驾驶证--", resp);
					// 			if (!resp.success) {
					// 				this.scanningBoolen = true;
					// 				this.$message.error({ message: "OCR证件识别失败", duration: 3000 });
					// 				return;
					// 			}
					// 			if (this.httpform.onlineMode) {
					// 				webData.onsiteData.record.certificatePhoto = resp.body.scannerImage;
					// 			} else {
					// 				webData.offlineData.record.certificatePhoto = resp.body.scannerImage;
					// 			}
					// 			await Native.ocr(type)
					// 				.then((resp) => {
					// 					console.log("驾驶证--", resp);
					// 					if (!resp.success) {
					// 						this.scanningBoolen = true;
					// 						this.$message.error({ message: "OCR证件识别失败", duration: 3000 });
					// 						return;
					// 					}
					// 					this.respVal = resp.body;
					// 					this.jumpPage(type);
					// 				})
					// 				.catch((err) => {
					// 					this.scanningBoolen = true;
					// 					console.log(err, "OCR识别失败");
					// 				});
					// 		})
					// 		.catch((err) => {
					// 			this.scanningBoolen = true;
					// 			console.log(err, "证件扫描失败");
					// 		});
					// }
					break;
				case 2:
					{
							this.getOcr(3,type)

						// Native.idScanning(3)
						// 	.then(async (resp) => {
						// 		console.log("护照--", resp);
						// 		if (!resp.success) {
						// 			this.scanningBoolen = true;
						// 			this.$message.error({ message: "OCR证件识别失败", duration: 3000 });
						// 			return;
						// 		}
						// 		if (this.httpform.onlineMode) {
						// 			webData.onsiteData.record.certificatePhoto = resp.body.scannerImage;
						// 		} else {
						// 			webData.offlineData.record.certificatePhoto = resp.body.scannerImage;
						// 		}
						// 		await Native.ocr(type)
						// 			.then((resp) => {
						// 				console.log("护照--", resp);
						// 				if (!resp.success) {
						// 					this.scanningBoolen = true;
						// 					this.$message.error({ message: "OCR证件识别失败", duration: 3000 });
						// 					return;
						// 				}
						// 				this.respVal = resp.body;
						// 				this.jumpPage(type);
						// 			})
						// 			.catch((err) => {
						// 				this.scanningBoolen = true;
						// 				console.log(err, "OCR识别失败");
						// 			});
						// 	})
						// 	.catch((err) => {
						// 		this.scanningBoolen = true;
						// 		console.log(err, "证件扫描失败");
						// 	});
					}
					break;
				case -1:
					{
							webapi.idScanning(idScan).then(resp => {
				console.log(resp);
				console.log(resp.data.success);
				if (!resp.data.success) {
					this.scanningBoolen = true;
					this.$message.error({ message: "OCR证件识别失败 idScanning ", duration: 3000 });
					return;
				}
				this.scanningBoolen = true;
				if (this.httpform.onlineMode) {
					webData.onsiteData.record.certificatePhoto = resp.data.body.scannerImage;
				} else {
					webData.offlineData.record.certificatePhoto = resp.data.body.scannerImage;
				}
				this.jumpPage(type);
			}).catch(err => {
				console.log(err);
				this.$message.error({ message: '请求失败', duration: 3000 });
			})
						// Native.idScanning(3)
						// 	.then(async (resp) => {
						// 		console.log(resp, "idScanning3");
						// 		if (!resp.success) {
						// 			this.scanningBoolen = true;
						// 			this.$message.error({ message: "OCR证件识别失败", duration: 3000 });
						// 			return;
						// 		}
						// 		if (this.httpform.onlineMode) {
						// 			webData.onsiteData.record.certificatePhoto = resp.body.scannerImage;
						// 		} else {
						// 			webData.offlineData.record.certificatePhoto = resp.body.scannerImage;
						// 		}
						// 		this.jumpPage(type);
						// 	})
						// 	.catch((err) => {
						// 		this.scanningBoolen = true;
						// 		console.log(err, "--证件扫描失败");
						// 	});
					}
					break;
				default:
					break;
			}
		},
		 getOcr(idScan,type) {
			// this.$message.success({ message: `${type}请求开始`, duration: 3000 });
			webapi.idScanning(idScan).then(resp => {
				console.log(resp);
				console.log(resp.data.success);
				if (!resp.data.success) {
					this.scanningBoolen = true;
					this.$message.error({ message: "OCR证件识别失败 idScanning ", duration: 1000 });
					return;
				}
				// this.scanningBoolen = true;
				if (this.httpform.onlineMode) {
					webData.onsiteData.record.certificatePhoto = resp.data.body.scannerImage;
				} else {
					webData.offlineData.record.certificatePhoto = resp.data.body.scannerImage;
				}
				webapi.ocr(type).then(resp => {
					console.log(resp);
					if (!resp.data.success) {
						this.scanningBoolen = true;
						this.$message.error({ message: "OCR证件识别失败  ocr", duration: 1000 });
						return;
					}
					this.respVal = resp.data.body;
					this.jumpPage(type);
				}).catch(err => {
					this.scanningBoolen = true;
					this.$message.error({ message: '请求失败', duration: 1000 });

				})

			}).catch(err => {
				this.scanningBoolen = true;
				console.log(err);
				this.$message.error({ message: '请求失败', duration: 1000 });

			})
		},
		jumpPage(type) {
			this.scanningBoolen = true;
			if (this.httpform.onlineMode) {
				this.$router.push({ name: "onsiteTwo", params: { key: type, value: this.respVal } });
			} else {
				this.block();
				this.$router.push({ name: "offlineTwo", params: { key: type, value: this.respVal } });
			}
		},
		//定时读取二代身份证
		regular(type) {
			// this.respVal = {};
			Native.readIdCard()
				.then(async (resp) => {
					if (!resp.success) {
						return;
					}
					console.log(resp, "读取身份证信息");
					let nowTime = new Date().getTime();
					let time = new Date(resp.body.valid.slice(11, 21)).getTime();
					if (nowTime > time) {
						this.$message.error({ message: "证件已过期", duration: 3000 });
					}
					this.respVal = resp.body; //证件信息
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
						// this.$router.push("/onsiteHome/onsiteOne");
						this.$router.push({ name: "onsiteOne" });
					} else {
						// this.$router.push("/offlineHome/offlineOne");
						this.$router.push({ name: "offlineOne" });
					}
				});
		},
		async block() {
			let blockOBJ = {};
			blockOBJ.name = this.respVal.name;
			blockOBJ.idCard = this.respVal.code;
			blockOBJ.status = 1;
			await Native.getVisitors(JSON.stringify(blockOBJ))
				.then((resp) => {
					console.log("黑名单", resp);
					if (resp.body.list.length !== 0) {
						this.$message.error({ type: "warning", message: "此人在黑名单中", duration: 5000 });
						return;
					}
				})
				.catch((err) => {
					console.log(err, "查询黑名单失败");
				});
		},
	},
	beforeDestroy() {
		//Native.speakStop();
		clearInterval(this.regularTime);
		this.regularTime = null;
	},
	computed: {
		...mapState(["registrationInformation", "httpform"]),
	},
};
</script>
<style lang="scss" scoped>
.cartoon {
	position: relative;
	width: 100%;
	height: 100%;

	.cartoon-main {
		width: 100%;
		height: 100%;

		div {
			height: 20%;
			font-family: Source Han Sans CN;
			font-style: normal;
			font-weight: 900;
			font-size: 50px;
			line-height: 75px;
			text-align: center;
			color: #ff3d00;
			line-height: 120px;
		}

		div:nth-child(2) {
			height: 80%;
		}
	}

	.cartoon-foot {
		width: 100%;
		height: 100%;

		div {
			height: 15%;
			font-family: Source Han Sans CN;
			font-style: normal;
			font-weight: 900;
			font-size: 50px;
			line-height: 75px;
			text-align: center;
			color: #ff3d00;
			line-height: 120px;
		}

		div:nth-child(2) {
			height: 50%;
		}

		.readCard {
			height: 20%;
			display: flex;
			justify-content: center;
			align-items: center;

			p {
				position: absolute;
				bottom: 4.2%;
				width: 240px;
				font-size: 30px;
				color: #fff;

				span {
					animation: titleSize 1s infinite alternate;
				}
			}

			img {
				animation: titleSize 1s infinite alternate;
			}
		}
	}

	.cartoon_btn {
		position: absolute;
		width: 259px;
		right: 10%;
		bottom: 5%;

		p {
			position: absolute;
			top: 5%;
			width: 100%;
			left: 0%;
			font-family: Source Han Sans CN;
			font-style: normal;
			font-weight: bold;
			font-size: 55px;
			line-height: 90px;
			text-align: center;
			color: #ffffff;
		}
		img {
			width: 100%;
		}
	}
}

@keyframes titleSize {
	from {
		font-size: 25px;
		width: 10%;
	}

	to {
		font-size: 35px;
		width: 15%;
	}
}
</style>
