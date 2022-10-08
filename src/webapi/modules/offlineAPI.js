import appRequst from "../../utils/http.js";

export default {
	init() {
		appRequst({
			method: "POST",
			url: "http://localhost:8080/KioskVms/init",
		});
	},
};
