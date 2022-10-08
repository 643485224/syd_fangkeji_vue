<template>
	<div class="administrators">
		<div>
			<el-input placeholder="请输入管理员密码" v-model="input" clearable> </el-input>
		</div>
		<div>
			<span>1</span>
			<span>2</span>
			<span>3</span>
		</div>
		<div>
			<span>4</span>
			<span>5</span>
			<span>6</span>
		</div>
		<div>
			<span>7</span>
			<span>8</span>
			<span>9</span>
		</div>
		<div>
			<span>0</span>
			<span></span>
			<span>删除</span>
		</div>
		<div>
			<span>返回</span>
			<span></span>
			<span>提交</span>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			input: "",
		};
	},
};
</script>
<style lang="scss" scoped>
.administrators {
	width: 100%;
	height: 100%;
	text-align: center;
	margin-left: 25%;
	div {
		width: 50%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		height: 10%;
		span {
			width: 23%;
			height: 60%;
			border: 3px solid #2888de;
			box-shadow: 0px 5px 2px #7cbcf5;
			border-radius: 20px;
			line-height: 40px;
			font-size: 27px;
			color: #fff;
			background-color: #2888de;
		}
	}
	div:nth-child(1) {
		height: 20%;
		.el-input {
			::v-deep input {
				border: 3px solid #2888de;
				border-radius: 20px;
			}
		}
	}
	div:nth-child(5) {
		span:nth-child(2) {
			border: none;
			height: 0%;
			background-color: white;
		}
		span:nth-child(3) {
			background-color: red;
		}
	}
	div:nth-child(6) {
		span:nth-child(1) {
			background-color: forestgreen;
		}
		span:nth-child(2) {
			border: none;
			height: 0%;
			background-color: white;
		}
	}
}
</style>
