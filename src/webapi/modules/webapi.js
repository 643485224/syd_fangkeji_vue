import appRequst from "../../utils/http.js";
//默认引入utils下面的index 默认导出为intface，改默认导出为appRequst
let Base64 = require("js-base64").Base64;
import store from "@/store/store.js";

import AES from "@/utils/secure";
const ipAddress = store.state.httpform.ipAddress;
const port = store.state.httpform.port;
// const offlineIpAddress = store.state.httpform.offlineIpAddress;
// const offlinePort = store.state.httpform.offlinePort;
// const domainName =store.httpform.port;
const enckey = store.state.httpform.enckey;
const secretkey = store.state.httpform.secretkey;
const MAC = store.state.httpform.mac;
const heartbeatSessionId = store.state.httpform.heartbeatSessionId;
// const heartbeatSequence = store.state.httpform.heartbeatSequence;

console.log(ipAddress, port, enckey, secretkey, MAC, heartbeatSessionId, "IP地址和端口号和秘钥和poolCode和MAC和心跳返回ID");

var SalaryContent = { Sequence: 1, SessionId: 0 }; //序列号和会话ID
var boxInfo = { boxId: "", boxName: "" }; //岗亭ID和Name
export default {
	Increment(val) {
		if (val) {
			SalaryContent.SessionId = val;
		}
		SalaryContent.Sequence++;

		return SalaryContent;
	},
	boxIn(val) {
		boxInfo = val;
		return boxInfo;
	},
	//就是这个default
	app() {
		console.log('app');
		return appRequst.get("http://www.51houniao.com/requirement/destination/getPoiList");
	},
	/**
	 * 注销协议
	 */
	unregister() {
		return appRequst({
			url: `http://${ipAddress}:${port}/CardSolution/visitorcenter/session`,
			method: "delete",
			headers: { Accept: "application/json", "Content-Type": "application/json;charset=UTF-8" },
			data: JSON.stringify({
				sessionId: 0,
				sequence: SalaryContent.Sequence,
				poolCode: secretkey,
				info: {},
			}),
		});
	},
	/**
	 * 注册协议
	 */
	register(linchpin) {
		console.log("注册协议", linchpin,);
		return appRequst({
			url: `http://${ipAddress}:${port}/CardSolution/visitorcenter/session`,
			method: "post",
			headers: { Accept: "application/json", "Content-Type": "application/json;charset=UTF-8" },
			data: JSON.stringify({
				mac: MAC,
				sessionId: 0,
				sequence: SalaryContent.Sequence,
				poolCode: secretkey,
				info: {
					clientType: "1",
				},
			}),
			
		});
	},

	/**
	 * 心跳包
	 */
	heartbeat(linchpin) {
		this.Increment();
		// console.log("心跳包", linchpin);
		return appRequst({
			url: `http://${ipAddress}:${port}/CardSolution/visitorcenter/heartbeat`,
			method: "POST",
			headers: { Accept: "application/json", "Content-Type": "application/json;charset=UTF-8" },
			data: JSON.stringify({
				sessionId: SalaryContent.SessionId,
				sequence: SalaryContent.Sequence,
				poolCode: secretkey,
				info: {},
			}),
		});
	},
	/**
	 * 查询访客
	 *
	 * @param value 预约二维码
	 * @param cardNum 证件号码明文
	 */
	getVisitor(value, cardNum) {
		this.Increment();
		let visitorJson = {
			inviteCode: "",
			certificateType: "",
			certificateNumber: "",
		};
		console.log("查询访客", value, cardNum);
		if (value) {
			visitorJson.inviteCode = Base64.encode(value);
		}
		if (cardNum) {
			visitorJson.certificateType = "身份证";
			visitorJson.certificateNumber = AES.encrypt(cardNum, enckey);
		}
		return appRequst({
			url: `http://${ipAddress}:${port}/CardSolution/visitorcenter/visitor`,
			method: "POST",
			headers: { Accept: "application/json", "Content-Type": "application/json;charset=UTF-8" },
			data: JSON.stringify({
				sessionId: SalaryContent.SessionId,
				sequence: SalaryContent.Sequence,
				poolCode: secretkey,
				info: visitorJson,
			}),
		});
	},
	/**
	 * 查询被访人
	 * @param person
	 * @param phone
	 * @param id
	 * @param cardType
	 * @param cardNum
	 */
	getInterviewee(linchpin, value) {
		this.Increment();
		console.log("查询被访人", linchpin, value);
		return appRequst({
			url: `http://${ipAddress}:${port}/CardSolution/visitorcenter/person`,
			method: "POST",
			headers: { Accept: "application/json", "Content-Type": "application/json;charset=UTF-8" },
			data: JSON.stringify({
				sessionId: SalaryContent.SessionId,
				sequence: SalaryContent.Sequence,
				poolCode: secretkey,
				info: {
					person: value.name,
					phone: value.phone,
					code: value.jobNumber,
					id: value.id,
					certificateType: "",
					certificateNumber: "",
				},
			}),
		});
	},
	/**
	 * 增加访客 (现场来访)
	 * @param linchpin
	 */
	addVisitor(linchpin, value) {
		this.Increment();
		console.log("现场来访", linchpin, value);
		return appRequst({
			url: `http://${ipAddress}:${port}/CardSolution/visitorcenter/visitor`,
			method: "PUT",
			headers: { Accept: "application/json", "Content-Type": "application/json;charset=UTF-8" },
			data: JSON.stringify({
				sessionId: SalaryContent.SessionId,
				sequence: SalaryContent.Sequence,
				poolCode: secretkey,
				info: value,
			}),
		});
	},
	/**
	 * 更新访客信息 (预约来访)
	 * @param value 更新对象
	 */
	updateVisitor(value) {
		this.Increment();
		console.log("预约来访", value);
		return appRequst({
			url: `http://${ipAddress}:${port}/CardSolution/visitorcenter/updateVisitor`,
			method: "POST",
			headers: { Accept: "application/json", "Content-Type": "application/json;charset=UTF-8" },
			data: JSON.stringify({
				sessionId: SalaryContent.SessionId,
				sequence: SalaryContent.Sequence,
				poolCode: secretkey,
				info: value,
			}),
		});
	},
	/**
	 * 签离访客
	 * @param code 通行码
	 * @param inviteCode 邀请码
	 * @param cardType 证件类型
	 * @param cardNum 证件号码明文
	 */
	leaveVisitor(linchpin, code, inviteCode, cardType, cardNum) {
		this.Increment();
		console.log("签离访客", linchpin, code, inviteCode, cardType, cardNum);
		return appRequst({
			url: `http://${ipAddress}:${port}/CardSolution/visitorcenter/leaveVisitor`,
			method: "POST",
			headers: { Accept: "application/json", "Content-Type": "application/json;charset=UTF-8" },
			data: JSON.stringify({
				sessionId: SalaryContent.SessionId,
				sequence: SalaryContent.Sequence,
				poolCode: secretkey,
				info: {
					code: Base64.encode(code),
					boxId: boxInfo?boxInfo.boxId:'',
					inviteCode: inviteCode == null ? "" : Base64.encode(inviteCode),
					certificateType: "",
					certificateNumber: cardNum == null ? "" : AES.encrypt(cardNum, enckey),
				},
			}),
		});
	},



	/**
	 * 调用 idScanning 接口 
	 * @param type
	 */
	idScanning(type) {
		console.log("调用 idScanning 接口", type);
		return appRequst({
			url: `http://localhost:8080/KioskVms/idScanning`,
			method: "POST",
			headers: {'Content-Type': 'application/x-www-form-urlencoded' },			
			data: JSON.stringify({ type:type }),
			timeout:10000,
		});
	},


	/**
	 * 调用 ocr 接口 
	 * @param type
	 */
	ocr(type) {
		console.log("调用ocr接口", type);
		return appRequst({
			url: `http://localhost:8080/KioskVms/ocr`,
			method: "POST",
			headers: {'Content-Type': 'application/x-www-form-urlencoded' },
			data: JSON.stringify({ type:type }),
			timeout:10000,
		});
	},
};
