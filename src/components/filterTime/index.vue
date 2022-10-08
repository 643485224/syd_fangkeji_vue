<template>
	<div id="filterTime" class="flex-space-between-center">
		<div>
			{{ currentTime2 }}
		</div>
		<div>
			<p>{{ currentTime1 }}</p>
			<p>{{ currentTime3 }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "filterTime",
	data() {
		return {
			timer: "", //定义一个定时器的变量
			currentTime1: "", // 获取当前年月日
			currentTime2: "", // 获取当前时间
			currentTime3: "", // 获取当前星期
		};
	},
	created() {
		var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
		this.timer = setInterval(function() {
			let strYears = new Date().getFullYear();
			let strMonth = new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
			let strDays = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
			let strHours = new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours();
			let strMinutes = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
			// let strSeconds = new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds();
			let wk = new Date().getDay();
			let weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
			let week = weeks[wk];
			_this.currentTime1 = strYears + "/" + strMonth + "/" + strDays;
			_this.currentTime2 = strHours + ":" + strMinutes;
			_this.currentTime3 = week;
		}, 1000);
	},
	beforeDestroy() {
		if (this.timer) {
			clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
		}
	},
};
</script>

<style lang="scss" scoped>
@mixin time {
	#filterTime {
		width: 180px;
		height: 100%;
		// display: flex;
		// justify-content: space-between;
		// align-items: center;
		box-sizing: border-box;
		div:nth-child(1) {
			// display: flex;
			// align-items: center;
			// justify-content: center;
			font-size: 26px;
			font-style: normal;
			color: #2888de;
			font-weight: bold;
		}
		div:nth-child(2) {
			color: #2888de;
			font-size: 16px;
		}
	}
}
@media screen and (min-width: 0px) {
	@include time;
}

@media screen and (min-width: 1920px) and (max-width: 1920px) {
	@include time;
	#filterTime {
		width: 310px;
		div:nth-child(1) {
			font-size: 50px;
		}
		div:nth-child(2) {
			font-size: 28px;
		}
	}
}

@media screen and (min-width: 1024px) and (max-width: 1024px) {
	@include time;
}
</style>
