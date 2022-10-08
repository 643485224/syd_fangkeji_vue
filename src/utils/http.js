import axios from "axios";
import store from "@/store/store.js";
const ipAddress = store.state.httpform.ipAddress;
const port = store.state.httpform.port;
// import message from "element-ui";
// import { Message } from "element-ui";
const instance = axios.create({
	// baseURL: "http://127.0.0.1:8080/",
	// baseURL: `http://${ipAddress}:${port}/`,
	timeout: 10000,
	// headers: { "X-Custom-Header": "foobar" },
});
// 添加请求拦截器
instance.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么
		// Message({message: "正在请求",});
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		// Message({ message: "请求失败", type: "warning" });
		return Promise.reject(error);
	}
);

// 添加响应拦截器
instance.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		// Message({ message: "请求成功", type: "success" });
		return response;
	},
	(error) => {
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);

export default instance;
