/* eslint-disable no-undef */
(async function () {
	try {
		await CefSharp.BindObjectAsync("native");
		window.native = native;
		console.log("native bind success");
	} catch (error) {
		console.warn(error);
	}
})();

export default {
	/**
	 * 加，测试用
	 * @param 加数
	 * @param {加数} j
	 * @returns
	 */
	add: function (i, j) {
		console.log("Execute native add()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.add(i, j);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							console.log("Execute native add() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.warn("native not found");
				resolve(3);
			}
		});
	},

	/**
	 * 显示开发者工具
	 * @returns 无返回
	 */
	showDevTools: function () {
		console.log("Execute native showDevTools()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.showDevTools();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then(() => {
							console.log("Execute native showDevTools() method, and get result: ");
							resolve();
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.log("native not found");
				// resolve(err);
			}
		});
	},
	/**
	 * 读取身份证信息
	 * @returns 身份证信息
	 */
	readIdCard: function () {
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.readIdCard();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							// console.log("Execute native readIdCard() method, and get result: " , result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				return;
				// console.log("native not found");
				// resolve(3);
			}
		});
	},
	/**
	 * 获取阅读器SAMID
	 * @returns SAMID
	 */
	getSAMID: function () {
		console.log("Execute native getSAMID()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.getSAMID();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native getSAMID() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.err("native not found");
				resolve(3);
			}
		});
	},
	/**
	 * 读取IC卡
	 * @returns IC卡号
	 */
	readICCard: function () {
		console.log("Execute native readICCard()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.readICCard();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native readICCard() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.err("native not found");
				resolve(3);
			}
		});
	},
	/**
	 * 证件扫描
	 * @returns 证件扫描
	 */
	idScanning: function (type) {
		console.log("Execute native idScanning()", type);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.idScanning(type);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native idScanning() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.err("native not found");
				resolve(3);
			}
		});
	},
	/**
	 * 保存登记信息
	 * @returns 登记信息
	 */
	addRecord: function (visitor, staff, record) {
		console.log("Execute native addRecord()", visitor, staff, record);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.addRecord(visitor, staff, record);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native addRecord() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.err("native not found");
				resolve(3);
			}
		});
	},
	/**
	 * 添加员工信息
	 * @returns 员工信息
	 */
	addStaff: function (staff) {
		console.log("Execute native addStaff()", staff);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.addStaff(staff);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native addStaff() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve('{"success":true,"code":0,"msg":null,"body":null}');
			}
		});
	},
	/**
	 * 查询员工信息
	 * @returns 查询员工信息
	 */
	getStaffs: function (jobNumber, name, sex, phone, department, id) {
		console.log("Execute native getStaffs()", jobNumber, name, sex, phone, department, id);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.getStaffs(jobNumber, name, sex, phone, department, id);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native getStaffs() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve('{"success":true,"code":0,"msg":null,"body":null}');
			}
		});
	},
	/**
	 * 删除员工信息
	 * @returns 删除员工信息
	 */
	deleteStaff: function (jobNumber) {
		console.log("Execute native deleteStaff()", jobNumber);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.deleteStaff(jobNumber);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native deleteStaff() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve('{"success":true,"code":0,"msg":null,"body":null}');
			}
		});
	},
	/**
	 * 编辑员工信息
	 * @returns 编辑员工信息
	 */
	updateStaff: function (staff) {
		console.log("Execute native updateStaff()", staff);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.updateStaff(staff);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native updateStaff() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve('{"success":true,"code":0,"msg":null,"body":null}');
			}
		});
	},
	/**
	 * 人脸处理
	 * @returns 人脸处理
	 */
	startFaceHandle: function (base64) {
		console.log("Execute native startFaceHandle()", base64);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.startFaceHandle(base64);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native startFaceHandle() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							//
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 * 退出
	 * @returns 退出
	 */
	exit: function () {
		console.log("Execute native exit()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.exit();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native exit() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 * 关机
	 * @returns 关机
	 */
	shutdown: function () {
		console.log("Execute native shutdown()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.shutdown();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native shutdown() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 * 重启
	 * @returns 重启
	 */
	reboot: function () {
		console.log("Execute native reboot()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.reboot();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native reboot() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 * 来访登记
	 * @returns 来访登记
	 */
	register: function (visitor, staff, record) {
		console.log("Execute native register()", JSON.parse(visitor), JSON.parse(staff), JSON.parse(record));
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.register(visitor, staff, record);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native register() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 * OCR
	 * @returns OCR接口
	 */
	ocr: function (type) {
		console.log("Execute native ocr()", type);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.ocr(type);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native ocr() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *
	 * @returns getRecords数据
	 */
	getRecords: function (visitorId, staffId, timeInStart, timeInEnd, timeOutStart, timeOutEnd, certificateType, id) {
		console.log("Execute native getRecords()", visitorId, staffId, timeInStart, timeInEnd, timeOutStart, timeOutEnd, certificateType, id);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.getRecords(visitorId, staffId, timeInStart, timeInEnd, timeOutStart, timeOutEnd, certificateType, id);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native getRecords() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *
	 * @returns exportStaffsTemplate导出模板
	 */
	exportStaffsTemplate: function () {
		console.log("Execute native exportStaffsTemplate()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.exportStaffsTemplate();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native exportStaffsTemplate() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *
	 * @returns importStaffs导入员工数据
	 */
	importStaffs: function () {
		console.log("Execute native importStaffs()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.importStaffs();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native importStaffs() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *
	 * @returns exportStaffs导出员工数据
	 */
	exportStaffs: function () {
		console.log("Execute native exportStaffs()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.exportStaffs();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native exportStaffs() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *
	 * @returns 拨打电话
	 */
	call: function (phone) {
		console.log("Execute native call()", phone);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.call(phone);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native call() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *
	 * @returns 打印
	 */
	print: function (visitor, staff, record, passCode) {
		console.log("Execute native print()", JSON.parse(visitor), JSON.parse(staff), JSON.parse(record), passCode);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.print(visitor, staff, record, passCode);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native print() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *
	 * @returns 签离
	 */
	checkOut: function (record) {
		console.log("Execute native checkOut()", record);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.checkOut(record);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native checkOut() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 * 初始化
	 * @returns 初始化
	 */
	init: function () {
		console.log("Execute native init()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.init();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native init() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve();
			}
		});
	},
	/**
	 * 获取版本号
	 * @returns 版本号
	 */
	getVersion: function () {
		console.log("Execute native getVersion()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.getVersion();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native getVersion() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve();
			}
		});
	},
	/**
	 *
	 * @returns getRecordsByFullCondition查询
	 */
	getRecordsByFullCondition: function (visitorJson, staffJson, recordJson) {
		console.log("Execute native getRecordsByFullCondition()", visitorJson, staffJson, recordJson);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.getRecordsByFullCondition(visitorJson, staffJson, recordJson);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native getRecordsByFullCondition() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *
	 * @param {HandleHandInput} isOpen
	 * @param {HandleHandInput} executeFilePath
	 * @returns
	 */
	handleHandInput(isOpen, executeFilePath) {
		console.log("Execute native HandleHandInput()  ", isOpen, executeFilePath);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.handleHandInput(isOpen, executeFilePath);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native HandleHandInput() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *
	 * @param {chooseFilePath} isOpen
	 * @param {chooseFilePath} executeFilePath
	 * @returns
	 */
	chooseFilePath() {
		console.log("Execute native chooseFilePath() ");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.chooseFilePath();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native chooseFilePath() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *
	 * @param {getInfo} isOpen
	 * @param {getInfo} executeFilePath
	 * @returns
	 */
	getInfo() {
		console.log("Execute native getInfo()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.getInfo();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native getInfo() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				reject("native not found");
			}
		});
	},
	/**
	 *
	 * @param {clearDebugLog} isOpen
	 * @param {clearDebugLog} executeFilePath
	 * @returns
	 */
	clearDebugLog() {
		console.log("Execute native clearDebugLog()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.clearDebugLog();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native clearDebugLog() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *挂机
	 *
	 */
	handFreeOff() {
		console.log("Execute native handFreeOff()");
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.handFreeOff();
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native handFreeOff() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *图片绝对路径转base64
	 *
	 */
	getBase64Image(imgUrl) {
		console.log("Execute native getBase64Image()", imgUrl);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.getBase64Image(imgUrl);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native getBase64Image() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *导出记录
	 *
	 */
	exportRecords(idList) {
		console.log("Execute native exportRecords()", idList);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.exportRecords(idList);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native exportRecords(idList) method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *删除记录
	 *
	 */
	deleteRecords(idList) {
		console.log("Execute native deleteRecords()", idList);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.deleteRecords(idList);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native deleteRecords(idList) method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *查询访客
	 *
	 */
	getVisitors(visitorJs) {
		console.log("Execute native getVisitors()", visitorJs);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.getVisitors(visitorJs);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native getVisitors(visitorJs) method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *添加黑名单
	 *
	 */
	setBlockList(visitorJs) {
		console.log("Execute native setBlockList()", visitorJs);
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.setBlockList(visitorJs);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native setBlockList(visitorJs) method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 *语音
	 *
	 */
	speak(text) {
		console.log("Execute native speak()", text);
		return new Promise((resolve) => {
			if (window.native) {
				let resp = window.native.speak(text);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native speak() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},

	speakStop() {
		console.log("Execute native speakStop()_");
		return new Promise((resolve) => {
			if (window.native) {
				let resp = window.native.speakStop();
				console.log(resp, "----stop");
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							console.log("Execute native speakStop() method, and get result: ", result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.error("native not found");
				resolve(err);
			}
		});
	},
	/**
	 * 查询是否存在未签离接口
	 * idCard String
	 * @returns true 返回true即为存在未签离数据
	 */
	isCheckOut: function (idCard) {
		return new Promise((resolve, reject) => {
			if (window.native) {
				let resp = window.native.isCheckOut(idCard);
				if (typeof resp === "string") {
					resolve(JSON.parse(resp));
				} else {
					resp
						.then((result) => {
							result = JSON.parse(result);
							// console.log("Execute native readIdCard() method, and get result: " , result);
							resolve(result);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				}
			} else {
				console.log("native not found");
				resolve(err);
			}
		});
	},
};
