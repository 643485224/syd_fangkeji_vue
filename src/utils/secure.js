import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("0123456789ABCDEF0123456789ABCDEF"); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Hex.parse("0000000000000000"); //十六位十六进制数作为密钥偏移量
export default {
	//解密方法
	decrypt(word) {
		let decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv, mode: CryptoJS.mode.OFB, padding: CryptoJS.pad.NoPadding });
		let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
		return decryptedStr.toString();
	},

	//加密方法
	encrypt(word) {
		let encrypted = CryptoJS.AES.encrypt(word, key, { iv: iv, mode: CryptoJS.mode.OFB, padding: CryptoJS.pad.NoPadding });
		return encrypted.toString();
	},
};
