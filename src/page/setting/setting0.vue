<template>
	<div class="disposes">
		<ul>
			<li>
				<fieldset>
					<legend>杂项配置</legend>
					<el-row :gutter="20">
						<el-col :span="6">
							启用'打印凭条'
							<el-switch v-model="disposesForm.miscellaneous.miscellaneous_printer" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							启用'人脸识别'
							<el-switch v-model="disposesForm.miscellaneous.miscellaneous_faceRecognition" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							启用签离
							<el-switch v-model="disposesForm.miscellaneous.miscellaneous_checkout" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							启用预约来访
							<el-switch v-model="disposesForm.miscellaneous.miscellaneous_appointment" @change="modify(disposesForm)"></el-switch>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6">
							启用身份证识别
							<el-switch v-model="disposesForm.miscellaneous.miscellaneous_IDdistinguish" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							启用驾驶证识别
							<el-switch v-model="disposesForm.miscellaneous.miscellaneous_driversLicenseDistinguish" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							启用护照识别
							<el-switch v-model="disposesForm.miscellaneous.miscellaneous_passportDistinguish" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							启用其他证件识别
							<el-switch v-model="disposesForm.miscellaneous.miscellaneous_otherDocumentsDistinguish" @change="modify(disposesForm)"></el-switch>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6">
							启用字幕
							<el-switch v-model="disposesForm.miscellaneous.miscellaneous_subtitle" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							启用临时通行按钮
							<el-switch v-model="disposesForm.miscellaneous.miscellaneous_temporary" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							启用无证登记
							<el-switch v-model="disposesForm.miscellaneous.miscellaneous_unlicensed" @change="modify(disposesForm)"></el-switch>
						</el-col>
					</el-row>
				</fieldset>
			</li>
			<li>
				<fieldset>
					<legend>访客必填项</legend>
					<el-row :gutter="20">
						<el-col :span="6">
							访客姓名
							<el-switch v-model="disposesForm.visitor.visitor_name" @change="modify(disposesForm)" disabled></el-switch>
						</el-col>
						<el-col :span="6">
							访客性别
							<el-switch v-model="disposesForm.visitor.visitor_sex" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							访客民族
							<el-switch v-model="disposesForm.visitor.visitor_folk" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							证件号码
							<el-switch v-model="disposesForm.visitor.visitor_idNumber" @change="modify(disposesForm)"></el-switch>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6">
							访客手机号
							<el-switch v-model="disposesForm.visitor.visitor_phone" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							来访事由
							<el-switch v-model="disposesForm.visitor.visitor_purpose" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							证件类型
							<el-switch v-model="disposesForm.visitor.visitor_certificateType" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							访客住址
							<el-switch v-model="disposesForm.visitor.visitor_address" @change="modify(disposesForm)"></el-switch>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6">
							来访单位
							<el-switch v-model="disposesForm.visitor.visitor_company" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							车牌号码
							<el-switch v-model="disposesForm.visitor.visitor_licensePlate" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							携带物品
							<el-switch v-model="disposesForm.visitor.visitor_carryItems" @change="modify(disposesForm)"></el-switch>
						</el-col>
					</el-row>
				</fieldset>
			</li>
			<li>
				<fieldset>
					<legend>被访者必填项</legend>
					<el-row :gutter="20">
						<el-col :span="6">
							被访姓名
							<el-switch v-model="disposesForm.staff.staff_name" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							被访性别
							<el-switch v-model="disposesForm.staff.staff_sex" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							办公电话
							<el-switch v-model="disposesForm.staff.staff_officePhone" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							移动电话
							<el-switch v-model="disposesForm.staff.staff_mobilePhone" @change="modify(disposesForm)"></el-switch>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6">
							部门科室
							<el-switch v-model="disposesForm.staff.staff_department" @change="modify(disposesForm)"></el-switch>
						</el-col>
						<el-col :span="6">
							办公地点
							<el-switch v-model="disposesForm.staff.staff_position" @change="modify(disposesForm)"></el-switch>
						</el-col>
					</el-row>
				</fieldset>
			</li>
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
	name: "Disposes",
	data() {
		return {
			disposesForm: {
				miscellaneous: {
					miscellaneous_printer: true,
					miscellaneous_faceRecognition: true,
					miscellaneous_checkout: true,
					miscellaneous_appointment: true,
					miscellaneous_IDdistinguish: true,
					miscellaneous_driversLicenseDistinguish: true,
					miscellaneous_passportDistinguish: true,
					miscellaneous_otherDocumentsDistinguish: true,
					miscellaneous_subtitle: true,
					miscellaneous_temporary: false,
					miscellaneous_unlicensed: false,
				},
				visitor: {
					visitor_name: true,
					visitor_sex: false,
					visitor_folk: false,
					visitor_idNumber: false,
					visitor_phone: false,
					visitor_purpose: false,
					visitor_certificateType: false,
					visitor_address: false,
					visitor_company: false,
					visitor_licensePlate: false,
					visitor_carryItems: true,
				},
				staff: {
					staff_name: true,
					staff_sex: false,
					staff_officePhone: false,
					staff_mobilePhone: false,
					staff_department: false,
					staff_position: false,
				},
			},
		};
	},
	created() {
		this.disposesForm = JSON.parse(JSON.stringify(this.$store.state.disposesForm));
	},
	methods: {
		_goBack() {
			this.$router.push({ name: "setting" });
		},
		modify(val) {
			console.log(val);
			this.$store.commit("saveDisposes", JSON.parse(JSON.stringify(val)));
			this.$message({ type: "success", message: "修改成功!" });
		},
	},
	components: {},
};
</script>
<style lang="scss" scoped>
@mixin disposes {
	.disposes {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		ul {
			margin-bottom: 200px;
			padding: 20px;
			box-sizing: border-box;
			li {
				padding: 20px;
				border-radius: 25px;
				box-sizing: border-box;
				margin-bottom: 1%;
				background: rgba(255, 255, 255, 0.7);

				fieldset {
					width: 100%;
					border: 0px;
					font-size: 30px;
					font-weight: bold;
					padding: 20px;
					box-sizing: border-box;
					legend {
						color: #ff5301;
						font-size: 25px;
					}
					.el-row {
						margin-bottom: 1rem;
						.el-col {
							border-right: 1px solid #4f4ff5;
							.el-switch {
								float: right;
							}
						}
					}
				}
			}
		}
	
	}
}
@media screen and (min-width: 0px) {
	@include disposes;
}

/* 屏幕最大等于1024 */
@media screen and (min-width: 1024px) and (max-width: 1024px) {
	@include disposes;
}

/* 屏幕最大等于1920 */
@media screen and (min-width: 1920px) and (max-width: 1920px) {
	@include disposes;
	.disposes {
		fieldset {
			font-size: 35px;
			.el-switch {
				height: 45px;
				line-height: 45px;
				font-size: 20px;
			}
		}
	}
}
</style>
