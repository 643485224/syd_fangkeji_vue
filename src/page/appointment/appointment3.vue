<template>
	<div class="apponintmentThree">
		<div class="apponintmentThree-main">
			<div class="apponintmentThree-div">
				<div class="apponintmentThree-div1">
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
				<Debounce :time="2000" >
					<div class="apponintmentThree-div2" @click="onFace">
						<img src="../../assets/imgs/tijiao.png" alt="" />
						<p>抓拍人脸</p>
					</div>
				</Debounce>
			</div>
		</div>
		<div class="apponintmentThree-foot">
			<img src="../../assets/imgs/bottom.png" alt="" />
			<p class="offline-p1">温馨提示</p>
			<p class="offline-p2">1.信息确认无误后,点击抓拍人脸按钮。</p>
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
		};
	},
	created() {
		//this.voicePrompt("确认登记信息后,然后点击抓拍人脸！");
		// this.visitInformation.name = this.registrationInformation.visitor.name;
		// this.visitInformation.sex = this.registrationInformation.visitor.sex;
		// this.visitInformation.idCard = this.registrationInformation.visitor.idNumber;
		// this.visitInformation.staffPurpose = this.registrationInformation.record.purpose;
		// this.visitInformation.staffName = this.registrationInformation.staff.name;
		// this.visitInformation.staffCompany = this.registrationInformation.staff.department;
		this.visitInformation.name = webData.onsiteData.visitor.name;
		this.visitInformation.sex = webData.onsiteData.visitor.sex;
		this.visitInformation.idCard = webData.onsiteData.visitor.idNumber;
		this.visitInformation.staffPurpose = webData.onsiteData.record.purpose;
		this.visitInformation.staffName = webData.onsiteData.staff.name;
		this.visitInformation.staffCompany = webData.onsiteData.staff.department;

		window.callback = (data) => {
			if (data.success) {
				webData.onsiteData.record.certificateHeadPhoto = data.body.head;
				this.$store.commit("newRegistrant", this.registrationInformation);
				this.$router.push({ name: "appointmentFour", params: { value: data.body.head } });// 跳转打印来访信息页面
			} else {
				this.$message({ type: "warning", message: "抓拍不成功，请重试！", duration: 5000 });
			}
		};
	},
	methods: {
		async onFace() {  // 点击抓拍人脸按钮
			if (this.$store.state.certificatesType == 5) {
				Native.startFaceHandle(webData.onsiteData.record.certificateHeadPhoto)
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
		_goBack() {
			// 返回
			this.$router.push({ name: "appointment" });
		},
	},
	computed: {
		...mapState(["registrationInformation"]),
	},
};
</script>
<style lang="scss" scoped>
.apponintmentThree {
	width: 100%;
	height: 100%;

	.apponintmentThree-head {
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
	.apponintmentThree-main {
		width: 100%;
		height: 55%;
		padding: 10px;
		box-sizing: border-box;
		.apponintmentThree-div {
			width: 90%;
			height: 100%;
			padding: 10px;
			font-size: 50px;
			font-weight: bold;
			margin-bottom: 3%;
			background: rgba(255, 255, 255, 0.66);
			border: 4px solid #2288f6;
			box-sizing: border-box;
			border-radius: 12px;
			transform: translate(6%);

			.apponintmentThree-div1 {
				height: 70%;
				.el-row {
					height: 28%;
					line-height: 130px;
                    font-size: 30px;
					.el-col {
						span:nth-child(2) {
							color: #ff7b52;
							overflow: hidden;
						}
					}
				}
			}
			.apponintmentThree-div2 {
				position: relative;
				height: 30%;
				text-align: center;
				img {
					position: absolute;
					bottom: 0%;
					left: 38%;
				}
				p {
					position: absolute;
					bottom: 22%;
					left: 45%;
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
	.apponintmentThree-foot {
		position: absolute;
		width: 100%;
		left: 0;
		top: 65%;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 50%;
		}
		p {
			font-family: Source Han Sans CN;
			font-style: normal;
			color: #2888de;
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
</style>
