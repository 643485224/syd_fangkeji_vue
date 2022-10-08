<template>
	<el-dialog title="编辑信息" :visible.sync="editStatus" :close-on-click-modal="false" :show-close="false">
		<el-form :model="editPeople" ref="editPeople" label-width="80px">
			<el-row type="flex" justify="space-around">
				<el-col :span="7">
					<el-form-item label="工       号:" prop="jobNumber">
						<el-input v-model="editPeople.jobNumber" clearable placeholder="请输入工号" :validate-event="false" readonly :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="姓       名:" prop="name">
						<el-input v-model="editPeople.name" clearable placeholder="请输入姓名" :validate-event="false" @input="addressChange"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="性       别:" prop="sex">
						<el-select v-model="editPeople.sex" clearable placeholder="请选择性别" :validate-event="false" @input="addressChange">
							<el-option value="男">男</el-option>
							<el-option value="女">女</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row type="flex" justify="space-around">
				<el-col :span="7">
					<el-form-item label="移动电话:" prop="mobilePhone">
						<el-input v-model.number="editPeople.mobilePhone" clearable placeholder="请输入移动电话" :validate-event="false" @input="addressChange"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="办公电话:">
						<el-input v-model="editPeople.officePhone" clearable placeholder="请输入办公电话" @input="addressChange"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="邮       箱:">
						<el-input v-model="editPeople.email" clearable placeholder="请输入邮箱" @input="addressChange"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" justify="space-around">
				<el-col :span="7">
					<el-form-item label="公       司:">
						<el-input v-model="editPeople.company" clearable placeholder="请输入公司名称" @input="addressChange"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="部门科室:" prop="departMent">
						<el-input v-model="editPeople.departMent" clearable placeholder="请输入部门名称" :validate-event="false" @input="addressChange"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="房       号:">
						<el-input v-model="editPeople.position" clearable placeholder="请输入房号" @input="addressChange"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="abolish">取 消</el-button>
			<el-button type="primary" @click="add">确 定</el-button>
			<el-button type="primary" @click="editSuccess" :disabled="editState">确 定</el-button>
		</div>
	</el-dialog>
</template>
<script>
import Native from "../../API/native-api.js";
import { mapState } from "vuex";
export default {
	props: {
		editPeople: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			editState: true, //监听编辑信息是否修改了
		};
	},
	methods: {
		//判断数据是否修改
		addressChange() {
			this.newEditString = JSON.stringify(this.editPeople);
			if (this.editString == this.newEditString) {
				this.editState = true;
			} else {
				this.editState = false;
			}
		},
		//编辑成功
		async editSuccess() {
			let res = await Native.updateStaff(this.newEditString);
			res = JSON.parse(res);
			console.log(res);
			if (res.success) {
				this.$message({ type: "success", message: "编辑成功!", duration: 5000 });
				this.query();
				this.$emit("show", this.editPeople);
			} else {
				this.$message({ type: "info", message: "编辑异常!", duration: 5000 });
			}
			this.$store.commit("cancel");
		},
		//取消编辑
		abolish() {
			this.$store.commit("cancel");
		},
		//查询
		async query() {
			let res = await Native.getStaffs(this.addPeople.jobNumber, this.addPeople.name, this.addPeople.sex, this.addPeople.mobilePhone, this.addPeople.departMent, "");
			console.log("查询———", res);
			let queryStaffList = JSON.parse(res);
			this.newPeopleList = queryStaffList.body.list;
			this.currentPageLength = this.newPeopleList.length; //数据总长
			this.peopleList = this.newPeopleList;
			this.getTableData();
			this.$message({ message: `信息查询成功!为您查到${this.currentPageLength}条数据`, type: "success", duration: 5000 });
		},
	},
	computed: {
		...mapState(["editStatus"]),
	},
};
</script>
<style lang="scss"></style>
