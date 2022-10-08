<template>
	<div class="checkout">
		<div class="checkout-main">
			<ul>
				<li>
					<p>请把身份证放入二代证阅读区签离</p>
					<p>使用凭条激光签离</p>
				</li>
				<li>
					<img :src="photoOne" alt="" />
				</li>
			</ul>
		</div>
		<div class="call_black flex-center-center">
			<div @click="_goBack()">
				<img src="../../assets/imgs/Rectangle 33.png" alt="" />
				<p class="flex-center-center">返回</p>
			</div>
		</div>
	</div>
</template>
<script>
import Native from "../../API/native-api.js";
import APP from "../../webapi/modules/webapi.js";
import photoOne from "../../assets/imgs/签离.gif";
import { mapState } from "vuex";
export default {
	data() {
		return {
			checkoutObject: {},
			photoOne,
		};
	},
	created() {
		this.regularTime = setInterval(() => {
			this.regular();
		}, 2000);
	},
	mounted() {
		window.callbackQrcode = (data) => {
			console.log("二维码", data);
			if (data == "" && data.length == 0) {
				return;
			}
			if (this.httpform.onlineMode) {
				this.onsiteCheckout(data);
			} else {
				this.offlineCheckout(null, data);
			}
		};
	},
	methods: {
		_goBack() {
			// 返回
			if (this.httpform.onlineMode) {
				this.$router.push({ name: "onsiteHome" });
			} else {
				this.$router.push({ name: "offlineHome" });
			}
		},
		onsiteCheckout(data) {
			APP.leaveVisitor(data, null, null, null)
				.then((resp) => {
					console.log("在线签离", resp);
					if (resp.data.code !== 200) {
						this.$message({ type: "warning", message: "签离失败！" });
						return;
					}
					this.$message({ type: "success", message: "签离成功" });
		            this.$router.push({ name: "onsiteHome" });

				})
				.catch((err) => {
					console.log(err, "在线签离失败");
				});
		},
		offlineCheckout(idCard, timeIn) {
			console.log(idCard, timeIn, "签离");
			// if (idCard) {
			// 	//刷身份证，签离对象id为证件号
			// 	this.checkoutObject.id = idCard;
			// }
			// if (timeIn) {
			// 	//扫二维码，签离对象id使用 getRecordsByFullCondition 获取的信息
			// 	this.checkoutObject.id = timeIn;
			// }
			this.checkoutObject.timeOut = new Date().toLocaleString();

			Native.getRecordsByFullCondition(JSON.stringify({ idCard: idCard }), JSON.stringify({}), JSON.stringify({ id: timeIn }))
				.then(async (resp) => {
					console.log(resp, "查询记录");
					if (!resp.success) {
						this.$message({ type: "warning", message: "签离失败！" });
						return;
					}
					if (resp.body.records.length == 0) {
						this.$message({ type: "warning", message: "查无此人登记记录，签离失败！" });
						return;
					}

					for (let i = 0; i < resp.body.records.length; i++) {
						if (resp.body.records[i].timeOut == "") {
							this.checkoutObject.id = resp.body.records[i].id
						}
					}
					if (!this.checkoutObject.id) {
						this.$message({ type: "warning", message: "已签离，请勿重复签离！" });
						return
					}

					// if (timeIn) {
					//扫二维码，签离对象id使用 getRecordsByFullCondition 获取的信息
					// this.checkoutObject.id = resp.body.records[resp.body.records.length - 1].id;
					// }

					Native.checkOut(JSON.stringify(this.checkoutObject))
						.then((res) => {
							if (!res.success) {
								this.$message({ type: "warning", message: "签离失败！" });
								return;
							}
							this.checkoutObject = {};
							this.$router.push({ name: "offlineHome" });
							this.$message({ type: "success", message: "签离成功!" });
						})
						.catch((err) => {
							console.log(err, "checkOut错误");
						});
				})
				.catch((err) => {
					console.log(err, "getRecordsByFullCondition失败");
				});
		},
		//定时读取二代身份证
		async regular() {
			this.respVal = {};
			Native.readIdCard()
				.then(async (resp) => {
					console.log(resp, "读取身份证");
					if (!resp.success) {
						return;
					}
					if (this.httpform.onlineMode) {
						this.onsiteCheckout(resp.body.code);
					} else {
						this.offlineCheckout(resp.body.code, null);
					}
				})
				.catch((err) => {
					this.$message({type:'warning',message: "读卡失败"})
					console.log(err, "readIdCard失败");
				});
		},
	},
	beforeDestroy() {
		clearInterval(this.regularTime);
		this.regularTime = null;
	},
	components: {},
	computed: {
		...mapState(["httpform"]),
	},
};
</script>
<style lang="scss" scoped>
.checkout {
	width: 100%;
	height: 100%;

	.checkout-main {
		height: 100%;
		text-align: center;

		ul {
			margin: auto;
			height: 100%;

			li {
				font-family: Source Han Sans CN;
				font-style: normal;
				font-weight: 900;
				font-size: 50px;
				line-height: 75px;

				text-align: center;

				color: #ff3d00;
			}

			li:nth-child(1) {
				height: 30%;

				p {
					height: 50%;
					line-height: 100px;
				}
			}

			li:nth-child(2) {
				height: 70%;
			}
		}
	}

	.call_black {
		right: 0%;
		width: 100%;
	}
}
</style>
