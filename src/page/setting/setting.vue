<template>
	<div>
		<div class="setting flex-center-center">
			<div class="setting_div flex-wrap">
				<div v-for="(item, index) in imgList" :key="index" @click="onSettingPage(item)">
					<img :src="item.url" alt="" />
					<p class="setting-p-top">{{ item.name }}</p>
					<p class="setting-p-bottom">{{ item.englishName }}</p>
				</div>
			</div>
		</div>
		<footer>
			<p>软件版本号:{{ getVersionList.version.edition }}
				<!-- _{{ getVersionList.version.customized }}_{{getVersionList.version.buildDate}} -->
			</p>
			<p>后台版本号:{{ getVersionList.meet.version }}
				<!-- _{{ getVersionList.meet.buildDate }} -->
			</p>
		</footer>
		<div class="call_black">
			<div @click="_goBack()">
				<img src="../../assets/imgs/Rectangle 33.png" alt="" />
				<p class="flex-center-center">返回首页</p>
			</div>
		</div>
	</div>

</template>
<script>
import { mapState } from "vuex";
import Native from "../../API/native-api.js";

export default {
	data() {
		return {
			imgList: [
				{
					name: "杂项配置",
					englishName: "Sundry configuration",
					url: require("../../assets/imgs/ZXPZ.png"),
					path: "/setting/settingZero"
				},
				{
					name: "模式配置",
					englishName: "Pattern configuration",
					url: require("../../assets/imgs/MSPZ.png"),
					path: "/setting/settingOne"
				},
				{
					name: "修改密码",
					englishName: "Change the password",
					url: require("../../assets/imgs/XGMM.png"),
					path: "/setting/settingTwo"
				},
				{
					name: "主题配置",
					englishName: "Theme configuration",
					url: require("../../assets/imgs/ZTPZ.png"),
					path: "/setting/settingThree"
				},
				// {
				// 	name: "访客记录",
				// 	englishName: "Visitors to record",
				// 	url: require("../../assets/imgs/FKJL.png"),
				// path: "/setting/settingFour"
				// },
				{
					name: "员工数据",
					englishName: "Employee data",
					url: require("../../assets/imgs/YGSJ.png"),
					path: "/setting/settingFive"
				},

				{
					name: "黑名单",
					englishName: "blockList",
					url: require("../../assets/imgs/HMD.png"),
					path: "/setting/settingSeven"
				},
				// {
				// 	name: "关于我们",
				// 	englishName: "About us",
				// 	url: require("../../assets/imgs/GYWM.png"),
				//  path: "/setting/settingSix"
				// },
				{
					name: "退出应用",
					englishName: "Quit the application",
					url: require("../../assets/imgs/TCYY.png"),
				},
			],
		};
	},

	methods: {
		_goBack() {
			console.log(this.httpform.onlineMode);
			if (this.httpform.onlineMode) {
				this.$router.push({ name: "onsiteHome" });
			} else {
				this.$router.push({ name: "offlineHome" });
			}
		},
		onSettingPage(item) {
			if (item.name == '退出应用') {
				this.$confirm("是否退出程序?", "温馨提示", { confirmButtonText: "确定", cancelButtonText: "取消" })
					.then(async () => {
						await Native.exit();
						this.$message({ type: "warning", message: "正在退出程序……" });
					})
					.catch(() => { });
			} else {
				this.$router.push(item.path);

			}

		},
	},
	computed: {
		...mapState(["httpform"]),
		...mapState(["getVersionList"]),
	},
};
</script>
<style lang="scss" scoped>
@mixin setting {
	.setting {
		width: 100%;
		height: 100%;
		color: #fff;
		text-align: center;

		.setting_div {
			width: 100%;
			padding: 75px;
			box-sizing: border-box;

			div {
				position: relative;
				width: 25%;

				img {
					width: 100%;
				}

				p {
					position: absolute;
					bottom: 23%;
					width: 96%;
					font-size: 27px;
					padding-left: 18px;
				}

				.setting-p-bottom {
					bottom: 5%;
					font-size: 17px;
				}
			}
		}
	}
}

footer {
	position: absolute;
	color: #000;
	bottom: 0px;
	left: 0px;
	right: 0px;
	width: 100%;
	height: 15%;
	line-height: 100px;
	text-align: center;
	font-weight: bold;

	p {
		height: 25px;
	}
}

@media screen and (min-width: 0px) {
	@include setting;
}

/* 屏幕最大等于1024 */
@media screen and (min-width: 1024px) and (max-width: 1024px) {
	@include setting;

	.setting {
		.setting_div {
			padding: 20px;

			.setting-p-bottom {
				bottom: 10%;
			}
		}
	}
}

/* 屏幕最大等于1920 */
@media screen and (min-width: 1920px) and (max-width: 1920px) {
	@include setting;

	.setting {
		.setting_div {
			div {
				.setting-p-top {
					bottom: 25%;
					font-size: 45px;
				}

				.setting-p-bottom {
					bottom: 10%;
					font-size: 35px;
				}
			}
		}
	}
}
</style>
