<template>
	<div class="login_container">
		<p>欢迎使用智能访客登记系统</p>
		<!-- <div id="form_box">
         <h4>即将自动跳转,亲稍后</h4>
        </div> -->
		<div id="form_box">
			<!-- <el-form ref="form" :model="form" label-width="80px" class="login-form"> -->
			<!-- <h2 class="login-title" v-if="confirmPassword == ''"><span>初始设置-设置管理密码</span></h2>
				<h2 class="login-title" v-if="confirmPassword !== ''"><span></span></h2>
				<el-input type="password" class="login-input" prefix-icon="iconfont icon-mima" placeholder="请输入管理密码" v-model="form.username" data-mode="num" v-if="confirmPassword == ''"></el-input>
				<el-input type="password" class="login-input" prefix-icon="iconfont icon-mima" placeholder="请确认管理密码" v-model="form.password" data-mode="num"></el-input> -->

			<el-button type="primary" @click="onSubmits" class="login-button">直接进入</el-button>

			<!-- </el-form> -->
		</div>
		<div class="animation" v-if="animationBoolen">
			<img src="../../assets/imgs/animation_300_koe69do5.gif" alt="" />
		</div>
		<div class="login-foot">
			<p class="login-p1">温馨提示:</p>
			<p class="login-p2">智能访客登记系统是一款集成了人证合一访客登记、登记打印、身份证、驾驶证、护照扫描识别,提取证件信息和人像对比的客户端。</p>
		</div>
		<div class="time_box">
			<filterTime></filterTime>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import Native from "../../API/native-api.js";
import filterTime from "../../components/filterTime/index";

export default {
	data() {
		return {
			form: {
				username: "",
				password: "",
			},
			animationBoolen: false,
			confirmPassword: "",
			ipform: {
				ipAddress: "",
				port: "",

				domainName: "",
				onlineMode: false,
				mac: "", //mac地址
				poolCode: "12345678", //注册码
				enckey: "0123456789ABCDEF0123456789ABCDEF", //秘钥
			},
		};
	},
	created() {
		if(!this.$store.state.password){
            this.$store.commit("assignment", "1111")
        };
		this.confirmPassword = JSON.parse(JSON.stringify(this.$store.state.password));
		// this.ipform = JSON.parse(JSON.stringify(this.httpform));
		// console.log(JSON.parse(localStorage.getItem("onlineMode")), "-----------------------");
		// this.ipform = JSON.parse(localStorage.getItem("onlineMode")) == null ? JSON.parse(JSON.stringify(this.httpform)) : JSON.parse(localStorage.getItem("onlineMode"));
	},
	beforeMount() {},
	mounted() {
		console.log(this.httpform.onlineMode, "--");
		window.callbackFrameLoaded = () => {
			this.init();
		};
	},
	methods: {
		async init() {
			let resp = await Native.init();
			console.log("软件初始化", resp);
			if (resp.success) {
				console.log("初始化完成");
				this.animationBoolen = false;
				let res = await Native.getVersion();
				if (res.success) {
					this.$store.commit("getMeet", res.body);
				} else {
					this.$message({ message: resp.msg, type: "warning" });
				}
				if (this.confirmPassword == "" || this.confirmPassword.length == 0) {
					return;
				}
			} else {
				this.animationBoolen = false;
				this.$message({ message: resp.msg, type: "warning" });
			}
		},
		onSubmits() {
			// 点击"直接进入"按钮进入首页

			this.$router.push({ name: "onsiteHome" });
		},

		//    onSubmits(){
		//        this.$router.push({ name: "onsiteHome" });
		//    },
		//         onSubmits(){
		//             var pidName = document.getElementById('pidName');
		//             var timer =5;
		//             if(timer == 0){
		//
		//             }else{
		//            pidName.innerHTML=
		//            timer--;
		//             }

		//         1000},
		onSubmit() {
			if (this.confirmPassword == "") {
				if (this.form.username == "" || this.form.password == "") {
					this.$message({ message: "密码不能为空！", type: "warning" });
				} else if (this.form.username == this.form.password) {
					if (this.httpform.onlineMode) {
						this.$router.push({ name: "onsiteHome" });
					} else {
						// 	// this.$router.push("/offlineHome");
						this.$router.push({ name: "offlineHome" });
					}

					this.$store.commit("assignment", this.form.password);
				} else {
					this.$message({ message: "两次密码不一致,请重新输入！", type: "warning" });
				}
			} else {
				if (this.confirmPassword == this.form.password) {
					if (this.httpform.onlineMode) {
						this.$router.push({ name: "onsiteHome" });
					} else {
						// this.$router.push("/offlineHome");
						this.$router.push({ name: "offlineHome" });
					}
				} else {
					this.$message({ message: "管理员密码错误", type: "warning" });
				}
			}
		},
		confirmSubmit() {
			if (this.confirmPassword == this.form.password) {
				if (this.httpform.onlineMode) {
					this.$router.push({ name: "onsiteHome" });
				} else {
					this.$router.push({ name: "offlineHome" });
				}
			} else {
				this.$message({ message: "管理员密码错误", type: "warning" });
			}
		},
	},
	computed: {
		...mapState(["password", "httpform"]),
	},
	components: {
		filterTime,
	},
};
</script>

<style lang="scss" scoped>
@mixin login {
	.login_container {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background: url("../../assets/imgs/background5.png") no-repeat;
		background-size: 100% 100%;
		overflow: hidden;

		p:nth-child(1) {
			position: absolute;
			top: 3rem;
			width: 100%;
			text-align: center;
			font-size: 40px;
			font-weight: bold;
		}

		.el-form {
			background: url("../../assets/imgs/login.png") no-repeat;
			background-size: 100% 100%;
		}

		#form_box {
			position: absolute;
			left: 50%;
			top: 40%;
			width: 40%;
			height: 40%;
			transform: translate(-50%, -50%);
			-webkit-transform: translate(-50%, -50%);

			.login-form {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				background: url("../../assets/imgs/login.png") no-repeat;
				background-size: 100% 100%;
				border-radius: 20px;
				padding: 40px;
				box-sizing: border-box;

				.login-title {
					color: #808080;
					text-align: center;
					// margin-bottom: 20px;

					span {
						font-size: 30px;
						margin-left: 20px;
					}
				}

				.login-input {
					::v-deep .el-input__inner {
						height: 40px;
						line-height: 40px;
						border-radius: 10px;
						padding-left: 50px;
						font-size: 25px;
					}

					::v-deep .el-input__prefix {
						.iconfont {
							font-size: 30px;
							line-height: 40px;
						}
					}
				}
				// .login-button {
				// 	width: 100%;
				// 	border-radius: 10px;
				// 	margin-bottom: 15%;
				// 	::v-deep span {
				// 		font-size: 28px;
				// 	}
				// }
			}
			::v-deep .login-button {
				height: 120px;
				border-radius: 60px;
			}
		}

		.animation {
			position: fixed;
			background-color: #fff;
			z-index: 1000;
			width: 100%;
			height: 100%;

			img {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				-webkit-transform: translate(-50%, -50%);
			}
		}

		.login-foot {
			position: absolute;
			left: 50%;
			bottom: 0%;
			width: 70%;
			height: 30%;
			transform: translate(-30%, 0%);
			-webkit-transform: translate(-30%, 0%);
			background: url("../../assets/imgs/bottom.png") no-repeat;
			// background-size: 100% 100%;

			p {
				font-family: Source Han Sans CN;
				font-style: normal;
				color: #2888de;
			}

			.login-p1 {
				position: absolute;
				left: 20%;
				top: 14.83%;
				width: 25%;
				font-weight: 900;
				font-size: 40px;
				line-height: 60px;
			}

			.login-p2 {
				position: absolute;
				left: 20%;
				top: 40%;
				text-indent: 3rem;
				font-weight: bold;
				font-size: 24px;
				line-height: 45px;
			}

			.login-p3 {
				position: absolute;
				left: 22%;
				top: 62.95%;
				bottom: 8.33%;
				font-weight: bold;
				font-size: 30px;
				line-height: 45px;
			}
		}

		.time_box {
			position: absolute;
			top: 3%;
			right: 3%;
		}
	}
}


@media screen and (min-width: 0px) {
	@include login;
}

/* 屏幕最大等于1920 */
@media screen and (min-width: 1920px) and (max-width: 1920px) {
	@include login;

	.login_container {
		p:nth-child(1) {
			font-size: 65px;
		}

		#form_box {
			top: 40%;
			width: 30%;
			height: 40%;

			.login-form {
				padding: 60px;
				font-size: 35px;

				.login-title {
					line-height: 60px;
					span {
						font-size: 40px;
					}
				}

				.login-input {
					::v-deep .el-input__inner {
						height: 60px;
						line-height: 60px;
						font-size: 35px;
					}
					::v-deep .el-input__prefix {
						.iconfont {
							font-size: 40px;
							line-height: 60px;
						}
					}
				}
			}
		}

		.login-foot {
			.login-p1 {
				left: 5%;
				font-size: 40px;
			}

			.login-p2 {
				left: 10%;
				top: 35%;
				width: 625px;
				text-indent: 4rem;
				font-size: 30px;
			}
		}
	}
}

@media screen and (min-width: 1024px) and (max-width: 1024px) {
	@include login;
	.login_container {
		position: absolute;
		.login-foot {
			position: absolute;
			left: 15%;
			bottom: 5%;
			width: 70%;
			height: 30%;
			transform: translate(0%, 0%);
			-webkit-transform: translate(0%, 0%);
			background: url("../../assets/imgs/bottom.png") no-repeat;
		}
	}
}
</style>
