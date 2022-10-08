// 用户长时间未操作 退出登录
import store from "../store/store";
var timer = null;

clearInterval(timer);

export function isOperateFun(callback) {
	//callback做一个回调，在本js里处理不用写回调
	var lastTime = new Date().getTime(); // 最后一次点击时间
	var currentTime = new Date().getTime(); // 当前时间
	var timeOut = 3 * 60 * 1000; // 允许最长未操作时间
	// var i = 1; // 辅助作用

	function handleReset() {
		// 重新赋值最后一次点击时间，清除定时器，重新开始定时器
		// console.log('又点击了！！！！！！')
		// i = 1;
		store.dispatch("setTimeoutNum", 60 * 3); //这是项目需要写一个60s倒计时退出登录
		lastTime = new Date().getTime();

		if (timer) {
			clearInterval(timer);
			timer = null;
		}

		if (!timer) {
			// console.log('真好！重新开始')
			handleInterval();
		}
	}

	document.onclick = () => {
		// 单击事件
		handleReset();
	};

	document.ondblclick = () => {
		// 双击事件
		handleReset();
	};

	document.onmousedown = () => {
		// 按下鼠标键时触发
		handleReset();
	};

	document.onmouseup = () => {
		// 释放按下的鼠标键时触发
		handleReset();
	};

	document.onmousemove = () => {
		// 鼠标移动事件
		handleReset();
	};

	document.onmouseover = () => {
		// 移入事件
		handleReset();
	};

	document.onmouseout = () => {
		// 移出事件
		handleReset();
	};

	document.onmouseenter = () => {
		// 移入事件
		handleReset();
	};

	document.onmouseleave = () => {
		// 移出事件
		handleReset();
	};

	function handleInterval() {
		// 定时器
		timer = setInterval(() => {
			currentTime = new Date().getTime(); // 当前时间

			// console.log(`${i++}-currentTime`, currentTime);
			// console.log("最后一次点击时间", lastTime);

			if (currentTime - lastTime > timeOut) {
				// console.log("长时间未操作");

				clearInterval(timer); // 清除定时器

				//app.vue里使用，首页使用
				if (callback) callback(false); //false长时间未操作
			} else {
				if (callback) callback(true); //true用户在操作
			}
		}, 1000);
	}
	handleInterval(); // 一开始程序 默认执行定制器
}
