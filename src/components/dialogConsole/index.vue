<template>
	<div id="console"></div>
</template>
<script>
import { mapState } from "vuex";
import Native from "../../API/native-api.js";
import webData from "../../utils/shuJu";
// import vconsole from "../../utils/vconsole";

export default {
	data() {
		return {
			
		
		};
	},
	created() {
		// console.log(vconsole,this.$vconsole);
		// document.querySelector("#__vconsole").style.display = 'block';
		// this.$vconsole.show()
        // window.open('chrome://inspect#devices')
        // window.open('edge://inspect/#devices','console','menubar=yes,width=420,height=230,resizable=yes,scrollbars=yes,status=yes')
	},
	methods: {
		speak() {
			Native.speakStop();
			Native.speak("请您选择对应的被访人员");
		},
		_goBack() {
			this.$router.push({ name: "offlineTwo" });
		},
		tableRowClassName({ rowIndex }) {
			if (rowIndex % 2 == 0) {
				return "warning-row";
			} else if (rowIndex % 2 == 1) {
				return "success-row";
			}
		},
		handleSizeChange(val) {
			this.pageAmount = val;
			this.getTableData();
		},
		handleCurrentChange(page) {
			this.currentPage = page;
			this.getTableData();
		},
		getTableData() {
			this.peopleList = this.newPeopleList.slice((this.currentPage - 1) * this.pageAmount, this.currentPage * this.pageAmount);
		},
		handle(row, index) {
			console.log(row, index);

			webData.offlineData.record.staffID = row.id;
			webData.offlineData.staff.company = row.company;
			webData.offlineData.staff.jobNumber = row.jobNumber;
			webData.offlineData.staff.department = row.department;
			webData.offlineData.staff.email = row.email;
			webData.offlineData.staff.mobilePhone = row.mobilePhone;
			webData.offlineData.staff.name = row.name;
			webData.offlineData.staff.officePhone = row.officePhone;
			webData.offlineData.staff.position = row.position;
			webData.offlineData.staff.sex = row.sex;
            this.$emit("dialogClose")
		},
		async queryStaff() {
			this.staffBoolean = true;
			let res = await Native.getStaffs(this.queryCriteria.jobNumber, this.queryCriteria.name, "", this.queryCriteria.phone, "", "");
			console.log(res);
			if (res.success) {
                 this.peopleList = res.body.list;
				this.currentPageLength = this.peopleList.length;
				this.newPeopleList = this.peopleList;
                this.staffBoolean = false;
				if (this.currentPageLength == 0) {
					this.$message({ type: "warning", message: "查无此人" });
				}else {
                    this.$message({ type: "success", message: `查询成功，为您查到${this.currentPageLength}条数据` });
				    this.getTableData();
                }
			} else {
				this.$message({ type: "info", message: "查询失败" });
			}
			this.staffBoolean = false;
		},
		temporary(item) {
			if (!item.name) {
				this.$message({ type: "warning", message: "请填写姓名" });
				return;
			}
			if (!item.phone) {
				this.$message({ type: "warning", message: "请填写手机号" });
				return;
			} else {
				let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(item.phone)) {
					this.$message({ type: "warning", message: "请填写正确的手机号!" });
					return;
				}
			}
			// this.registrationInformation.staff.name = item.name;
			// this.registrationInformation.staff.mobilePhone = item.phone;
			webData.offlineData.staff.name = item.name;
			webData.offlineData.staff.mobilePhone = item.phone;

			this.$store.commit("newRegistrant", this.registrationInformation);
			this.$router.push({ name: "offlineFour", query: { data: this.registrationInformation } });
		},
	},
	destroyed() {
		//Native.speakStop();
	},
	computed: {
	},
};
</script>
<style lang="scss" scoped>

</style>
