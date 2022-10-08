<template>
	<li class="displayBox2">
		<div class="operationBox " @click="Jump(1)" :class="tableRouter == '/home' ? 'operationBox_bg1' : 'operationBox_bg2'">
			<div>
				<img src="../../assets/imgs/registration-100.png" alt="" />
				<p>登记页面</p>
			</div>
		</div>
		<div class="operationBox operationBox_bg" @click="Jump(2)" :class="tableRouter == '/query' ? 'operationBox_bg1' : 'operationBox_bg2'">
			<div>
				<img src="../../assets/imgs/combo-chart-100.png" alt="" />
				<p>查询系统</p>
			</div>
		</div>
		<div class="operationBox operationBox_bg" @click="Jump(3)" :class="tableRouter == '/setting' ? 'operationBox_bg1' : 'operationBox_bg2'">
			<div>
				<img src="../../assets/imgs/settings-96.png" alt="" />
				<p>系统管理</p>
			</div>
		</div>
		<div class="operationBox operationBox_bg" @click="Jump(4)">
			<div>
				<img src="../../assets/imgs/logout-rounded-left-100.png" alt="" />
				<p>退出程序</p>
			</div>
		</div>
		<div class="debug" @click="Jump(-1)" v-if="debugBoolen">
			<el-button type="warning">调试</el-button>
		</div>
		<div class="version">
			<ver-sion></ver-sion>
		</div>
	</li>
</template>

<script>
import version from "../../components/version/index";
import { mapState } from "vuex";
import Native from "../../API/native-api";
import $ from "jquery";
export default {
	name: "tableOne",
	data() {
		return {
			tableBoolen: false,
		};
	},
	created() {},
	mounted() {},
	methods: {
		async Jump(even) {
			console.log("当前路径", this.$route.path);
			if (even == 1) {
				this.$router.push("./home");
				this.$store.commit("tableBG", "/home");
			} else if (even == 2) {
				this.$router.push("./query");
				this.$store.commit("tableBG", "/query");
			} else if (even == 3) {
				if (this.$route.path !== "/setting") {
					this.tableBoolen = true;
				}
				console.log("76--", document.getElementsByClassName("el-input__inner"));
				if (this.tableBoolen) {
					this.$prompt("", "请输入管理员密码", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						inputPattern: /[0-9a-zA-Z]/,
						inputErrorMessage: "密码不正确",
						closeOnClickModal:false,
					}).then((data) => {
						if (data.value != this.password) {
							this.$message({ type: "warning", message: "密码不正确" ,duration: 5000});
							return;
						}
						this.tableBoolen = false;
						this.$router.push({ path: "./setting" });
						this.$store.commit("tableBG", "/setting");
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
			} else if (even == 4) {
				this.$store.commit("secede");
			} else if (even == -1) {
				let resp = await Native.showDevTools();
				console.log("调试-", resp);
			}
		},
	},
	components: {
		"ver-sion": version,
	},
	Destroy() {},
	computed: {
		...mapState(["password", "debugBoolen", "tableRouter"]),
	},
};
</script>

<style lang="scss" scoped>
.displayBox2 {
	position: relative;
	height: 100%;
	width: 100%;
	.operationBox {
		width: 100%;
		height: 12%;
		div {
			text-align: center;
			img {
				width: 56%;
				border-radius: 0.7rem;
			}
		}
	}
	.operationBox:nth-child(4) {
		position: absolute;
		left: 0rem;
		right: 0rem;
		bottom: 3rem;
		width: 100%;

		div {
			text-align: center;
			img {
				width: 50%;
				height: 50%;
				border-radius: 0.7rem;
			}
		}
	}
	.version {
		position: absolute;
		left: 0rem;
		right: 0rem;
		bottom: 1rem;
		font-size: 10px;
		text-align: center;
	}
	.operationBox_bg1 {
		border-radius: 10px;
		color: white;
		background-color: cornflowerblue;
	}
	.operationBox_bg2 {
		background-color: none;
	}
	.debug {
		position: absolute;
		left: 0rem;
		right: 0rem;
		bottom: 20rem;
		.el-button {
			margin-left: 13%;
		}
	}
}
</style>
