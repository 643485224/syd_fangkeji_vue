import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== "production",
	plugins: [createPersistedState()],
	state: {
		password: "",
		tableData: [],
		quitStatus: false, //退出程序状态
		editStatus: false, //编辑员工信息弹窗状态
		addStatus: false, //保存员工信息弹窗状态
		faceData: "", //返回的人脸对比数据
		disposesForm: {
			miscellaneous: {
				miscellaneous_printer: true,
				miscellaneous_faceRecognition: true,
				miscellaneous_checkout: true,
				miscellaneous_appointment: true,// 启用预约来访
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
				visitor_carryItems: false,
			},
			staff: {
				staff_name: true,
				staff_sex: false,
				staff_officePhone: false,
				staff_mobilePhone: false,
				staff_department: false,
				staff_position: false,
			},
		}, //必填项配置
		httpform: {
			ipAddress: "127.0.0.1",
			port: "8080",
            domainName:"",
			// offlineIpAddress: "127.0.0.1",
			// offlinePort: "8080",
			onlineMode: false,
			mac: "", //mac地址
			poolCode: "12345678", //注册码
			enckey: "0123456789ABCDEF0123456789ABCDEF", //秘钥
			secretkey: "",
			heartbeatSessionId: 0,
			heartbeatSequence: 1,
		},
		getVersionList: {
			meet: {
				version:""
			},
			version: {
				buildDate: "",
				edition: "",
				customized: "",
			},
		},
		debugBoolen: false,
		touchKeypadList: {
			urlBoolen: true,
			// url: "C:\\Program Files\\SogouInput\\Components\\HandInput\\1.1.0.328\\handinput",
			url: "",
		},
		heartBoolen: false,
		debugLog: "",
		carouselArray: [],
		backgroundItems: [],
		backgroundURL: "",
		isOperate: true, // true：用户在操作 false：用户长时间未操作
		timeoutNum: 180, //倒计时60秒返回首页清除用户信息
		tableRouter: "",
		textTitle: "请点击设置-输入管理员密码-点击主题配置-输入内容-点击保存字幕即可更换",
		scanBoolen: true,
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
				sexNumber: "", //性别数字 男1  女2
				idNumber: "",
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
			},
		},
		certificatesType: "",
		KeyboardSwitchBoolen: false,
	},
	getters: {
		//这里是get方法
		isOperate: (state) => state.isOperate,
		timeoutNum: (state) => state.timeoutNum,
	},
	mutations: {
		assignment: (state, val) => {
			state.password = val;
		},
		secede: (state) => {
			state.quitStatus = !state.quitStatus;
		},
		cancel: (state) => {
			state.editStatus = !state.editStatus;
		},
		preserve: (state) => {
			state.addStatus = !state.addStatus;
		},
		faceProces: (state, val) => {
			state.faceData = val;
		},
		saveDisposes: (state, val) => {
			state.disposesForm = val;
		},
		http: (state, val) => {
			state.httpform = val;
		},
		getMeet: (state, val) => {
			state.getVersionList.meet = val;
		},
		getVersion: (state, val) => {
			state.getVersionList.version = val;
		},
		debugBoolen: (state, val) => {
			state.debugBoolen = val;
		},
		KeyboardSwitchBoolen: (state, val) => {
			state.KeyboardSwitchBoolen = val;
		},
		heart: (state, val) => {
			state.heartBoolen = val;
		},
		touchKey: (state, val) => {
			state.touchKeypadList.url = val;
		},
		delog: (state, val) => {
			state.debugLog = val;
		},
		carousel: (state, val) => {
			state.carouselArray = val;
		},
		background: (state, val) => {
			state.backgroundItems = val;
		},
		removeBackground: (state, val) => {
			state.backgroundItems.splice(val, 1);
		},
		addBackground: (state, val) => {
			state.backgroundURL = val;
		},
		SET_ISOPERATE: (state, isOperate) => {
			state.isOperate = isOperate;
		},
		SET_TIMEOUTNUM: (state, timeoutNum) => {
			state.timeoutNum = timeoutNum;
		},
		tableBG: (state, val) => {
			state.tableRouter = val;
		},

		newTitle: (state, val) => {
			state.textTitle = val;
		},
		scan: (state, val) => {
			state.scanBoolen = val;
		},
		newRegistrant: (state, val) => {
			state.registrationInformation = val;
		},
		certif: (state, val) => {
			state.certificatesType = val;
		},
	},

	actions: {
		setIsOperate: ({ commit }, isOperate) => {
			commit("SET_ISOPERATE", isOperate);
		},
		setTimeoutNum: ({ commit }, timeoutNum) => {
			commit("SET_TIMEOUTNUM", timeoutNum);
		},
	},
});
