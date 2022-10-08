import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Router from "vue-router";
import Element from "element-ui";
import axios from "./utils/http";
import "element-ui/lib/theme-chalk/index.css";
import Vuex from "vuex";
import { mapState } from "vuex";
import APP from "./webapi/modules/webapi";
import Native from "./API/native-api";
import { Base64 } from "js-base64";
import AES from "@/utils/secure";
import store from "./store/store.js";
import "default-passive-events"; //解决 non-passive event listener
import "@/assets/css/iconfont/iconfont.css";
import "./assets/css/common.scss"; //公共css
import VueDusionKeyboard from "vue-dusion-keyboard"; //键盘
import VueI18n from "vue-i18n";
import Debounce from "@/utils/storage"; //防抖节流
import Create from "./utils/create.js";
import Alert from "./components/alert/alert";
import "@/assets/css/pubilce.scss"; //全局element scss
import voicePromptFun from "./utils/voicePrompt";
import VConsole from "vconsole";
import "./assets/css/elementui-cover/index.scss"; //elementui样式覆盖

// import dialogComponent from "./onsite/onsite3";

Vue.prototype.voicePrompt = voicePromptFun; //语音提醒
// Vue.prototype.$vConsole = VConsole; // 调试工具

Vue.prototype.$Alert = (obj) => {
	//挂载在原型上
	return Create(Alert, obj).show(); //返回组件实例
};


Vue.component("Debounce", Debounce);
Vue.use(VueI18n);
Vue.use(Element);
Vue.use(Vuex);
Vue.use(axios);
// Vue.use(dialogComponent);
Vue.use(VueDusionKeyboard); //全局注册手写库地址
Vue.use(VueDusionKeyboard, { handWriteApi: "http://jsrtj.fotoit.cn/iis/keyboard-demo/" }); //手写不能使用查看handWriteApi还能否使用
Vue.config.productionTip = false; //阻止启动生产消息，常用作指令。
const originalPush = Router.prototype.push; //解决路由跳转bug
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};
const i18n = new VueI18n({
	locale: "zh-CN", // 将要切换的语言，可以通过url拼的参数获取，用户行为select选择获取，本地manifest配置获取等，根据场景动态获取
	messages: {
		"zh-CN": require("../src/assets/languages/ch.json"), // 本地资源文件，我这里配2个语言，中文&英文，src下根据个人情况放置
		"en-US": require("../src/assets/languages/en.json"),
	},
});

new Vue({
	el: "#app",
	i18n,
	router,
	store,
	data() {
		return {
			ipform: {
				ipAddress: "",
				port: "",
				domainName: "",
				onlineMode: false,
				mac: "", //mac地址
				poolCode: "", //注册码
				enckey: "", // 秘钥
				secretkey: "",

				heartbeatSessionId: 0,
				heartbeatSequence: 1,
			},
			unregisterSetTimeout: null,
			registerSetTimeout: null,
			heartbeatSetTimeout: null,
		};
	},
	watch: {
		debugBoolen: function (newVal, oldVal) {
			console.log('debugBoolean修改', newVal, oldVal);
			this.controlVconsole(newVal)
		}
	},
	created() {
		this.ipform = JSON.parse(JSON.stringify(this.httpform));
		window.callbackFrameLoaded = async () => {
			console.log('callbackFrameLoaded',this.httpform.ipAddress);
			if (this.httpform.onlineMode) {
				this.initData()
			}
		};
		this.controlVconsole(this.$store.state.debugBoolen)
	},
	mounted() { },
	methods: {
		async initData(){
			await this.getInfo();
			this.unregister();
		},
		async getInfo() {
			console.log("执行了info");
			let resp = await Native.getInfo();
			this.ipform.mac = resp.body.Mac;
			this.ipform.secretkey = Base64.encode(AES.encrypt(this.ipform.poolCode) + ":" + this.ipform.mac);
			console.log(this.ipform.secretkey);
			this.$store.commit("http", JSON.parse(JSON.stringify(this.ipform)));
			console.log('change ipAddress',this.httpform);

		},
		unregister() {
			window.clearTimeout(this.unregisterSetTimeout);
			window.clearTimeout(this.registerSetTimeout);
			console.log("执行了unregister");

			APP.unregister()
				.then((res) => {
					console.log("注销", res);
					if (res.data.code !== 200) {
						this.unregisterSetTimeout = window.setTimeout(this.unregister, 10000);
						return;
					}
					window.clearTimeout(this.unregisterSetTimeout);
					this.register();
				})
				.catch((err) => {
					this.$store.commit("heart", false);
					console.log(err, "注销失败");
				});
		},
		async register() {
			console.log('register');
			APP.register()
				.then((res) => {
					console.log("注册", res);
					if (res.data.code !== 200) {
						this.$store.commit("heart", false);
						this.registerSetTimeout = window.setTimeout(this.unregister, 10000);
						return;
					}
					APP.Increment(res.data.sessionId);
					APP.boxIn(res.data.info.boxInfo);

					this.heartbeat();
				})
				.catch((err) => {
					this.$store.commit("heart", false);
					console.log(err, "注册失败");
				});
		},
		heartbeat() {
			window.clearTimeout(this.heartbeatSetTimeout);
			APP.heartbeat()
				.then((res) => {
					console.log("心跳", res);

					if (res.data.code !== 200) {
						this.$store.commit("heart", false);
						this.unregisterSetTimeout = window.setTimeout(this.unregister, 10000);
						return;
					}
					this.$store.commit("heart", true);
					this.heartbeatSetTimeout = window.setTimeout(this.heartbeat, 10000);
				})
				.catch((err) => {
					this.$store.commit("heart", false);
					this.heartbeatSetTimeout = window.setTimeout(this.heartbeat, 15000);
					console.log(err, "心跳失败");
				});
		},
		controlVconsole(debugBoolean) {
			try {
				console.log('开始调用');
				// if (VConsole) {
				console.log('debugBoolean', debugBoolean);
				if (debugBoolean) {// window.$native && 
					console.log(window.$vConsole);
					// if (window.$vConsole && window.$vConsole.isInited) {
					// 	window.$vConsole.destroy()
					// }
					// if (window.$vConsole && window.$vConsole.hideSwitch) {
					// 	console.log(window.$vConsole.hideSwitch, 'onready have vconsole');
					// 	window.$vConsole.hideSwitch();
					// } 
					window.$vConsole = new VConsole({
						maxLogNumber: 2000,
						onReady: function () {
							console.log(window.$vConsole, 'vConsole onready');
							if (window.$vConsole && window.$vConsole.hideSwitch) {
								console.log(window.$vConsole.hideSwitch, 'onready have vconsole');
								window.$vConsole.hideSwitch();
							} else {
								var t = null;
								console.log(window.$vConsole, 'onready no have vconsolehide');
								t = window.setInterval(function () {
									if (window.$vConsole) {
										window.clearInterval(t);
										t = null;
										console.log(window.$vConsole, 'hideswitch');
										window.$vConsole.hideSwitch();
									}
								}, 1000);
							}
						}
					});
				}
				// }


			} catch (err) {
				console.error("init vConsole error", err);
			}
		},
		consoleInit() {
			console.log(window.$vConsole, 'vConsole onready');
			if (window.$vConsole && window.$vConsole.hideSwitch) {
				console.log(window.$vConsole.hideSwitch, 'onready have vconsole');
				window.$vConsole.hideSwitch();
			} else {
				var t = null;
				console.log(window.$vConsole, 'onready no have vconsolehide');
				t = window.setInterval(function () {
					if (window.$vConsole) {
						window.clearInterval(t);
						t = null;
						console.log(window.$vConsole, 'hideswitch');
						window.$vConsole.hideSwitch();
					}
				}, 1000);
			}
		}
	},
	computed: {
		...mapState(["httpform", "heartBoolen", "debugBoolen"]),
	},
	render: (h) => h(App),
});

window.callback;
window.callbackQrcode;
window.callbackFrameLoaded;
window.callbackFrameLoaded2;
window.callbackopenVirtualKeyboard;
window.faceProcessing = function faceProcessing(data) {
	data = JSON.parse(data);
	console.log("execute faceProcessing:", data);
	if (window.callback) {
		window.callback(data);
	}
};
window.readQrCode = function readQrCode(data) {
	console.log("readQrCode:", data);
	if (window.callbackQrcode) {
		window.callbackQrcode(data);
	}
};
window.frameLoaded = function frameLoaded() {
	console.log("frameLoaded: ");
	if (window.callbackFrameLoaded) {
		window.callbackFrameLoaded();
	}
	if (window.callbackFrameLoaded2) {
		window.callbackFrameLoaded2();
	}
};
window.openVirtualKeyboard = function openVirtualKeyboard() {
	console.log("openVirtualKeyboard:");
	if (window.callbackopenVirtualKeyboard) {
		window.callbackopenVirtualKeyboard();
	}
};




