<template>
	<div class="cartoon_btn" @click="goBack(routerUrl)">
		<img src="../../assets/imgs/Rectangle 33.png" alt="" />
		<p>{{ messageText }}</p>
	</div>
</template>
<script>
export default {
	props: {
		routerUrl: {
			type: String,
			default: "",
		},
		messageText: {
			type: String,
			default: "返回",
		},
	},
	data() {
		return {};
	},
	methods: {
		goBack(data) {
			// this.$router.go(-1);
			this.$router.push({ name: data });
		},
	},
};
</script>
<style lang="scss" scoped>
@mixin goBack {
	.cartoon_btn {
		position: absolute;
		right: 7%;
		bottom: 3%;
		width: 20%;
		height: 10%;
		img {
			width: 100%;
		}
		p {
			position: absolute;
			top: 0%;
			left: 0%;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: Source Han Sans CN;
			font-style: normal;
			font-weight: bold;
			font-size: 36px;
			color: #ffffff;
		}
	}
}
@media screen and (min-width: 0px) {
	@include goBack;
}

/* 屏幕最大等于1024 */
@media screen and (min-width: 1024px) and (max-width: 1024px) {
	@include goBack;
}

/* 屏幕最大等于1920 */
@media screen and (min-width: 1920px) and (max-width: 1920px) {
	@include goBack;
	.cartoon_btn {
		width: 15%;
	}
}
</style>
