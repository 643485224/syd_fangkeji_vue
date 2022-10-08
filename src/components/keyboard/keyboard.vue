<template>
	<div class="keyboard_encyclopedia">
		<div class="keyboard_en keyboard" v-show="show" v-if="mode == 'zh'">
			<ul>
				<li v-show="chinese" :class="chinese ? 'li_show' : ''" @click="keyboard"></li>
				<li v-show="!chinese" :class="chinese ? '' : 'span_show'" v-for="(item, index) in this.number" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
			</ul>

			<ul>
				<li v-show="cap" v-for="(item, index) in this.letter.slice(0, 10)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li v-show="!cap" v-for="(item, index) in this.cap_letter.slice(0, 10)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
			</ul>
			<ul>
				<li v-show="cap" v-for="(item, index) in this.letter.slice(10, 19)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li v-show="!cap" v-for="(item, index) in this.cap_letter.slice(10, 19)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
			</ul>
			<ul>
				<li @click="transform(2)">
					<span :class="cap ? 'span_show' : 'span_hide'">已切换小写</span>
					<span :class="cap ? 'span_hide' : 'span_show2'">已切换大写</span>
				</li>

				<li v-show="cap" v-for="(item, index) in this.letter.slice(19, 26)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li v-show="!cap" v-for="(item, index) in this.cap_letter.slice(19, 26)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li>删除</li>
			</ul>
			<ul>
				<li @click="symbol">标点</li>
				<li>手写</li>
				<li @click="goNumber">123</li>
				<li>空格</li>
				<li>.</li>

				<li @click="transform(1)">
					<span :class="chinese ? 'span_show' : 'span_hide'">中文</span>
					<span :class="chinese ? 'span_hide' : 'span_show2'">英文</span>
				</li>
				<li @click="keyBoardNone">隐藏</li>
			</ul>
		</div>
		<div class="keyboard_biaodian keyboard" v-show="show" v-if="mode == 'biaodian'">
			<ul>
				<li v-for="(item, index) in punctuation.slice(0, 4)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li @click="transform(2)">
					<span :class="cap ? 'span_show' : 'span_hide'">已切换小写</span>
					<span :class="cap ? 'span_hide' : 'span_show2'">已切换大写</span>
				</li>
			</ul>
			<ul>
				<li v-for="(item, index) in punctuation.slice(4, 8)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li @click="transform(1)">
					<span :class="chinese ? 'span_show' : 'span_hide'">中文</span>
					<span :class="chinese ? 'span_hide' : 'span_show2'">英文</span>
				</li>
			</ul>
			<ul>
				<li v-for="(item, index) in punctuation.slice(8, 12)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li @click="keyBoardNone">隐藏</li>
			</ul>
			<ul>
				<li v-for="(item, index) in punctuation.slice(12, 16)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>

				<li @click="back(mode)">返回</li>
			</ul>
		</div>
		<div class="keyboard_number keyboard" v-show="show" v-if="mode == '123'">
			<ul>
				<li v-for="(item, index) in num_pun.slice(0, 1)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li v-for="(item, index) in number2.slice(0, 3)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li></li>
			</ul>
			<ul>
				<li v-for="(item, index) in num_pun.slice(1, 2)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li v-for="(item, index) in number2.slice(3, 6)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li></li>
			</ul>
			<ul>
				<li v-for="(item, index) in num_pun.slice(2, 3)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li v-for="(item, index) in number2.slice(6, 9)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li @click="keyBoardNone">隐藏</li>
			</ul>
			<ul>
				<li v-for="(item, index) in num_pun.slice(3, 4)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li v-for="(item, index) in number2.slice(9, 12)" :key="item" @click="keyboard(item, index)">
					{{ item }}
				</li>
				<li @click="back(mode)">返回</li>
			</ul>
		</div>
	</div>
</template>
<script>
import AllKey from "./key.js";
export default {
	name: "Keyboard",
	props: {
		handle: {
			type: Function,
			required: true,
		},
		show: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	data() {
		return {
			number2: [],
			punctuation: [],
			num_pun: [],
			number: [],
			letter: [],
			cap_letter: [],
			cap: true,
			chinese: true,
			mode: "zh",
		};
	},
	created() {
		this.number2 = AllKey.number2;
		this.punctuation = AllKey.punctuation;
		this.num_pun = AllKey.num_pun;
		this.number = AllKey.number;
		this.letter = AllKey.letter;
		this.cap_letter = AllKey.cap_letter;
	},
	methods: {
		transform(event) {
			if (event == 1) {
				{
					if (this.chinese) {
						this.chinese = false;
					} else {
						this.chinese = true;
					}
				}
			} else if (event == 2) {
				if (this.cap) {
					this.cap = false;
				} else {
					this.cap = true;
				}
			}
		},
		keyboard(item) {
			// this.value = item;
			this.handle(item);
			// this.$emit("getValue");
			// console.log(item, val);
		},
		keyBoardNone() {
			this.$emit("inputValueShow");
		},
		symbol() {
			// console.log(11);
			this.mode = "biaodian";
		},
		back(item) {
			console.log(item);
			if (item === "biaodian") {
				this.mode = "zh";
			} else if (item === "123") {
				this.mode = "zh";
			}
		},
		goNumber() {
			this.mode = "123";
		},
	},
};
</script>
<style lang="scss">
.keyboard_encyclopedia {
	// border: 1px solid black;
	width: 100%;
	height: 22rem;
	text-align: center;
	// z-index: 10;
	.keyboard_en {
		width: 100%;
		height: 100%;
		z-index: 10;
		ul {
			height: 15%;
			display: flex;
			margin-top: 15px;
			li {
				width: 90px;
				height: 60px;
				line-height: 60px;
				// border: 1px solid black;
				background-color: #fff;
				border-radius: 10px;
				box-shadow: 5px 5px 0px #888;
				span {
					border-radius: 10px;
				}
			}
			li:active {
				width: 90px;
				height: 60px;
				line-height: 60px;
				// border: 1px solid black;
				background-color: rgb(164, 169, 238);
				border-radius: 10px;
				box-shadow: 5px 5px 0px #888;
				margin-top: 5px;
			}
		}
		ul:nth-child(1) {
			width: 100%;
			justify-content: space-evenly;
			.span_show {
				background-color: rgb(228, 157, 171);
			}
			.li_show {
				width: 99%;
			}
		}
		ul:nth-child(2) {
			width: 100%;
			justify-content: space-evenly;
			// li {
			// }
		}
		ul:nth-child(3) {
			width: 90%;
			justify-content: space-evenly;
			margin-left: 5%;
			// li {
			// }
		}
		ul:nth-child(4) {
			width: 100%;
			justify-content: space-evenly;

			li:nth-child(1) {
				.span_show {
					display: block;
					background-color: crimson;
				}
				.span_show2 {
					display: block;
					background-color: rgb(228, 157, 171);
				}
				.span_hide {
					display: none;
				}
			}
		}
		ul:nth-child(5) {
			width: 100%;
			justify-content: space-evenly;

			li:nth-child(4) {
				width: 35%;
			}
			li:nth-child(6) {
				.span_show {
					display: block;
					background-color: crimson;
				}
				.span_show2 {
					display: block;
					background-color: rgb(228, 157, 171);
				}
				.span_hide {
					display: none;
				}
			}
		}
	}
	.keyboard_biaodian {
		width: 100%;
		height: 100%;
		// background-color: blanchedalmond;
		ul {
			height: 15%;
			display: flex;
			margin-top: 20px;
			justify-content: space-evenly;
			li {
				width: 90px;
				height: 60px;
				line-height: 60px;
				// border: 1px solid black;
				background-color: #fff;
				border-radius: 10px;
				box-shadow: 5px 5px 0px #888;
				span {
					border-radius: 10px;
				}
			}
			li:active {
				width: 90px;
				height: 60px;
				line-height: 60px;
				// border: 1px solid black;
				background-color: rgb(164, 169, 238);
				border-radius: 10px;
				box-shadow: 5px 5px 0px #888;
				margin-top: 5px;
			}
		}
		ul:nth-child(1) {
			li:nth-child(5) {
				.span_show {
					display: block;
					background-color: crimson;
				}
				.span_show2 {
					display: block;
					background-color: rgb(228, 157, 171);
				}
				.span_hide {
					display: none;
				}
			}
		}
		ul:nth-child(2) {
			li:nth-child(5) {
				.span_show {
					display: block;
					background-color: crimson;
				}
				.span_show2 {
					display: block;
					background-color: rgb(228, 157, 171);
				}
				.span_hide {
					display: none;
				}
			}
		}
	}
	.keyboard_number {
		width: 100%;
		height: 100%;
		// background-color: blanchedalmond;
		ul {
			height: 15%;
			display: flex;
			margin-top: 20px;
			justify-content: space-evenly;
			li {
				width: 90px;
				height: 60px;
				line-height: 60px;
				// border: 1px solid black;
				background-color: #fff;
				border-radius: 10px;
				box-shadow: 5px 5px 0px #888;
				span {
					border-radius: 10px;
				}
			}
			li:active {
				width: 90px;
				height: 60px;
				line-height: 60px;
				// border: 1px solid black;
				background-color: rgb(164, 169, 238);
				border-radius: 10px;
				box-shadow: 5px 5px 0px #888;
				margin-top: 5px;
			}
		}
	}
}
</style>
