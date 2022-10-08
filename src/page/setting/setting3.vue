<template>
	<div id="appearance">
		<ul class="appearance_ul">
			<li>
				<fieldset class="appearance-zero">
					<legend>字幕</legend>
					<el-row :gutter="24">
						<el-col :span="20">
							<span>字幕内容：</span>
							<!-- <el-input placeholder="请输入首页字幕内容" v-model="marqueeText" clearable data-mode="cn"> </el-input> -->
							<input placeholder="请输入首页字幕内容" style="width:85%" v-model="marqueeText" />
						</el-col>
						<el-col :span="4">
							<el-button type="primary" icon="el-icon-success" @click="onPreserve">保存字幕</el-button>
						</el-col>
					</el-row>
				</fieldset>
			</li>

			<li>
				<fieldset class="appearance-two">
					<legend>
						背景图片
						<span><input type="file" id="backgroundPicture" @change="backgroundIMG" multiple webkitdirectory accept="image" style="width: 120px;"/></span>
						<span><el-button type="primary" icon="el-icon-s-promotion" @click="removeBG">还原背景</el-button></span>
					</legend>
					<ul>
						<li v-for="(item, index) in backgroundItems" :key="index" @click="removeIMG(backgroundItems, index)">
							<img :src="item.url" alt="" srcset="" width="95%" />
							<i class="iconfont icon-shanchu" @click.stop="holdDown(backgroundItems, index)"></i>
						</li>
					</ul>
				</fieldset>
			</li>
			<!-- <li>
				<fieldset class="appearance-three">
					<legend>选择语言：示范-{{ $t("home.say") }}</legend>
					<span>语言切换 : </span> -->
					<!-- <el-select v-model="language" placeholder="请选择语言" @change="selectOne(language)">
						<el-option v-for="(item, index) in languagePack" :key="index" :value="item.value">
							<span>{{ item.value }}</span>
						</el-option>
					</el-select> -->
					<!-- <select v-model="language" placeholder="请选择语言" @change="selectOne(language)">
						<option v-for="(item, index) in languagePack" :key="index" :value="item.value">
							{{ item.value }}
						</option>
					</select>
				</fieldset>
			</li> -->
		</ul>
		<div class="call_black flex-end">
			<div @click="_goBack()">
				<img src="../../assets/imgs/Rectangle 33.png" alt="" />
				<p class="flex-center-center">返回</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "Appearance",
	data() {
		return {
			backgroundItems: [],

			languagePack: [
				{
					value: "中文",
				},
				{
					value: "English",
				},
			],
			language: "中文",
			marqueeText: "",
		};
	},
	created() {
		this.backgroundItems = JSON.parse(JSON.stringify(this.$store.state.backgroundItems));
		this.marqueeText = JSON.parse(JSON.stringify(this.$store.state.textTitle));
	},
	mounted() {},
	methods: {
		_goBack() {
			this.$router.push({ name: "setting" });
		},
		backgroundIMG() {
			console.log(document.getElementById("backgroundPicture"), "---111");
			console.log(document.getElementById("backgroundPicture").files, "---222");
			console.log(document.getElementById("backgroundPicture").files[0], "---333");
			let selectFiles = document.getElementById("backgroundPicture").files;
			console.log(selectFiles, "---selectFiles");
			let data = [];
			for (let file of selectFiles) {
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = function() {
					var img = new Image();
					img.src = this.result;
					// console.log(img.src);
					let boss = {};
					boss.url = img.src;
					data.push(boss);
					console.log(data, "----111");
				};
			}
			this.backgroundItems = data;
			this.$store.commit("background", this.backgroundItems);
		},
		removeIMG(data, index) {
			console.log(data[index].url);
			this.$store.commit("addBackground", data[index].url);
		},
		holdDown(data, index) {
			this.$store.commit("removeBackground", index);
			this.backgroundItems = JSON.parse(JSON.stringify(this.$store.state.backgroundItems));
		},
		removeBG() {
			this.$store.commit("addBackground", "");
		},
		selectOne(event) {
			console.log(event);
			if (event == "中文") {
				this.$i18n.locale = "zh-CN";
			} else if (event == "English") {
				this.$i18n.locale = "en-US";
			}
			this.$message({ message: this.$t("home.say"), type: "success" });
		},
		onPreserve() {
			this.$store.commit("newTitle", this.marqueeText);
			this.$message({ message: "保存成功！", type: "success" });
		},
		removePreserve() {
			this.$store.commit("newTitle", "");
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/input.scss";

@import "../../assets/css/appearance.scss";
.call_black {
	position: fixed;
	bottom: 4.6%;
	right: 10%;

	div {
		position: relative;
		img {
			width: 250px;
		}
		p {
			position: absolute;
			top: -1%;
			width: 100%;
			height: 85%;
			font-size: 40px;
			color: #fff;
			font-weight: bold;
		}
	}
}
</style>
