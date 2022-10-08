<template>
	<div id="home">
		<div class="operationButton flex-spacebetween-center">
			<div class="operationButton-1 flex-spacebetween-center">
				<div @click="appointmentVisit()" v-if="disposesForm.miscellaneous.miscellaneous_appointment ? httpform.onlineMode : ''">
					<img src="../../assets/imgs/search-contacts-100.png" alt="" />
					<p>预约来访查询</p>
				</div>
				<div @click="ocr()" :class="disposesForm.miscellaneous.miscellaneous_appointment ? 'div1' : 'div2'">
					<img src="../../assets/imgs/general-ocr-100.png" alt="" />
					<p>证件识别</p>
				</div>
				<Debounce :time="2000">
					<div @click="photograph">
						<img src="../../assets/imgs/tourist-guide-100.png" alt="" />
						<p>人脸识别</p>
					</div>
				</Debounce>
				<div @click="InquireInterviewee">
					<img src="../../assets/imgs/search-contacts-100.png" alt="" />
					<p>选择被访者</p>
				</div>
				<div @click="readIC(0)" v-if="disposesForm.miscellaneous.miscellaneous_appointment ? httpform.onlineMode : ''">
					<img src="../../assets/imgs/icons8-debit-card-100.png" alt="" />
					<p>读取IC卡</p>
				</div>
				<Debounce :time="3000">
					<div @click="AddRegister(registrationInformation)">
						<img src="../../assets/imgs/registration-100.png" alt="" />
						<p>登记</p>
					</div>
				</Debounce>

				<div @click="checkout" v-if="disposesForm.miscellaneous.miscellaneous_checkout">
					<img src="../../assets/imgs/export-100.png" alt="" />
					<p>签离</p>
				</div>
			</div>
		</div>
		<div class="enrollment flex-spacebetween">
			<div class="content1">
				<fieldset class="content1-1 flex-spacebetween">
					<legend>来访者信息<span>（红色为必填项，</span><span>蓝色为非必填项）</span></legend>
					<div class="content1-left">
						<div :class="inAnimation ? 'bg-content1-left' : 'bg-content1-left-animation'">
							<img :src="'data:image/png;base64,' + idPhoto" :style="idPhoto == '' ? 'display:none;' : idPhoto == undefined ? 'display:none;' : ''" alt="" />
						</div>
						<form :model="registrationInformation.visitor" class="content1-left-form">
							<p>
								<span :class="disposesForm.visitor.visitor_name ? 'danger' : 'security'">证件姓名：</span>
								<input type="text" class="width31 height25" @click="handleHandInput" v-model="registrationInformation.visitor.name" data-mode="cn" />
								<span :class="disposesForm.visitor.visitor_folk ? 'danger' : 'security'"> 民 族：</span>
								<input type="text" class="width31 height25" @click="handleHandInput" v-model="registrationInformation.visitor.folk" data-mode="cn" />
							</p>
							<p>
								<span :class="disposesForm.visitor.visitor_sex ? 'danger' : 'security'"> 访客性别：</span>
								<select class="width16 height25" v-model="registrationInformation.visitor.sex">
									<option value="男">男</option>
									<option value="女">女</option>
									<option value="未知">未知</option>
								</select>
								<span> 出生：</span>
								<input type="text" class="width11 height25 centerText" maxlength="4" v-model="registrationInformation.visitor.year" data-mode="cn" />
								<span> 年</span>
								<input type="text" class="width11 height25 centerText" maxlength="2" v-model="registrationInformation.visitor.month" data-mode="cn" />
								<span> 月</span>
								<input type="text" class="width11 height25 centerText" maxlength="2" v-model="registrationInformation.visitor.day" data-mode="cn" />
								<span> 日</span>
							</p>
							<p>
								<span :class="disposesForm.visitor.visitor_phone ? 'danger' : 'security'">联系电话：</span>
								<input type="text" style="width:29%;height:25px;" v-model="registrationInformation.visitor.phone" data-mode="num" />
								<span :class="disposesForm.visitor.visitor_purpose ? 'danger' : 'security'">来访事由：</span>
								<select v-if="causeList.length !== 0 ? registrationInformation.record.purpose : (registrationInformation.record.purpose = '拜访')" id="subjectMatter" style="width:28%;height:25px;" v-model="registrationInformation.record.purpose">
									<option v-if="causeList.length == 0" value="拜访">拜访</option>
									<option v-if="causeList.length == 0" value="参观">参观</option>
									<option v-for="(item, index) in causeList" :value="item" :key="index">{{ item }}</option>
								</select>
							</p>
							<p>
								<span :class="disposesForm.visitor.visitor_idNumber ? 'danger' : 'security'">证件号码：</span>
								<input type="text" style="width:41%;" v-model="registrationInformation.visitor.idNumber" data-mode="num" />
								<span :class="disposesForm.visitor.visitor_certificateType ? 'danger' : 'security'">类型：</span>
								<select name="" id="certificates" style="width:24%;" v-model="registrationInformation.record.certificateType">
									<option value="身份证">身份证</option>
									<option value="驾驶证">驾驶证</option>
									<option value="护照">护照</option>
								</select>
							</p>
							<p>
								<span :class="disposesForm.visitor.visitor_address ? 'danger' : 'security'">证件地址：</span>
								<input type="text" @click="handleHandInput" style="width:77%;" v-model="registrationInformation.visitor.address" data-mode="cn" />
							</p>
							<p>
								<span :class="disposesForm.visitor.visitor_company ? 'danger' : 'security'">访客单位：</span>
								<input type="text" @click="handleHandInput" style="width:77%;" v-model="registrationInformation.visitor.company" data-mode="cn" />
							</p>
							<p>
								<span :class="disposesForm.visitor.visitor_licensePlate ? 'danger' : 'security'">车牌号码：</span>
								<input type="text" @click="handleHandInput" style="width:77%;" v-model="registrationInformation.record.licensePlate" data-mode="cn" />
							</p>
							<p>
								<span :class="disposesForm.visitor.visitor_carryItems ? 'danger' : 'security'">携带物品：</span>
								<input type="text" @click="handleHandInput" style="width:77%;" v-model="registrationInformation.record.brings" data-mode="cn" />
							</p>
						</form>
					</div>
					<div class="content1-right flex-wrap">
						<div class="content1-right-2">
							<el-button size="mini" type="danger" @click="empty(0)">清空信息</el-button>
						</div>
						<div class="content1-right-1 flex-wrap">
							<div>
								<img :src="'data:image/png;base64,' + registrationInformation.record.certificateHeadPhoto" :style="registrationInformation.record.certificateHeadPhoto == '' ? 'display:none;' : registrationInformation.record.certificateHeadPhoto == undefined ? 'display:none;' : ''" alt="" />
							</div>
							<div>
								<img :src="'data:image/png;base64,' + registrationInformation.record.visitorHeadPhoto" :style="registrationInformation.record.visitorHeadPhoto == '' ? 'display:none;' : registrationInformation.record.visitorHeadPhoto == undefined ? 'display:none;' : ''" alt="" />
							</div>
						</div>
						<div class="content1-right-2 ">
							<el-button size="mini" type="primary" @click="inAnimation = !inAnimation">证件全照</el-button>
						</div>
					</div>
				</fieldset>
			</div>
			<div class="content2">
				<fieldset class="content2-1">
					<legend>被访者信息</legend>
					<div class="content2-left">
						<form :model="registrationInformation.staff" class="content2-left-form">
							<p>
								<span class="security">被访者工号：</span>
								<input type="text" style="width:65%;height:25px;" v-model="registrationInformation.staff.jobNumber" data-mode="num" />
								<el-button class="query_button" size="mini" type="primary" @click="inquiry(registrationInformation.staff.jobNumber)">查询</el-button>
							</p>
							<p>
								<span :class="disposesForm.staff.staff_name ? 'danger' : 'security'">被访姓名：</span>
								<input type="text" style="width:25%;height:25px;" v-model="registrationInformation.staff.name" @click="InquireInterviewee" readonly />
								<span :class="disposesForm.staff.staff_sex ? 'danger' : 'security'">性 别：</span>
								<select style="width:28%;height:25px;" v-model="registrationInformation.staff.sex">
									<option value="男">男</option>
									<option value="女">女</option>
									<option value="未知">未知</option>
								</select>
							</p>
							<p>
								<span :class="disposesForm.staff.staff_department ? 'danger' : 'security'">部门科室：</span>
								<input type="text" style="width:70%;height:25px;" v-model="registrationInformation.staff.department" readonly />
							</p>
							<p>
								<span :class="disposesForm.staff.staff_officePhone ? 'danger' : 'security'">办公电话：</span>
								<input type="text" style="width:60%;height:25px;" v-model="registrationInformation.staff.officePhone" readonly />
								<el-button size="mini" icon="" type="success" @click="calling(registrationInformation.staff.officePhone, 0)">拨号</el-button>
							</p>
							<p>
								<span :class="disposesForm.staff.staff_mobilePhone ? 'danger' : 'security'">移动电话：</span>
								<select name="" id="nlocal" style="width:18%;" v-model="areaCode">
									<option v-for="(item, index) in phoneValue" :value="item.value" :key="index">{{ item.label }}</option>
								</select>
								<input type="text" style="width:40%;height:25px;" v-model="registrationInformation.staff.mobilePhone" readonly />
								<el-button size="mini" type="primary" @click="calling(registrationInformation.staff.mobilePhone, 1)">拨号</el-button>
							</p>

							<p>
								<span :class="disposesForm.staff.staff_position ? 'danger' : 'security'">办公地点：</span>
								<input type="text" style="width:70%;height:25px;" v-model="registrationInformation.staff.position" readonly />
							</p>
						</form>

						<el-button class="qingkong_button" size="mini" type="danger" @click="empty(1)">清空信息</el-button>
					</div>
					<p class="content2-p">注:脱机模式请先导入被访者信息表</p>
				</fieldset>
			</div>
		</div>
		<div class="visitForm">
			<Carousel />
			<fieldset class="visitForm_fieldset" v-if="!httpform.onlineMode">
				<legend>
					来访信息表 今日到访[ {{ visitorTotal }} ]人，已签离[ {{ visitorCheckout }} ]人，未签离[ {{ visitorTotal - visitorCheckout }} ]人
					<el-pagination @size-change="handleSizeChange($event, 0)" @current-change="handleCurrentChange($event, 0)" :current-page="currentPage" :page-size="pageAmount" :page-sizes="[1, 3, 5]" layout="total, sizes, prev, pager, next " :total="currentPageLength" data-mode="num"> </el-pagination>
				</legend>
				<div class="visitForm-1">
					<el-table :data="peopleList" style="width: 100%;border-radius: 10px;" height="88%" :row-class-name="tableRowClassName" v-loading="visitorBoolean">
						<el-table-column label="序号" type="index" width="50"> </el-table-column>
						<el-table-column label="访客姓名" width="120" prop="visitor.name"> </el-table-column>
						<el-table-column label="被访人" width="120" prop="staff.name"> </el-table-column>
						<el-table-column label="来访时间" width="200" prop="record.timeIn"> </el-table-column>
						<el-table-column label="离访时间" width="200" prop="record.timeOut"> </el-table-column>
						<el-table-column label="来访事由" width="200" prop="record.purpose"> </el-table-column>
						<el-table-column label="所去科室" width="200" prop="staff.department"> </el-table-column>
						<el-table-column label="性别" width="80" prop="visitor.sex"> </el-table-column>
						<el-table-column label="二代证证件号码" width="280" prop="visitor.idCard"> </el-table-column>
						<el-table-column label="驾驶证证件号码" width="280" prop="visitor.driverLicense"> </el-table-column>
						<el-table-column label="护照证件号码" width="280" prop="visitor.passport"> </el-table-column>
						<el-table-column fixed="right" label="签离操作" align="center" width="100">
							<template slot-scope="scope">
								<el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click="handle(scope.row, scope.$index)" icon="el-icon-edit">签离</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</fieldset>
		</div>

		<el-dialog title="被访者信息" :visible.sync="InquireIntervieweeState" class="el-log">
			<div class="el-div">
				<el-form :model="queryCriteria" ref="queryCriteria" label-width="80px">
					<el-row type="flex" justify="space-around" style="text-align:center">
						<el-col :span="7">
							<el-form-item label="工    号:" prop="jobNumber">
								<el-input v-model="queryCriteria.jobNumber" clearable placeholder="请输入工号" :validate-event="false" data-mode="num"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="姓    名:" prop="name">
								<el-input v-model="queryCriteria.name" clearable placeholder="请输入姓名" :validate-event="false" @click.native="handleHandInput" data-mode="cn"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="移动电话:" prop="mobilePhone">
								<el-input v-model.number="queryCriteria.phone" clearable placeholder="请输入移动电话" :validate-event="false" data-mode="num"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-button type="primary" icon="el-icon-search" @click="queryStaff">查询</el-button>
						</el-col>
					</el-row>
				</el-form>
				<el-pagination @size-change="handleSizeChange($event, 1)" @current-change="handleCurrentChange($event, 1)" :current-page="staffCurrentPage" :page-size="staffPageAmount" :page-sizes="[1, 5]" layout="total, sizes, prev, pager, next" :total="staffListLength"> </el-pagination>
				<el-table :data="staffList" style="" height="15.3rem" v-loading="staffBoolean" v-if="!httpform.onlineMode">
					<el-table-column prop="jobNumber" label="工号" align="center" width="100"> </el-table-column>
					<el-table-column prop="name" label="姓名" align="center" width="150"> </el-table-column>
					<el-table-column prop="mobilePhone" label="办公电话" align="center" width="150"> </el-table-column>
					<el-table-column prop="officePhone" label="移动电话" align="center" width="150"> </el-table-column>
					<el-table-column prop="company" label="公司" align="center" width="200"> </el-table-column>
					<el-table-column prop="departMent" label="部门科室" align="center" width="150"> </el-table-column>
					<el-table-column prop="position" label="房号" align="center" width="150"> </el-table-column>
					<el-table-column fixed="right" label="操作" align="center" width="170">
						<template slot-scope="scope">
							<el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click="selectStaff(scope.row, scope.$index)" icon="el-icon-check">选择被访人</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-table :data="staffList" style="" height="15.3rem" v-loading="staffBoolean" v-if="httpform.onlineMode">
					<el-table-column prop="code" label="工号" align="center" width="100"> </el-table-column>
					<el-table-column prop="name" label="姓名" align="center" width="150"> </el-table-column>
					<el-table-column prop="sex" label="性别" align="center" width="150">
						<template slot-scope="scope">{{ scope.row.sex === 1 ? "男" : scope.row.sex === 2 ? "女" : "未知" }}</template>
					</el-table-column>
					<el-table-column prop="phone" label="联系方式" align="center" width="150"> </el-table-column>
					<el-table-column prop="company" label="公司" align="center" width="200"> </el-table-column>
					<el-table-column prop="deptName" label="部门" align="center" width="150"> </el-table-column>
					<el-table-column prop="location" label="位置" align="center" width="150"> </el-table-column>
					<el-table-column fixed="right" label="操作" align="center" width="100">
						<template slot-scope="scope">
							<el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click="selectStaff(scope.row, scope.$index)" icon="el-icon-check">选择被访人</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-dialog>
		<el-dialog title="预约来访人员" :visible.sync="appointmentOfVisitorsBoolen" class="el-log2">
			<div class="el-div2">
				<el-form :model="appointmentList" ref="appointmentList" label-width="70px" style="margin-bottom:1rem;font-weight: bold;color:red;">
					<el-row type="flex" justify="space-around">
						<el-col :span="8" style="margin-bottom:20px;">
							<span>邀请码 </span>
							<el-input placeholder="请输入邀请码" v-model="queryVisit.InvitationCode" clearable style="width:70%;" data-mode="num"> </el-input>
						</el-col>
						<el-col :span="8" style="margin-bottom:20px;">
							<span>证件号码 </span>
							<el-input placeholder="请输入证件号码" v-model="queryVisit.InvitationIdCard" clearable style="width:70%;" data-mode="num"> </el-input>
						</el-col>
						<el-col :span="3" style="margin-bottom:20px;">
							<el-button type="primary" icon="el-icon-search" @click="queryAppointment(queryVisit)">查询</el-button>
						</el-col>
					</el-row>
					<el-row type="flex" justify="space-around">
						<el-col :span="10">
							<p>1.请刷身份证获取您的预约来访信息</p>
						</el-col>
						<el-col :span="10">
							<p>2.请扫描您的预约二维码获取预约来访信息</p>
						</el-col>
					</el-row>
				</el-form>
				<el-pagination @size-change="handleSizeChange($event, 2)" @current-change="handleCurrentChange($event, 2)" :current-page="appointmentStaffCurrentPage" :page-size="appointmentStaffPageAmount" :page-sizes="[1, 5]" layout="total, sizes, prev, pager, next" :total="appointmentStaffListLength">
				</el-pagination>
				<el-table :data="appointmentStaffList" style="" height="15.3rem" v-loading="appointmentStaffListBoolean">
					<el-table-column prop="v_time" label="预约来访时间" align="center" width="250"> </el-table-column>
					<el-table-column prop="v_name" label="姓名" align="center" width="100"> </el-table-column>
					<el-table-column prop="isv_name" label="被访姓名" align="center" width="200"> </el-table-column>
					<el-table-column prop="v_phone" label="电话" align="center" width="180"> </el-table-column>
					<el-table-column prop="v_reason" label="来访事由" align="center" width="200"> </el-table-column>
					<el-table-column prop="v_dw" label="公司" align="center" width="200"> </el-table-column>
					<el-table-column fixed="right" label="操作" align="center" width="140">
						<template slot-scope="scope">
							<el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click="appointment(scope.row, scope.$index)" icon="el-icon-check">选择预约信息</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-dialog>
		<el-dialog title="支持以下方式进行签离" :visible.sync="checkoutVisitorsBoolen" class="el-log2">
			<div class="el-div2">
				<el-form :model="appointmentList" ref="appointmentList" label-width="70px" style="margin-bottom:1rem;font-weight: bold;color:red;">
					<el-row type="flex" justify="space-around">
						<el-col :span="8">
							<p class="center_p">1.请刷身份证进行签离</p>
						</el-col>
						<el-col :span="8">
							<p class="center_p">2.请扫描您的二维码进行签离</p>
						</el-col>
						<el-col :span="8">
							<p class="center_p">3.点击读取IC卡签离</p>
						</el-col>
					</el-row>
					<el-row type="flex" justify="space-around" style="margin-top:20px;">
						<el-col :span="20">
							<div style="text-align: -webkit-center;">
								<div class="checkBtn" @click="readIC(1)" v-if="disposesForm.miscellaneous.miscellaneous_appointment ? httpform.onlineMode : ''">
									<img src="../../assets/imgs/icons8-debit-card-100.png" alt="" />
									<p>读取IC卡</p>
								</div>
							</div>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</el-dialog>
		<Scanning @incident="incident" @scanningShow="scanningShow" :show="scanningShowBoolen"></Scanning>
		<div class="callPhone" v-if="callPhoneBoolen">
			<div @click="handUp($event)">
				<h3 class="flex-center-center">电话号码为：{{ areaCode }} + {{ warnMsg }}</h3>
				<p>
					<el-button type="danger" @click.stop="handUp($event, 1)">关闭</el-button>
					<el-button type="primary" @click.stop="handUp($event, 0)" :disabled="callBoolen">{{ callPhoneText }}</el-button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
// import { Base64 } from "js-base64";
import APP from "../../webapi/modules/webapi.js";
import AES from "@/utils/secure";
import Native from "../../API/native-api.js";
import Scanning from "../../components/scanning/scanning.vue";
import Carousel from "../../components/carousel/index.vue";

export default {
	data() {
		return {
			visitorTotal: 0, //总来访
			visitorCheckout: 0, //已签离
			// unVisitorCheckout: 0,
			inAnimation: true,
			InquireIntervieweeState: false,
			idPhoto: "", //扫描证件照片
			registrationInformation: {
				visitor: {
					name: "", //姓名
					sex: "未知", //性别
					folk: "", //民族
					birth: "", //拼接年月日
					address: "", //家庭住址
					email: "",
					idCard: "", //身份证证件号码
					passport: "", //护照证件号码
					driverLicense: "", //驾照证件号码
					phone: "", //联系电话
					company: "", //访客单位
					idNumber: "",
					year: "", //年
					month: "", //月
					day: "", //日
				},
				staff: {
					jobNumber: "",
					name: "", //姓名
					sex: "", //性别
					email: "",
					officePhone: "", //办公电话
					mobilePhone: "", //移动电话
					company: "", //被访公司
					department: "", //被访部门科室
					position: "", //被访办公地点
				},
				record: {
					timeIn: new Date().toLocaleString(),
					timeOut: "",
					deviceID: "", //设备ID
					staffID: "",
					licensePlate: "", //车牌号码
					brings: "", //携带物品
					purpose: "拜访", //来访事由
					certificateType: "", //证件类型
					certificatePhoto: "", //证件照
					certificateHeadPhoto: "", //证件头像
					visitorPhoto: "", //捕抓照
					visitorHeadPhoto: "", //捕抓照头像

					Uid: "",
				},
			},
			newStaffID: "",
			//签离对象
			checkoutObject: {
				id: "",
				timeOut: "",
			},
			readID: null, //取消定时
			getRecord: null, //取消定时
			visitorBoolean: true, //来访信息表分页参数
			peopleList: [],
			newPeopleList: [],
			currentPageLength: 0,
			pageAmount: 5,
			currentPage: 1,
			staffBoolean: false, //被访信息表分页参数
			staffList: [],
			newStaffList: [],
			staffListLength: 0,
			staffPageAmount: 5,
			staffCurrentPage: 1,
			appointmentStaffListBoolean: false, //预约来访分页参数
			appointmentStaffList: [],
			newAppointmentStaffList: [],
			appointmentStaffCurrentPage: 1,
			appointmentStaffPageAmount: 1,
			appointmentStaffListLength: 0,
			// 员工查询条件
			queryCriteria: {
				jobNumber: "",
				name: "",
				sex: "",
				phone: "",
				department: "",
			},
			callPhone: false,
			areaCode: "",
			phoneValue: [
				{
					value: "",
					label: "无",
				},
				{
					value: "90",
					label: "外地",
				},
				{
					value: "9",
					label: "本地",
				},
			],
			faceBoolen: true, //人脸识别
			appointmentOfVisitorsBoolen: false,
			appointmenBoolean: false,
			appointmentList: {
				name: "",
				idCard: "",
				phone: "",
			},
			checkoutVisitorsBoolen: false,
			scanningShowBoolen: false,
			photographBoolen: true,
			callPhoneBoolen: false,
			warnMsg: "",
			callPhoneText: "拨号",
			callBoolen: false,
			addICCard: "", //IC卡号
			queryVisit: {
				InvitationCode: "", //预约号
				InvitationIdCard: "", //身份证号
			},
			appointmentPhoto: "", //预约获取的头像
		};
	},
	created() {
		this.getRecord = setTimeout(this.getRecords, 2000);
		this.readID = setInterval(this.regular, 2000);
	},
	computed: {
		...mapState(["disposesForm", "httpform", "touchKeypadList", "causeList"]),
	},
	mounted() {
		this.tableRowClassName;
		window.callback = (data) => {
			console.log(data, "人脸返回");
			this.photographBoolen = true;
			this.readID = setInterval(this.regular, 2000);
			if (!data.success) {
				this.$message({ type: "warning", message: "抓拍不成功，请重试！" });
				return;
			}
			this.registrationInformation.record.visitorHeadPhoto = data.body.head;
			this.$forceUpdate();
			this.$message({ type: "success", message: "抓拍成功！" });
		};
		window.callbackQrcode = (data) => {
			console.log("二维码", data);
			if (data == "" && data.length == 0) {
				return;
			}
			if (this.httpform.onlineMode) {
				if (this.appointmentOfVisitorsBoolen) {
					//预约来访
					this.appointmentVisit(data);
				} else if (this.checkoutVisitorsBoolen) {
					this.checkout(data, 2);
				} else {
					// this.checkout(data, 2);
				}
			} else if (this.checkoutVisitorsBoolen) {
					this.checkout(data, 1);
			} 
				// else {
					// this.checkout(data, 1);
			// }
		};
	},
	methods: {
		handleSizeChange(val, type) {
			if (type == 0) {
				this.pageAmount = val;
				this.getTableData(type);
			} else if (type == 1) {
				this.staffPageAmount = val;
				this.getTableData(type);
			} else if (type == 2) {
				this.appointmentStaffPageAmount = val;
				this.getTableData(type);
			}
		},
		handleCurrentChange(page, type) {
			if (type == 0) {
				this.currentPage = page;
				this.getTableData(type);
			} else if (type == 1) {
				this.staffCurrentPage = page;
				this.getTableData(type);
			} else if (type == 2) {
				this.appointmentStaffCurrentPage = page;
				this.getTableData(type);
			}
		},
		getTableData(type) {
			if (type == 0) {
				this.peopleList = this.newPeopleList.slice((this.currentPage - 1) * this.pageAmount, this.currentPage * this.pageAmount);
			} else if (type == 1) {
				this.staffList = this.newStaffList.slice((this.staffCurrentPage - 1) * this.staffPageAmount, this.staffCurrentPage * this.staffPageAmount);
			} else if (type == 2) {
				this.appointmentStaffList = this.newAppointmentStaffList.slice((this.appointmentStaffCurrentPage - 1) * this.appointmentStaffPageAmount, this.appointmentStaffCurrentPage * this.appointmentStaffPageAmount);
			}
		},
		tableRowClassName({ rowIndex }) {
			if (rowIndex % 2 == 0) {
				return "warning-row";
			} else if (rowIndex % 2 == 1) {
				return "success-row";
			}
		},
		incident(data) {
			this.distinguish(data);
			this.scanningShowBoolen = false;
		},
		scanningShow() {
			this.scanningShowBoolen = false;
		},
		ocr() {
			this.scanningShowBoolen = true;
		},
		async checkout(data, type) {
			if (this.httpform.onlineMode) {
				this.checkoutVisitorsBoolen = !this.checkoutVisitorsBoolen;
				if (type == 2) {
					console.log(data);
					if (this.checkoutVisitorsBoolen) {
						APP.leaveVisitor(data, null, null, null,"在线签离:type=2")
							.then((resp) => {
								console.log("在线签离", resp);
								if (resp.data.code !== 200) {
									this.$message({ type: "warning", message: "签离失败！" });
									return;
								}
								this.empty(2);
								this.$message({ type: "success", message: "签离成功" });
								this.checkoutVisitorsBoolen = !this.checkoutVisitorsBoolen;
							})
							.catch((err) => {
								console.log(err);
							});
					} else {
						APP.leaveVisitor(data, null, null, null,"在线签离:checkoutVisitorsBoolen!")
							.then((resp) => {
								console.log("在线签离", resp);
								if (resp.data.code !== 200) {
									this.$message({ type: "warning", message: "签离失败！" });
									return;
								}
								this.empty(2);
								this.$message({ type: "success", message: "签离成功" });
							})
							.catch((err) => {
								console.log(err);
							});
					}
				}
			} else {
				if (type == 1) {
					this.checkoutObject.id = data;
					this.checkoutObject.timeOut = new Date().toLocaleString();
					Native.getRecords("", "", "", "", "", "", "", data)
						.then(async (resp) => {
							console.log("获取签离对象", resp);
							if (!resp.success) {
								this.$message({ type: "warning", message: "获取签离对象失败！" });
								return;
							}
							if (resp.body.records.length == 0) {
								this.$message({ type: "warning", message: "查无此人登记记录，签离失败！" });
								return;
							}
							if (resp.body.records[0].timeOut !== "") {
								this.$message({ type: "warning", message: "已签离，请勿重复签离！" });
								return;
							}
							await Native.checkOut(JSON.stringify(this.checkoutObject))
								.then((resp) => {
									console.log("签离", resp);
									if (this.checkoutVisitorsBoolen) {
										this.checkoutVisitorsBoolen = !this.checkoutVisitorsBoolen;
									}
									if (!resp.success) {
										this.$message({ type: "warning", message: "签离失败!" });
										return;
									}
									this.getRecords(1);
									this.empty(2);
									this.$message({ type: "success", message: "签离成功!" });
								})
								.catch((err) => {
									console.log("签离失败", err);
									this.$message({ type: "warning", message: "签离失败" });
								});
						})
						.catch((err) => {
							console.log("获取签离对象失败", err);
							this.$message({ type: "warning", message: "获取签离对象失败" });
						});
				} else if (type == 3) {
					this.checkoutObject.timeOut = new Date().toLocaleString();
					Native.checkOut(JSON.stringify(this.checkoutObject))
						.then((resp) => {
							if (this.checkoutVisitorsBoolen) {
								this.checkoutVisitorsBoolen = !this.checkoutVisitorsBoolen;
							}
							if (!resp.success) {
								this.$message({ type: "warning", message: "签离失败!" });
								return;
							}
							this.getRecords(1);
							this.empty(2);
							this.$message({ type: "success", message: "签离成功!" });
						})
						.catch((err) => {
							console.log("签离失败", err);
							this.$message({ type: "warning", message: "签离失败" });
						});
				} else {
					if (!this.checkoutObject.id) {
						this.checkoutVisitorsBoolen = !this.checkoutVisitorsBoolen;
						return;
					}
					if (this.checkoutObject.timeOut.length !== 0) {
						this.$message({ type: "warning", message: "已签离，请勿重复签离！" });
						return;
					}
					this.checkoutObject.timeOut = new Date().toLocaleString();
					Native.checkOut(JSON.stringify(this.checkoutObject))
						.then((resp) => {
							if (this.checkoutVisitorsBoolen) {
								this.checkoutVisitorsBoolen = !this.checkoutVisitorsBoolen;
							}
							if (!resp.success) {
								this.$message({ type: "warning", message: "签离失败!" });
								return;
							}
							this.getRecords(1);
							this.empty(2);
							this.$message({ type: "success", message: "签离成功!" });
						})
						.catch((err) => {
							console.log("签离失败", err);
							this.$message({ type: "warning", message: "签离失败" });
						});
				}
			}
		},
		//清空登记信息
		empty(type) {
			console.log(type, "---清空登记信息类型");
			switch (type) {
				case 0:
					{
						this.$confirm("是否清空访客信息", "提示", { confirmButtonText: "确定", cancelButtonText: "取消" })
							.then(() => {
								this.idPhoto = "";
								this.registrationInformation.visitor = JSON.parse(JSON.stringify(this.$store.state.addInformation.visitor));
								this.registrationInformation.record = JSON.parse(JSON.stringify(this.$store.state.addInformation.record));
								this.registrationInformation.record.staffID = this.newStaffID;
								this.addICCard = ""; //IC卡号
								this.$message({ type: "success", message: "清空来访信息!" });
							})
							.catch(() => {
								this.$message({ type: "info", message: "已取消清空" });
							});
					}
					break;
				case 1:
					{
						this.$confirm("是否清空被访信息", "提示", { confirmButtonText: "确定", cancelButtonText: "取消" })
							.then(() => {
								this.registrationInformation.staff = JSON.parse(JSON.stringify(this.$store.state.addInformation.staff));
								this.registrationInformation.record.staffID = "";
								this.$message({ type: "success", message: "清空被访信息!" });
							})
							.catch(() => {
								this.$message({ type: "info", message: "已取消清空" });
							});
					}
					break;
				case 2:
					{
						this.idPhoto = "";
						this.addICCard = ""; //IC卡号
						this.registrationInformation.visitor = JSON.parse(JSON.stringify(this.$store.state.addInformation.visitor));
						this.registrationInformation.record = JSON.parse(JSON.stringify(this.$store.state.addInformation.record));
						this.registrationInformation.staff = JSON.parse(JSON.stringify(this.$store.state.addInformation.staff));
						this.checkoutObject = new Object();
					}
					break;
				case 3:
					{
						this.registrationInformation.staff = JSON.parse(JSON.stringify(this.$store.state.addInformation.staff));
						this.registrationInformation.record.staffID = "";
					}
					break;
				default:
					break;
			}
		},
		//将来访登记信息保存
		async AddRegister(item) {
			console.log("来访信息", item);
			if (this.disposesForm.visitor.visitor_name) {
				if (!item.visitor.name) {
					this.$message({ type: "warning", message: "请填写您的姓名!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_folk) {
				if (!item.visitor.folk) {
					this.$message({ type: "warning", message: "请填写您的民族!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_sex) {
				if (!item.visitor.sex) {
					this.$message({ type: "warning", message: "请填写您的性别!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_phone) {
				if (!item.visitor.phone) {
					this.$message({ type: "warning", message: "请填写您的手机号!" });
					return;
				} else {
					let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
					if (!myreg.test(item.visitor.phone)) {
						this.$message({ type: "warning", message: "请填写正确的手机号!" });
						return;
					}
				}
			}
			if (this.disposesForm.visitor.visitor_purpose) {
				if (!item.record.purpose) {
					this.$message({ type: "warning", message: "请填写您的来访事由!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_idNumber) {
				if (!item.visitor.idNumber) {
					this.$message({ type: "warning", message: "请填写您的证件号码!" });
					return;
				} else if (item.visitor.idNumber.length < 4) {
					this.$message({ type: "warning", message: "证件号码至少填写四位!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_certificateType) {
				if (!item.record.certificateType) {
					this.$message({ type: "warning", message: "请填写您的证件类型!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_address) {
				if (!item.visitor.address) {
					this.$message({ type: "warning", message: "请填写您的家庭住址!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_company) {
				if (!item.visitor.company) {
					this.$message({ type: "warning", message: "请填写访客单位!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_licensePlate) {
				if (!item.record.licensePlate) {
					this.$message({ type: "warning", message: "请填写您的车牌号码!" });
					return;
				}
			}
			if (this.disposesForm.visitor.visitor_carryItems) {
				if (!item.record.brings) {
					this.$message({ type: "warning", message: "请填写您的携带物品!" });
					return;
				}
			}

			if (this.disposesForm.miscellaneous.miscellaneous_faceRecognition) {
				if (!item.record.visitorHeadPhoto) {
					this.$message({ type: "warning", message: "请进行人脸识别!" });
					return;
				}
			}
			if (!this.addICCard) {
				this.$message({ type: "warning", message: "IC卡信息不能为空" });
				return;
			}

			if (this.httpform.onlineMode) {
				let info = {};
				let time = new Date()
					.toISOString()
					.slice(0, 19)
					.replace(/\./g, ":");
				info.v_name = item.visitor.name;
				info.v_nation = item.visitor.folk;
				info.v_phone = item.visitor.phone;
				info.v_dw = item.visitor.company;
				info.v_sex = item.visitor.sex == "男" ? "1" : item.visitor.sex == "女" ? "2" : "0";
				info.v_certificateNumber = AES.encrypt(item.visitor.idNumber, this.httpform.enckey);
				info.v_certificateType = item.record.certificateType;
				info.v_certificateUnit = "";
				info.v_address = item.visitor.address;
				info.v_reason = item.record.purpose;
				info.v_personSum = 1;
				info.v_plateNumber = item.record.licensePlate;
				info.v_belonging = item.record.brings;
				info.status = 2;
				info.isv_id = item.record.staffID;
				info.isv_code = item.staff.jobNumber;
				info.isv_dept = item.staff.department;
				info.isv_name = item.staff.name;
				info.v_box = "";
				info.v_duration = "";
				info.v_time = "";
				info.r_v_time = item.record.timeIn == "" ? time.substring(0, 10) + " " + new Date().toTimeString().substring(0, 8) : item.record.timeIn;
				info.v_lvTime = item.record.timeOut;
				info.r_v_lvTime = "";
				info.v_capturePic = item.record.visitorHeadPhoto;
				info.v_certificatePic = item.record.certificatePhoto;
				info.v_certificateHead = item.record.certificateHeadPhoto;
				info.v_cardNumber = AES.encrypt(this.addICCard, this.httpform.enckey); //IC卡号
				info.id = item.record.Uid;
				console.log("证件头像", info);
				if (this.appointmenBoolean) {
					APP.updateVisitor(info)
						.then(async (resp) => {
							console.log("更新流程", resp);
							if (resp.data.code !== 200) {
								this.$message({ type: "warning", message: "登记失败" });
								return;
							}
							// let passCode = resp.data.info.code;
							if (this.disposesForm.miscellaneous.miscellaneous_printer) {
								let passCode = this.addICCard; //passcode改成ic卡号
								item.record.staffID = null;
								await Native.print(JSON.stringify(item.visitor), JSON.stringify(item.staff), JSON.stringify(item.record), passCode)
									.then((resp) => {
										console.log("打印", resp);
										if (!resp.success) {
											this.$message({ type: "warning", message: "打印失败" + resp.msg });
											return;
										}
									})
									.catch((err) => {
										console.log("打印失败", err);
									});
							}
							this.empty(2);
							this.appointmenBoolean = false;
							this.$message({ type: "success", message: "登记成功" });
						})
						.catch((err) => {
							console.log("8900更新访客信息错误", err);
						});
				} else {
					APP.addVisitor(this.httpform, info)
						.then(async (resp) => {
							console.log("登记流程", resp);
							if (resp.data.code !== 200) {
								this.$message({ type: "warning", message: resp.data.code });
								return;
							}
							if (this.disposesForm.miscellaneous.miscellaneous_printer) {
								// let passCode = resp.data.info.code;
								let passCode = this.addICCard; //passcode改成ic卡号
								item.record.staffID = null;
								await Native.print(JSON.stringify(item.visitor), JSON.stringify(item.staff), JSON.stringify(item.record), passCode)
									.then((res) => {
										console.log("打印", res);
										if (!res.success) {
											this.$message({ type: "warning", message: "打印失败" + res.msg });
											return;
										}
									})
									.catch((err) => {
										console.log("打印失败", err);
									});
								this.empty(2);
								this.$message({ type: "success", message: "登记成功" });
							}
						})
						.catch((err) => {
							console.log("8900添加访客信息", err);
						});
				}
			} else {
				item.record.timeIn = new Date().toLocaleString();
				if (item.record.certificateType == "" || item.record.certificateType == "二代身份证") {
					item.visitor.idCard = item.visitor.idNumber;
				} else if (item.record.certificateType == "驾驶证") {
					item.visitor.driverLicense = item.visitor.idNumber;
				} else if (item.record.certificateType == "护照") {
					item.visitor.passport = item.visitor.idNumber;
				}
				Native.register(JSON.stringify(item.visitor), JSON.stringify(item.staff), JSON.stringify(item.record))
					.then(async (resp) => {
						console.log("来访登记", resp);
						if (!resp.success) {
							this.$message({ type: "info", message: "来访登记失败" });
							return;
						}
						if (this.disposesForm.miscellaneous.miscellaneous_printer) {
							item.record.id = resp.body.id;
							let res = await Native.print(JSON.stringify(item.visitor), JSON.stringify(item.staff), JSON.stringify(item.record), "");
							console.log("打印", res);
							if (res.success) {
								console.log("打印成功");
							} else {
								this.$message({ type: "warning", message: "打印失败" + res.msg });
								return;
							}
						}
						this.empty(2);
						this.getRecords();
						this.$message({ type: "success", message: "来访登记成功！" });
					})
					.catch((err) => {
						console.log(err, "来访登记失败！");
						this.$message({ type: "info", message: "来访登记失败" });
					});
			}
		},
		//将来访信息展示
		async handle(row) {
			console.log("来访信息展示", row);
			this.newStaffID = JSON.parse(JSON.stringify(row.record.staffID));
			this.registrationInformation.record = JSON.parse(JSON.stringify(row.record));
			Native.getBase64Image(this.registrationInformation.record.certificateHeadPhoto)
				.then((resp) => {
					if (!resp.success) {
						this.$message({ type: "warning", message: resp.msg });
						return;
					}
					this.registrationInformation.record.certificateHeadPhoto = resp.body.imageBase64;
					console.log("图片绝对路径转:", this.registrationInformation.record.certificateHeadPhoto);
				})
				.catch((err) => {
					console.log("图片绝对路径转base64失败", err);
					this.$message({ type: "warning", message: "图片绝对路径转base64失败" });
				});
			this.registrationInformation.staff = JSON.parse(JSON.stringify(row.staff));
			this.registrationInformation.visitor = JSON.parse(JSON.stringify(row.visitor));
			this.registrationInformation.visitor.idNumber = row.visitor.idCard;
			this.registrationInformation.visitor.year = row.visitor.birth.slice(0, 4);
			this.registrationInformation.visitor.month = row.visitor.birth.slice(5, 7);
			this.registrationInformation.visitor.day = row.visitor.birth.slice(8, 10);
			this.checkoutObject = JSON.parse(JSON.stringify(row.record));
			if (this.checkoutObject.timeOut == "") {
				this.$confirm("是否进行签离操作？")
					.then(async () => {
						this.checkoutObject.timeOut = new Date().toLocaleString();
						await Native.checkOut(JSON.stringify(this.checkoutObject))
							.then((resp) => {
								if (!resp.success) {
									this.$message({ type: "warning", message: "签离失败!" });
									return;
								}
								this.getRecords(1);
								this.empty(2);
								this.$message({ type: "success", message: "签离成功!" });
							})
							.catch((err) => {
								console.log("签离失败", err);
								this.$message({ type: "warning", message: "签离失败!" });
							});
					})
					.catch(() => this.$message({ type: "info", message: "取消签离" }));
			}
		},
		//定时读取二代身份证
		regular() {
			Native.readIdCard()
				.then(async (resp) => {
					console.log(JSON.stringify(resp));
					if (!resp.success) {
						return;
					}
					let info = resp.body.code;
					if (this.httpform.onlineMode) {
						if (this.appointmentOfVisitorsBoolen) {
							this.appointmentPhoto = resp.body.photo; //赋值头像//预约来访
							APP.getVisitor(this.httpform, null, info)
								.then((resp) => {
									console.log(resp, "--预约信息");
									this.appointmentStaffListBoolean = false;
									if (resp.data.code !== 200) {
										this.$message({ type: "info", message: "获取预约来访失败" });
										return;
									}
									if (resp.data.info.visitorList.length == 0) {
										this.$message({ type: "info", message: "未查询到预约信息" });
										return;
									}

									this.newAppointmentStaffList = resp.data.info.visitorList.slice(0, 1);
									this.appointmentStaffListLength = 1;
									// this.newAppointmentStaffList = resp.data.info.visitorList;
									// this.appointmentStaffListLength = resp.data.info.visitorList.length;
									this.getTableData(2);
									this.$message({ type: "success", message: "获取预约来访成功" });
								})
								.catch((err) => {
									console.log("获取预约来访失败", err);
								});
						} else if (this.checkoutVisitorsBoolen) {
							//签离
							APP.leaveVisitor(null, null, null, info,"定时读取二代身份证,签离:checkoutVisitorsBoolen")
								.then((resp) => {
									console.log("签离", resp);
									if (resp.data.code !== 200) {
										this.$message({ type: "info", message: "签离失败" });
										return;
									}
									this.empty(2);
									this.$message({ type: "success", message: "签离成功" });
								})
								.catch((err) => {
									console.log("访客签离失败", err);
								});
						}
					} else {
						this.$message({ type: "success", message: "读取成功" });
						Native.getRecordsByFullCondition(JSON.stringify({ idCard: resp.body.code }), JSON.stringify({}), JSON.stringify({}))
							.then(async (resp) => {
								if (!resp.success) {
									this.$message({ type: "warning", message: "数据查询失败" });
									return;
								}
								if (resp.body.records.length != 0) {
									if (resp.body.records[resp.body.records.length - 1].timeOut == "") {
										this.checkoutObject.id = resp.body.records[resp.body.records.length - 1].id;
										this.checkout(resp, 3);
										return;
									}
								}
							})
							.catch((err) => {
								console.log(err, "etRecordsByFullCondition查询失败");
							});
					}
					try {
						if (resp.success) {
							console.log(resp);
							this.faceBoolen = true;
							this.idPhoto = "";
							this.registrationInformation.visitor.name = resp.body.name;
							this.registrationInformation.visitor.sex = resp.body.sex;
							this.registrationInformation.visitor.folk = resp.body.folk;
							this.registrationInformation.visitor.address = resp.body.address;
							this.registrationInformation.record.certificateHeadPhoto = resp.body.photo;
							this.registrationInformation.record.certificateType = "二代身份证";
							this.registrationInformation.visitor.idNumber = resp.body.code;
							this.registrationInformation.visitor.year = resp.body.birthYear;
							this.registrationInformation.visitor.month = resp.body.birthMonth;
							this.registrationInformation.visitor.day = resp.body.birthDay;
							this.registrationInformation.visitor.idCard = this.registrationInformation.visitor.idNumber;
							this.registrationInformation.visitor.birth = this.registrationInformation.visitor.year + "-" + this.registrationInformation.visitor.month + "-" + this.registrationInformation.visitor.day;
							this.$forceUpdate();
						}
					} catch (error) {
						console.log(error);
					}
				})
				.catch((err) => {
					console.log("读取二代身份证失败", err);
				});
		},
		//扫描证件 2--驾照（预留），3--护照（自动判国际护照）， 4--二代身份证
		async distinguish(event) {
			clearInterval(this.readID, 0);
			const loading = this.$loading({ lock: true, customClass: "create-isLoading", text: "扫描中……", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)" });
			this.faceBoolen = false;
			if (event == 0) {
				Native.idScanning(4)
					.then(async (data) => {
						console.log(data, "event== 0");
						loading.close();
						if (!data.success) {
							this.$message({ type: "warning", message: data.msg });
							return;
						}
						const loading2 = this.$loading({ lock: true, customClass: "create-isLoading", text: "身份证识别中……", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)" });
						this.idPhoto = data.body.scannerImage;
						Native.ocr(event)
							.then((resp) => {
								loading2.close();
								this.readID = setInterval(this.regular, 2000);
								console.log("身份证--", resp);
								if (!resp.success) {
									this.$message({ type: "warning", message: "识别失败！" });
									return;
								}
								this.registrationInformation.visitor.name = resp.body.Name;
								this.registrationInformation.visitor.sex = resp.body.Sex;
								this.registrationInformation.visitor.folk = resp.body.Folk;
								this.registrationInformation.visitor.address = resp.body.Address;
								this.registrationInformation.record.certificateType = "身份证";
								this.registrationInformation.record.certificateHeadPhoto = resp.body.OcrHead;
								this.registrationInformation.visitor.idNumber = resp.body.CardNo;
								this.registrationInformation.visitor.year = resp.body.Birthday.slice(0, 4);
								this.registrationInformation.visitor.month = resp.body.Birthday.slice(5, 7);
								this.registrationInformation.visitor.day = resp.body.Birthday.slice(8, 10);
								this.registrationInformation.visitor.idCard = this.registrationInformation.visitor.idNumber;
								this.registrationInformation.visitor.birth = this.registrationInformation.visitor.year + "-" + this.registrationInformation.visitor.month + "-" + this.registrationInformation.visitor.day;
								this.$forceUpdate();
							})
							.catch((err) => {
								loading2.close();
								clearInterval(this.readID, 0);
								this.readID = setInterval(this.regular, 2000);
								console.log(err, "身份证识别失败");
							});
					})
					.catch((err) => {
						loading.close();
						clearInterval(this.readID, 0);
						this.readID = setInterval(this.regular, 2000);
						console.log(err, "证件扫描失败");
					});
			} else if (event == 1) {
				Native.idScanning(2)
					.then(async (data) => {
						loading.close();
						console.log(data, "event== 1");
						if (!data.success) {
							this.$message({ type: "warning", message: data.msg });
							return;
						}

						const loading3 = this.$loading({ lock: true, customClass: "create-isLoading", text: "驾驶证识别中……", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)" });
						this.idPhoto = data.body.scannerImage;
						Native.ocr(event)
							.then((resp) => {
								loading3.close();
								this.readID = setInterval(this.regular, 2000);
								console.log("驾驶证--", resp);
								if (!resp.success) {
									this.$message({ type: "warning", message: "识别失败！" });
									return;
								}
								this.registrationInformation.visitor.name = resp.body.Name;
								this.registrationInformation.visitor.sex = resp.body.Sex;
								this.registrationInformation.visitor.folk = resp.body.Folk;
								this.registrationInformation.visitor.address = resp.body.Address;
								this.registrationInformation.record.certificateType = "驾驶证";
								this.registrationInformation.record.certificateHeadPhoto = resp.body.OcrHead;
								this.registrationInformation.visitor.idNumber = resp.body.CardNo;
								this.registrationInformation.visitor.year = resp.body.Birthday.slice(0, 4);
								this.registrationInformation.visitor.month = resp.body.Birthday.slice(5, 7);
								this.registrationInformation.visitor.day = resp.body.Birthday.slice(8, 10);
								this.registrationInformation.visitor.idCard = this.registrationInformation.visitor.idNumber;
								this.registrationInformation.visitor.birth = this.registrationInformation.visitor.year + "-" + this.registrationInformation.visitor.month + "-" + this.registrationInformation.visitor.day;
								this.$forceUpdate();
							})
							.catch((err) => {
								loading3.close();
								clearInterval(this.readID, 0);
								this.readID = setInterval(this.regular, 2000);
								console.log(err, "驾驶证识别失败");
							});
					})
					.catch((err) => {
						loading.close();
						clearInterval(this.readID, 0);
						this.readID = setInterval(this.regular, 2000);
						console.log(err, "证件扫描失败");
					});
			} else if (event == 2) {
				await Native.idScanning(3)
					.then(async (data) => {
						loading.close();
						console.log(data, "event==2");
						if (!data.success) {
							this.$message({ type: "warning", message: data.msg });
							return;
						}

						const loading4 = this.$loading({ lock: true, customClass: "create-isLoading", text: "护照识别中……", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)" });
						this.idPhoto = data.body.scannerImage;
						Native.ocr(event)
							.then((resp) => {
								loading4.close();
								this.readID = setInterval(this.regular, 2000);
								console.log("护照--", resp);
								if (!resp.success) {
									this.$message({ type: "warning", message: "识别失败！" });
									return;
								}

								this.registrationInformation.visitor.name = resp.body.NameCh;
								this.registrationInformation.visitor.sex = resp.body.SexCH;
								this.registrationInformation.visitor.folk = resp.body.Nation;
								this.registrationInformation.visitor.address = resp.body.AddressCH;
								this.registrationInformation.record.certificateType = "护照";
								this.registrationInformation.record.certificateHeadPhoto = resp.body.OcrHead;
								this.registrationInformation.visitor.idNumber = resp.body.CardNo;
								this.registrationInformation.visitor.year = resp.body.Birthday.slice(0, 4);
								this.registrationInformation.visitor.month = resp.body.Birthday.slice(4, 6);
								this.registrationInformation.visitor.day = resp.body.Birthday.slice(6, 8);
								this.registrationInformation.visitor.idCard = this.registrationInformation.visitor.idNumber;
								this.registrationInformation.visitor.birth = this.registrationInformation.visitor.year + "-" + this.registrationInformation.visitor.month + "-" + this.registrationInformation.visitor.day;
								this.$forceUpdate();
							})
							.catch((err) => {
								loading4.close();
								clearInterval(this.readID, 0);
								this.readID = setInterval(this.regular, 2000);
								console.log(err, "护照识别失败");
							});
					})
					.catch((err) => {
						loading.close();
						clearInterval(this.readID, 0);
						this.readID = setInterval(this.regular, 2000);
						console.log(err, "证件扫描失败");
					});
			} else if (event == -1) {
				await Native.idScanning(3)
					.then((data) => {
						console.log(data, "event== -1");
						loading.close();
						this.readID = setInterval(this.regular, 2000);
						if (!data.success) {
							this.$message({ type: "warning", message: data.msg });
							return;
						}
						this.idPhoto = data.body.scannerImage;
						this.$forceUpdate();
					})
					.catch((err) => {
						loading.close();
						clearInterval(this.readID, 0);
						this.readID = setInterval(this.regular, 2000);
						console.log(err, "证件扫描失败");
					});
			}
		},
		//打开摄像头
		async photograph() {
			// let photographBoolen = true;
			console.log(this.photographBoolen, "打开摄像头", this.faceBoolen, "--是否证件对比");
			if (this.photographBoolen) {
				this.photographBoolen = false;
			} else {
				return;
			}
			clearInterval(this.readID, 0);
			let headPhoto = this.registrationInformation.record.certificateHeadPhoto;
			const loading5 = this.$loading({ lock: true, customClass: "create-isLoading", text: "正在打开摄像头并初始化人脸参数，请稍等……", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)" });
			if (this.faceBoolen) {
				Native.startFaceHandle(headPhoto)
					.then((resp) => {
						this.photographBoolen = true;
						if (!resp.success) {
							this.$message({ type: "info", message: resp.msg });
							return;
						}
						console.log("startFaceHandle", resp);
					})
					.catch((err) => {
						this.photographBoolen = true;
						console.log(err, "人脸处理");
						this.$message({ type: "warning", message: "人脸处理错误" });
					});
				loading5.close();
			} else {
				Native.startFaceHandle()
					.then((resp) => {
						this.photographBoolen = true;
						if (!resp.success) {
							this.$message({ type: "info", message: resp.msg });
							return;
						}
						console.log("startFaceHandle", resp);
					})
					.catch((err) => {
						console.log(err, "人脸处理");
						this.photographBoolen = true;
						this.$message({ type: "warning", message: "人脸处理错误" });
					});
				loading5.close();
			}
		},
		//被访拨打电话
		async calling(val, type) {
			console.log(val, type);
			if (!val) {
				this.$message({ type: "warning", message: "电话号码不能为空" });
				return;
			}
			this.allPhone = val;
			this.warnMsg = val;
			this.callPhoneBoolen = true;
		},
		async handUp(e, type) {
			e.stopPropagation();
			switch (type) {
				case 0:
					{
						this.callPhoneText = "拨号中...";
						this.callBoolen = true;
						Native.call(this.areaCode + this.allPhone)
							.then((resp) => {
								console.log(resp);
								if (!resp.success) {
									this.callPhoneText = "拨号";
									this.callBoolen = false;
									this.$message({ type: "warning", message: resp.msg });
									return;
								}
								this.callPhoneText = "正在通话中";
								this.$message({ type: "success", message: "拨号成功,请拿起话机" });
							})
							.catch((err) => {
								console.log("拨打电话失败", err);
								this.$message({ type: "warning", message: "拨打电话失败" });
							});
					}
					break;
				case 1:
					{
						this.callPhoneText = "拨号";
						this.callBoolen = false;
						this.callPhoneBoolen = false;
					}
					break;
				default:
					break;
			}
		},

		//一进页面获取员工数据
		async InquireInterviewee() {
			this.InquireIntervieweeState = !this.InquireIntervieweeState;
			if (this.httpform.onlineMode) {
				//#region  测试使用-被访人
				// let res = {
				// 	sessionId: 1,
				// 	sequence: 2,
				// 	result: true,
				// 	data: {
				// 		code: 200,
				// 		info: {
				// 			personList: [
				// 				{
				// 					id: 1,
				// 					name: "唐田",
				// 					phone: "",
				// 					sex: 1,
				// 					company: "贵阳市警备区",
				// 					deptName: "战备建设处",
				// 					deptId: 5201001,
				// 					code: "52010004",
				// 					location: "A11",
				// 				},
				// 			],
				// 		},
				// 	},
				// };
				//#endregion
				APP.getInterviewee(this.httpform, this.queryCriteria)
					.then((resp) => {
						console.log(resp);
						if (resp.data.code !== 200) {
							this.$message({ type: "info", message: resp.data.code + ":" + resp.data.errMsg });
							return;
						}
						if (resp.data.info.personList.length == 0) {
							this.$message({ type: "warning", message: "暂无查询信息" });
							return;
						}
						this.staffList = resp.data.info.personList;
						this.staffListLength = this.staffList.length; //数据总长
						this.newStaffList = this.staffList;
						this.$message({ type: "success", message: "查询成功" });
					})
					.catch((err) => {
						console.log("查询被访人失败", err);
					});
			} else {
				if (!this.queryCriteria.jobNumber || !this.queryCriteria.name || !this.queryCriteria.phone) {
					return;
				}
				this.visitorBoolean = true;
				Native.getStaffs(this.queryCriteria.jobNumber, this.queryCriteria.name, this.queryCriteria.sex, this.queryCriteria.phone, this.queryCriteria.department, "")
					.then((resp) => {
						console.log(resp);
						if (!resp.success) {
							this.$message({ type: "info", message: "查询失败" });
							return;
						}
						this.staffList = resp.body.list;
						this.staffListLength = this.staffList.length; //数据总长
						this.newStaffList = this.staffList;
						this.$message({ type: "success", message: "查询成功" });
					})
					.catch((err) => {
						console.log("查询员工信息失败", err);
					});

				this.visitorBoolean = false;
			}
		},
		//点击查询员工数据
		async queryStaff() {
			if (this.httpform.onlineMode) {
				APP.getInterviewee(this.httpform, this.queryCriteria)
					.then((resp) => {
						console.log(resp);
						if (resp.data.code !== 200) {
							this.$message({ type: "info", message: "查询失败" });
							return;
						}
						this.staffList = resp.data.info.personList;
						this.staffListLength = resp.data.info.personList.length;
						this.newStaffList = this.staffList;
						this.$message({ type: "success", message: "查询成功" });
					})
					.catch((err) => {
						console.log("查询被访人失败", err);
					});
			} else {
				this.staffBoolean = true;
				Native.getStaffs(this.queryCriteria.jobNumber, this.queryCriteria.name, "", this.queryCriteria.phone, "", "")
					.then((resp) => {
						console.log(resp);
						if (!resp.success) {
							this.$message({ type: "info", message: "查询失败" });
							return;
						}
						if (resp.body.list.length == 0) {
							this.$message({ type: "warning", message: "查无此人" });
							this.staffBoolean = false;
							return;
						}
						this.$message({ type: "success", message: "查询成功" });
						this.staffList = resp.body.list;
						this.staffListLength = this.staffList.length;
						this.newStaffList = this.staffList;
					})
					.catch((err) => {
						console.log("查询被访人信息失败", err);
					});
				this.staffBoolean = false;
			}
		},
		//选中员工
		selectStaff(row, index) {
			console.log(row, index);
			if (this.httpform.onlineMode) {
				this.registrationInformation.record.staffID = row.id;
				this.registrationInformation.staff.jobNumber = row.code;
				this.registrationInformation.staff.name = row.name;
				this.registrationInformation.staff.sex = row.sex === 1 ? "男" : "女";
				this.registrationInformation.staff.officePhone = row.officePhone;
				this.registrationInformation.staff.mobilePhone = row.phone;
				this.registrationInformation.staff.department = row.deptName;
				this.registrationInformation.staff.position = row.location;
				this.InquireIntervieweeState = !this.InquireIntervieweeState;
			} else {
				this.registrationInformation.staff.jobNumber = row.jobNumber;
				this.registrationInformation.record.staffID = row.id;
				this.registrationInformation.staff.name = row.name;
				this.registrationInformation.staff.sex = row.sex;
				this.registrationInformation.staff.officePhone = row.officePhone;
				this.registrationInformation.staff.mobilePhone = row.mobilePhone;
				this.registrationInformation.staff.department = row.department;
				this.registrationInformation.staff.position = row.position;
				this.InquireIntervieweeState = !this.InquireIntervieweeState;
			}
		},
		//来访信息表
		getRecords() {
			let timeInStart = new Date().toLocaleString();
			let timeInEnd = new Date().toLocaleString();
			Native.getRecords("", "", timeInStart, timeInEnd, "", "", "", "")
				.then((resp) => {
					console.log("来访信息表--", resp);
					if (!resp.success) {
						return;
					}
					this.visitorBoolean = false;
					this.peopleList = [];
					let RecordsLenght = resp.body.records.length;
					this.visitorTotal = RecordsLenght;
					this.visitorCheckout = 0;
					for (let index = 0; index < RecordsLenght; index++) {
						if (resp.body.records[index].timeOut !== "") {
							this.visitorCheckout += 1;
						}
						let bigRecords = {};
						bigRecords.record = resp.body.records[index];
						bigRecords.staff = resp.body.staffs[index];
						bigRecords.visitor = resp.body.visitors[index];
						this.peopleList.push(bigRecords);
					}
					this.currentPageLength = this.peopleList.length; //数据总长
					this.newPeopleList = this.peopleList;
				})
				.catch((err) => {
					console.log("getRecords数据错误", err);
				});
		},
		async handleHandInput() {
			let resp = await Native.handleHandInput(this.touchKeypadList.urlBoolen, this.touchKeypadList.url);
			console.log("手写键盘--", resp);
		},
		appointmentVisit(data) {
			this.appointmentOfVisitorsBoolen = !this.appointmentOfVisitorsBoolen;
			console.log(this.appointmenBoolean);
			console.log(data);
			if (data == undefined) {
				return;
			}
			//#region  测试使用-预约来访
			// 	let resp.data= {
			// 	sessionId: 1,
			// 	sequence: 2,
			// 	result: true,
			// 	code: 200,
			// 	info: {
			// 		visitorList: [
			// 			{
			// 				id: 1,
			// 				v_name: "哈哈",
			// 				v_nation: "汉",
			// 				v_phone: "15215215215",
			// 				v_dw: "鼎亚科技",
			// 				v_sex: 1,
			// 				v_certificateNumber: " 12345648135481",
			// 				v_certificateType: "军官证",
			// 				v_certificateUnit: "dsf",
			// 				v_address: "上海市黄浦区普育东路31号203室",
			// 				v_reason: "参观",
			// 				v_personSum: 3,
			// 				v_plateNumber: "浙A033DP",
			// 				v_belonging: "312312",
			// 				isv_id: "",
			// 				isv_code: "",
			// 				status: 1,
			// 				v_cardNumber: "32132132131231",
			// 				inviteCode: "MjEzMjE0",
			// 				v_time: "2018-07-26 17:31:00",
			// 				r_v_time: "3213",
			// 				v_lvTime: "3213",
			// 				r_v_lvTime: "3123",
			// 				isv_deptName: "3123",
			// 				isv_name: "213213",
			// 				isv_dept: "312312",
			// 				v_capturePic: "http://192.168.7.253:80/CardSolution/snap/CardSolution/visitorpic/610104198903237334_1532594541_photo.jpg",
			// 				v_certificatePic: "",
			// 				v_certificateHead: "",
			// 			},
			// 		],
			// 	},
			// };
			//#endregion

			if (this.$store.state.heartBoolen) {
				APP.getVisitor(this.httpform, data, null).then((resp) => {
					console.log(resp);
					this.appointmentStaffListBoolean = false;
					if (resp.data.code !== 200) {
						this.$message({ type: "info", message: "获取预约来访失败" });
						return;
					}
					if (resp.data.info.visitorList.length == 0) {
						this.$message({ type: "info", message: "未查询到预约信息" });
						return;
					}
					this.newAppointmentStaffList = resp.data.info.visitorList.slice(0, 1);
					this.appointmentStaffListLength = 1;
					// this.newAppointmentStaffList = resp.data.info.visitorList;
					// this.appointmentStaffListLength = resp.data.info.visitorList.length;
					this.getTableData(2);
					this.$message({ type: "success", message: "获取预约来访成功" });
				});
			} else {
				this.$message({ type: "info", message: "心跳保活失败" });
			}
		},
		//预约
		appointment(row, index) {
			console.log(row, index);
			this.registrationInformation.visitor.name = row.v_name;
			this.registrationInformation.visitor.sex = row.v_sex == 1 ? "男" : row.v_sex == 2 ? "女" : "未知";
			this.registrationInformation.visitor.folk = row.v_nation;
			console.log(AES.decrypt(row.v_certificateNumber, this.httpform.enckey));
			this.registrationInformation.visitor.idNumber = AES.decrypt(row.v_certificateNumber, this.httpform.enckey);
			this.registrationInformation.visitor.address = row.v_address;
			this.registrationInformation.visitor.company = row.v_dw;
			this.registrationInformation.visitor.phone = row.v_phone;

			this.registrationInformation.record.purpose = row.v_reason;
			this.registrationInformation.record.certificateType = row.v_certificateType;
			this.registrationInformation.record.licensePlate = row.v_plateNumber;

			this.registrationInformation.record.staffID = row.isv_id;
			this.registrationInformation.record.timeIn = row.v_time;
			this.registrationInformation.record.timeOut = row.v_lvTime;
			this.registrationInformation.record.Uid = row.id;
			this.registrationInformation.record.status = row.status;
			this.registrationInformation.record.certificatePhoto = row.v_certificatePic;
			// this.registrationInformation.record.certificateHeadPhoto = row.v_certificateHead;
			this.registrationInformation.record.certificateHeadPhoto = this.appointmentPhoto;

			this.registrationInformation.staff.department = row.isv_deptName;
			this.registrationInformation.staff.name = row.isv_name;

			this.appointmentOfVisitorsBoolen = !this.appointmentOfVisitorsBoolen;
			this.appointmenBoolean = true;
			// this.$forceUpdate();
			console.log(this.registrationInformation, "登记信息");
		},
		async getVersion() {
			Native.getVersion()
				.then((resp) => {
					console.log("获取版本号", resp);
					if (!resp.success) {
						return;
					}
					this.$store.commit("getMeet", resp.body);
				})
				.catch((err) => {
					console.log("获取版本号失败", err);
				});
		},
		inquiry(data) {
			this.empty(3);
			if (this.httpform.onlineMode) {
				// 员工查询条件
				this.queryCriteria.jobNumber = data;
				//#region  测试使用-被访人
				// let res = {
				// 	sessionId: 1,
				// 	sequence: 2,
				// 	result: true,
				// 	data: {
				// 		code: 200,
				// 		info: {
				// 			personList: [
				// 				{
				// 					id: 1,
				// 					name: "唐田",
				// 					phone: "",
				// 					sex: 1,
				// 					company: "贵阳市警备区",
				// 					deptName: "战备建设处",
				// 					deptId: 5201001,
				// 					code: "52010004",
				// 					location: "A11",
				// 				},
				// 			],
				// 		},
				// 	},
				// };
				//#endregion
				APP.getInterviewee(this.httpform, this.queryCriteria)
					.then((resp) => {
						console.log(resp);
						if (resp.data.code !== 200) {
							this.$message({ type: "info", message: resp.code + ":" + resp.errMsg });
							return;
						}
						this.staffList = resp.data.info.personList;
						this.staffListLength = this.staffList.length; //数据总长
						this.newStaffList = this.staffList;
						this.$message({ type: "success", message: "获取员工数据成功" });
					})
					.catch((err) => {
						console.log("查询被访人失败", err);
					});
			} else {
				Native.getStaffs(data, "", "", "", "", "")
					.then((resp) => {
						console.log(resp);
						if (!resp.success) {
							this.$message({ type: "info", message: "查询失败" });
							return;
						}
						if (resp.body.list.length == 0) {
							this.$message({ type: "info", message: "查询成功,但查无此人，请检查被访人管理" });
							return;
						}
						this.registrationInformation.record.staffID = resp.body.list[0].id;
						this.registrationInformation.staff.jobNumber = resp.body.list[0].jobNumber;
						this.registrationInformation.staff.name = resp.body.list[0].name;
						this.registrationInformation.staff.sex = resp.body.list[0].sex;
						this.registrationInformation.staff.officePhone = resp.body.list[0].officePhone;
						this.registrationInformation.staff.mobilePhone = resp.body.list[0].mobilePhone;
						this.registrationInformation.staff.department = resp.body.list[0].department;
						this.registrationInformation.staff.position = resp.body.list[0].position;
						this.$forceUpdate();
						this.$message({ type: "success", message: "查询成功" });
					})
					.catch((err) => {
						console.log("查询失败", err);
						this.$message({ type: "info", message: "查询失败" });
					});
			}
		},
		readIC(type) {
			switch (type) {
				case 0:
					Native.readICCard()
						.then((resp) => {
							console.log("readICCard", resp);
							if (!resp.success) {
								this.$message({ type: "info", message: "IC卡读取失败" });
								return;
							}
							this.addICCard = resp.body.icCardNo;
							this.$message({ type: "success", message: "IC卡读取成功" });
						})
						.catch((err) => {
							console.log("IC卡读取失败err", err);
						});
					break;
				case 1:
					Native.readICCard()
						.then((resp) => {
							console.log(resp);
							if (!resp.success) {
								this.$message({ type: "info", message: "IC卡读取失败" });
								return;
							}
							APP.leaveVisitor1(resp.body.icCardNo, null, null, null,"IC卡读取,签离")
								.then((resp) => {
									console.log("在线签离", resp);
									if (resp.data.code !== 200) {
										this.$message({ type: "info", message: "签离失败！" });
										return;
									}
									this.empty(2);
									this.$message({ type: "success", message: "签离成功" });
									this.checkoutVisitorsBoolen = !this.checkoutVisitorsBoolen;
								})
								.catch((err) => {
									console.log("签离失败err", err);
								});
						})
						.catch((err) => {
							console.log("IC卡读取失败err", err);
							this.$message({ type: "info", message: "IC卡读取失败" });
						});
					break;
				default:
					break;
			}
		},
		queryAppointment(data) {
			if (data.InvitationCode == "" && data.InvitationIdCard == "") {
				this.$message({ type: "info", message: "查询信息不能为空!" });
				return;
			}
			if (this.$store.state.heartBoolen) {
				APP.getVisitor(this.httpform, data.InvitationCode, data.InvitationIdCard)
					.then((resp) => {
						console.log(resp);
						this.appointmentStaffListBoolean = false;
						if (resp.data.code !== 200) {
							this.$message({ type: "info", message: "获取预约来访失败" });
							return;
						}
						if (resp.data.info.visitorList.length == 0) {
							this.$message({ type: "info", message: "未查询到预约信息" });
							return;
						}
						this.appointmentPhoto = ""; //点击查询预约记录头像赋值为空

						this.newAppointmentStaffList = resp.data.info.visitorList.slice(0, 1);
						this.appointmentStaffListLength = 1;
						// this.newAppointmentStaffList = resp.data.info.visitorList;
						// this.appointmentStaffListLength = resp.data.info.visitorList.length;
						this.getTableData(2);
						this.$message({ type: "success", message: "获取预约来访成功" });
					})
					.catch((err) => {
						console.log("获取预约来访失败", err);
					});
			} else {
				this.$message({ type: "info", message: "心跳保活失败" });
			}
		},
	},
	components: {
		Scanning,
		Carousel,
	},
	watch: {},
	destroyed() {
		clearInterval(this.readID, 0);
		clearInterval(this.getRecord, 0);
	},
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/home.scss";
</style>
