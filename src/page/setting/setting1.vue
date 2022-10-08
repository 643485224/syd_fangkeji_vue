<template>
	<div class="plarform">
		<ul>
			<li>
				<fieldset class="plarform-head">
					<legend>连接平台</legend>
					<div class="plarform_left">
						<template >
							<el-row :gutter="20" >
							<el-col :span="20">
								<el-input placeholder="请输入IP地址" v-model="ipform.ipAddress" data-mode="num">
									<template slot="prepend">IP地址</template>
								</el-input>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="20">
								<el-input placeholder="请输入域名" v-model="ipform.domainName" data-mode="num">
									<template slot="prepend">域 名</template>
								</el-input>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="20">
								<el-input placeholder="请输入端口号" v-model="ipform.port" data-mode="num">
									<template slot="prepend">端口号</template>
								</el-input>
							</el-col>
						</el-row>
						</template>
						<!-- <template v-else>
						<el-row :gutter="20">
							<el-col :span="20">
								<el-input placeholder="请输入IP地址" v-model="ipform.offlineIpAddress" data-mode="num">
									<template slot="prepend">IP地址</template>
								</el-input>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="20">
								<el-input placeholder="请输入域名" v-model="ipform.domainName" data-mode="num">
									<template slot="prepend">域名</template>
								</el-input>
							</el-col>
						</el-row>
							<el-row :gutter="20">
							<el-col :span="20">
								<el-input placeholder="请输入端口号" v-model="ipform.offlinePort" data-mode="num">
									<template slot="prepend">端口号</template>
								</el-input>
							</el-col>
						</el-row>
						</template> -->
					
					</div>
					<div class="plarform-right">
						<el-row :gutter="20">
							<el-col :span="10" class="registration_code">
								<el-input placeholder="注册码" v-model="ipform.poolCode" data-mode="num">
									<template slot="prepend">注册码</template>
								</el-input>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="22">
								<el-input placeholder="请输入加密秘钥" v-model="ipform.enckey" data-mode="num">
									<template slot="prepend">加密秘钥</template>
								</el-input>
							</el-col>
						</el-row>
					</div>
				</fieldset>
			</li>
			<li>
				<fieldset class="plarform-body">
					<legend>模式选择<span style="color:red;">(保存后需退出应用)</span></legend>
					<el-row :gutter="24">
						<el-col :span="5">
							<el-radio v-model="ipform.onlineMode" :label="true" ref="platform" @change="handl">平台模式
							</el-radio>
						</el-col>
						<el-col :span="5">
							<el-radio v-model="ipform.onlineMode" :label="false">脱机模式</el-radio>
						</el-col>
					</el-row>
				</fieldset>
			</li>
			<li>
				<fieldset class="debugmode-three">
					<legend>维护模式</legend>
					<el-row :gutter="20">
						<el-col :span="6">维护模式 <el-switch v-model="debugBoolen" @change="modify(debugBoolen)">
							</el-switch>
						</el-col>
					</el-row>
				</fieldset>
			</li>
		</ul>
		<!-- 
		<div class="must">
			<el-button type="primary" icon="el-icon-success" @click="onSubmit(ipform)">立即保存</el-button>
		</div> -->
		<!-- <goBack routerUrl="setting" messageText="立即保存"></goBack> -->
		<div class="offlineTwo-foot">
			<div @click="onSubmit(ipform)">
				<img src="../../assets/imgs/Rectangle 33.png" alt="" />
				<p class="flex-center-center">立即保存</p>
			</div>
		</div>
		<div class="call_black ">
			<div @click="_goBack()">
				<img src="../../assets/imgs/Rectangle 33.png" alt="" />
				<p class="flex-center-center">返回</p>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";

export default {
	name: "Plarform",
	data() {
		return {
			ipform: {
				ipAddress: "",
				port: "",
				onlineMode: false,
				mac: "", //mac地址
				poolCode: "", //
				enckey: "", // 秘钥
				secretkey: "",
				heartbeatSessionId: 0,
				heartbeatSequence: 1,
			},
			registerBoolen: true,
			unregisterBoolen: false,
			debugBoolen: false,

		};
	},
	created() {
		this.debugBoolen = this.$store.state.debugBoolen;
		this.ipform = JSON.parse(JSON.stringify(this.$store.state.httpform));
	},
	mounted() { },
	methods: {
		_goBack() {
			this.$router.push({ name: "setting" });
		},
		async onSubmit(data) {
			console.log(data);
			this.$store.commit("http", data);
			this.$message({ type: "success", message: "保存成功，重启后生效!" });

			// setTimeout(() => {
			// 	this.$router.push({ name: "setting" });
			// 	this.$message({ type: "warning", message: "重启软件生效!" });
			// }, 2000);
		},
		handl() {
			if (this.$refs.platform.label) {
				console.log(111);
			}
		},
		modify(debugBoolen) {
			this.$store.commit("debugBoolen", debugBoolen);
			console.log(this.debugBoolen);
			this.$message({ message: "修改成功!", type: "success" });
		},
	},

	beforeDestroy() { },
	computed: {
		...mapState(["httpform"]),
	},
	components: {
		// goBack,
	},
};
</script>
<style lang="scss" scoped>
.plarform {

	// width: 100%;
	// height: 100%;
	// padding: 10px;
	// font-size: 20px;
	// box-sizing: border-box;
	// display: flex;
	// flex-wrap: wrap;
	// align-items: center;
	// justify-content: flex-end;
	ul {
		margin-bottom: 200px;
		padding: 20px;
		box-sizing: border-box;

		li {
			padding: 20px;
			border-radius: 25px;
			box-sizing: border-box;
			margin-bottom: 1%;
			background: rgba(255, 255, 255, 0.7);

			fieldset {
				width: 100%;
				border: 0px;
				font-size: 30px;
				font-weight: bold;
				padding: 20px;
				box-sizing: border-box;

				legend {
					color: #ff5301;
					font-size: 25px;
				}
			}
		}
	}

	.plarform-head {
		display: flex;
		justify-content: space-around;

		.el-input {
			font-size: 20px;
		}

		.plarform_left {
			width: 38%;
			height: 40%;
			font-size: 55px;
			border-right: 1px solid #4f4ff5;

			.el-row {
				text-align: center;
				margin-bottom: 20px;
			}
		}

		.plarform-right {
			position: absolute;
			right: 0.6%;
			top: 202px;
			width: 60%;

			.el-row {
				text-align: center;
				margin-bottom: 20px;
			}

			div {
				text-align: center;

				// margin-top: 8%;
				img {
					width: 10%;
				}

				.imgAnimation {
					width: 10%;
					animation: hearts 500ms linear 500ms infinite alternate;
				}
			}

			::v-deep .el-row {
				margin-bottom: 35.5px;
				margin-left: 21px !important;
			}

			::v-deep .registration_code {
				width: 661.75px;
			}
		}

		::v-deep .el-input-group__prepend {
			width: 100px;
		}

		::v-deep .el-input-group>.el-input__inner {
			height: 50px;
		}

		::v-deep .el-col-20 {
			width: 94%;
		}
	}

	.plarform-body {
		.el-radio__input {
			width: 25px !important;
		}

		.el-row {
			.el-col {
				text-align: center;
			}

			.el-col:nth-child(1) {
				border-right: 1px solid #4f4ff5;
			}
		}
	}

	.must {
		.el-button {
			::v-deep i {
				font-size: 16px;
			}

			::v-deep span {
				font-size: 18px;
			}
		}
	}

	.offlineTwo-foot {
		position: absolute;
		bottom: 5%;
		right: 10%;
		// width: 100%;
		display: flex;
		justify-content: flex-end;

		// padding: 0px 130px;
		// box-sizing: border-box;
		div:nth-child(1) {
			position: relative;

			img {
				width: 250px;
			}

			p {
				position: absolute;
				top: 0%;
				width: 100%;
				height: 85%;
				font-size: 40px;
				color: #fff;
				font-weight: bold;
			}
		}
	}

	.call_black {
		position: fixed;
		bottom: 5%;
		left: 10%;
		width: 13%;

		div {
			position: relative;

			img {
				width: 250px;
			}

			p {
				position: absolute;
				top: 0%;
				left: 0%;
				// width: 100%;
				width: 250px;
				height: 85%;
				font-size: 40px;
				color: #fff;
				font-weight: bold;
			}
		}
	}
}
</style>
