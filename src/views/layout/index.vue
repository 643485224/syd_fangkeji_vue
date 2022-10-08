<template>
	<div class="quit" v-if="quitStatus" @click.stop="quit">
		<div class="quit-in">
			<p class="quit-in-p" @click.stop="closePopups"></p>
			<div class="quit-in-div">
				<div></div>
				<div @click.stop="close(0)" class="secedeTc">
					<div>
						<img src="../../assets/imgs/logout-rounded-left-100.png" alt="" />
					</div>
					<p>退出应用</p>
				</div>
				<div @click.stop="close(1)">
					<div>
						<img src="../../assets/imgs/shutdown-100.png" alt="" />
					</div>
					<p>关机</p>
				</div>
				<div @click.stop="close(2)">
					<div>
						<img src="../../assets/imgs/restart-100.png" alt="" />
					</div>
					<p>重启</p>
				</div>
				<div></div>
			</div>
		</div>
	</div>
</template>


<script>
import { mapState } from "vuex";
import Native from "../../API/native-api";
export default {
	name: "layout",
	data() {
		return {};
	},
	methods: {
		async close(type) {
			switch (type) {
				case 0:
					this.$store.commit("secede");
					this.$message({ type: "warning", message: "正在退出程序……" });
					await Native.exit();
					break;
				case 1:
					this.$store.commit("secede");
					this.$message({ type: "warning", message: "正在关机……" });
					await Native.shutdown();
					break;
				case 2:
					this.$store.commit("secede");
					this.$message({ type: "warning", message: "正在重启……" });
					await Native.reboot();
					break;
				default:
					break;
			}
		},
		quit() {
			this.$store.commit("secede");
		},
		closePopups() {
			this.$store.commit("secede");
		},
	},
	computed: {
		...mapState(["quitStatus"]),
	},
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/layout.scss";
</style>
