<template>
	<div class="debugmode">
		<ul>
			<li>
				<fieldset class="debugmode-one">
					<legend>修改管理密码<span style="color:black;">(最大长度10)</span></legend>
					<el-row :gutter="24">
						<el-col :span="7">
							<span>旧密码：</span>
							<!-- <el-input placeholder="请输入旧密码" type="password" maxlength="10" v-model="oldPassword" clearable style="width:70%;" data-mode="num"> </el-input> -->
							<input placeholder="请输入旧密码" type="password" maxlength="10" v-model="oldPassword"
								data-mode="num" />
						</el-col>
						<el-col :span="7">
							<span>新密码：</span>
							<input placeholder="请输入新密码" type="password" maxlength="10" v-model="newPassword"
								data-mode="num" />

							<!-- <el-input placeholder="请输入新密码" type="password" maxlength="10" v-model="newPassword" clearable style="width:70%;" data-mode="num"> </el-input> -->
						</el-col>
						<el-col :span="8">
							<span>确认密码：</span>
							<input placeholder="确认新密码" type="password" maxlength="10" v-model="newPassword2"
								data-mode="num" />
							<!-- <el-input placeholder="确认新密码" type="password" maxlength="10" v-model="newPassword2" clearable style="width:70%;" data-mode="num"> </el-input> -->
						</el-col>
						<el-col :span="2">
							<el-button type="primary" @click="modifyPassword">更改密码</el-button>
						</el-col>
					</el-row>
				</fieldset>
			</li>
			<li>
				<fieldset class="debugmode-two">
					<legend>键盘配置</legend>
					<!-- <el-row :gutter="24">
				<el-col :span="20"><span>键盘路径</span> <el-input placeholder="请输入路径" style="width:88%;" v-model="touchKeypadList.url" clearable> </el-input> </el-col>
				<el-col :span="4"> <el-button type="primary" @click="touch">更改路径</el-button> </el-col>
			</el-row> -->
					<el-row :gutter="20">
						<el-col :span="6">启用键盘 <el-switch v-model="KeyboardSwitchBoolen"
								@change="modify(KeyboardSwitchBoolen)"> </el-switch>
						</el-col>
					</el-row>
				</fieldset>
			</li>
		</ul>
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

export default {
	name: "Debugmode",
	data() {
		return {
			oldPassword: "",
			newPassword: "",
			newPassword2: "",
			touchKeypadList: {
				urlBoolen: true,
				url: "",
			},
			KeyboardSwitchBoolen: false,

		};
	},
	created() {
		this.KeyboardSwitchBoolen = this.$store.state.KeyboardSwitchBoolen;

		this.touchKeypadList = JSON.parse(JSON.stringify(this.$store.state.touchKeypadList));
	},
	mounted() { },
	methods: {
		_goBack() {
			this.$router.push({ name: "setting" });
		},
		modify(data) {
			this.$store.commit("KeyboardSwitchBoolen", data);
			this.$message({ message: "修改成功!", type: "success" });
		},
		modifyPassword() {
			if (!this.oldPassword) {
				this.$message({ message: "旧密码不能为空", type: "warning" });
				return;
			}
			if (this.oldPassword !== this.password) {
				this.$message({ message: "旧密码错误", type: "warning" });
				return;
			}
			if (this.newPassword == "" && this.newPassword2 == "") {
				this.$message({ message: "新密码不能为空", type: "warning" });
				return;
			}

			if (this.newPassword !== this.newPassword2) {
				this.$message({ message: "新密码不一致，请确认！", type: "warning" });
				return;
			} else if (this.newPassword.length > 10 && this.newPassword2.length > 10) {
				this.$message({ message: "密码最大长度为10", type: "warning" });
				return;
			} else if (this.newPassword == this.oldPassword) {
				this.$message({ message: "新旧密码不能一致", type: "warning" });
				return;
			} else {
				this.$store.commit("assignment", this.newPassword);
				this.$message({ message: "密码修改成功", type: "success" });
			}
		},
		// async touch() {
		// 	let resp = await Native.chooseFilePath();
		// 	console.log(resp.body.filePath);
		// 	if (resp.success) {
		// 		this.touchKeypadList.url = resp.body.filePath;
		// 		this.$store.commit("touchKey", this.touchKeypadList.url);
		// 		this.$message({ message: "获取成功", type: "success" });
		// 	} else {
		// 		this.$message({ message: resp.msg, type: "info" });
		// 	}
		// },
	},
	watch: {},
	computed: {
		...mapState(["password"]),
	},
	beforeDestroy() {
		this.oldPassword = "";
		this.newPassword = "";
		this.newPassword2 = "";
	},
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/input.scss";

.debugmode {
	width: 100%;
	height: 100%;

	.el-button {
		::v-deep i {
			font-size: 25px;
		}

		::v-deep span {
			font-size: 18px;
		}
	}

	ul {
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

				.el-switch {
					height: 45px;
					line-height: 45px;
				}

				.el-row {
					.el-col {
						border-right: 1px solid #4f4ff5;

						span {
							line-height: 52px;
						}

						.el-switch {
							float: right;
						}
					}

					.el-col:nth-child(4) {
						border: none;
						text-align: center;
						font-size: 25px;

						.el-button {
							height: 60px;
							width: 140px;
							position: absolute;
							right: -6px;
							top: -2px;
						}
					}
				}
			}
		}
	}
}
</style>
