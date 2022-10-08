<template>
	<div class="offline">
		<div class="offline-head" v-if="disposesForm.miscellaneous.miscellaneous_subtitle && textTitle !== ''">
			<marquee scrollamount="8" scrolldelay="30" direction="left" onmouseover="this.stop()" onmouseout="this.start()">
				{{ textTitle }}
			</marquee>
		</div>
		<div class="offline-main">
			<ul>
				<Debounce :time="2000">
					<li @click="onQuery">
						<img :src="photoOne" alt="" />
						<p class="record-top">来访记录</p>
						<p class="record-bottom">Visit`s record</p>
					</li>
				</Debounce>
				<Debounce :time="2000">
					<li @click="onCheckin">
						<img :src="photoTwo" alt="" />
						<p class="registration-top">访客登记</p>
						<p class="registration-bottom">Visitor registration</p>
					</li>
				</Debounce>
				<Debounce :time="2000">
					<li @click="onCheckout" v-if="disposesForm.miscellaneous.miscellaneous_checkout">
						<img :src="photoThree" alt="" />
						<p class="checkout-top">访客签离</p>
						<p class="checkout-bottom">Visitor check out</p>
					</li>
				</Debounce>
			</ul>
		</div>
		<div class="offline-foot">
			<div>
				<img src="../../assets/imgs/bottom.png" alt="" />
				<p class="offline-p1">温馨提示</p>
				<p class="offline-p2">1.如果您需要访问人员，请点击<span style="color:red;">访客登记</span>。</p>
				<p class="offline-p3">2.如果您已访问完毕，请点击<span style="color:red;">访客签离</span>。</p>
			</div>
		</div>
	</div>
</template>
<script>
import photoOne from "../../assets/imgs/FKJL1.png";
import photoTwo from "../../assets/imgs/FKDJ1.png";
import photoThree from "../../assets/imgs/FKQL.png";
import { mapState } from "vuex";
import Native from "../../API/native-api";
import $ from "jquery";
import webData from "../../utils/shuJu";
webData;
export default {
	data() {
		return {
			photoOne,
			photoTwo,
			photoThree,
			Timer: null,
			offlineReductionData: {
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
		};
	},
	created() {
		webData.offlineData = JSON.parse(JSON.stringify(webData.reduction)); //回到证件登记清空值
		console.log(webData.offlineData, "清空后的");
		this.Timer = setInterval(() => {
			this.regular();
		}, 2000);
	},
	methods: {
		async onQuery() {
			this.$prompt("", "请输入管理员密码", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				inputPattern: /[0-9a-zA-Z]/,
				inputErrorMessage: "密码不正确",
				closeOnClickModal:false,
			}).then((data) => {
				if (data.value != this.password) {
					this.$message({ type: "warning", message: "密码不正确" });
					return;
				}
				this.$router.push("/setting/settingFour");
			});
			if (document.getElementsByClassName("el-input__inner").length == 1) {
				$(".el-input__inner")[0].setAttribute("type", "password");
				document.getElementsByClassName("el-input__inner")[0].setAttribute("data-mode", "num");
			} else if (document.getElementsByClassName("el-input__inner").length == 2) {
				$(".el-input__inner")[1].setAttribute("type", "password");
				document.getElementsByClassName("el-input__inner")[1].setAttribute("data-mode", "num");
			} else if (document.getElementsByClassName("el-input__inner").length == 5) {
				$(".el-input__inner")[4].setAttribute("type", "password");
				document.getElementsByClassName("el-input__inner")[4].setAttribute("data-mode", "num");
			} else if (document.getElementsByClassName("el-input__inner").length == 6) {
				$(".el-input__inner")[5].setAttribute("type", "password");
				document.getElementsByClassName("el-input__inner")[5].setAttribute("data-mode", "num");
			} else if (document.getElementsByClassName("el-input__inner").length == 9) {
				$(".el-input__inner")[8].setAttribute("type", "password");
				document.getElementsByClassName("el-input__inner")[8].setAttribute("data-mode", "num");
			} else if (document.getElementsByClassName("el-input__inner").length == 19) {
				$(".el-input__inner")[18].setAttribute("type", "password");
				document.getElementsByClassName("el-input__inner")[18].setAttribute("data-mode", "num");
			}
		},
		onCheckin() {
			this.$router.push({ name: "offlineOne" });
		},
		onCheckout() {
			this.$router.push({ name: "checkout" });
		},
		regular() {
			Native.readIdCard()
				.then((resp) => {
					if (!resp.success) {
						return;
					}
					Native.speakStop();
					Native.speak("请您选择访客登记或者访客签离");
					clearInterval(this.Timer);
					this.Timer = setInterval(() => {
						this.regular();
					}, 7000);
				})
				.catch((err) => {
					console.log(err, "读取身份证错误");
				});
		},
	},
	beforeDestroy() {
		clearInterval(this.Timer);
		this.Timer = null;
	},
	computed: {
		...mapState(["textTitle", "disposesForm", "password"]),
	},
};
</script>

<style lang="scss" scoped>
@mixin offline {
	.offline {
		width: 100%;
		height: 100%;
		font-style: normal;
		font-family: Source Han Sans CN;
		font-weight: bold;
		.offline-head {
			position: absolute;
			top: 9%;
			width: 100%;
			line-height: 50px;
			font-size: 36px;
			background: #ffeeda;
			color: #ff5301;
			padding: 0px 5px;
			box-sizing: border-box;
		}
		.offline-main {
			width: 100%;
			height: 60%;
			ul {
				position: absolute;
				left: 50%;
				top: 40%;
				transform: translate(-50%, -50%);
				-webkit-transform: translate(-50%, -50%);
				display: flex;
				justify-content: space-between;
				li {
					position: relative;
					p {
						position: absolute;
						width: 100%;
						font-style: normal;

						font-weight: bold;
						color: #ffffff;
					}
				}
				li:nth-child(1) {
					.record-top {
						left: 10%;
						top: 50%;
						font-size: 36px;
						transform: rotate(6deg);
					}
					.record-bottom {
						left: 8%;
						top: 65%;
						font-size: 22.6888px;
						transform: rotate(6deg);
					}
				}
				li:nth-child(2) {
					.registration-top {
						left: 0%;
						top: 50%;
						font-size: 40px;
						text-align: center;
					}
					.registration-bottom {
						left: 0%;
						top: 70%;
						font-size: 22.6888px;
						text-align: center;
					}
				}
				li:nth-child(3) {
					.checkout-top {
						left: 25%;
						top: 50%;
						font-size: 36px;
						transform: rotate(-5deg);
					}
					.checkout-bottom {
						height: 34px;
						left: 5%;
						top: 65%;
						font-size: 22.6888px;
						transform: rotate(-6deg);
					}
				}
			}
		}
		.offline-foot {
			width: 100%;
			height: 40%;
			div {
				position: relative;
				left: 50%;
				bottom: 0%;
				width: 100%;
				text-align: center;
				transform: translate(-50%, 0%);
				-webkit-transform: translate(-50%, 0%);

				p {
					position: absolute;
					transform: translate(-50%, -50%);
					-webkit-transform: translate(-50%, -50%);
					// width: 100%;
					line-height: 60px;
					font-family: Source Han Sans CN;
					font-weight: bold;
					font-style: normal;
					color: #2888de;
				}
				.offline-p1 {
					left: 42%;
					top: 25%;
					font-size: 40px;
				}
				.offline-p2 {
					left: 54%;
					top: 50%;
					font-size: 30px;
				}
				.offline-p3 {
					left: 53.2%;
					top: 75%;
					font-size: 30px;
				}
			}
		}
	}
}
@media screen and (min-width: 0px) {
	@include offline;
}

/* 屏幕最大等于1024 */
@media screen and (min-width: 1024px) and (max-width: 1024px) {
	@include offline;
	.offline {
		.offline-foot {
			div {
				.offline-p2 {
					left: 57%;
					width: 600px;
					font-size: 30px;
				}
				.offline-p3 {
					left: 55.5%;
					width: 600px;
					font-size: 30px;
				}
			}
		}
	}
}

/* 屏幕最大等于1920 */
@media screen and (min-width: 1920px) and (max-width: 1920px) {
	@include offline;
	.offline {
		.offline-main {
			width: 100%;
			height: 65%;
			ul {
				width: 60%;
				height: 45%;
				li {
					width: 100%;
					height: 100%;
					img {
						width: 100%;
						height: 100%;
						object-fit: contain;
					}
				}
				li:nth-child(1) {
					.record-top {
						height: 78px;
						left: 13%;
						top: 50%;
						font-size: 72px;
						line-height: 78px;
					}
					.record-bottom {
						height: 50px;
						left: 15%;
						top: 67%;
						font-size: 38px;
						line-height: 50px;
					}
				}
				li:nth-child(2) {
					.registration-top {
						height: 70px;
						left: 0%;
						top: 53%;
						font-size: 72px;
						line-height: 70px;
					}
					.registration-bottom {
						height: 80px;
						left: 0%;
						top: 67%;
						font-size: 38px;
						line-height: 80px;
					}
				}
				li:nth-child(3) {
					.checkout-top {
						height: 72px;
						left: 10%;
						top: 50%;
						font-size: 72px;
						line-height: 72px;
					}
					.checkout-bottom {
						height: 38px;
						left: 9%;
						top: 69%;
						font-size: 35px;
						line-height: 38px;
					}
				}
			}
		}
	}
}
</style>
