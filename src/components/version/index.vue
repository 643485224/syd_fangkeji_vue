<template>
	<p>v_{{ getVersionList.version.edition }}.{{ getVersionList.meet.version }}</p>
</template>
<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			version: {
				// buildDate: "2021年6月2日11:23:53",
				edition: "1.0.0",
				customized: "",
			},
			meet:{
				version: "1.0.0",
			}
		};
	},
	created() {
		this.$store.commit("getVersion", this.version);
		this.$store.commit("getMeet", this.meet);
	},
	methods: {},
	computed: {
		...mapState(["getVersionList"]),
	},
};
</script>
<style lang="scss">
/**
1.0.0
初始软件
*/
</style>
