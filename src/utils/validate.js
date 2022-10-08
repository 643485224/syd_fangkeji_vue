export default {
	username(str) {
		const reg = ["admin", "editor"];
		return reg.indexOf(str.trim()) >= 0;
	},

	/* 合法uri*/
	URL(textval) {
		const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
		return reg.test(textval);
	},

	/* 小写字母*/
	lowerCase(str) {
		const reg = /^[a-z]+$/;
		return reg.test(str);
	},

	/* 大写字母*/
	upperCase(str) {
		const reg = /^[A-Z]+$/;
		return reg.test(str);
	},
	/*身份证验证*/
	isCardNo(card) {
		// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
		const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		return reg.test(card);
		// if (reg.test(card) === false) {
		// 	alert("身份证输入不合法");
		// 	return false;

		// }
	},

	/**
	 * validate phone
	 * @param phone
	 * @returns {boolean}
	 */
	phone(phone) {
		const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
		return reg.test(phone);
	},

	/**
	 * validate email
	 * @param email
	 * @returns {boolean}
	 */
	email(email) {
		const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		return reg.test(email);
	},

	/**
	 * validate ip
	 * @param ip
	 * @returns {boolean}
	 */
	IP(ip) {
		var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		return reg.test(ip);
	},

	/**
	 * validate port
	 * @param {*} port
	 * @returns {boolean}
	 */
	port(port) {
		var reg = /^(\d)+$/g;
		return reg.test(port) && parseInt(port) <= 65535 && parseInt(port) >= 0;
	},

	/**
	 * validate password
	 * @param {*} password
	 * @returns {boolean}
	 */
	password(password) {
		var reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,20}$/;
		return reg.test(password);
	},
	code(code) {
		var reg = /^[a-zA-Z0-9_]{5,16}$/;
		return reg.test(code);
	},

	formatByOptions(value, options) {
		if (options.length == 0) {
			return null;
		}
		const find = options.find((option) => option.value == value);
		return typeof find == "object" ? find["label"] : "未知";
	},
};
