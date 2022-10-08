<template>
	<fieldset class="visitForm" v-if="httpform.onlineMode">
		<h4 v-if="carouselArray.length == 0">前往 系统管理-主题配置 选择自己放图片的文件</h4>
		<el-carousel :interval="5000" arrow="always" type="card" :autoplay="true" indicator-position="none">
			<el-carousel-item v-for="(item, index) in carouselArray" :key="index">
				<img :src="item.url" alt="" style="width:100%;height:100%;object-fit: contain;" />
			</el-carousel-item>
		</el-carousel>
	</fieldset>
</template>
<script>
import { mapState } from "vuex";
export default {
	name: "Carousel",
	data() {
		return {};
	},
	computed: {
		...mapState(["httpform", "carouselArray"]),
	},
};
</script>
<style lang="scss" scoped>
.visitForm {
	width: 100%;
	min-width: 100%;
	height: 44%;
	padding: 5px;
	margin-top: 2%;
	border: 1px solid #4f4ff5;
	border-radius: 10px;
	box-sizing: border-box;

	legend {
		margin-left: 10px;
		color: #4f4ff5;
		font-weight: bold;
	}

	.visitForm-1 {
		float: right;
		overflow: hidden;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border-radius: 10px;
	}
}
</style>
