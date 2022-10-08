<template>
	<div class="setting-seven">
		<ul>
			<li>
				<fieldset class="setting-one">
					<legend>查询条件</legend>
					<el-form :model="blockList" label-width="140px">
						<el-row :gutter="24">
							<el-col :span="8">
								<el-form-item label="证件姓名:" prop="mobilePhone">
									<el-input placeholder="请输入证件姓名" v-model="blockList.name" clearable data-mode="cn">
									</el-input>
								</el-form-item>
								<!-- <span>证件姓名 </span> -->
							</el-col>
							<el-col :span="8">
								<el-form-item label="手机号码:" prop="mobilePhone">
									<el-input placeholder="请输入手机号码" v-model="blockList.phone" clearable data-mode="num">
									</el-input>
								</el-form-item>
								<!-- <span> </span>
								<el-input placeholder="请输入手机号码" v-model="blockList.phone" clearable style="width:70%;" data-mode="num"> </el-input> -->
							</el-col>
							<el-col :span="8">
								<el-form-item label="身份证号码:" prop="mobilePhone">
									<el-input placeholder="请输入身份证号码" v-model="blockList.idCard" clearable
										data-mode="num"> </el-input>
								</el-form-item>
								<!-- <span> </span>
								<el-input placeholder="请输入身份证号码" v-model="blockList.idCard" clearable style="width:70%;" data-mode="num"> </el-input> -->
							</el-col>
						</el-row>
						<el-row :gutter="24">
							<el-col :span="8">
								<el-form-item label="护照号码:" prop="mobilePhone">
									<el-input placeholder="请输入护照号码" v-model="blockList.passport" clearable
										data-mode="num"> </el-input>
								</el-form-item>
								<!-- <span> </span>
								<el-input placeholder="请输入护照号码" v-model="blockList.passport" clearable style="width:70%;" data-mode="num"> </el-input> -->
							</el-col>
							<el-col :span="8">
								<el-form-item label="驾驶证号码:" prop="mobilePhone">
									<el-input placeholder="请输入驾驶证号码" v-model="blockList.driverLicense" clearable
										data-mode="num"> </el-input>
								</el-form-item>
								<!-- <span>驾驶证号码 </span>
								<el-input placeholder="请输入驾驶证号码" v-model="blockList.driverLicense" clearable style="width:65%;" data-mode="num"> </el-input> -->
							</el-col>
							<el-col :span="8" style="text-align:center;">
								<el-button type="primary" icon="el-icon-search" @click="lookup(blockList)">查询
								</el-button>
								<el-button type="primary" icon="el-icon-circle-plus-outline"
									@click="increase(blockList)">添加</el-button>
								<el-button type="primary" icon="el-icon-delete" @click="deleteAll(peopleList)">移除全部
								</el-button>
							</el-col>
						</el-row>
					</el-form>
				</fieldset>
			</li>
			<li>
				<!-- <fieldset class="setting-two">
					<legend>黑名单</legend> -->
				<div class="setting-three">
					<el-pagination class="offline3_pagination" @size-change="handleSizeChange"
						@current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageAmount"
						layout="total, prev, pager, next,jumper" :total="currentPageLength" data-mode="num">
					</el-pagination>
					<el-table class="offline3_table" :data="peopleList" style="width: 100%;border-radius: 10px;"
						height="94%" :row-class-name="tableRowClassName" v-loading="tableDataBoolean">
						<el-table-column label="序号" type="index" width="100"> </el-table-column>
						<el-table-column label="姓名" width="120" prop="name"> </el-table-column>
						<el-table-column label="联系电话" width="250" prop="phone"> </el-table-column>
						<el-table-column label="身份证号码" width="360" prop="idCard"> </el-table-column>
						<el-table-column label="驾驶证号码" width="360" prop="driverLicense"> </el-table-column>
						<el-table-column label="护照号码" width="360" prop="passport"> </el-table-column>
						<el-table-column label="地址" width="650" prop="address"> </el-table-column>
						<el-table-column label="性别" width="80" prop="sex"> </el-table-column>
						<el-table-column label="民族" width="80" prop="folk"> </el-table-column>
						<el-table-column fixed="right" label="操作" align="center" width="180">
							<template slot-scope="scope">
								<el-button v-if="!scope.row.isEgdit" type="primary" size="small"
									@click="remove(scope.row, scope.$index)" icon="el-icon-delete"> 移除黑名单</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<!-- </fieldset> -->
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
import Native from "../../API/native-api";
export default {
	data() {
		return {
			blockList: {
				name: "",
				phone: "",
				idCard: "",
				passport: "", //护照证件号码
				driverLicense: "", //驾照证件号码
				status: 1,
			},
			tableDataBoolean: false,
			newPeopleList: [], //分页新数组
			currentPageLength: 0, //数据总长度
			pageAmount: 9, //每页多少条数据
			currentPage: 1, //当前第几页
			peopleList: [
				// {
				// 	name: "张三", //姓名
				// 	sex: "女", //性别
				// 	folk: "汉", //民族
				// 	birth: "", //拼接年月日
				// 	address: "xx省,xx市，xx区，xxxxx镇，xxx街道，xxx号", //家庭住址
				// 	email: "",
				// 	idCard: "420703888898986545", //身份证证件号码
				// 	passport: "420703888898986545", //护照证件号码
				// 	driverLicense: "420703888898986545", //驾照证件号码
				// 	phone: "15988463512", //联系电话
				// 	company: "", //访客单位
				// 	sexNumber: "", //性别数字 男1  女2
				// 	idNumber: "420703888898986545",
				// },
			],
		};
	},
	created() {
		// this.lookup(this.blockList);
	},
	methods: {
		_goBack() {
			this.$router.push({ name: "setting" });
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageAmount = val;
			this.getTableData();
		},
		handleCurrentChange(page) {
			console.log(`当前页: ${page}`);
			this.currentPage = page;
			this.getTableData();
		},
		getTableData() {
			this.peopleList = this.newPeopleList.slice((this.currentPage - 1) * this.pageAmount, this.currentPage * this.pageAmount);
		},
		tableRowClassName({ rowIndex }) {
			if (rowIndex % 2 == 0) {
				return "warning-row";
			} else if (rowIndex % 2 == 1) {
				return "success-row";
			}
			return "";
		},
		//移除某一个  status: 1, //0允许，1黑名单
		async remove(row, index) {
			console.log(row, index);
			row.status = 0;
			let resp = await Native.setBlockList(JSON.stringify(row));
			console.log(resp);
			if (resp.success) {
				this.lookup({}, 0);
				this.$message({ type: "success", message: "移除黑名单成功!" });
			} else {
				this.$message({ type: "warning", message: "移除黑名单失败!" });
			}
		},
		//查询
		async lookup(item, type) {
			console.log(item);
			if (type == 0) {
				let resp = await Native.getVisitors(JSON.stringify(item));
				console.log(resp);
				if (resp.success) {
					this.peopleList = resp.body.list;
					this.currentPageLength = this.peopleList.length;
					this.newPeopleList = this.peopleList; this.getTableData();
				} else {
					this.$message({ type: "warning", message: "查询失败!" });
				}
			} else {
				let resp = await Native.getVisitors(JSON.stringify(item));
				console.log(resp);
				if (resp.success) {
					this.peopleList = resp.body.list; 
					this.currentPageLength = this.peopleList.length;
					this.newPeopleList = this.peopleList; 
					this.getTableData();
					this.$message({ type: "success", message: `查询成功!为您查到${this.currentPageLength}条数据` });
				} else {
					this.$message({ type: "warning", message: "查询失败!" });
				}
			}
		},
		//添加到黑名单
		async increase(item) {
			if (!item.name) {
				this.$message({ type: "warning", message: "请填写姓名!" });
				return;
			}
			if (!item.idCard && !item.passport && !item.driverLicense) {
				this.$message({ type: "warning", message: "证件号码,护照号码,驾驶证号码必填一项!" });
				return;
			}

			let resp = await Native.setBlockList(JSON.stringify(item));
			console.log(resp);
			if (resp.success) {
				this.lookup({}, 0);
				this.$message({ type: "success", message: "添加成功!" });
			} else {
				this.$message({ type: "warning", message: "添加失败!" });
			}
		},
		//移除黑名单所有纪录
		async deleteAll(item) {
			console.log(item);
			this.$confirm("此操作将删除黑名单所有数据, 是否继续?", "温馨提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
			})
				.then(() => {
					item.forEach(async (data) => {
						data.status = 0;
						let resp = await Native.setBlockList(JSON.stringify(data));
						console.log(resp);
					});
					this.lookup({}, 0);
					this.$message({ type: "success", message: "移除黑名单成功!" });
				})
				.catch(() => { });
		},
	},
};
</script>
<style lang="scss" scoped>
.setting-seven {
	width: 100%;
	height: 100%;

	// padding: 10px;
	// box-sizing: border-box;
	// font-weight: bold;
	ul {
		height: 100%;
		margin-bottom: 200px;
		padding: 10px;
		box-sizing: border-box;

		li {
			height: 20%;
			// padding: 20px;
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
			}

			.setting-one {
				height: 25%;

				.el-form {
					height: 100%;
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					.el-row {
						width: 100%;

						.el-col {
							.el-button {
								::v-deep i {
									font-size: 25px;
								}

								::v-deep span {
									font-size: 25px;
								}
							}
						}
					}
				}
			}
		}

		li:nth-child(2) {
			width: 100%;
			height: 79%;

			.setting-two {
				max-width: 100%;
				height: 100%;

				.el-pagination {
					// display: flex;
					// justify-content: flex-end;
				}
			}

			.setting-three {
				height: 100%;

				.el-button {
					padding: 11px 15px;
				}
			}
		}
	}
}
</style>
