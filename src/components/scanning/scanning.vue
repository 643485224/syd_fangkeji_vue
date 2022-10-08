<template>
	<div class="scanning" @click="scanningShow" v-if="show">
		<div class="scanning-in">
			<div class="scanning-in-div">
				<div @touchstart="incident(0)" v-if="disposesForm.miscellaneous.miscellaneous_IDdistinguish">
					<img src="../../assets/imgs/worker-id-card-100.png" alt="" />
					<p>身份证识别</p>
				</div>
				<div @touchstart="incident(1)" v-if="disposesForm.miscellaneous.miscellaneous_driversLicenseDistinguish">
					<img src="../../assets/imgs/driver-license-100.png" alt="" />
					<p>驾驶证识别</p>
				</div>
				<div @touchstart="incident(2)" v-if="disposesForm.miscellaneous.miscellaneous_passportDistinguish">
					<img src="../../assets/imgs/passport-100.png" alt="" />
					<p>护照识别</p>
				</div>
				<div @touchstart="incident(-1)" v-if="disposesForm.miscellaneous.miscellaneous_otherDocumentsDistinguish">
					<img src="../../assets/imgs/business-card-scanner-100.png" alt="" />
					<p>其它证件(仅识别)</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
export default {
	name: "Scanning",
	data() {
		return {};
	},
	props: {
		show: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	computed: { ...mapState(["disposesForm"]) },
	mounted() {},
	methods: {
		incident(data) {
			this.$emit("incident", data);
		},
		scanningShow() {
			this.$emit("scanningShow");
		},
	},
};
</script>
<style lang="scss">
.scanning {
	position: fixed;
	top: 50%;
	right: -50%;
	z-index: 2000;
	overflow: hidden;
	width: 100%;
	height: 100%;
	transform: translateX(-50%);
	-webkit-transform: translate(-50%, -50%);

	.scanning-in {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 2001;
		width: 70%;
		height: 25%;
		transform: translateX(-50%);
		-webkit-transform: translate(-50%, -50%);
		border-radius: 10px;

		.scanning-in-div {
			display: flex;
			width: 100%;
			height: 80%;
			justify-content: space-evenly;
			text-align: center;

			div {
				width: 25%;
				p {
					margin-top: 1rem;
					font-weight: 600;
					color: #fff;
				}
			}
		}
	}
}

.scanning::before {
	content: "";
	position: fixed;
	top: 50%;
	right: -50%;
	z-index: 2000;
	overflow: hidden;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	transform: translateX(-50%);
	-webkit-transform: translate(-50%, -50%);
	filter: drop-shadow(0px 0px 0px rgb(0, 0, 0));
}
</style>
