<template>
	<div class="aboutVersion">
		<ul>
			<li>
				<h1>
					关于Windows访客软件
				</h1>
			</li>
		</ul>
		<footer>
			<p>软件版本号:{{ getVersionList.version.edition }}
			<!-- _{{ getVersionList.version.customized }}_{{ getVersionList.version.buildDate }} -->
			</p>
			<p>后台版本号:{{ getVersionList.meet.version }}
			<!-- _{{ getVersionList.meet.buildDate }} -->
			</p>
		</footer>
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
	name: "AboutVersion",
	data() {
		return {};
	},
	created() {},
	mounted() {},
	methods: {
		_goBack() {
			this.$router.push({ name: "setting" });
		},
	},
	computed: {
		...mapState(["getVersionList"]),
	},
};
</script>
<style lang="scss" scoped>
.aboutVersion {
	width: 100%;
	height: 41rem;
	text-align: center;
	align-content: center;
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
}
</style>
