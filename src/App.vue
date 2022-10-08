<template>
	<div id="app">
		<div class="firstAPP"
			:style="backgroundURL == '' ? note : { backgroundImage: 'url(' + note.backgroundURL + ')' }">
			<div class="firstAPP-head">
				<div class="firstAPP-div1" :style="$route.path == '/' ? 'display:none' : ''">
					<!-- <div v-if="$route.path !== '/onsiteHome' && $route.path !== '/offlineHome' && $route.path !== '/onsiteHome/onsiteFive' && $route.path !== '/offlineHome/offlineFive' && $store.state.scanBoolen" @click="backPage">
						<img src="./assets/imgs/back.png" alt="" />
					</div> -->
					<img class="group" src="./assets/imgs/Group 43.png" alt="" />
					<p v-for="(item, index) in $route.meta" :key="index" class="flex-center-center">{{ item }}</p>
					<div class="debug" @click="Jump()" v-if="debugBoolen">
						<el-button type="warning">调试</el-button>
					</div>
					<div class="iconfont icon-lianjiezhuangtai heart"
						v-if="httpform.onlineMode && $route.path == '/onsiteHome'"
						:style="heartBoolen ? 'color:#9ad824;' : 'color:red;'"></div>
				</div>
				<div :style="$route.path !== '/' ? 'display:none' : ''"></div>
				<div class="firstAPP-div2">
					<filterTime></filterTime>
				</div>
				<div class="firstAPP-div3 flex-center-center" @click="onSetting"
					:style="$route.path !== '/onsiteHome' && $route.path !== '/offlineHome' ? 'display:none;' : ''">
					<img src="./assets/imgs/设置.png" alt="" />
					<p>设置</p>
				</div>
			</div>
			<div class="firstAPP-main">
				<router-view></router-view>
			</div>
		</div>
		<template v-if="KeyboardSwitchBoolen">
			<vue-dusion-keyboard :blurHide="true" :float="false" observer hand-write-api leave-active-class bottom>
			</vue-dusion-keyboard>
		</template>
		<el-dialog title="调试" :visible.sync="consoleVisible">
			<dialogConsole></dialogConsole>
		</el-dialog>
		<!-- <Layout></Layout> -->
	</div>
</template>

<script>
import { mapState } from "vuex";
// import Layout from "./views/layout/index";
import filterTime from "./components/filterTime/index";
import dialogConsole from "./components/dialogConsole/index";
import Native from "./API/native-api";
import $ from "jquery";
import { isOperateFun } from "@/utils/isQperate";
export default {
	data() {
		return {
			winW: "",
			winH: "",
			inputValue: "",
			inputShow: false,
			model: "",
			bgurl: "",
			note: {
				backgroundImage: "url(" + require("./assets/imgs/background5.png") + ")",
			},
			tableBoolen: false,
			version: {
				edition: "1.0.0",
			},
			meet: {
				version: "1.0.0",
			},
			consoleVisible: false,
		};
	},
	created() {
		const self = this;
		isOperateFun(function (isOperate) {
			self.handleTimeout(isOperate);
		});
		this.$store.commit("getVersion", this.version);
		this.$store.commit("getMeet", this.meet);
		// this.winW = window.screen.width / 16 + "rem"; //获取屏幕分辨率Width
		// this.winH = window.screen.height / 16 + "rem"; //获取屏幕分辨率Height
	},

	mounted() {


	},
	destroy() {

	},
	methods: {
		handleTimeout(isOperate) {
			// console.log("handleTimeout---------", this.isOperate);
			// this.$store.commit("tableBG", this.$route.path);
			if (!isOperate) {
				if (this.$route.path == "/") {
					return;
				} else {
					if (this.httpform.onlineMode) {
						if (this.$route.path != "/onsiteHome") {
							// 非首页
							this.$router.push("/onsiteHome");
							// this.$store.commit("tableBG", "/home");
						}
					} else {
						if (this.$route.path != "/offlineHome") {
							// 非首页
							this.$router.push("/offlineHome");
							// this.$store.commit("tableBG", "/home");
						}
					}
				}
			} else {
				//store里设置的倒计时参数
				this.$store.dispatch("setTimeoutNum", this.$store.getters.timeoutNum - 1);
			}
			// store里设置isOperate首页里使用 true用户在操作  false长时间未操作处理
			this.$store.dispatch("setIsOperate", isOperate);
		},
		backPage() {
			if (this.$route.path == "/offlineHome" && this.$route.path == "/onsiteHome") {
				return;
			} else {
				this.$router.go(-1);
			}
		},
		async onSetting() {
			if (this.$route.path !== "/setting") {
				this.tableBoolen = true;
			}
			console.log("76--", document.getElementsByClassName("el-input__inner"));
			if (this.tableBoolen) {
				// await Native.speak("请输入管理员密码");
				this.$prompt("", "请输入管理员密码", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					inputPattern: /[0-9a-zA-Z]/,
					inputErrorMessage: "密码不正确",
					closeOnClickModal: false,
				})
					.then((data) => {
						if (data.value != this.password) {
							this.$message({ type: "warning", message: "密码不正确", duration: 5000 });
							return;
						}
						this.tableBoolen = false;
						this.$router.push({ name: "setting" });
						// this.$store.commit("tableBG", "/setting");
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
			}
		},
		async Jump() {
			console.log("调试-", window.$vConsole);
			window.$vConsole.show()

			// this.consoleVisible = true;
			// let resp = await Native.showDevTools();
			// console.log("调试-", resp);
			// if (window.$console) {
			// 	window.$console.show();

			// }
		},
		initVconsole() {
			let vConsole = this.vConsole;
			if (vConsole.isInited) {
				vConsole.destroy()
			}
			vConsole = new Vconsole()
			this.vConsole = vConsole;

			console.log('bbb', this.vConsole);
			// 修改调试工具默认开关位置
			localStorage.setItem("vConsole_switch_x", "-10")
			localStorage.setItem("vConsole_switch_y", "-10")
			// if(this.$vconsole.isInited){
			// 	this.$vconsole.destroy()
			// }
			this.vConsole.hideSwitch() // 隐藏调试工具默认开关 打开面板后失效
			this.vConsole.setOption('maxLogNumber', 5000);// 调式日志超出5000 清除
		}
	},
	watch: {

	},

	computed: {
		...mapState(["httpform", "heartBoolen", "password", "backgroundURL", "debugBoolen", "this.isOperate", "KeyboardSwitchBoolen", "getVersionList"]),
	},
	components: {
		// Layout,

		filterTime,
		dialogConsole
	},
};
</script>


<style lang="scss">
// @import "./assets/css/mini.scss";
@import "./assets/css/app.scss";

// vconsole 调试工具按钮  默认隐藏
// #__vconsole {
// 	display: none;
// }
.vc-switch {
	display: none;
}
.firstAPP {
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		overflow: hidden;
}

@mixin firstAPP {
	.firstAPP {
		width: 100%;
		height: 100%;
		// background: url("./assets/imgs/background5.png") no-repeat;
		background-size: 100% 100%;
		overflow: hidden;

		.firstAPP-head {
			width: 100%;
			height: 8%;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #888;
			box-sizing: border-box;

			.firstAPP-div1 {
				position: relative;
				width: 68%;

				div {
					position: absolute;
					width: 13%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.group {
					height: 100%;
					object-fit: cover;
				}

				p {
					position: absolute;
					top: 10%;
					left: 0%;
					width: 40%;
					font-size: 50px;
					color: #ffffff;
					font-family: Source Han Sans CN;
					font-weight: bold;
				}

				.debug {
					position: absolute;
					top: 0px;
					right: 10%;

					.el-button {
						margin-left: 13%;
					}
				}

				.heart {
					position: absolute;
					top: 0px;
					right: 0px;
					font-size: 70px;
				}
			}

			.firstAPP-div2 {
				width: 17%;
			}

			.firstAPP-div3 {
				width: 10%;

				color: #2888de;

				p {
					font-size: 35px;
					font-weight: bold;
				}
			}
		}

		.firstAPP-main {
			width: 100%;
			height: 92%;
			background: url("./assets/imgs/background5.png") no-repeat;
			background-size: 100% 100%;
		}
	}
}

@media screen and(min-width:1024px) and(max-width:1024px) {
	@include firstAPP;

	.firstAPP {
		.firstAPP-head {
			.firstAPP-div1 {
				p {
					font-size: 35px;
				}
			}

			.firstAPP-div3 {
				p {
					font-size: 25px;
				}
			}
		}
	}
}

@media screen and(min-width:1920px) and(max-width:1920px) {
	@include firstAPP;
}
</style>
