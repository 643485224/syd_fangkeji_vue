<template>
	<div class="box" v-if="isShow">
		<!-- <h3>{{ title }}</h3> -->
		<p class="box-content">{{ message }}</p>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "",
		},
		message: {
			type: String,
			default: "",
		},
		duration: {
			type: Number,
			default: 1000, //默认1000毫秒消失
		},
	},
	data() {
		return {
			isShow: false, //是否显示标识
		};
	},
	methods: {
		show() {
			this.isShow = true;
			setTimeout(this.hide, this.duration); //设置时间自动消失
		},
		hide() {
			this.isShow = false;
			this.remove(); //移除
		},
	},
};
</script>

<style>
.box {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	text-align: center;
	pointer-events: none;
	background-color: #fff;
	background: rgba(10, 10, 10, 0.5);
	/* border: grey 3px solid; */
	box-sizing: border-box;
	z-index: 99999;
}
.box-content {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 40%;
	height: 70px;
    line-height: 70px;
	font-size: 40px;
	color: blanchedalmond;
	box-sizing: border-box;
	background: #aa4b6b; /* fallback for old browsers */
	background: -webkit-linear-gradient(to left, #aa4b6b, #6b6b83, #3b8d99); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to left, #aa4b6b, #6b6b83, #3b8d99); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	border-radius: 50px;
	
}
</style>
