<template>
	<div class="offlineFour">
		<div class="offlineFour-main">
			<div class="offlineFour-div">
				<div class="offlineFour-div1">
					<el-row :gutter="24">
						<el-col :span="12">
							<span>姓 名：</span>
							<span>{{ visitInformation.name }}</span>
						</el-col>
						<el-col :span="12">
							<span>被访人姓名：</span>
							<span>{{ visitInformation.staffName }}</span>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="12">
							<span>性 别：</span>
							<span>{{ visitInformation.sex }}</span>
						</el-col>
						<el-col :span="12">
							<span>被访人部门：</span>
							<span>{{ visitInformation.staffCompany }}</span>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="12">
							<span>证件号码：</span>
							<span>{{ visitInformation.idCard }}</span>
						</el-col>
						<el-col :span="12">
							<span>来访事由：</span>
							<span>{{ visitInformation.staffPurpose }}</span>
						</el-col>
					</el-row>
				</div>
				<Debounce :time="4000" !isDebounce>
					<div class="offlineFour-div2" @click="onFace">
						<img :src="capturePhoto" alt="" />
						<p>抓拍人脸</p>
					</div>
				</Debounce>
			</div>
		</div>

		<div class="offlineFour-foot">
			<img :src="policePhoto" alt="" />
			<p class="offline-p1">温馨提示</p>
			<p class="offline-p2">1.信息确认无误后,点击<span style="color:red;">抓拍人脸</span>按钮。</p>
			<p class="offline-p3">2.请正视摄像头,保持人脸在面部框中。</p>
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
import Native from "../../API/native-api.js";
import webData from "../../utils/shuJu";
export default {
	data() {
		return {
			visitInformation: {
				name: "",
				sex: "",
				idCard: "",
				staffName: "",
				staffCompany: "",
				staffPurpose: "",
			},
			capturePhoto: require("../../assets/imgs/tijiao.png"),
			policePhoto: require("../../assets/imgs/bottom.png"),
		};
	},
	created() {
		this.visitInformation.name = webData.offlineData.visitor.name;
		this.visitInformation.sex = webData.offlineData.visitor.sex;
		this.visitInformation.idCard = webData.offlineData.visitor.idNumber;
		this.visitInformation.staffPurpose = webData.offlineData.record.purpose;
		this.visitInformation.staffName = webData.offlineData.staff.name;
		this.visitInformation.staffCompany = webData.offlineData.staff.department;
		console.log(webData.offlineData, "offline4的内容");
		this.speak();
	},
	mounted() {
		window.callback = (data) => {
			if (!data.success) {
				this.$message({ type: "warning", message: "抓拍不成功，请重试！" });
				return;
			}
			this._goTo(data);
		};
	},
	methods: {
		speak() {
			Native.speakStop();
			Native.speak("请确认您的登记信息是否有误，然后点击抓拍人脸按钮，将人脸居中。");
		},
		_goBack() {
			this.$router.push({ name: "offlineTwo" });
		},
		_goTo(data) {
			webData.offlineData.record.visitorHeadPhoto = data.body.head;
			webData.offlineData.record.visitorPhoto = data.body.fullPhoto;
			this.$router.push({ name: "offlineFive" });
		},
		onFace() {
			console.log(this.$route.query.data, "登记信息");
			console.log(webData.offlineData, "12--21");
			console.log(this.$store.state.certificatesType, "-----certificatesType");
			if (this.$store.state.certificatesType == 4) {
				Native.startFaceHandle(webData.offlineData.record.certificateHeadPhoto)
					.then((resp) => {
						if (!resp.success) {
							this.$message({ type: "warning", message: resp.msg });
							return;
						}
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				Native.startFaceHandle(null)
					.then((resp) => {
						if (!resp.success) {
							this.$message({ type: "warning", message: resp.msg });
							return;
						}
					})
					.catch((err) => {
						console.log(err);
					});
			}
		},
	},

	computed: {
		...mapState(["registrationInformation"]),
	},
};
</script>
<style lang="scss" scoped>
@mixin offlineFour {
	.offlineFour {
		width: 100%;
		height: 100%;

		.offlineFour-main {
			width: 100%;
			height: 55%;
			padding: 10px;
			box-sizing: border-box;
			.offlineFour-div {
				width: 90%;
				height: 100%;
				padding: 10px;
				font-size: 22px;
				font-weight: bold;
				margin-bottom: 3%;
				background: rgba(255, 255, 255, 0.66);
				border: 4px solid #2288f6;
				box-sizing: border-box;
				border-radius: 12px;
				transform: translate(6%);

				.offlineFour-div1 {
					height: 70%;
					.el-row {
						height: 28%;
						line-height: 60px;
						.el-col {
							span:nth-child(2) {
								color: #ff7b52;
								overflow: hidden;
							}
						}
					}
				}
				.offlineFour-div2 {
					position: relative;
					height: 30%;
					text-align: center;
					img {
						position: absolute;
						bottom: -11%;
						left: 28%;
					}
					p {
						position: absolute;
						bottom: 22%;
						left: 40%;
						font-family: Source Han Sans CN;
						font-style: normal;
						font-weight: bold;
						font-size: 40px;
						line-height: 60px;
						text-align: center;
						color: #e6f5fb;
					}
				}
			}
		}
		.offlineFour-foot {
			position: absolute;
			width: 763px;
			height: 272px;
			left: 143px;
			top: 480px;
			p {
				font-family: Source Han Sans CN;
				font-style: normal;
				color: #2888de;
			}
			.offline-p1 {
				position: absolute;
				left: 22%;
				right: 55.37%;
				top: 19.83%;
				bottom: 60%;
				font-weight: 900;
				font-size: 40px;
				line-height: 60px;
				text-align: center;
			}
			.offline-p2 {
				position: absolute;
				left: 22%;
				top: 42.95%;
				bottom: 8.33%;
				font-weight: bold;
				font-size: 30px;
				line-height: 45px;
			}
			.offline-p3 {
				position: absolute;
				left: 22%;
				top: 62.95%;
				bottom: 8.33%;
				font-weight: bold;
				font-size: 30px;
				line-height: 45px;
			}
		}
	}
}
@media screen and (min-width: 0px) {
	@include offlineFour;
}

/* 屏幕最大等于1024 */
@media screen and (min-width: 1024px) and (max-width: 1024px) {
	@include offlineFour;
}

/* 屏幕最大等于1920 */
@media screen and (min-width: 1920px) and (max-width: 1920px) {
	@include offlineFour;
	.offlineFour {
		.offlineFour-main {
			.offlineFour-div {
				.offlineFour-div2 {
					img {
						position: absolute;
						bottom: 0%;
						left: 38%;
					}
					p {
						left: 45%;
					}
				}
			}
		}

		.offlineFour-foot {
			position: absolute;
			width: 100%;
			left: 0;
			top: 70%;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 50%;
			}
			.offline-p1 {
				position: absolute;
				left: 35%;
				right: 55.37%;
				top: 19.83%;
				bottom: 60%;
				font-weight: 900;
				font-size: 40px;
				line-height: 60px;
				text-align: center;
			}
			.offline-p2 {
				position: absolute;
				left: 37%;
				top: 42.95%;
				bottom: 8.33%;
				font-weight: bold;
				font-size: 30px;
				line-height: 45px;
			}
			.offline-p3 {
				position: absolute;
				left: 37%;
				top: 62.95%;
				bottom: 8.33%;
				font-weight: bold;
				font-size: 30px;
				line-height: 45px;
			}
		}
	}
}
</style>
