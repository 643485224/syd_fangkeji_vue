<template>
	<div class="canvas_div">
		<div>
			<canvas id="canvas" width="385" height="600"></canvas>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			width: "",
			height: "",
			title: "会客单",
			time: new Date().constructor(),
			name: "张三丰",
			sex: "",
		};
	},
	mounted() {
		this.initCanvas();
	},
	methods: {
		initCanvas() {
			// var canvas = document.querySelector("#cavsElem");
			let canvas = document.getElementById("canvas");
			var cxt = canvas.getContext("2d");
			var w = cxt.canvas.width;
			// var h = cxt.canvas.height;
			cxt.font = "25px Microsoft YaHei";
			cxt.textAlign = "center";
			cxt.fillText(this.title, w / 2, 30);
			cxt.font = "13px Microsoft YaHei";
			cxt.fillText(this.time, w / 2, 50);
			cxt.moveTo(20, 60);
			cxt.lineTo(w - 20, 60);
			cxt.lineTo(w - 20, 200);
			cxt.lineTo(250, 200);
			cxt.lineTo(250, 60);
			cxt.moveTo(20, 60);
			cxt.lineTo(20, 500);
			cxt.lineTo(w - 20, 500);
			cxt.lineTo(w - 20, 200);
			cxt.font = "25px Microsoft YaHei";
			cxt.fillText("姓名：" + this.name, 110, 90);
			cxt.moveTo(20, 100);
			cxt.lineTo(250, 100);
			cxt.font = "25px Microsoft YaHei";
			cxt.fillText("性别：" + this.sex, 85, 128, 200);
			cxt.moveTo(20, 135);
			cxt.lineTo(250, 135);
			cxt.moveTo(20, 165);
			cxt.lineTo(250, 165);
			cxt.moveTo(20, 200);
			cxt.lineTo(250, 200);
			cxt.stroke();
		},
	},
};
</script>
<style lang="scss" scoped>
.canvas_div {
	display: flex;
	align-items: center;
	justify-content: center;
	div {
		width: 385px;
		border: 1px solid black;
		canvas {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
